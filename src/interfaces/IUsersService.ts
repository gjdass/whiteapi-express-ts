import { IUser } from './IUser';

export interface IUserService {

    getAll(): Promise<IUser[]>;
    getOneByLogin(login: string): Promise<IUser>;
    register(params:object): Promise<IUser>;

}