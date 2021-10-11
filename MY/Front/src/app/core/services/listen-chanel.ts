import { NotificationClient } from "./Pattern/Observer/NotificationClient";
import { Observable } from "./Pattern/Observer/Observable";
import { RequestClient } from "./Pattern/Observer/RequestClient";
import { ListenType } from "./listen-type";
import { Injectable } from "@angular/core";
import { IObserver } from "./Pattern/Observer/IObserver";

    export default new class Listen {

        observable: Observable;

        notificationClient: NotificationClient;
        requestClient: RequestClient;

        constructor() {



        }

        Inital(): void {
            this.observable = new Observable();

            this.requestClient = new RequestClient();
            this.notificationClient = new NotificationClient();

            this.observable.attach(this.requestClient);
            this.observable.attach(this.notificationClient);

        }

        Attach<T extends IObserver>(client: T): IObserver {
            return this.observable.attach(client);
        }

        listen(type: ListenType) {

            switch (type) {
                case ListenType.Notification:
                    this.observable.updateNotification('Update Notification');
                    break;

                case ListenType.Request:
                    this.observable.updateRequest('Update Request');
                    break;

                default:
                    break;


            }
        }


    }