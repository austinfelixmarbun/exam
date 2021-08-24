import { ThirdPartyTrustsocRsltObj } from "../ThirdPartyRslt/ThirdPartyTrustsocRsltObj.model";

export class ReqAddTrxSrcDataForTsObj {
    TrxNo: string;
    CustType: string;
    IdType: string;
    IdNo: string;
    ThirdPartyTrustsocRsltObjs : Array<ThirdPartyTrustsocRsltObj>

    constructor() {
        this.ThirdPartyTrustsocRsltObjs = new Array<ThirdPartyTrustsocRsltObj>();
    }
}