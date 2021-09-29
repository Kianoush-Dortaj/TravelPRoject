import OperationResult from "../../../core/Operation/OperationResult";
import { GetAllUnSeenNotificationbyUserIdModel } from "../../../DTO/Notification/GetAllUnSeenNotificationbyUserIdModel";
import { GetAllUnSeenNotificationModel } from "../../../DTO/Notification/GetAllUnSeenNotificationModel";
import { NotificationType } from "../../Context/Notification/NotificationType";

export interface INotificationRepository {

    SetNotification(notificationType: NotificationType, reciverUserId: string, senderUserId: string): Promise<OperationResult<boolean>>;
    SeenNotification(notifId: string, userId: string): Promise<OperationResult<boolean>>;
    GetUnseenNotificationByUserId(userId: string): Promise<OperationResult<GetAllUnSeenNotificationbyUserIdModel[]>>;
    GetAllNotification(userId: string): Promise<OperationResult<GetAllUnSeenNotificationModel[]>>;

}