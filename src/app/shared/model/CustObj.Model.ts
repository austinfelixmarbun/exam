import { CustAddrObj } from "./CustAddrObj.Model";

export class CustObj{
    CustId : number;
    CustNo : string;
    CustName : string;
    MrCustTypeCode :string;
    MrCustModelCode: string;
    MrIdTypeCode : string;
    IdNo:string;
    IdExpiredDt:Date;
    TaxIdNo :string;
    IsVip : boolean;
    IsAffiliateWithMf :boolean;
    VipNotes :string;
    OriginalOfficeCode:string;
    RowVersion: string;
    CustAddr: CustAddrObj;
    IsCustomer: boolean;
    IsFamily: boolean;
    IsGuarantor: boolean;
    IsShareholder: boolean;

    constructor(){this.CustAddr = new CustAddrObj()}
}