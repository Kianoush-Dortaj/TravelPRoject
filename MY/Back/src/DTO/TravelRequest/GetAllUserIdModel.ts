import { ITravelResidenceAttr } from "../../DataLayer/Context/Travelresidence/ITravelResidenceAttr";
import { ITravelTypeAttr } from "../../DataLayer/Context/TravelType/ITravelTypeAttr";
import { Gender } from "../../DataLayer/Context/User/Gender"
import { IUserAttrs } from "../../DataLayer/Context/User/IUserAttr";

export interface GetAllUserIdModel {
    travelTypeId: string;
    travelesidenceId: string;
    userId: string;
    owner:boolean;
    startDate: Date;
    endDate: Date;
    country: string;
    lookingfor: Gender;
    description: string;
    city: string;
    id: string;
    requestId: string;
    firstName: string;
    lastName: string;
    travelTypeName: string;
    travelTypeIcon: string;
    travelResidentName: string;
    travelResidentIcon: string;
    budget: number;
}