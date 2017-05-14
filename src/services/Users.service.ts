import { Error } from '../models/Error.model';
import { Promise } from "es6-promise";
import User from '../models/User.model';

class UsersService {

    private static _instance:UsersService = new UsersService();

    private constructor() { }

    public static getInstance():UsersService {
        return UsersService._instance;
    }

    public getAll() {
        return new Promise((resolve, reject) => {
            User.find({}, (err, res) => {
                if (err) { reject(err); }
                resolve(res);
            });
        });
    }

    public getOneByLogin(login: string):any {
        return new Promise((resolve, reject) => {
            User.findOne({ login:login }, (err, res) => {
                if (err) { reject(err); }
                if (!res || res == null) { reject(new Error(404, "User not found.")); }
                resolve(res);
            });
        });
    }

    public register(params:object):any {
        var user = new User({
            login: params['login'],
            password: params['password'],
            firstname: params['firstname'],
            lastname: params['lastname']
        });
        return user.save();
    }

}

export default UsersService;