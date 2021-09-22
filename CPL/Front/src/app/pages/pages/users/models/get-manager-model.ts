import { ShareModel } from 'src/app/shared/models/share-model';

export interface GetManagerModel extends ShareModel {
    fullName: string;
    hasAvatar: boolean;
    lastLoggedIn:string;
    id: number;
    isActive: boolean;
    rowIsAuthentic: boolean;
    userName: string;
}