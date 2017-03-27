import { Router, Request, Response, NextFunction } from 'express';
const Users = require('../datas/users.json');

export class UsersRouter {
    public router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, nxt: NextFunction) {
        res.send(Users);
    }

    init() {
        this.router.get('/', this.getAll);
    }
}

export default new UsersRouter().router;