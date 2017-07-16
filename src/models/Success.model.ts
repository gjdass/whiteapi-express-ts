import { IHttpResponse } from "./../interfaces/IHttpResponse";

export class Success implements IHttpResponse {
    public httpCode: number;
    public message: string;
    public datas: object;

    constructor(httpCode: number, message: string, datas: object = {}) {
        this.httpCode = httpCode;
        this.message = message;
        this.datas = datas;
    }
}
