import { Success } from './../models/Success.model';
import { Error } from '../models/Error.model';
import UsersService from './../services/Users.service';
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken"
import * as config from "config";
let _usersService = UsersService.getInstance();

export class AuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public login(req: Request, res: Response, nxt: NextFunction) {
        // here we authenticate the user
        if (req.body && req.body.login && req.body.password) {
            _usersService.getOneByLogin(req.body.login).then(user => {
                if (user.password === req.body.password) {
                    let token = jwt.sign({login:user.login}, 
                        config.get('jwt.secret') as string, 
                        { expiresIn: config.get('jwt.expire') as string });
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

    public register(req: Request, res: Response, nxt: NextFunction) {
        _usersService.register(req.body).then(datas => {
            nxt(new Success(200, { message: 'User created' }));
        }, error => {
            nxt(error);
        });
    }


    init() {
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
    }
}

export default new AuthRouter().router;