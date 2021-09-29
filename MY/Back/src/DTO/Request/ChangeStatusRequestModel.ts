import { RequestStatus } from "../../DataLayer/Context/Request/RequestStatus";

export interface ChangeStatusRequestModel {
    senderUserId: string;
    reciverUserId: string;
    requestId: string;
    targetRequestId:string;
    status: RequestStatus;
    createDate:Date;
}

