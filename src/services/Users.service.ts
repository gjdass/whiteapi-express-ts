import { Promise } from "es6-promise";

const Users = require('../datas/users.json');

export class UsersService {

    constructor() {

    }

    public getAll() {
        var promise = new Promise((resolve, reject) => {
            resolve(Users);
        });
        return promise;
    }

    public getOneByLogin(login: string) {
        var promise = new Promise((resolve, reject) => {
            var user = undefined;
            for (var i=0;i < Users.length;i++) {
                if (Users[i].login === login) {
                    user = Users[i];
                }
            }
            if (user) {
                resolve(user);
            } else {
                reject(user);
            }
        });
        return promise;
    }

}

export default new UsersService;