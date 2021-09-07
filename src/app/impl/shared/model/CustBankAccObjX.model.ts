import { CustBankAccObj } from "app/shared/model/CustBankAccObj.Model";

export class CustBankAccObjX {
    CustBankAccObj: CustBankAccObj;
    MrPlafonFromBank: string;
    constructor() {
        this.CustBankAccObj = new CustBankAccObj();
        this.MrPlafonFromBank = "";
    }
}
