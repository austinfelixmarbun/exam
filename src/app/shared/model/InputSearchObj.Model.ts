import { CriteriaObj } from "./CriteriaObj.model";

export class InputSearchObj {
    _url: string;
    enviromentUrl: string;
    apiQryPaging: string;
    arrCritObj: any;
    addCritInput: Array<CriteriaObj>;
    ddlEnvironments: Array<EnviObj>;

    constructor() {
        this._url = "";
        this.enviromentUrl = "";
        this.apiQryPaging = "";
        this.arrCritObj = null;
        this.addCritInput = new Array<CriteriaObj>();
        this.ddlEnvironments = new Array<EnviObj>();
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