import { EmpBankAccObj } from "app/shared/model/EmpBankAccObj.Model";
import { RefEmployeeObj } from "app/shared/model/RefEmployeeObj";
import { RefUserObj } from "app/shared/model/RefUserObj.Model";

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