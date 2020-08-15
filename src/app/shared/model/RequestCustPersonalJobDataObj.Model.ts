import { CustPersonalJobDataObj } from "./CustPersonalJobDataObj.Model";
import { CustAddrObj } from "./CustAddrObj.Model";

export class RequestCustPersonalJobDataObj {
    CustPersonalJobData : CustPersonalJobDataObj;
    JobAddr : CustAddrObj;
    OthBizAddr : CustAddrObj;
    PreJobAddr : CustAddrObj;
}  