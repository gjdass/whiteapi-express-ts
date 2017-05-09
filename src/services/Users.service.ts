import { Error } from '../models/Error.model';
import { Promise } from "es6-promise";
import User from '../models/User.model';

const Users = require('../datas/users.json');

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