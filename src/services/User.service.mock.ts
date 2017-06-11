import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { TYPES } from "../ioc/types";
import { Lodash } from "../ioc/interfaces";
import { IUserService } from './../interfaces/IUsersService';
import { IUser } from './../interfaces/IUser';
import { Error } from '../models/Error.model';

@injectable()
export class UserServiceMock implements IUserService {

    users: IUser[] = [
        { username:'test1', password: 'test1', firstname: 'test1', lastname: 'test1'},
        { username:'test2', password: 'test2', firstname: 'test2', lastname: 'test2'}
    ];

    constructor(@inject(TYPES.Lodash) private _:Lodash) {}

    public getAll(): Promise<IUser[]> {
        return new Promise<IUser[]>((resolve, reject) => {
            resolve(this.users);
        });
    }

    public getOneByUsername(username: string): Promise<IUser> {
        return new Promise<IUser>((resolve, reject) => {
            let res = this._.find(this.users, user => user.username === username);
            if (!res) { reject(new Error(404, "User not found.")); }
            resolve(res);
        });
    }

    public register(params:IUser): Promise<IUser> {
        return new Promise<IUser>((resolve, reject) => {
            this.users.push(params);
            resolve();
        });
    }

}