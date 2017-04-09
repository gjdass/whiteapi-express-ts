import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as jwtMiddleware from "express-jwt";
import * as jwt from "jsonwebtoken";
import * as config from "config";
import Success from './Success';
import Errors from './Errors';
// routes
import AuthRouter  from './routes/Auth.router';
import UsersRouter  from './routes/Users.router';

class App {
    
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        if (config.get('logs.level') != 'none')
            this.express.use(logger(config.get('logs.level') as string));
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
        this.express.use(Success);
        this.express.use(Errors);
    }

    private getToken(req: Request):string {
        return req.headers['authorization'];
    }

}

export default new App().express;