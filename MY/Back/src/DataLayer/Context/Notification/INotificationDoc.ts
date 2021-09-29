import { NotificationType } from "./NotificationType";
import mongoose from 'mongoose';

export interface INotificationDoc extends mongoose.Document {

    senderUserId: any;
    reciverUserId: any;
    isSeen:boolean;
    notificationType: NotificationType;
    createDate: Date;

}