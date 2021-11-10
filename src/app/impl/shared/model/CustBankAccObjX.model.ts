import {CustBankAccObj} from 'app/shared/model/cust-bank-acc-obj.model';


export class CustBankAccObjX {
    CustBankAccObj: CustBankAccObj;
    MrPlafonFromBank: string;
    constructor() {
        this.CustBankAccObj = new CustBankAccObj();
        this.MrPlafonFromBank = "";
    }
}
