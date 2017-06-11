import 'reflect-metadata';
import { injectable } from 'inversify';
import { IUserService } from './../interfaces/IUsersService';
import { IUser } from './../interfaces/IUser';
import { Error } from '../models/Error.model';
import User from '../models/User.model';

@injectable()
export class UserService implements IUserService {

    public getAll(): Promise<IUser[]> {
        return new Promise<IUser[]>((resolve, reject) => {
            User.find({}, (err, res) => {
                if (err) { reject(err); }
                resolve(res);
            });
        });
    }

    public getOneByUsername(username: string): Promise<IUser> {
        return new Promise<IUser>((resolve, reject) => {
            User.findOne({ username:username }, (err, res) => {
                if (err) { reject(err); }
                if (!res || res == null) { reject(new Error(404, "User not found.")); }
                resolve(res);
            });
        });
    }

    public register(params:object): Promise<IUser> {
        var user = new User({
            username: params['username'],
            password: params['password'],
            firstname: params['firstname'],
            lastname: params['lastname']
        });
        return user.save();
    }

}