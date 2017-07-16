import { IHttpResponse } from "./../interfaces/IHttpResponse";

export class Error implements IHttpResponse {
    public httpCode: number;
    public message: string;
    public datas: object;

    constructor(httpCode: number, message: string) {
        this.httpCode = httpCode;
        this.message = message;
        this.datas = {};
    }
}
