import { RequestStatus } from "../../DataLayer/Context/Request/RequestStatus";

export interface UpdateStatusRequestModel {
    userId:string;
    requestId: string;
    status: RequestStatus;
}