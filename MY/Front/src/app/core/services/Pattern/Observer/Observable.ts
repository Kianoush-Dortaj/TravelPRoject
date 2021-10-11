import { EventType } from "./event-type";
import { IObserver } from "./IObserver";
import { ISubject } from "./ISubject";
import { NotificationClient } from "./NotificationClient";
import { RequestClient } from "./RequestClient";

export class Observable implements ISubject {

    public state!: number;
    private notificationClient: NotificationClient[] = [];
    private requestClient: RequestClient[] = [];

    private observers: IObserver[] = [];

    constructor() {

    }



    updateRequest(info: any): void {
        this.notify(EventType.ChangeRequest, info);
    }

    updateNotification(info: any): void {

        this.notify(EventType.ChangeRequest, info);
    }



    public attach(observer: IObserver): IObserver {

        if (observer instanceof RequestClient) {

            // const isExist = this.requestClient.includes(observer);
            // if (isExist) {
            //     return;
            // }

            this.requestClient.push(observer);
            return observer;
        }

        if (observer instanceof NotificationClient) {

            // const isExist = this.notificationClient.includes(observer);

            // if (isExist) {
            //     return;
            // }

            this.notificationClient.push(observer);
            return observer;
        }

    }



    public detach(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);

        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
    }



    public notify(eventType: EventType, data: any): void {

        switch (eventType) {
            case EventType.ChangeRequest:
                console.log( this.requestClient)
                this.requestClient.forEach(result => {
                    result.update(data);
                })
                break;
            case EventType.Notification:
                this.notificationClient.forEach(result => {
                    result.update(data);
                })
                break;
            default:
                break;

        }
    }


    public someBusinessLogic(): string {

        return 'kia';
    }

}