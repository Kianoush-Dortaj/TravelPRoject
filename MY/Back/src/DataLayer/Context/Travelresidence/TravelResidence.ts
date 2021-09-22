import UniqueString from 'unique-string';
import { Schema, model, Document } from 'mongoose';
import { ITravelResidenceDocK } from './ITravelResidenceDock';
import { ITravelResidenceModel } from './ITravelResidenceModel';

const TravelResidenceSchema = new Schema({
    name: { type: String, require: true },
    icon: { type: String, require: true }
}, {
    toJSON: { virtuals: true }
});

TravelResidenceSchema.virtual("travelRequestId", {
    foreignField: "travelRequestId",
    ref: "TravelRequest",
    localField: "travelRequestId"
})

export const TravelResidenceEntitie = model<ITravelResidenceDocK, ITravelResidenceModel>("TravelResidence", TravelResidenceSchema)