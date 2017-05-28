import "reflect-metadata";
import { Container } from 'inversify';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as jwtMiddleware from "express-jwt";
import * as jwt from "jsonwebtoken";
import * as config from "config";
import * as mongoose from "mongoose";
import * as log4js from "log4js";
// routes
import { HomeController } from './controllers/Home.controller';
import { AuthController } from './controllers/Auth.controller';
import { UsersController } from './controllers/Users.controller';
// models
import { Error } from './models/Error.model';

class App {
    
    public express: express.Application;
    public logger: any = null;

    constructor() {
        let container = new Container();
        container.bind<interfaces.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed('HomeController');
        container.bind<interfaces.Controller>(TYPE.Controller).to(AuthController).whenTargetNamed('AuthController');
        container.bind<interfaces.Controller>(TYPE.Controller).to(UsersController).whenTargetNamed('UsersController');
        let server = new InversifyExpressServer(container);

        mongoose.connect(this.buildMongoUri());
        (<any>mongoose).Promise = Promise;
        //this.express = express();
        this.buildLoggers();
        this.middleware(server);

        this.express = server.build();
    }

    private middleware(server: InversifyExpressServer): void {
        server.setConfig(app => {
            if (this.logger)
                app.use(log4js.connectLogger(this.logger, { format: config.get('logs.format') }));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended:false}));
            app.use('/api/v1/*', jwtMiddleware({secret: config.get('jwt.secret'), getToken:this.getToken})); // protecting all the routes after
        });
        server.setErrorConfig((app) => {
            app.use((err, req, res, next) => {
                if (err instanceof Error) {
                    res.status(err.httpCode).send(err);
                } else {
                    res.status(500).send(new Error(500, 'Unhandled error :\'('));
                }
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

    private buildMongoUri():string {
        let username:string = config.get('mongo.username') as string;
        let password:string = config.get('mongo.password') as string;
        let hostname:string = config.get('mongo.hostname') as string;
        let port:string = config.get('mongo.port') as string;
        let db:string = config.get('mongo.db') as string;

        let uri:string = 'mongodb://' + (username != '' ? username + ':' + password + '@' : '') + hostname + ':' + port + '/' + db;

        return uri;
    }

}

export default new App().express;