import { Success } from './../models/Success.model';
import { JsonController, Get } from 'routing-controllers';

@JsonController('/')
export class HomeController {

    @Get('/')
    public helloWorld() {
        return new Success(200, "Hello world !")
    }

}