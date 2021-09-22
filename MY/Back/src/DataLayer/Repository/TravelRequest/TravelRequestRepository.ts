import OperationResult from "../../../core/Operation/OperationResult";
import RedisManager from "../../../Utilities/Redis/RedisRepository";
import RedisKey from "../../../Utilities/Redis/RedisKey";
import { ITravelRequestRepository } from "./ITravelRequestRepository";
import { TravelRequestEntitie } from "../../Context/TravelRequest/TravelRequest";
import { TravelRequestCreateModel } from "../../../DTO/TravelRequest/TravelRequestCreateModel";
import { GetAllUserIdModel } from "../../../DTO/TravelRequest/GetAllUserIdModel";
import { TravelRequestUpdateModel } from "../../../DTO/TravelRequest/TravelRequestUpdateModel";

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

                let getAllTravelRequest = await TravelRequestEntitie.find({ isDelete: false })
                    .populate("travelType")
                    .populate("travelResidence")
                    .populate("userId ");

                getAllTravelRequest.map(res => {
                    console.log(res)

                    getAll.push({
                        budget: res.budget,
                        city: res.city,
                        country: res.country,
                        description: res.description,
                        endDate: res.endDate,
                        id: res.id,
                        lookingfor: res.lookingfor,
                        requestId: res.id,
                        startDate: res.startDate,
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
                })

                await RedisManager.Set(RedisKey.AllTravelRequestbyUserId + userId, getAll);
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
