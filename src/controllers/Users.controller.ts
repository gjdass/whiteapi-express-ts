import {Get, JsonController, Param} from 'routing-controllers';
import { Success } from './../models/Success.model';
import UsersService from './../services/Users.service';
import { Router, Request, Response, NextFunction } from 'express';
let _service = UsersService.getInstance();

@JsonController('/api/v1/users')
export class UsersController {

    @Get('/')
    public async getAll() {
        let users = await _service.getAll().then(datas => {
            return (new Success(200, "Users list found.", datas));
        }, error => {
            return error;
        });
        return users;
    }

    @Get('/:login')
    public async getOne(@Param("login") login: string) {
        let user = await _service.getOneByLogin(login).then(datas => {
            return (new Success(200, "User found.", datas));
        }, error => {
            return error;
        });
        return user;
    }
}