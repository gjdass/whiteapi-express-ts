export class Success {
    public status: number;
    public datas: Object;

    constructor(_status:number, _datas:Object = {}) {
        this.status = _status;
        this.datas = _datas;
    }
}