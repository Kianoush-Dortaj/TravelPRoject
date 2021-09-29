
import mongoose from 'mongoose';
import { IRequestAttrs } from './IRequestAttrs';
import { IRequestDoc } from './IRequestDoc';

export interface IRequestModel extends mongoose.Model<IRequestDoc> {
    build(roleAttrs: IRequestAttrs): IRequestDoc;
}