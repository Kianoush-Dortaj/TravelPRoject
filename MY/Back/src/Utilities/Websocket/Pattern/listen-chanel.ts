import { ListenType } from "./listen-type";
import { NotificationClient } from "./Observer/NotificationClient";
import { Observable } from "./Observer/Observable";
import { RequestClient } from "./Observer/RequestClient";

export class Listen {

    listenType: ListenType;
    notificationSubject: Observable;
    requestSubject: Observable;
    notificationClient: NotificationClient;
    requestClient: RequestClient;

    constructor(type: ListenType) {

        this.listenType = type;
        this.notificationSubject = new Observable();
        this.requestSubject = new Observable();

        this.notificationClient = new NotificationClient();
        this.notificationSubject.attach(this.notificationClient);

        this.requestClient = new RequestClient();
        this.requestSubject.attach(this.requestClient);
    }

    listen(): void {

        switch (this.listenType) {

            case ListenType.Initial:
                break;

            case ListenType.Notification:
                // this.notificationClient.someBusinessLogic();
                this.notificationSubject.notify();
                break;

            case ListenType.Request:
                // this.requestClient.someBusinessLogic();
                this.requestSubject.notify();
                break;

            default:
                break;


        }
    }


}