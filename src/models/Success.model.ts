export class Success {
    public httpCode: number;
    public message: string;
    public datas: Object;

    constructor(_httpCode:number, _message:string, _datas:Object = {}) {
        this.httpCode = _httpCode;
        this.message = _message;
        this.datas = _datas;
    }
}