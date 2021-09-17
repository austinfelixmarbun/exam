import { CustAddrObj } from "../CustAddrObj.Model";
import { CustCompanyObj } from "../CustCompanyObj.Model";
import { CustDocFileObj } from "../CustDocFile/CustDocFileObj.Model";
import { CustObj } from "../CustObj.Model";
import { CustCompanyMgmntShrholderObj } from "./CustCompanyMgmntShrholderObj.Model";

export class ReqCoyObj{
    CustObj : CustObj;
    CustCompanyObj : CustCompanyObj;
    CustAddr: CustAddrObj;
    CustCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;
    CustDocFileObjs: Array<CustDocFileObj>;
}
