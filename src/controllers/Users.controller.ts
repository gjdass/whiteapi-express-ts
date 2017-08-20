import { JsonController, Get, Param, UseBefore } from "routing-controllers";
import { Inject } from "typedi";
import { Success } from "./../models/Success.model";
import { Error } from "./../models/Error.model";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
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
