import { IUserRoleDoc } from "../UserRole/IUserRoleDock";
import { Gender } from "./Gender";

export interface IUserAttrs {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
    isAdmin: boolean;
    confirmEmail:boolean;
    isActive: boolean;
    poster?:string;
    nationalId?: string;
    avatar?: string;
    towFactorEnabled:boolean;
    gender: Gender;
    userRole?:IUserRoleDoc[];
    birthDate?: Date;
    locked: boolean;
    lockedDate?: Date;
    accountFail: number;
    password: string;
    securityStamp: string;
}