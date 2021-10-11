
import OperationResult from "../../../core/Operation/OperationResult";
import { INotificationRepository } from "./INotificationRepository";
import { NotificationEntitie } from "../../Context/Notification/Notification";
import { NotificationType } from "../../Context/Notification/NotificationType";
import { GetAllUnSeenNotificationbyUserIdModel } from "../../../DTO/Notification/GetAllUnSeenNotificationbyUserIdModel";
import { GetAllUnSeenNotificationModel } from "../../../DTO/Notification/GetAllUnSeenNotificationModel";
import websocket from "../../../Utilities/Websocket/Websocket";
import { NotificationSocketModel } from "../../../DTO/Websocket/notification-socket-model";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
import { ListenType } from "../../../Utilities/Websocket/Pattern/listen-type";


export class NotificationRepository implements INotificationRepository {

    async SetNotification(notificationType: NotificationType, reciverUserId: string, senderUserId: string): Promise<OperationResult<boolean>> {

        try {

            let notification = await NotificationEntitie.build({
                createDate: new Date(),
                notificationType: notificationType,
                reciverUserId: reciverUserId,
                isSeen: false,
                senderUserId: senderUserId
            });


            await notification.save();

            await this.SendSocketNotification(notification.id);
            return OperationResult.BuildSuccessResult("Success Add Notification", true)

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message)
        }

    }

    async SeenNotification(notifId: string, userId: string): Promise<OperationResult<boolean>> {

        try {

            await NotificationEntitie.updateOne({
                reciverUserId: userId,
                _id: notifId
            }, {
                $set: {
                    isSeen: true
                }
            });


            return OperationResult.BuildSuccessResult("Success Add Notification", true)

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message)
        }

    }

    async GetUnseenNotificationByUserId(userId: string): Promise<OperationResult<GetAllUnSeenNotificationbyUserIdModel[]>> {

        try {

            let getAll: GetAllUnSeenNotificationbyUserIdModel[] = [];

            let getAllNotification = await NotificationEntitie
                .find({ isSeen: false, reciverUserId: userId })
                .populate("senderUserId");

            getAllNotification.map(res => {
                getAll.push({
                    id: res.id,
                    notificationType: res.notificationType,
                    senderId: res.senderUserId.id,
                    senderName: res.senderUserId.firstName + ' ' + res.senderUserId.lastName
                });
            });

            return OperationResult.BuildSuccessResult("Get All UnSeen Notification", getAll);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message)
        }

    }

    async GetAllNotification(userId: string): Promise<OperationResult<GetAllUnSeenNotificationModel[]>> {

        try {

            let getAll: GetAllUnSeenNotificationModel[] = [];

            let getAllNotification = await NotificationEntitie
                .find({ reciverUserId: userId })
                .populate("senderId");

            getAllNotification.map(res => {
                getAll.push({
                    id: res.id,
                    notificationType: res.notificationType,
                    senderId: res.senderUserId.id,
                    isSeen: res.isSeen,
                    senderName: res.senderUserId.firstName + ' ' + res.senderUserId.lastName
                });
            });

            return OperationResult.BuildSuccessResult("Get All UnSeen Notification", getAll);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message)
        }

    }

    async SendSocketNotification(notificationId: string): Promise<OperationResult<boolean>> {

        try {


            let getNotification = await NotificationEntitie.
                findById(notificationId)
                .populate("senderUserId");

            if (getNotification) {
                UnitOfWork.websocket.sendMessageToUser<NotificationSocketModel>({
                    message: {
                        id: getNotification.id,
                        notificationType: getNotification.notificationType,
                        senderId: getNotification.senderUserId.id,
                        senderName: getNotification.senderUserId.firstName + ' ' + getNotification.senderUserId.lastName
                    },
                    type: ListenType.Request
                }, getNotification.reciverUserId);

                return OperationResult.BuildSuccessResult("send notification", true);

            }

            return OperationResult.BuildFailur("can not find Item");


        } catch (error: any) {
            return OperationResult.BuildFailur(error.message)
        }

    }


}
