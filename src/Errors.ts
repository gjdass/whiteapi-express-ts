import { Request, Response, NextFunction } from 'express';

class Errors {

    constructor() {
        this.init();
    }

    init() {}

    public handleErrors(err, req:Request, res:Response, nxt:NextFunction):void {
        res.status(err.status);
        res.send({status:err.status, message: err.message});
    }

    public notFound(req:Request, res:Response, nxt:NextFunction):void {
        res.status(404);
        res.send({status:404, message: req.url + ' cannot be found [404]'});
    }

}

export default new Errors();