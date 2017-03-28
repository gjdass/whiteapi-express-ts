import UsersService from './../services/Users.service';
import { Router, Request, Response, NextFunction } from 'express';

export class AuthRouter {
    const 
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public postAuth(req: Request, res: Response, nxt: NextFunction) {
        // here we authenticate the user
        if (req.body && req.body.login && req.body.password) {
            UsersService.getOneByLogin(req.body.login).then((datas) => {
                res.status(200);
                res.send(datas);
            }).catch((error) => {
                res.status(404);
                res.send({message:"User not found"});
            });
        }
        else {
            res.status(400);
            res.send({message:"Missing login or password"});
        }
        
    }

    init() {
        this.router.post('/login', this.postAuth);
    }
}

export default new AuthRouter().router;