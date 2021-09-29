import mongoose from 'mongoose';
import uniqueString from 'unique-string';
import { Schema } from 'mongoose';
import { RequestStatus } from './RequestStatus';
import { IRequestAttrs } from './IRequestAttrs';
import { IRequestDoc } from './IRequestDoc';
import { IRequestModel } from './IRequestModel';

const RequestSchema = new mongoose.Schema({
    senderUserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    requestId: {
        type: Schema.Types.ObjectId,
        ref: "TravelRequest",
        require: true
    },
    targetRequestId: {
        type: Schema.Types.ObjectId,
        ref: "TravelRequest",
        require: true
    },
    reciverUserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    status: {
        type: RequestStatus,
        require: true
    },
    createDate: { type: Date, require: true }

}, {
    toJSON: { virtuals: true },
})


RequestSchema.statics.build = (attrs: IRequestAttrs) => {
    return new RequestEntitie(attrs);
}


const RequestEntitie = mongoose.model<IRequestDoc, IRequestModel>("Request", RequestSchema);

export { RequestEntitie }