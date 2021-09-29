import { RequestStatus } from "./request-status-enum";

export interface SendRequest {
  reciverUserId: string;
  requestId: string;
  targetRequestId:string;
  status: RequestStatus;
}
