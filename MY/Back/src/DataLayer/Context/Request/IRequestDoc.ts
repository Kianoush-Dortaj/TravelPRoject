import mongoose from 'mongoose';
import { ITravelRequestAttr } from '../TravelRequest/ITravelRequestAttr';
import { RequestStatus } from './RequestStatus';

export interface IRequestDoc extends mongoose.Document {
    senderUserId: any;
    reciverUserId: any;
    requestId: any;
    targetRequestId:any;
    status: RequestStatus;
    createDate:Date;
}