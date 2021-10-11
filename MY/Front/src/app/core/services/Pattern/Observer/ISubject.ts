import { IObserver } from "./IObserver";
import {EventType} from './event-type';

 export  interface ISubject {

    attach(observer: IObserver): void;

    detach(observer: IObserver): void;

    notify(eventTypr: EventType, data: any): void;
}