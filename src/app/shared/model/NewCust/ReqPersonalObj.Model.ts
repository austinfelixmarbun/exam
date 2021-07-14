import { CustAddrObj } from "../CustAddrObj.Model";
import { CustObj } from "../CustObj.Model";
import { CustPersonalObj } from "../CustPersonalObj.Model";

export class ReqPersonalObj {
    CustObj: CustObj;
    CustPersonalObj: CustPersonalObj;
    CustAddr: CustAddrObj;

    constructor() {

    }
}
