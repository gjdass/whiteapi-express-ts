import { IUser } from './IUser';

export interface IUserService {

    getAll(): Promise<IUser[]>;
    getOneByUsername(username: string): Promise<IUser>;
    register(params:object): Promise<IUser>;

}