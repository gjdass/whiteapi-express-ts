import { JsonController, Get, Param, UseBefore } from "routing-controllers";
import { Success } from "./../models/Success.model";
import { Error } from "./../models/Error.model";
import { UserService } from "../services/User.service";
import { AuthMiddleware } from "../middlewares/Auth.middleware";

@JsonController("/users")
@UseBefore(AuthMiddleware) // protects the route thanks to a middleware
export class UsersController {

    constructor(private userService: UserService) {}

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
