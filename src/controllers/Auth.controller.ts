import "reflect-metadata";
import { User } from './../models/User.model';
import * as jwt from "jsonwebtoken"
import * as config from "config";
import { IHttpResponse } from './../interfaces/IHttpResponse';
import { Success } from './../models/Success.model';
import { Error } from './../models/Error.model';
import { JsonController, Post, BodyParam, Body } from "routing-controllers";
import { UserService } from "../services/User.service";

@JsonController("/auth")
export class AuthController {

    constructor(private _usersService: UserService) {}

    @Post("/login")
    public async login(@BodyParam("email") email: string, @BodyParam("password") password: string): Promise<IHttpResponse>
    {
        try {
            // here we authenticate the user
            let user = await this._usersService.getOneByEmail(email);
            if (user.password === password) {
                let payload = {email:user.email};
                let token = jwt.sign(payload, 
                        config.get('jwt.secret') as string, 
                        { expiresIn: config.get('jwt.expire') as string });
                return new Success(200, "Connected.", {token: token});
            } else {
                throw new Error(401, 'Bad Password.');
            }
        } catch (err) {
            throw err;
        }
    }

    @Post("/register")
    public async register(@Body() user: User): Promise<IHttpResponse> {
        try {
            await this._usersService.register(user);
            return new Success(200, 'User created.');
        } catch (err) {
            throw err;
        }
    }

}