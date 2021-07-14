import { CustCompanyMgmntShrholderObj } from "./CustCompanyMgmntShrholderObj.Model";
import { CustPersonalFamilyObj } from "./CustPersonalFamilyObj.Model";

export class ReqNegDupObj {
    CustName: string;
    MrCustTypeCode: string;
    IdNo: string;
    IsCustomer: boolean;
    IsFamily: boolean;
    IsShareholder: boolean;
    MrCompanyTypeCode: string;
    CustPersonalFamilyObj: CustPersonalFamilyObj;
    CustCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;
    
    constructor() {
        this.CustName = "";
        this.MrCustTypeCode = "";
        this.IdNo = "";
        this.MrCompanyTypeCode = "";
        this.CustPersonalFamilyObj = null;
        this.CustCompanyMgmntShrholderObj = null;
    }
}