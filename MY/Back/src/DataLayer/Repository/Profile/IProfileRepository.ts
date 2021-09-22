import OperationResult from "../../../core/Operation/OperationResult";


export interface IProfileRepository {
    UploadProfileAvatar(userId: string, file: any): Promise<OperationResult<boolean>>;
    GetUserAvatar(userId: string): Promise<OperationResult<any>>;
    UploadProfilePoster(userId: string, file: any): Promise<OperationResult<boolean>>;
    GetUserPoster(userId: string): Promise<OperationResult<any>>;
}