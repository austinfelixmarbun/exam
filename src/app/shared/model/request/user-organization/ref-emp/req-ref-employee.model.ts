import { EmpBankAccObj } from "app/shared/model/emp-bank-acc-obj.model";
import { RefEmployeeObj } from "app/shared/model/ref-employee-obj";
import { RefUserObj } from "app/shared/model/ref-user-obj.model";

export class ReqRefEmployeeObj {
    
    RefEmployeeObj: RefEmployeeObj;
    RefUserObj: RefUserObj;
    EmpBankAccObj: EmpBankAccObj;
    
    constructor()
    {
        this.RefEmployeeObj = new RefEmployeeObj();
        this.RefUserObj = new RefUserObj();
        this.EmpBankAccObj = new EmpBankAccObj();
    }
    
}  