import { Gender } from "../User/Gender";

export interface ITravelRequestAttr {
    travelType: string;
    travelResidence: string;
    country: string;
    userId:string;
    city: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    lookingfor: Gender;
    description: string;
    createDate: Date;
}