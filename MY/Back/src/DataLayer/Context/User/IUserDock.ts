import mongoose from 'mongoose';
import { IUserRoleDoc } from '../UserRole/IUserRoleDock';
import { Gender } from './Gender';

export interface IUserDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    isAdmin: boolean;
    isActive: boolean;
    confirmEmail:boolean;
    towFactorEnabled:boolean;
    nationalId: string;
    poster:string;
    avatar: string;
    gender: string;
    userRole: IUserRoleDoc[];
    birthDate: Date;
    locked: boolean;
    lockedDate: Date | undefined;
    accountFail: number;
    password: string;
    securityStamp: string;
}