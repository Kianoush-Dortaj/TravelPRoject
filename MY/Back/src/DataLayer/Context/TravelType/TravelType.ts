import UniqueString from 'unique-string';
import { Schema, model, Document } from 'mongoose';
import { ITravelTypeDocK } from './ITravelTypeDock';
import { ITravelTypeModel } from './ITravelTypeModel';


const TravelTypeSchema = new Schema({
    name: { type: String, require: true },
    icon: { type: String, require: true }
}, {
    toJSON: { virtuals: true }
});

TravelTypeSchema.virtual("travelRequestId", {
    foreignField: "travelRequestId",
    ref: "TravelRequest",
    localField: "travelRequestId"
})

export const TravelTypeEntitie = model<ITravelTypeDocK, ITravelTypeModel>("TravelType", TravelTypeSchema)