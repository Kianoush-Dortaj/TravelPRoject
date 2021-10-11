import { WebsocketType } from "./websocket-type";

export interface InitialWebsocket {
    type: WebsocketType,
    userId: string;
}