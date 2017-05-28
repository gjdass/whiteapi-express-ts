import 'reflect-metadata';
import { Controller, Get, RequestParam, } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { Success } from './../models/Success.model';
import { Error } from './../models/Error.model';
import UsersService from './../services/Users.service';
import { Router, Request, Response, NextFunction } from 'express';
let _service = UsersService.getInstance();

@Controller('/api/v1/users')
@injectable()
export class UsersController {

    @Get('/')
    public async getAll() {
        try {
            let users = await _service.getAll();
            return new Success(200, 'Users retrieved.', users);
        } catch (err) {
            throw err;
        }
    }

    @Get('/:login')
    public async getOne(@RequestParam("login") login: string) {
        try {
            let user = await _service.getOneByLogin(login);
            return new Success(200, 'User retrieved.', user);
        } catch (err) {
            throw err;
        }
    }
}