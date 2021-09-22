import express from 'express';
import router from './router/Router';
import { DatabaseType } from './DatabaseWrapper/DataBaseType';
import DatabaseWrapper from './DatabaseWrapper/DatabaseWrapper';
import RedisManager from './Utilities/Redis/RedisRepository';
import cros from 'cors';
import nodeMailer from './Utilities/Email/NodeMailer';
import Webocket from './Utilities/Websocket/Websocket';

export default new class Startup {
    app = express();
    port = process.env.PORT || 45852;

    constructor() {
        this.CreateServer();
        this.ConfigMidllware();
        this.ConfigDatabase();
    }

    /**
     * Run Server
     */
    CreateServer(): void {
        this.app.listen(this.port, () => {
            console.log(`Profile is listening on port ${this.port}`);
        })

        Webocket.InitialWebsocket();

    }
    /**
     * Config Midllware
     */
    ConfigMidllware(): void {
        this.app.use(express.json());
        this.app.use(cros())
        this.app.use(router);
        nodeMailer.Config();
    }
    /**
     * Config Database
     */
    ConfigDatabase(): void {
        new DatabaseWrapper(DatabaseType.MongoDBRegular).connect();
        RedisManager.Connet();
    }
}

