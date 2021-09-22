import { Gender } from 'src/app/shared/models/gender.enum';

export interface AddManagerModel {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    roleList: number[];
    gender: number;
    countryRefId: number;
    phoneNumber: string;
}