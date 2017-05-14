import { Promise } from 'es6-promise';
import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as jwtMiddleware from "express-jwt";
import * as jwt from "jsonwebtoken";
import * as config from "config";
import * as mongoose from "mongoose";
import * as log4js from "log4js";
import Success from './Success';
import Errors from './Errors';
// routes
import AuthRouter from './routes/Auth.router';
import UsersRouter from './routes/Users.router';

class App {
    
    public express: express.Application;
    public logger: any = null;

    constructor() {
        mongoose.connect(this.buildMongoUri());
        (<any>mongoose).Promise = Promise;
        this.express = express();
        this.buildLoggers();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        if (this.logger)
            this.express.use(log4js.connectLogger(this.logger, { format: config.get('logs.format') }));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended:false}));
        this.express.use('/api/v1/*', jwtMiddleware({secret: config.get('jwt.secret'), getToken:this.getToken})); // protecting all the routes after
    }

    private routes(): void {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
        this.express.use('/auth', AuthRouter);
        this.express.use('/api/v1/users', UsersRouter);
        this.express.use(Success.handleSuccess);
        this.express.use(Errors.handleErrors);
        this.express.use(Errors.notFound);
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