export class GenericObj{
    Id: number;
    Code: string;
    TrxNo: string;
    CustNo: string;
    RowVersion: string;

    constructor(){
        this.Id = 0;
        this.Code = "";
        this.TrxNo = "";
        this.RowVersion = "";
        this.CustNo = "";
    }
}