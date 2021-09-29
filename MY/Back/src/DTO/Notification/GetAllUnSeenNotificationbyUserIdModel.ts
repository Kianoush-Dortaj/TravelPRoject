import { NotificationType } from "../../DataLayer/Context/Notification/NotificationType";

export interface GetAllUnSeenNotificationbyUserIdModel {
    id: string;
    notificationType: NotificationType;
    senderId: string;
    senderName: string;
}