import mongoose from 'mongoose';
import { ITravelRequestAttr } from '../TravelRequest/ITravelRequestAttr';
import { RequestStatus } from './RequestStatus';

export interface IRequestDoc extends mongoose.Document {
    senderUserId: string;
    reciverUserId: string;
    requestId: any;
    targetRequestId:string;
    status: RequestStatus;
    createDate:Date;
}