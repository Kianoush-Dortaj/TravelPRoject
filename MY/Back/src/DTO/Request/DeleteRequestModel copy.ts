import { RequestStatus } from "../../DataLayer/Context/Request/RequestStatus";

export interface DeleteRequestModel {
    requestId: string;
    targetRequestId: string;
    reciverUserId: string;
    senderUserId: string;
}