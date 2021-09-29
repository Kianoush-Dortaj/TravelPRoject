
import mongoose from 'mongoose';
import { INotificationAttrs } from './INotificationAttrs';
import { INotificationDoc } from './INotificationDoc';

export interface INotificationModel extends mongoose.Model<INotificationDoc> {
    build(roleAttrs: INotificationAttrs): INotificationDoc;
}