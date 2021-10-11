import { ListenType } from "../Pattern/listen-type";

export interface SendData<T> {

    type: ListenType;
    message: T;


}