import { CustAddrObj } from "app/shared/model/CustAddrObj.Model";

export class CustObjX{
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
    CustPrefixName: string;
    CustSuffixName: string;

    constructor(){this.CustAddr = new CustAddrObj()}
}