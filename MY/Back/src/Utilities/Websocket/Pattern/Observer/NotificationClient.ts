
import { IObserver } from "./IObserver";
import { ISubject } from "./ISubject";
import { Observable } from "./Observable";

export class NotificationClient implements IObserver {

    public update(info: string): void {

        console.log('Notification: Reacted to the event.', info);

    }

}