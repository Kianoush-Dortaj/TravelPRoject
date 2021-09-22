import { ITravelRequestAttr } from "./ITravelRequestAttr";
import { ITravelRequestDoc } from "./ITravelRequestDoc";
import mongoose from "mongoose";

export interface ITravelRequestModel extends mongoose.Model<ITravelRequestDoc> {
    build(travelRequestAttr: ITravelRequestAttr): ITravelRequestDoc;
}
