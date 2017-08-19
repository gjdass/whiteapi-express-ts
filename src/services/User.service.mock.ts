import { Require, Service } from "typedi";
import { IUserService } from "./../interfaces/IUsersService";
import { User } from "./../models/User.model";
import { Error } from "./../models/Error.model";
import * as _ from "lodash";

export class UserServiceMock implements IUserService {

    public users: User[] = [
        { id: 1, email: "test1@test.com", password: "test1", firstname: "test1", lastname: "test1", birthdate: 42},
        { id: 2, email: "test2@test.com", password: "test2", firstname: "test2", lastname: "test2", birthdate: 42}
    ];

    public getAll(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            resolve(this.users);
        });
    }

    public getOneByEmail(email: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const res = _.find(this.users, (user) => user.email === email);
            if (!res) { reject(new Error(404, "User not found.")); }
            resolve(res);
        });
    }

    public getOneById(id: number): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const res = _.find(this.users, (user) => user.id === id);
            if (!res) { reject(new Error(404, "User not found.")); }
            resolve(res);
        });
    }

    public register(params: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.users.push(params);
            resolve();
        });
    }

}
