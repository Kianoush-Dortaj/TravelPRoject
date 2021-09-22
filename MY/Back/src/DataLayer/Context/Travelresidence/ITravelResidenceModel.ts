import { ITravelResidenceAttr } from "./ITravelResidenceAttr";
import { ITravelResidenceDocK } from "./ITravelResidenceDock";
import mongoose from 'mongoose';

export interface ITravelResidenceModel extends mongoose.Model<ITravelResidenceDocK> {
    build(travelResidenceAttr: ITravelResidenceAttr): ITravelResidenceDocK;
}
