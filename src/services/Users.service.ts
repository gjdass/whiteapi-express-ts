import { Error } from '../models/Error.model';
import { Promise } from "es6-promise";

const Users = require('../datas/users.json');

export class UsersService {

    constructor() {

    }

    public getAll() {
        return new Promise((resolve, reject) => {
            resolve(Users);
        });
    }

    public getOneByLogin(login: string) {
        return new Promise((resolve, reject) => {
            var user = undefined;
            for (var i=0;i < Users.length;i++) {
                if (Users[i].login === login) {
                    user = Users[i];
                }
            }
            if (user) {
                resolve(user);
            } else {
                reject(new Error(404, 'User not found'));
            }
        });
    }

}

export default new UsersService();