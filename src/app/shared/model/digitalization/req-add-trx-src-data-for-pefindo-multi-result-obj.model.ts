import { ReqAddTrxSrcDataForPefindoObj } from "./req-add-trx-src-data-for-pefindo-obj.model";

export class ReqAddTrxSrcDataForPefindoMultiResultObj {
    ReqAddTrxSrcDataForPefindoObj: Array<ReqAddTrxSrcDataForPefindoObj>;
    CustId: number;

    constructor() {
        this.ReqAddTrxSrcDataForPefindoObj = new Array<ReqAddTrxSrcDataForPefindoObj>();
        this.CustId = 0;
    }
}