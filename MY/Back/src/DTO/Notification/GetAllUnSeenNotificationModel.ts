import { NotificationType } from "../../DataLayer/Context/Notification/NotificationType";

export interface GetAllUnSeenNotificationModel {
    id: string;
    notificationType: NotificationType;
    senderId: string;
    senderName: string;
    isSeen:boolean;
}