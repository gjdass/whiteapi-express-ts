import { Request, Response, NextFunction } from 'express';

export class Errors {

    constructor() {
        this.init();
    }

    init() {}

    public handleErrors(err, req: Request, res: Response, next: NextFunction) : void {
        res.status(err.status).send({message: err.message});
    }

}

export default new Errors().handleErrors;