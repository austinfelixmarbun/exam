import { CustAddrObj } from "../CustAddrObj.Model";
import { CustObj } from "../CustObj.Model";
import { CustPersonalJobDataObj } from "../CustPersonalJobDataObj.Model";
import { CustPersonalObj } from "../CustPersonalObj.Model";
import { CustAttrContentObj } from "./CustAttrContentObj.Model";
import { CustCompanyMgmntShrholderObj } from "./CustCompanyMgmntShrholderObj.Model";

export class ReqPersonalObj {
    CustObj: CustObj;
    CustPersonalObj: CustPersonalObj;
    CustAddr: CustAddrObj;
    CustCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;
    CustPersonalJobObj: CustPersonalJobDataObj;
    CustAttrContentObjs: Array<CustAttrContentObj>;

    constructor() {

    }
}
