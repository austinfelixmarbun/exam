export class GenericObj{
    Id: number;
    Code: string;
    Codes: string[];
    TrxNo: string;
    EmpNo: string;
    CustNo: string;
    RowVersion: string;

    constructor(){
        this.Id = 0;
        this.Code = "";
        this.TrxNo = "";
        this.RowVersion = "";
        this.Codes = new Array();
        this.EmpNo = "";
        this.CustNo = "";
    }
}