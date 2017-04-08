import { Request, Response, NextFunction } from 'express';

class Errors {

    constructor() {
        this.init();
    }

    init() {}

    public handleErrors(err, req: Request, res: Response, next: NextFunction) : void {
        res.status(err.status);
        res.send({status:err.status, message: err.message});
    }

}

export default new Errors().handleErrors;