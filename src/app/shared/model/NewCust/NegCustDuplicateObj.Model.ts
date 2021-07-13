import { CustDuplicateObj } from "./CustDuplicateObj.Model";

export class NegCustDuplicateObj extends CustDuplicateObj{
    MrNegCustSource: string;
    MrNegCustType: string;
    constructor(){
        super();
    }
}