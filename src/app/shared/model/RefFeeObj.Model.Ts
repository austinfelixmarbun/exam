import { RefLobObj } from "./RefLobObj.Model";

export class RefFeeObj{
    RefFeeId: any;
    FeeName: any;
    FeeCode: any;
    IsActive: any;
    requestRefLobObjs: Array<RefLobObj>;
    RowVersion: any;
    constructor(){this.RefFeeId = 0;}
}