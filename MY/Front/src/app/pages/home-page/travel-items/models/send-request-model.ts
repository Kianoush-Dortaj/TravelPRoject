import { RequestStatus } from "./request-status-enum";

export interface SendRequest {
  sender: string;
  reciver: string;
  requestId: string;
  status: RequestStatus;
  targetRequestId:string;
  sendDate: Date;
}
