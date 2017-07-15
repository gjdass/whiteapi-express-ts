import "reflect-metadata";
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from "typedi";
import { createConnection, Connection, useContainer as ormUseContainer } from "typeorm";
import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as jwtMiddleware from "express-jwt";
import * as jwt from "jsonwebtoken";
import * as config from "config";
import * as log4js from "log4js";
// controllers
import { HomeController } from './controllers/Home.controller';
import { AuthController } from './controllers/Auth.controller';
import { UsersController } from './controllers/Users.controller';

class App {
    
    public express: express.Application;
    public logger: any = null;
    private controllers: any[] = [HomeController, UsersController, AuthController];

    constructor() {
        useContainer(Container);
        ormUseContainer(Container);
        createConnection({
            name: "default",
            driver: {
                type: "postgres",
                host: "gjdass.fr",
                port: 5432,
                username: "whiteapi-express-ts",
                password: "whiteapi-express-ts",
                database: "whiteapi-express-ts"
            },
            entities: [
                path.join(path.normalize(__dirname), path.normalize("models/User.model.js"))
            ],
            autoSchemaSync: true
        });
        this.express = createExpressServer({
            controllers: this.controllers
        });
        this.buildLoggers();
        this.middleware();
    }

    private middleware(): void {
        // set logger
        if (this.logger)
            this.express.use(log4js.connectLogger(this.logger, { format: config.get('logs.format') }));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended:false}));
        this.express.use('/api/v1/*', jwtMiddleware({secret: config.get('jwt.secret'), getToken:this.getToken}));
    }

    private getToken(req: Request):string {
        return req.headers['authorization'];
    }

    private buildLoggers():void {
        log4js.configure(path.join('config/log4js', config.get('logs.log4js-config') as string));
        this.logger = log4js.getLogger();
    }

    private async connectToDb(): Promise<Connection> {
        return createConnection({
            name: "default",
            driver: {
                type: "postgres",
                host: "gjdass.fr",
                port: 5432,
                username: "whiteapi-express-ts",
                password: "whiteapi-express-ts",
                database: "whiteapi-express-ts"
            },
            entities: [
                path.join(path.normalize(__dirname), path.normalize("models/User.model.js"))
            ],
            autoSchemaSync: true
        });
    }

}

export default new App().express;