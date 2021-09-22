export interface GetAllFriendsList {
  connectionId: string;
  reciverInfo: string;
  senderInfo: string;
  youSend: boolean;
  userId: string;
  unreadMessagesCount: number;
  sednerId: string;
  istyping:boolean;
  sendDateLastMesage: Date,
  lastMessage: string;
  sendDate: string;
  reciverId: string;
}
