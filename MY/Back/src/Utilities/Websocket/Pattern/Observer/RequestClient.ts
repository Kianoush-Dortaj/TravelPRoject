
import { IObserver } from "./IObserver";
import { ISubject } from "./ISubject";
import { Observable } from "./Observable";

export class RequestClient implements IObserver {

    public update(info:string): void {

        console.log('Request: Reacted to the event.',info);

    }



}