import UsersService from './../services/Users.service';
import { Router, Request, Response, NextFunction } from 'express';

export class UsersRouter {
    public router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, nxt: NextFunction) {
        UsersService.getAll().then(datas => {
            res.status(200);
            res.send(datas);
        });
    }

    init() {
        this.router.get('/', this.getAll);
    }
}

export default new UsersRouter().router;