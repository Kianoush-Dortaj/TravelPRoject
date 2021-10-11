import OperationResult from "../../../core/Operation/OperationResult";
import RedisManager from "../../../Utilities/Redis/RedisRepository";
import RedisKey from "../../../Utilities/Redis/RedisKey";
import { TravelRequestEntitie } from "../../Context/TravelRequest/TravelRequest";
import { TravelRequestCreateModel } from "../../../DTO/TravelRequest/TravelRequestCreateModel";
import { IRequestRepository } from "./IRequestRepository";
import { RequestEntitie } from "../../Context/Request/Request";
import { ChangeStatusRequestModel } from "../../../DTO/Request/ChangeStatusRequestModel";
import { UpdateStatusRequestModel } from "../../../DTO/Request/UpdateStatusRequestModel";
import { RequestStatus } from "../../Context/Request/RequestStatus";
import { IRequestDoc } from "../../Context/Request/IRequestDoc";
import { GetRequestModel } from "../../../DTO/Request/GetRequestModel";
import { GetAllUserSendRequestModel } from "../../../DTO/Request/GetAllUserSendRequestModel";
import unitOfWork from './../../Repository/UnitOfWork/UnitOfWork';
import { NotificationType } from "../../Context/Notification/NotificationType";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
import { GetAllUserIdModel } from "../../../DTO/TravelRequest/GetAllUserIdModel";

export class RequestRepository implements IRequestRepository {

