import { IHttpResponse } from './../interfaces/IHttpResponse';

export class Success implements IHttpResponse {
    public httpCode: number;
    public message: string;
    public datas: object;

    constructor(_httpCode:number, _message:string, _datas:object = {}) {
        this.httpCode = _httpCode;
        this.message = _message;
        this.datas = _datas;
    }
}