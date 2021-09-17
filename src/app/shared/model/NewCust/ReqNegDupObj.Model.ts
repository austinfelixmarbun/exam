import { CustDocFileObj } from "../CustDocFile/CustDocFileObj.Model";
import { CustPersonalJobDataObj } from "../CustPersonalJobDataObj.Model";
import { CustAttrContentObj } from "./CustAttrContentObj.Model";
import { CustCompanyMgmntShrholderObj } from "./CustCompanyMgmntShrholderObj.Model";
import { CustPersonalFamilyObj } from "./CustPersonalFamilyObj.Model";

export class ReqNegDupObj {
    NegativeCustId: number;
    CustDataMode: string;
    MrCompanyTypeCode: string;
    CustPersonalFamilyObj: CustPersonalFamilyObj;
    CustCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;
    CustPersonalJobObj: CustPersonalJobDataObj;
    CustAttrContentObjs: Array<CustAttrContentObj>;
    ThirdPartyTrxNo: string;
    CustDocFileObjs: Array<CustDocFileObj>;

    constructor() {
        this.NegativeCustId = 0;
        this.CustDataMode = "";
        this.MrCompanyTypeCode = "";
        this.CustPersonalFamilyObj = null;
        this.CustCompanyMgmntShrholderObj = null;
    }
}