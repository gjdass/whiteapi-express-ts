import "reflect-metadata";
import { Repository } from "typeorm";
import { OrmRepository } from "typeorm-typedi-extensions";
import { Service, Require } from "typedi";
import { IUserService } from "./../interfaces/IUsersService";
import { User } from "../models/User.model";
import { Moment } from "../ioc/interfaces";

@Service()
export class UserService implements IUserService {

    @OrmRepository(User)
    private userRepo: Repository<User>;

    @Require("moment")
    private moment: Moment;

    public getAll(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            resolve(this.userRepo.find());
        });
    }

    public getOneByEmail(email: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            resolve(this.userRepo.findOne((obj: User) => obj.email === email));
        });
    }

    public getOneById(id: number): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            resolve(this.userRepo.findOne((obj: User) => obj.id === id));
        });
    }

    public register(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            resolve(this.userRepo.persist(user));
        });
    }

}
