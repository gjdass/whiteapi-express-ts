import { IResult } from './../interfaces/IResult.interface';

export class Error implements IResult {
    public status: number;
    public message: string;

    constructor(_status:number, _message:string) {
        this.status = _status;
        this.message = _message;
    }
}