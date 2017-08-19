import { JsonController, Get, Param, UseBefore } from "routing-controllers";
import { Success } from "./../models/Success.model";
import { Error } from "./../models/Error.model";
import { UserService } from "../services/User.service";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import { Inject } from "typedi";
import { IUserService } from "../interfaces/IUsersService";

@JsonController("/users")
@UseBefore(AuthMiddleware)
export class UsersController {

    constructor(@Inject("user.service") private userService: IUserService) {}

    @Get("/")
    public async getAll() {
        try {
            const users = await this.userService.getAll();
            return users;
        } catch (err) {
            throw err;
        }
    }

    @Get("/:id")
    public async getOne(@Param("id") id: number) {
        try {
            const user = await this.userService.getOneById(id);
            return user;
        } catch (err) {
            throw err;
        }
    }
}
