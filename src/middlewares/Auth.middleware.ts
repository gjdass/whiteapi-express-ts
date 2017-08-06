import {UnauthorizedError, ExpressMiddlewareInterface,  Middleware} from "routing-controllers";
import { Error } from "../models/Error.model";

@Middleware({type: "before"})
export class AuthMiddleware implements ExpressMiddlewareInterface {

    // Here we can implement some security to cover some routes
    // TODO : code a SSO API someday in TS ? :p
    public use(request: any, response: Response, next: (err?: any) => any) {
        next();
    }
}
