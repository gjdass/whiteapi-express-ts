import "reflect-metadata";
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { container } from './ioc/ioc'
import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as jwtMiddleware from "express-jwt";
import * as jwt from "jsonwebtoken";
import * as config from "config";
import * as mongoose from "mongoose";
import * as log4js from "log4js";
// models
import { Error } from './models/Error.model';

class App {
    
    public express: express.Application;
    public logger: any = null;

    constructor() {
        let server = new InversifyExpressServer(container);

        this.connectToMongo();
        this.buildLoggers();
        this.middleware(server);

        this.express = server.build();
    }

    private middleware(server: InversifyExpressServer): void {
        // set logger
        server.setConfig(app => {
            if (this.logger)
                app.use(log4js.connectLogger(this.logger, { format: config.get('logs.format') }));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended:false}));
            app.use('/api/v1/*', jwtMiddleware({secret: config.get('jwt.secret'), getToken:this.getToken})); // protecting all the routes after
        });
        // set error fallback
        server.setErrorConfig((app) => {
            // catch errors
            app.use((err, req, res, next) => {
                if (err instanceof Error) {
                    res.status(err.httpCode).send(err);
                } else {
                    this.handleErrors(err, res);
                }
            });
            // finally catching 404 at the end
            app.use((req, res, next) => {
                res.status(404).send(new Error(404, 'Not found !'));
            });
        });
    }

    private getToken(req: Request):string {
        return req.headers['authorization'];
    }

    private buildLoggers():void {
        log4js.configure(path.join('config/log4js', config.get('logs.log4js-config') as string));
        this.logger = log4js.getLogger();
    }

    private connectToMongo():void {
        if (process.env.NODE_ENV == 'test') return;

        let username:string = config.get('mongo.username') as string;
        let password:string = config.get('mongo.password') as string;
        let hostname:string = config.get('mongo.hostname') as string;
        let port:string = config.get('mongo.port') as string;
        let db:string = config.get('mongo.db') as string;

        let uri:string = 'mongodb://' + (username != '' ? username + ':' + password + '@' : '') + hostname + ':' + port + '/' + db;

        mongoose.connect(uri);
        (<any>mongoose).Promise = Promise;
    }

    private handleErrors(err, res):void {
        // token error
        if (err.name === 'UnauthorizedError') {
            res.status(401).send(new Error(401, 'Not authorized, invalid token.'));
        } else {
            res.status(500).send(new Error(500, 'Unhandled error :\'('));
        }
    }

}

export default new App().express;