import 'reflect-metadata';
import { Controller, Get, Post, RequestParam, RequestBody } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { ICheckTypesHelper } from "../ioc/interfaces";
import * as jwt from "jsonwebtoken"
import * as config from "config";
import { TYPES } from "../ioc/types";
import { IHttpResponse } from './../interfaces/IHttpResponse';
import { Success } from './../models/Success.model';
import { Error } from './../models/Error.model';
import { IUserService } from './../interfaces/IUsersService';

@Controller("/auth")
@injectable()
export class AuthController {

    constructor(@inject(TYPES.UserService) private _usersService:IUserService,
                @inject(TYPES.CheckTypesHelper) private _checkTypesHelper: ICheckTypesHelper) {}

    @Post("/login")
    public async login(@RequestBody("username") username: string,
                       @RequestBody("password") password: string): Promise<IHttpResponse>
    {
        try {
            if (!this._checkTypesHelper.checkParams([username, password],['string', 'string']))
                throw new Error(400, 'Bad request. Please provide username and password.');
            // here we authenticate the user
            let user = await this._usersService.getOneByUsername(username);
            if (user.password === password) {
                let token = jwt.sign(user.username, 
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
    public async register(@RequestBody() user: any): Promise<IHttpResponse> {
        try {
            await this._usersService.register(user);
            return new Success(200, 'User created.');
        } catch (err) {
            throw err;
        }
    }

}