import { CustAddrObj } from "./CustAddrObj.Model";

export class CustObj{
    CustId : any;
    CustNo :any;
    CustName : any;
    MrCustTypeCode :any;
    MrCustModelCode: any;
    MrIdTypeCode : any;
    IdNo:any;
    IdExpiredDt:any;
    TaxIdNo :any;
    IsVip : any;
    IsAffiliateWithMf :any;
    VipNotes :any;
    OriginalOfficeCode:any;
    RowVersion: any;
    CustAddr: CustAddrObj;
    IsCustomer: boolean;
    IsFamily: boolean;
    IsGuarantor: boolean;
    IsShareholder: boolean;

    constructor(){this.CustAddr = new CustAddrObj()}
}