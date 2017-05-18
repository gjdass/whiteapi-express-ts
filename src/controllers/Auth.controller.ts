import { Success } from './../models/Success.model';
import {HttpError, InternalServerError, Body, BadRequestError, JsonController, Post, BodyParam, NotFoundError} from 'routing-controllers';
import UsersService from './../services/Users.service';
import * as jwt from "jsonwebtoken"
import * as config from "config";
let _usersService = UsersService.getInstance();

@JsonController("/auth")
export class AuthController {

    @Post("/login")
    public async login(@BodyParam("username") username: string,
                       @BodyParam("password") password: string)
    {
        // here we authenticate the user
        let token = await _usersService.getOneByLogin(username).then(user => {
            if (user.password === password) {
                let token = jwt.sign({login:user.login}, 
                    config.get('jwt.secret') as string, 
                    { expiresIn: config.get('jwt.expire') as string });
                return new Success(200, "Connected.", {token: token});
            } else {
                return new BadRequestError("Bad password.");
            }
        }, error => {
            return new NotFoundError("User not found.");
        });
        return token;
    }

    @Post("/register")
    public async register(@Body() user: any) {
        return await _usersService.register(user).then(datas => {
            return new Success(201, "User created.");
        }, error => {
            return new InternalServerError("Can't register right now, sorry.");
        });
    }

}