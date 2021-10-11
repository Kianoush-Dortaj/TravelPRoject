
import WebSocket from 'ws';
import { UserOnlineModel } from '../../DTO/Websocket/UserOnineModel';
import { SendData } from './model/send-data';
import { Listen } from './Pattern/listen-chanel';
import { ListenType } from './Pattern/listen-type';

export default class Websocket {

    wss: WebSocket.Server;
    userOnlineInfo: any[] = [];

    constructor() {
        this.wss = new WebSocket.Server({ port: 3256 })
    }

    InitialWebsocket(): void {

        const functions = this;

        this.wss.on('connection', function connection(ws) {

            ws.on('message', function incoming(message) {

                functions.listen(message.toString(), ws);

            });

        });

        this.wss.addListener('request', (message, userId) => {
            functions.userOnlineInfo[userId].send(message);
        })

    }

    emit(msg: string): void {
        this.wss.clients.forEach(client => {
            client.send(msg);
        })
    }

    sendToUser<T>(userId: string, data: T) {

    }

    sendMessageToUser<T>(message: SendData<T> , sendTo:string): void {


        try {

            const msg = JSON.stringify(message);
            this.wss.emit('request', msg, sendTo);

        } catch (error) {
            console.log(error)
        }


    }

    listen(type: any, ws?: any): void {

        const msg = JSON.parse(type);

        if (msg.type === ListenType.Initial) {

            const userOnlie = this.userOnlineInfo.find(x => x.userId === msg.userId);

            if (!userOnlie) {
                this.userOnlineInfo[msg.userId] = ws;
            }
        }
        new Listen(msg.type).listen();

    }

}