

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, timer, Subject, EMPTY } from 'rxjs';
import { retryWhen, tap, delayWhen, switchAll, catchError } from 'rxjs/operators';

import { ListenType } from './listen-type';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    ws!: WebSocket;
    socketIsOpen = 1;
    socket!: Observable<any>;

    // Emit Data From Server
    createObservableSocket(url: string): Observable<any> {
        this.ws = new WebSocket(url);

        this.socket = new Observable(observer => {
            this.ws.onmessage = (event: any) => {
                observer.next(event)
            };

            this.ws.onerror = (event: any) => observer.error(event);

            this.ws.onclose = (event: any) => observer.complete();

            // Call After Unsubscribe
            return () => this.ws.close(1000, "this user disconnected");
        })

        return this.socket;
    }

    // Send Message To Server
    sendMessage<T>(message: T): string {
        if (this.ws.readyState === this.socketIsOpen) {
           const msg =  JSON.stringify(message);
            this.ws.send(msg);
            return `Sent to Server ${message}`;
        } else {
            return 'Message was not sent - the socket is Closed';
        }
    }
}