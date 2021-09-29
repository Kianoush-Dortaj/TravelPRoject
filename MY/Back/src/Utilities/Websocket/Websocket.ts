
import WebSocket from 'ws';

export default new class Webocket {

    wss: WebSocket.Server;

    constructor() {
        this.wss = new WebSocket.Server({ port: 3256 })
    }

    InitialWebsocket(): void {

        this.wss.on('connection', function (ws: WebSocket) {

            ws.on('message', function(msg: string) {
                console.log('in socket')
             this.send(msg)
            })
            ws.send('connected');
        })
    }

    emit(msg:string):void {
        this.wss.clients.forEach(client=>{
        client.send(msg);
        })
    }

}