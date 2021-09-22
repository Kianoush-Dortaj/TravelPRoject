export interface SendMessageModel{
  message: string;
  sender: string;
  reciver: string;
  read: boolean;
  connectinoId:string;
  userId:string;
  sendDate: Date;
}