    async CreateRequest(item: ChangeStatusRequestModel): Promise<OperationResult<boolean>> {
        try {

            let request = await RequestEntitie.build({
                reciverUserId: item.reciverUserId,
                createDate: item.createDate,
                requestId: item.requestId,
                targetRequestId: item.targetRequestId,
                senderUserId: item.senderUserId,
                status: item.status
            });

            request.save();

            let setNotification = await unitOfWork.NotificationRepository.SetNotification
                (NotificationType.ReciveRequest,
                    item.reciverUserId,
                    item.senderUserId);

            if (setNotification.success) {
                await RedisManager.Set(RedisKey.RequestByTravelId + item.requestId, request);
                return OperationResult.BuildSuccessResult("Success Add Travel Reuqest", true);
            }

            return OperationResult.BuildFailur(setNotification.message);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async GetRequestById(requestId: string): Promise<OperationResult<GetRequestModel>> {

        try {

            let requestFind = await RequestEntitie.
                findOne({ targetRequestId: requestId });

            if (requestFind) {
                return OperationResult.BuildSuccessResult("Find", requestFind);
            }
            return OperationResult.BuildFailur("can not Find");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async GetAllUserReciveRequest(reciverId: string): Promise<OperationResult<GetAllUserSendRequestModel[]>> {

        try {

            let getAll: GetAllUserSendRequestModel[] = [];

            let requestFind = await RequestEntitie.
                find({ reciverUserId: reciverId, status: RequestStatus.Pendding })
                .populate({
                    path: "requestId",
                    populate: [
                        {
                            path: "userId"
                        },
                        {
                            path: "travelType"
                        },
                        {
                            path: "travelResidence"
                        }
                    ],

                });

            requestFind.map(res => {

                getAll.push({
                    userId: res.requestId.userId._id,
                    budget: res.requestId.budget,
                    city: res.requestId.city,
                    country: res.requestId.country,
                    description: res.requestId.description,
                    endDate: res.requestId.endDate,
                    firstName: res.requestId.userId.firstName,
                    hasAvatar: res.requestId.userId.avatar ? true : false,
                    id: res.id,
                    lastName: res.requestId.userId.lastName,
                    lookingfor: res.requestId.lookingfor,
                    requestId: res.requestId._id,
                    startDate: res.requestId.startDate,
                    travelResidentIcon: res.requestId.travelResidence.travelResidentIcon,
                    travelResidentName: res.requestId.travelResidence.travelResidentName,
                    travelTypeIcon: res.requestId.travelType.travelTypeIcon,
                    travelTypeName: res.requestId.travelType.travelTypeName
                })

            });

            if (requestFind) {
                return OperationResult.BuildSuccessResult("Find", getAll);
            }
            return OperationResult.BuildFailur("can not Find");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async UpdateRequest(item: UpdateStatusRequestModel): Promise<OperationResult<boolean>> {
        try {

            let request = await RequestEntitie.updateOne({ _id: item.requestId },
                {
                    $set: {
                        status: item.status
                    }
                });

            await RedisManager.ResetSingleItem(RedisKey.RequestByTravelId + item.requestId, request);
            return OperationResult.BuildSuccessResult("Success Add Travel Reuqest", true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async ConfirmRequest(item: UpdateStatusRequestModel): Promise<OperationResult<boolean>> {
        try {

            let request = await RequestEntitie.findByIdAndUpdate({ _id: item.requestId },
                {
                    $set: {
                        status: item.status
                    }
                });

            let findAllUseRecived = await RequestEntitie.find({ reciverUserId: item.userId, status: { $ne: RequestStatus.Accept } });

            let deleteManyRecivedRequest = await this.DeleteRecivedRequest(findAllUseRecived);

            if (request) {
                let setNotification = await unitOfWork.NotificationRepository.SetNotification
                    (NotificationType.AcceptRequest,
                        request.senderUserId,
                        request.reciverUserId);

                if (setNotification.success) {
                    await RedisManager.Set(RedisKey.RequestByTravelId + item.requestId, request);
                    return OperationResult.BuildSuccessResult("Success Add Travel Reuqest", true);
                }

                return OperationResult.BuildFailur(setNotification.message);
            }

            if (!deleteManyRecivedRequest.success) {
                return OperationResult.BuildFailur(deleteManyRecivedRequest.message);
            }

            // await RedisManager.ResetSingleItem(RedisKey.RequestByTravelId + item.requestId, request);
            return OperationResult.BuildSuccessResult("Success Confirm Reuqest", true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async RejectRequest(item: UpdateStatusRequestModel): Promise<OperationResult<boolean>> {
        try {
            console.log(item)
            let request = await RequestEntitie.findByIdAndUpdate({ _id: item.requestId },
                {
                    $set: {
                        status: item.status
                    }
                });


            if (request) {
                let setNotification = await unitOfWork.NotificationRepository.SetNotification
                    (NotificationType.RejectNotification,
                        request.senderUserId,
                        request.reciverUserId);

                if (setNotification.success) {
                    await RedisManager.Set(RedisKey.RequestByTravelId + item.requestId, request);
                    return OperationResult.BuildSuccessResult("Success Add Travel Reuqest", true);
                }

                return OperationResult.BuildFailur(setNotification.message);
            }

            // await RedisManager.ResetSingleItem(RedisKey.RequestByTravelId + item.requestId, request);
            return OperationResult.BuildSuccessResult("Success Confirm Reuqest", true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async DeleteRequest(requestId: string): Promise<OperationResult<boolean>> {
        try {

            let request = await RequestEntitie.findOneAndDelete({ _id: requestId });

            await RedisManager.Remove(RedisKey.RequestByTravelId + requestId);
            return OperationResult.BuildSuccessResult("Success Delete Reuqest", true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async DeleteRecivedRequest(requests: IRequestDoc[]): Promise<OperationResult<boolean>> {
        try {
            let ids: string[] = [];
            requests.map(res => {
                ids.push(res.id)
            })
            let request = await RequestEntitie.deleteMany({ _id: ids });

            return OperationResult.BuildSuccessResult("Success Delete Many Reuqest", true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async GetAllReciveRequest(reciverId: string): Promise<OperationResult<GetAllUserIdModel[]>> {
        try {

            let getAll: GetAllUserIdModel[] = [];

            let requestFind = await RequestEntitie.
                find({ reciverUserId: reciverId })
                .populate({
                    path: "requestId",
                    populate: [
                        {
                            path: "userId"
                        },
                        {
                            path: "travelType"
                        },
                        {
                            path: "travelResidence"
                        }
                    ],

                });

            const mapLoop = async () => {

                const get = requestFind.map(async (res) => {

                    // let request = await UnitOfWork.RequestRepository.GetRequestById(res.id);
                    // console.log(request.result)
                    return getAll.push({
                        budget: res.requestId.budget,
                        city: res.requestId.city,
                        country: res.requestId.country,
                        description: res.requestId.description,
                        endDate: res.requestId.endDate,
                        id: res.id,
                        lookingfor: res.requestId.lookingfor,
                        requestId: res.id,
                        reqId: res.id,
                        startDate: res.requestId.startDate,
                        status: res.status,
                        mustConfirm: res.status === RequestStatus.Pendding ? true : false,
                        travelesidenceId: res.requestId.travelResidence.id,
                        firstName: res.requestId.userId.firstName,
                        lastName: res.requestId.userId.lastName,
                        owner: reciverId === res.requestId.userId.id ? true : false,
                        travelResidentIcon: res.requestId.travelResidence.icon,
                        travelResidentName: res.requestId.travelResidence.name,
                        travelTypeIcon: res.requestId.travelType.icon,
                        travelTypeId: res.requestId.travelType.id,
                        travelTypeName: res.requestId.travelType.name,
                        userId: res.requestId.userId.id
                    })
                });

                const numFruits = await Promise.all(get);
            }

            await mapLoop();

            if (requestFind) {
                return OperationResult.BuildSuccessResult("Find", getAll);
            }
            return OperationResult.BuildFailur("can not Find");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async GetAllMyRequest(senderId: string): Promise<OperationResult<GetAllUserIdModel[]>> {
        try {

            let getAll: GetAllUserIdModel[] = [];

            let requestFind = await RequestEntitie.
                find({ senderUserId: senderId })
                .populate({
                    path: "requestId",
                    populate: [
                        {
                            path: "userId"
                        },
                        {
                            path: "travelType"
                        },
                        {
                            path: "travelResidence"
                        }
                    ],

                });

            const mapLoop = async () => {

                const get = requestFind.map(async (res) => {

                    // let request = await UnitOfWork.RequestRepository.GetRequestById(res.id);
                    // console.log(request.result)
                    return getAll.push({
                        budget: res.requestId.budget,
                        city: res.requestId.city,
                        country: res.requestId.country,
                        description: res.requestId.description,
                        endDate: res.requestId.endDate,
                        id: res.id,
                        lookingfor: res.requestId.lookingfor,
                        requestId: res.id,
                        reqId: res.id,
                        startDate: res.requestId.startDate,
                        status: res.status,
                        mustConfirm: false,
                        travelesidenceId: res.requestId.travelResidence.id,
                        firstName: res.requestId.userId.firstName,
                        lastName: res.requestId.userId.lastName,
                        owner: true,
                        travelResidentIcon: res.requestId.travelResidence.icon,
                        travelResidentName: res.requestId.travelResidence.name,
                        travelTypeIcon: res.requestId.travelType.icon,
                        travelTypeId: res.requestId.travelType.id,
                        travelTypeName: res.requestId.travelType.name,
                        userId: res.requestId.userId.id
                    })
                });

                const numFruits = await Promise.all(get);
            }

            await mapLoop();

            if (requestFind) {
                return OperationResult.BuildSuccessResult("Find", getAll);
            }
            return OperationResult.BuildFailur("can not Find");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async GetAllUserRequests(userId: string): Promise<OperationResult<GetAllUserIdModel[]>> {
        try {

            let getAll: GetAllUserIdModel[] = [];

            let requestFind = await RequestEntitie.
                find({ $or: [{ reciverUserId: userId }, { senderUserId: userId }] })
                .populate([{
                    path: "requestId",
                    populate: [
                        {
                            path: "userId"
                        },
                        {
                            path: "travelType"
                        },
                        {
                            path: "travelResidence"
                        }
                    ]
                },
                {
                    path: "targetRequestId",
                    populate: [
                        {
                            path: "userId"
                        },
                        {
                            path: "travelType"
                        },
                        {
                            path: "travelResidence"
                        }
                    ]
                },
                {
                    path: "senderUserId",
                },
                {
                    path: "reciverUserId"
                }
                ]);
            const mapLoop = async () => {

                const get = requestFind.map(async (res) => {

                      let youSendRequest = userId === res.senderUserId.id ? true : false;

                    return getAll.push({
                        budget: youSendRequest ? res.targetRequestId.budget : res.requestId.budget,
                        city: youSendRequest ? res.targetRequestId.city : res.requestId.city,
                        country: youSendRequest ? res.targetRequestId.country : res.requestId.country,
                        description: youSendRequest ? res.targetRequestId.description : res.requestId.description,
                        endDate: youSendRequest ? res.targetRequestId.endDate : res.requestId.endDate,
                        id: res.id,
                        lookingfor: youSendRequest ? res.targetRequestId.lookingfor : res.requestId.lookingfor,
                        requestId: res.id,
                        reqId: res.id,
                        startDate: youSendRequest ? res.targetRequestId.startDate : res.requestId.startDate,
                        status: res.status,
                        mustConfirm: youSendRequest?false: res.status=== RequestStatus.Pendding?true:false,
                        travelesidenceId: youSendRequest ? res.targetRequestId.travelResidence.id : res.requestId.travelResidence.id,
                        firstName: youSendRequest ? res.targetRequestId.userId.firstName : res.requestId.userId.firstName,
                        lastName: youSendRequest ? res.targetRequestId.userId.lastName : res.requestId.userId.lastName,
                        owner: res.reciverUserId.id !== userId,
                        travelResidentIcon: youSendRequest ? res.targetRequestId.travelResidence.lastName : res.requestId.travelResidence.lastName,
                        travelResidentName: youSendRequest ? res.targetRequestId.travelResidence.lastName : res.requestId.travelResidence.lastName,
                        travelTypeIcon: youSendRequest ? res.targetRequestId.travelResidence.lastName : res.requestId.travelResidence.lastName,
                        travelTypeId: youSendRequest ? res.targetRequestId.travelResidence.lastName : res.requestId.travelResidence.lastName,
                        travelTypeName: youSendRequest ? res.targetRequestId.travelResidence.lastName : res.requestId.travelResidence.lastName,
                        userId: youSendRequest ? res.reciverUserId.id : res.senderUserId.id
                    })
                });

                const numFruits = await Promise.all(get);
            }

            await mapLoop();

            if (requestFind) {
                return OperationResult.BuildSuccessResult("Find", getAll);
            }
            return OperationResult.BuildFailur("can not Find");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

}
