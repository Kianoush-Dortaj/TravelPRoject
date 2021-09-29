import mongoose from 'mongoose';
import uniqueString from 'unique-string';
import { Schema } from 'mongoose';
import { NotificationType } from './NotificationType';
import { INotificationAttrs } from './INotificationAttrs';
import { INotificationModel } from './INotificationModel';
import { INotificationDoc } from './INotificationDoc';

const NotificationSchema = new mongoose.Schema({
    senderUserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    reciverUserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    isSeen: {
        type: Boolean,
        require: true,
        default: false
    },
    notificationType: {
        type: NotificationType,
        require: true
    },
    createDate: { type: Date, require: true }

}, {
    toJSON: { virtuals: true },
})


NotificationSchema.statics.build = (attrs: INotificationAttrs) => {
    return new NotificationEntitie(attrs);
}


const NotificationEntitie = mongoose.model<INotificationDoc, INotificationModel>("Notification", NotificationSchema);

export { NotificationEntitie }