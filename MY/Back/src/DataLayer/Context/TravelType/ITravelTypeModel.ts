import { ITravelTypeAttr } from "./ITravelTypeAttr";
import { ITravelTypeDocK } from "./ITravelTypeDock";
import mongoose from 'mongoose';

export interface ITravelTypeModel extends mongoose.Model<ITravelTypeDocK> {
    build(travelTypeAttr: ITravelTypeAttr): ITravelTypeDocK;
}
