import { Repository } from "typeorm";
import { OrmRepository } from "typeorm-typedi-extensions";
import { Service, Require } from "typedi";
import { IUserService } from "./../interfaces/IUsersService";
import { User } from "../models/User.model";
import * as moment from "moment";

@Service("user.service")
export class UserService implements IUserService {

    @OrmRepository(User)
    private userRepo: Repository<User>;

    public getAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    public getOneByEmail(email: string): Promise<User> {
        return this.userRepo.findOne((obj: User) => obj.email === email);
    }

    public getOneById(id: number): Promise<User> {
        return this.userRepo.findOne((obj: User) => obj.id === id);
    }

    public register(user: User): Promise<User> {
        return this.userRepo.persist(user);
    }

}
