import { CustDuplicateObj } from "./CustDuplicateObj.Model";

export class NegCustDuplicateObj extends CustDuplicateObj{
    NegativeCustId: number;
    MrNegCustSource: string;
    MrNegCustType: string;
    constructor(){
        super();
    }
}