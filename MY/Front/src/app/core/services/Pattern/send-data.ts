import { ListenType } from './../listen-type';

export interface SendData<T> {

    type: ListenType;
    message: T;

}