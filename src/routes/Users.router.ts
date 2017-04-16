import { Success } from './../models/Success.model';
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
            nxt(new Success(200, datas));
        }, error => {
            nxt(error);
        });
    }

    public getOne(req: Request, res: Response, nxt: NextFunction) {
        UsersService.getOneByLogin(req.params.login).then(datas => {
            nxt(new Success(200, datas));
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