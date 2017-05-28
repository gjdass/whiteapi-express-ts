import 'reflect-metadata';
import { Controller, Get, RequestParam, } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import { IHttpResponse } from './../interfaces/IHttpResponse';
import { Success } from './../models/Success.model';

@Controller('/')
@injectable()
export class HomeController {

    @Get('/')
    public helloWorld(): IHttpResponse {
        return new Success(200, "Hello world !")
    }

}