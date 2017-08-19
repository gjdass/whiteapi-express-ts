import { JsonController, Get } from "routing-controllers";
import { IHttpResponse } from "./../interfaces/IHttpResponse";
import { Success } from "./../models/Success.model";

@JsonController("/")
export class HomeController {

    @Get()
    public helloWorld(): any {
        return "Hello world !";
    }

}
