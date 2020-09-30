import { EmpBankAccObj } from "./EmpBankAccObj.Model";
import { RefUserObj } from "./RefUserObj.Model";

export class RefEmpObj {
    RefEmpId: any;
    EmpNo: any;
    EmpName: any;
    JoinDt: any;
    Addr: any;
    Zipcode: any;
    AreaCode1: any;
    AreaCode2: any;
    AreaCode3: any;
    AreaCode4: any;
    City: any;
    PhnArea1: any;
    Phn1: any;
    PhnExt1: any;
    PhnArea2: any;
    Phn2: any;
    PhnExt2: any;
    PhnArea3: any;
    Phn3: any;
    PhnExt3: any;
    FaxArea: any;
    Fax: any;
    MobilePhnNo1: any;
    MobilePhnNo2: any;
    Email1: any;
    Email2: any;
    IsExt: any;
    TaxIdNo: any;
    MrIdTypeCode: any;
    IdNo: any;
    ImageLocation: any;
    Loginsoftphone: any;
    IsLeave: any;
    IsActive: any;
    RefUser: RefUserObj;
    EmpBankAcc: EmpBankAccObj;
    RowVersion: any;
    constructor() { this.RefEmpId = 0, this.RowVersion = "" }
}  