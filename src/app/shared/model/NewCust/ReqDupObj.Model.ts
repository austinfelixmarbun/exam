
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { CustPersonalJobDataObj } from "../CustPersonalJobDataObj.Model";
import { CustAttrContentObj } from "./CustAttrContentObj.Model";
import { CustCompanyMgmntShrholderObj } from "./CustCompanyMgmntShrholderObj.Model";
import { CustPersonalFamilyObj } from "./CustPersonalFamilyObj.Model";

export class ReqDupObj {
    CustNo: string;
    CustDataMode: string;
    CustPersonalFamilyObj: CustPersonalFamilyObj;
    CustCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;
    CustPersonalJobObj: CustPersonalJobDataObj;
    CustAttrContentObjs: Array<CustAttrContentObj>;
    ThirdPartyTrxNo: string;

    constructor() {
        this.CustNo = "";
        this.CustDataMode = CommonConstant.CustMainDataModeCust;
        this.CustPersonalFamilyObj = null;
        this.CustCompanyMgmntShrholderObj = null;
        this.CustPersonalJobObj = null;
        this.CustAttrContentObjs = null;
        this.ThirdPartyTrxNo = "";
    }
}