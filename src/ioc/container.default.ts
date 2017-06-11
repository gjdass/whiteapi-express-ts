import { interfaces, TYPE } from 'inversify-express-utils';
import { Container, ContainerModule } from "inversify";
import { Lodash, ICheckTypesHelper } from "./interfaces";
import { TYPES } from "./types";
import * as _ from "lodash";
import { HomeController } from './../controllers/Home.controller';
import { AuthController } from './../controllers/Auth.controller';
import { UsersController } from './../controllers/Users.controller';
import { IUserService } from './../interfaces/IUsersService';
import { UserService } from './../services/User.service';
import { CheckTypesHelper } from './../helpers/CheckTypes.helper';

// Third-parties libraries bindings
const thirdParties = new ContainerModule(bind => {
    bind<Lodash>(TYPES.Lodash).toConstantValue(_);
});

// Helpers binding
const helpers = new ContainerModule(bind => {
    bind<ICheckTypesHelper>(TYPES.CheckTypesHelper).to(CheckTypesHelper);
});

// Controllers bindings
const controllers = new ContainerModule(bind => {
    bind<interfaces.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed('HomeController');
    bind<interfaces.Controller>(TYPE.Controller).to(UsersController).whenTargetNamed('UsersController');
    bind<interfaces.Controller>(TYPE.Controller).to(AuthController).whenTargetNamed('AuthController');
});

// Services binding
const services = new ContainerModule(bind => {
    bind<IUserService>(TYPES.UserService).to(UserService);
});

const container = new Container();

container.load(thirdParties, helpers, services, controllers);

export { container };