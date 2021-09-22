
import { Schema, model, Document } from 'mongoose';
import { ITravelRequestAttr } from './ITravelRequestAttr';
import { ITravelRequestDoc } from './ITravelRequestDoc';
import { ITravelRequestModel } from './ITravelRequestModel';

const TravelRequestSchema = new Schema({
    travelType: { type: Schema.Types.ObjectId, ref: "TravelType", require: true },
    travelResidence: { type: Schema.Types.ObjectId, ref: "TravelResidence", require: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
    country: { type: String, require: true },
    city: { type: String, require: true },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
    budget: { type: Number, require: true },
    isDelete: { type: Boolean, default: false },
    lookingfor: { type: String, require: true },
    description: { type: String, require: true },
    createDate: { type: Date, require: true }
}, {
    toJSON: { virtuals: true }
});

TravelRequestSchema.statics.build = (attrs: ITravelRequestAttr) => {
    return new TravelRequestEntitie(attrs);
}


export const TravelRequestEntitie = model<ITravelRequestDoc, ITravelRequestModel>("TravelRequest", TravelRequestSchema)