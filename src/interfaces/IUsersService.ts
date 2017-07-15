import { User } from './../models/User.model';

export interface IUserService {

    getAll(): Promise<User[]>;
    getOneByEmail(username: string): Promise<User>;
    getOneById(id: number): Promise<User>;
    register(params:object): Promise<User>;

}