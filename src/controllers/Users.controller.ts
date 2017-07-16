import { JsonController, Get, Param } from "routing-controllers";
import { Success } from "./../models/Success.model";
import { Error } from "./../models/Error.model";
import { UserService } from "../services/User.service";

@JsonController("/api/v1/users")
export class UsersController {

    constructor(private userService: UserService) {}

    @Get("/")
    public async getAll() {
        try {
            const users = await this.userService.getAll();
            return new Success(200, "Users retrieved.", users);
        } catch (err) {
            throw err;
        }
    }

    @Get("/:id")
    public async getOne(@Param("id") id: number) {
        try {
            const user = await this.userService.getOneById(id);
            return new Success(200, "User retrieved.", user);
        } catch (err) {
            throw err;
        }
    }
}
