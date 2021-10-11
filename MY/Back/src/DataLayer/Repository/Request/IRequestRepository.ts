import OperationResult from "../../../core/Operation/OperationResult";
import { ChangeStatusRequestModel } from "../../../DTO/Request/ChangeStatusRequestModel";
import { DeleteRequestModel } from "../../../DTO/Request/DeleteRequestModel copy";
import { GetAllUserSendRequestModel } from "../../../DTO/Request/GetAllUserSendRequestModel";
import { GetRequestModel } from "../../../DTO/Request/GetRequestModel";
import { UpdateStatusRequestModel } from "../../../DTO/Request/UpdateStatusRequestModel";
import { GetAllUserIdModel } from "../../../DTO/TravelRequest/GetAllUserIdModel";

export interface IRequestRepository {
    CreateRequest(item: ChangeStatusRequestModel): Promise<OperationResult<boolean>>;
    UpdateRequest(item: UpdateStatusRequestModel): Promise<OperationResult<boolean>>;
    GetRequestById(requestId: string): Promise<OperationResult<GetRequestModel>>;
    DeleteRequest(requestId: string): Promise<OperationResult<boolean>>;
    ConfirmRequest(item: UpdateStatusRequestModel): Promise<OperationResult<boolean>>
    RejectRequest(item: UpdateStatusRequestModel): Promise<OperationResult<boolean>>
    GetAllUserReciveRequest(reciverId: string): Promise<OperationResult<GetAllUserSendRequestModel[]>>;
    GetAllReciveRequest(reciverId: string): Promise<OperationResult<GetAllUserIdModel[]>>;
    GetAllMyRequest(senderId: string): Promise<OperationResult<GetAllUserIdModel[]>>;
    GetAllUserRequests(userId: string): Promise<OperationResult<GetAllUserIdModel[]>>;
}