import { Gender } from 'src/app/shared/models/gender.enum';

export interface GetPersonalInfoModel {
    id:number;
    avatar: any;
    birthDateUtc: string;
    isDeleted:boolean;
    userName:string;
    hasAvatar:boolean;
    name: string;
    personalVerified:boolean;
    gender: Gender;
    family: string;
    phoneNumber: string;
    forexExperience:number;
    phoneNumberConfirmed:boolean;
    tradToolRefId:number;
}