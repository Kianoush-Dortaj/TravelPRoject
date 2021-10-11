import { NotificationType } from "../../DataLayer/Context/Notification/NotificationType";

export interface NotificationSocketModel {
    id: string;
    notificationType: NotificationType;
    senderId: string;
    senderName: string;
}