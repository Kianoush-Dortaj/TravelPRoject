
import { IObserver } from "./IObserver";
import { ISubject } from "./ISubject";
import { Observable } from "./Observable";

export class RequestClient implements IObserver {
    ffff: any;

    info:any;

    update(info: any): string {
        this.ffff = info;
        console.log(info)
        return this.info;
    }

}