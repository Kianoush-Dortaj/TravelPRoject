import { ShareModel } from 'src/app/shared/models/share-model';

export interface GetAllManagerModel extends ShareModel{
    fullName: string;
    hasAvatar: boolean;
    lastLoggedIn:string;
    lastRequestDate:string;
    id: number;
    isActive: boolean;
    rowIsAuthentic: boolean;
    userName: string;
}