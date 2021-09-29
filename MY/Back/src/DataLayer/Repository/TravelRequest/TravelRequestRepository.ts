import OperationResult from "../../../core/Operation/OperationResult";
import RedisManager from "../../../Utilities/Redis/RedisRepository";
import RedisKey from "../../../Utilities/Redis/RedisKey";
import { ITravelRequestRepository } from "./ITravelRequestRepository";
import { TravelRequestEntitie } from "../../Context/TravelRequest/TravelRequest";
import { TravelRequestCreateModel } from "../../../DTO/TravelRequest/TravelRequestCreateModel";
import { GetAllUserIdModel } from "../../../DTO/TravelRequest/GetAllUserIdModel";
import { TravelRequestUpdateModel } from "../../../DTO/TravelRequest/TravelRequestUpdateModel";
import { IRequestAttrs } from "../../Context/Request/IRequestAttrs";
import { RequestStatus } from "../../Context/Request/RequestStatus";
import UnitOfWork from "../UnitOfWork/UnitOfWork";

export class TravelRequestRepository implements ITravelRequestRepository {

    async CreateTravelRequest(item: TravelRequestCreateModel): Promise<OperationResult<boolean>> {
        try {

            let addTravelRequest = await TravelRequestEntitie.build({
                budget: item.budget,
                city: item.city,
                country: item.country,
                createDate: item.createDate,
                description: item.description,
                endDate: item.endDate,
                startDate: item.startDate,
                lookingfor: item.lookingfor,
                travelResidence: item.travelResidence,
                travelType: item.travelType,
                userId: item.userId
            });

            addTravelRequest.save();
            await RedisManager.Set(RedisKey.TravelRequest + addTravelRequest._id, addTravelRequest);
            await RedisManager.Remove(RedisKey.AllTravelRequestbyUserId + item.userId);
            return OperationResult.BuildSuccessResult("Success Add Travel Reuqest", true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async GetAllTravelRequestByUserId(userId: string): Promise<OperationResult<GetAllUserIdModel[]>> {
        try {

            let getAll: GetAllUserIdModel[] = [];

            let GetAllTravelRequest = await RedisManager.Get<GetAllUserIdModel[]>(RedisKey.AllTravelRequestbyUserId + userId);
            if (!GetAllTravelRequest.result) {

                let getAllTravelRequest = await TravelRequestEntitie.find({ userId: userId, isDelete: false })
                    .populate("travelType")
                    .populate("travelResidence")
                    .populate("userId ");

                // let request = await RedisManager.Get<IRequestAttrs>(RedisKey.RequestByTravelId);

                const mapLoop = async () => {

                    const get = getAllTravelRequest.map(async (res) => {

                        let request = await UnitOfWork.RequestRepository.GetRequestById(res.id);

                        return getAll.push({
                            budget: res.budget,
                            city: res.city,
                            country: res.country,
                            description: res.description,
                            endDate: res.endDate,
                            id: res.id,
                            lookingfor: res.lookingfor,
                            requestId: res.id,
                            reqId: request ? request.result?.id : undefined,
                            startDate: res.startDate,
                            status: request.result !== undefined ? request.result?.status : RequestStatus.SendRequest,
                            mustConfirm: ((userId == request.result?.reciverUserId) &&
                                (request.result?.status === RequestStatus.Pendding)) ? true : false,
                            travelesidenceId: res.travelResidence.id,
                            firstName: res.userId.firstName,
                            lastName: res.userId.lastName,
                            owner: userId === res.userId.id ? true : false,
                            travelResidentIcon: res.travelResidence.icon,
                            travelResidentName: res.travelResidence.name,
                            travelTypeIcon: res.travelType.icon,
                            travelTypeId: res.travelType.id,
                            travelTypeName: res.travelType.name,
                            userId: res.userId.id
                        })
                    });

                    const numFruits = await Promise.all(get);
                }

                await mapLoop();
                // await RedisManager.Set(RedisKey.AllTravelRequestbyUserId + userId, getAll);
                return OperationResult.BuildSuccessResult("Success Add Travel Reuqest", getAll);

            }
            if (GetAllTravelRequest.result) {
                return OperationResult.BuildSuccessResult("Success Add Travel Reuqest", GetAllTravelRequest.result);
            } else {
                return OperationResult.BuildSuccessResult("Success Add Travel Reuqest", []);
            }

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async GetAllTravelRequest(userId: string): Promise<OperationResult<GetAllUserIdModel[]>> {
        try {

            let getAll: GetAllUserIdModel[] = [];

            let GetAllTravelRequest = await RedisManager.Get<GetAllUserIdModel[]>(RedisKey.AllTravelRequest);

            if (!GetAllTravelRequest.result) {

                // let request = await RedisManager.Get<IRequestAttrs>(RedisKey.RequestByTravelId);

                let getAllTravelRequest = await TravelRequestEntitie.find({ isDelete: false })
                    .populate("travelType")
                    .populate("travelResidence")
                    .populate("userId ");

                const mapLoop = async () => {

                    const get = getAllTravelRequest.map(async (res) => {

                        let request = await UnitOfWork.RequestRepository.GetRequestById(res.id);

                            return getAll.push({
                            budget: res.budget,
                            city: res.city,
                            country: res.country,
                            description: res.description,
                            endDate: res.endDate,
                            id: res.id,
                            lookingfor: res.lookingfor,
                            requestId: res.id,
                            reqId: request ? request.result?.id : undefined,
                            startDate: res.startDate,
                            status: (request.result?.senderUserId == userId || request.result?.reciverUserId == userId)
                                    ? request.result?.status : RequestStatus.SendRequest,
                            mustConfirm: ((userId == request.result?.reciverUserId) &&
                                (request.result?.status === RequestStatus.Pendding)) ? true : false,
                            travelesidenceId: res.travelResidence.id,
                            firstName: res.userId.firstName,
                            lastName: res.userId.lastName,
                            owner: userId === res.userId.id ? true : false,
                            travelResidentIcon: res.travelResidence.icon,
                            travelResidentName: res.travelResidence.name,
                            travelTypeIcon: res.travelType.icon,
                            travelTypeId: res.travelType.id,
                            travelTypeName: res.travelType.name,
                            userId: res.userId.id
                        })
                    });

                    const numFruits = await Promise.all(get);
                }

                await mapLoop();
                // await RedisManager.Set(RedisKey.AllTravelRequest, getAll);
                return OperationResult.BuildSuccessResult("Get All Travel Request", getAll);

            }
            if (GetAllTravelRequest.result) {
                return OperationResult.BuildSuccessResult("Success Add Travel Reuqest", GetAllTravelRequest.result);
            } else {
                return OperationResult.BuildSuccessResult("Success Add Travel Reuqest", []);
            }

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async DeleteRequest(requestId: string, userId: string): Promise<OperationResult<boolean>> {

        try {

            await TravelRequestEntitie.updateOne({ _id: requestId }, {
                $set: {
                    isDelete: true
                }
            });

            await RedisManager.Remove(RedisKey.TravelRequest + requestId);
            await RedisManager.Remove(RedisKey.AllTravelRequestbyUserId + userId);

            return OperationResult.BuildSuccessResult("Success Delete Request", true);


        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);

        }
    }

    async UpdateRequest(item: TravelRequestUpdateModel, userId: string): Promise<OperationResult<boolean>> {

        try {

            let updateEntity = await TravelRequestEntitie.updateOne({ _id: item.requestId }, {
                $set: {
                    budget: item.budget,
                    city: item.city,
                    country: item.country,
                    description: item.description,
                    endDate: item.endDate,
                    lookingfor: item.lookingfor,
                    startDate: item.startDate,
                    travelResidence: item.travelResidence,
                    travelType: item.travelType
                }
            });

            await RedisManager.ResetSingleItem(RedisKey.TravelRequest + item.requestId, updateEntity);
            await RedisManager.Remove(RedisKey.AllTravelRequestbyUserId + userId);

            return OperationResult.BuildSuccessResult("Success Update Request", true);


        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);

        }
    }

}
