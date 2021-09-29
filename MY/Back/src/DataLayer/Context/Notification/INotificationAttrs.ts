import { NotificationType } from "./NotificationType";

export interface INotificationAttrs {

    senderUserId: string;
    reciverUserId: string;
    notificationType: NotificationType;
    createDate: Date;
    isSeen: boolean;

}