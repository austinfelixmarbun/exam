import { CustAddrObj } from "../CustAddrObj.Model";
import { CustObj } from "../CustObj.Model";
import { CustPersonalObj } from "../CustPersonalObj.Model";
import { CustCompanyMgmntShrholderObj } from "./CustCompanyMgmntShrholderObj.Model";
import { CustPersonalFamilyObj } from "./CustPersonalFamilyObj.Model";

export class ReqPersonalObj {
    CustObj: CustObj;
    CustPersonalObj: CustPersonalObj;
    CustAddr: CustAddrObj;

    constructor() {

    }
}

export class ReqDupPersonalObj {
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

export class ReqNegDupPersonalObj {
    CustName: string;
    MrCustTypeCode: string;
    IdNo: string;
    MrCompanyTypeCode: string;
    
    constructor() {
        this.CustName = "";
        this.MrCustTypeCode = "";
        this.IdNo = "";
        this.MrCompanyTypeCode = "";
    }
}