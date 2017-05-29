import 'reflect-metadata';
import { Controller, Get, RequestParam, } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { Success } from './../models/Success.model';
import { TYPES } from "../ioc/types";
import { IUserService } from './../interfaces/IUsersService';

@Controller('/api/v1/users')
@injectable()
export class UsersController {

    constructor(@inject(TYPES.UserService) private _userService: IUserService) {}

    @Get('/')
    public async getAll() {
        try {
            let users = await this._userService.getAll();
            return new Success(200, 'Users retrieved.', users);
        } catch (err) {
            throw err;
        }
    }

    @Get('/:login')
    public async getOne(@RequestParam("login") login: string) {
        try {
            let user = await this._userService.getOneByLogin(login);
            return new Success(200, 'User retrieved.', user);
        } catch (err) {
            throw err;
        }
    }
}