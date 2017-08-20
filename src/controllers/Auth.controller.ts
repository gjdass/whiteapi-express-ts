import * as jwt from "jsonwebtoken";
import * as config from "config";
import { Inject } from "typedi";
import { JsonController, Post, BodyParam, Body } from "routing-controllers";
import { User } from "./../models/User.model";
import { IHttpResponse } from "./../interfaces/IHttpResponse";
import { Success } from "./../models/Success.model";
import { Error } from "./../models/Error.model";
import { IUserService } from "./../interfaces/IUsersService";

@JsonController("/auth")
export class AuthController {

    constructor(@Inject("user.service") private usersService: IUserService) {}

    @Post("/login")
    public async login(@BodyParam("email") email: string, @BodyParam("password") password: string)
                 : Promise<IHttpResponse> {
        try {
            // here we authenticate the user
            const user = await this.usersService.getOneByEmail(email);
            if (user.password === password) {
                const payload = {email: user.email};
                const token = jwt.sign(payload,
                        config.get("jwt.secret") as string,
                        { expiresIn: config.get("jwt.expire") as string });
                return new Success(200, "Connected.", {token});
            } else {
                throw new Error(401, "Bad Password.");
            }
        } catch (err) {
            throw err;
        }
    }

    @Post("/register")
    public async register(@Body() user: User): Promise<IHttpResponse> {
        try {
            await this.usersService.register(user);
            return new Success(200, "User created.");
        } catch (err) {
            throw err;
        }
    }

}
