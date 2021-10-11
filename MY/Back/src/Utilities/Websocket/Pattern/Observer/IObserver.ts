import { ISubject } from "./ISubject";

export interface IObserver {

    update(info : string): void;
}