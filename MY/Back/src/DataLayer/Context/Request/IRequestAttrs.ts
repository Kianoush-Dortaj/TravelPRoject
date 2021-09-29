import { RequestStatus } from "./RequestStatus";

export interface IRequestAttrs {
    senderUserId: string;
    reciverUserId: string;
    requestId: string;
    targetRequestId:string;
    status: RequestStatus;
    createDate: Date;
}