import { KeyValueObj } from "../../KeyValueObj.Model";

export class ResListKeyValueObj{
    ReturnObject : Array<KeyValueObj>;
    
    constructor(){
        this.ReturnObject = new Array<KeyValueObj>();
    }
}