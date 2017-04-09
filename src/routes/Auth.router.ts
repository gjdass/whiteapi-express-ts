import { Success } from './../models/Success.model';
import { Error } from '../models/Error.model';
import UsersService from './../services/Users.service';
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken"
import * as config from "config";

export class AuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public login(req: Request, res: Response, nxt: NextFunction) {
        // here we authenticate the user
        if (req.body && req.body.login && req.body.password) {
            UsersService.getOneByLogin(req.body.login).then(user => {
                if (user.password === req.body.password) {
                    var token = jwt.sign({login:user.login}, 
                        config.get('jwt.secret') as string, 
                        { expiresIn:'1h' });
                    nxt(new Success(200, {token:token}));
                } else {
                    nxt(new Error(401, 'Bad password'));
                }
            }, error => {
                nxt(new Error(404, 'User does not exist'));
            });
        }
        else {
            nxt(new Error(400, 'Missing login or password'))
        }
        
    }

    init() {
        this.router.post('/login', this.login);
    }
}

export default new AuthRouter().router;