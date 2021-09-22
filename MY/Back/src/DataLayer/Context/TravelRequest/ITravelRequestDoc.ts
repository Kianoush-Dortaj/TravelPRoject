import mongoose from "mongoose";
import { ITravelResidenceAttr } from "../Travelresidence/ITravelResidenceAttr";
import { ITravelTypeAttr } from "../TravelType/ITravelTypeAttr";
import { Gender } from "../User/Gender";
import { IUserAttrs } from "../User/IUserAttr";

export interface ITravelRequestDoc extends mongoose.Document {
    travelType: any;
    travelResidence: any;
    country: string;
    userId: any;
    city: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    lookingfor: Gender;
    description: string;
    createDate: Date;
}