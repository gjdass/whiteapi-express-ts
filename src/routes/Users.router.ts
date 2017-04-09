import UsersService from './../services/Users.service';
import { Router, Request, Response, NextFunction } from 'express';

export class UsersRouter {
    public router: Router;

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

    public getOne(req: Request, res: Response, nxt: NextFunction) {
        UsersService.getOneByLogin(req.params.login).then(datas => {
            res.status(200);
            res.send(datas);
        }, error => {
            nxt(error);
        });
    }

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:login', this.getOne)
    }
}

export default new UsersRouter().router;