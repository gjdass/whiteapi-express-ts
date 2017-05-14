import { Request, Response, NextFunction } from 'express';

class Success {

    constructor() {
        this.init();
    }

    init() {}

    public handleSuccess(obj, req: Request, res: Response, nxt: NextFunction) : void {
        if (obj && obj.status < 400) {
            res.status(obj.status);
            res.send(obj);
        }
        else {
            nxt(obj);
        }
    }

}

export default new Success();