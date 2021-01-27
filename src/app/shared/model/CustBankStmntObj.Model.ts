export class CustBankStmntObj {
    CustBankStmntId: number;
    CustBankAccId: number;
    Month: string;
    Year: string;
    DebitAmt: number;
    CreditAmt: number;
    BalanceAmt: number;
    RowVersion: any;
    constructor(){this.CustBankStmntId = 0, this.RowVersion = ""}
}