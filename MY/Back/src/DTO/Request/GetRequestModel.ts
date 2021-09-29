import { RequestStatus } from "../../DataLayer/Context/Request/RequestStatus";

export interface GetRequestModel {
    id?:string;
    senderUserId: string;
    reciverUserId: string;
    requestId: string;
    targetRequestId: string;
    status: RequestStatus;
    createDate: Date;
}