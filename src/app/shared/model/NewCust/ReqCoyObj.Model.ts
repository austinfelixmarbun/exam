import { CustAddrObj } from "../CustAddrObj.Model";
import { CustCompanyObj } from "../CustCompanyObj.Model";
import { CustObj } from "../CustObj.Model";
import { CustCompanyMgmntShrholderObj } from "./CustCompanyMgmntShrholderObj.Model";

export class ReqCoyObj{
    CustObj : CustObj;
    CustCompanyObj : CustCompanyObj;
    CustAddr: CustAddrObj;
    CustCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;
}
