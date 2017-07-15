import { JsonController, Get } from 'routing-controllers';
import { IHttpResponse } from './../interfaces/IHttpResponse';
import { Success } from './../models/Success.model';

@JsonController('/')
export class HomeController {

    @Get('/')
    public helloWorld(): IHttpResponse {
        return new Success(200, "Hello world !")
    }

}