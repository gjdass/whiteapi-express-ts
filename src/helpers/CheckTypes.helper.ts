import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from "../ioc/types";
import { Lodash } from '../ioc/interfaces';

@injectable()
export class CheckTypesHelper {

    constructor(@inject(TYPES.Lodash) private _:Lodash){}

    public checkParams(obj:any[], types:string[]):boolean {
        if (obj.length !== types.length)
            return false;
        let result = true;
        this._.each(obj, (value, key) => {
            if (typeof(value) != types[key])
                result = false;
        });
        return result;
    }
}