export class ReqCustAttrContentByCustIdAndAttrGroupObj {
    CustId: number;
    AttrGroup: string;
    RowVersion: string;

    constructor() {
        this.CustId = 0;
        this.AttrGroup = "";
        this.RowVersion = "";
    }
}

export class ReqCustAttrContentByCustIdAndAttrGroupAndListAttrCodeObj extends ReqCustAttrContentByCustIdAndAttrGroupObj {
    AttrCodes: Array<string>;
    constructor() {
        super();
        this.AttrCodes = new Array<string>();
    }
}