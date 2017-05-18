import { HttpError } from 'routing-controllers';

export class Error extends HttpError {
    public httpError: number;
    public message: string;

    constructor(_httpCode:number, _message:string) {
        super(_httpCode, _message);
        this.httpError = _httpCode;
        this.message = _message;
    }
}