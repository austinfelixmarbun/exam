
import { CustCompanyMgmntShrholderObj } from "./CustCompanyMgmntShrholderObj.Model";
import { CustPersonalFamilyObj } from "./CustPersonalFamilyObj.Model";

export class ReqDupObj {
    CustNo: string;
    IsCustomer: boolean;
    IsFamily: boolean;
    IsShareholder: boolean;
    CustPersonalFamilyObj: CustPersonalFamilyObj;
    CustCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;

    constructor() {
        this.CustNo = "";
        this.IsCustomer = false;
        this.IsFamily = false;
        this.IsShareholder = false;
        this.CustPersonalFamilyObj = null;
        this.CustCompanyMgmntShrholderObj = null;
    }
}