import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as config from "config";
import { createExpressServer, useContainer as routingUseContainer } from "routing-controllers";
import { Container } from "typedi";
import { Connection, createConnection, useContainer as ormUseContainer } from "typeorm";
import * as express from "express";
import * as log4js from "log4js";
import * as path from "path";
// controllers
import { HomeController } from "./controllers/Home.controller";
import { AuthController } from "./controllers/Auth.controller";
import { UsersController } from "./controllers/Users.controller";

class App {

    public express: express.Application;
    public logger: any = null;
    private controllers: any[] = [HomeController, UsersController, AuthController];
    private middlewares: express.RequestHandler[] = [
        log4js.connectLogger(this.getLoggers(), { format: config.get("logs.format") }),
        bodyParser.json(),
        bodyParser.urlencoded({extended: false})
    ];

    constructor() {
        routingUseContainer(Container);
        ormUseContainer(Container);
        // DB
        // TODO : put this into a separate function and put the strings into the config files
        createConnection({
            name: "default",
            driver: {
                type: "postgres",
                host: "gjdass.fr",
                port: 5432,
                username: "whiteapi-express-ts",
                password: "whiteapi-express-ts",
                database: "whiteapi-express-ts",
            },
            entities: [
                path.join(path.normalize(__dirname), path.normalize("models/User.model.js"))
            ],
            autoSchemaSync: true,
        });
        // create the express server with proper configuration
        this.express = createExpressServer({
            routePrefix: "/api/v1",
            controllers: this.controllers
        });
        this.express.use(this.middlewares);
    }

    private getLoggers(): log4js.Logger {
        log4js.configure(path.join("config/log4js", config.get("logs.log4js-config") as string));
        return log4js.getLogger();
    }

}

export default new App().express;
