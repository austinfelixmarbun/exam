import { CriteriaObj } from "./CriteriaObj.model";

export class InputSearchObj {
    _url: string;
    enviromentUrl: string;
    apiQryPaging: string;
    arrCritObj: any;
    addCritInput: Array<CriteriaObj>;
    ddlEnvironments: Array<EnviObj>;
    whereValue: Array<WhereValueObj>;

    constructor() {
        this._url = "";
        this.enviromentUrl = "";
        this.apiQryPaging = "";
        this.arrCritObj = null;
        this.addCritInput = new Array<CriteriaObj>();
        this.ddlEnvironments = new Array<EnviObj>();
        this.whereValue = new Array<WhereValueObj>();
    }
}

export class EnviObj {
    name: string;
    environment: string;

    constructor() {
        this.name = "";
        this.environment = "";
    }
}

export class WhereValueObj {
    property: string;
    value: any;

    constructor() {
        this.property = "";
    }
}