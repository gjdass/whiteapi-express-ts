import 'reflect-metadata';
import { Controller, Get, RequestParam, } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { ICheckTypesHelper } from "../ioc/interfaces";
import { Success } from './../models/Success.model';
import { Error } from './../models/Error.model';
import { TYPES } from "../ioc/types";
import { IUserService } from './../interfaces/IUsersService';

@Controller('/api/v1/users')
@injectable()
export class UsersController {

    constructor(@inject(TYPES.UserService) private _userService: IUserService,
                @inject(TYPES.CheckTypesHelper) private _checkTypesHelper: ICheckTypesHelper) {}

    @Get('/')
    public async getAll() {
        try {
            let users = await this._userService.getAll();
            return new Success(200, 'Users retrieved.', users);
        } catch (err) {
            throw err;
        }
    }

    @Get('/:username')
    public async getOne(@RequestParam("username") username: string) {
        try {
            if (!this._checkTypesHelper.checkParams([username], ['string']))
                throw new Error(400, 'Bad request. Please provide username.');
            let user = await this._userService.getOneByUsername(username);
            return new Success(200, 'User retrieved.', user);
        } catch (err) {
            throw err;
        }
    }
}