import { IHttpResponse } from './../interfaces/IHttpResponse';

export class Error implements IHttpResponse {
    public httpCode: number;
    public message: string;
    public datas: object;

    constructor(_httpCode:number, _message:string) {
        this.httpCode = _httpCode;
        this.message = _message;
        this.datas = {};
    }
}