import { CriteriaObj } from "./CriteriaObj.model";

export class UcPagingObj {
    _url: any;
    enviromentUrl: any;
    apiQryPaging: any;
    deleteUrl: any;
    pagingJson: any;
    ddlEnvironments: any;
    addCritInput: Array<CriteriaObj>;

    constructor() {
        this.ddlEnvironments = [];
        this.addCritInput = new Array<CriteriaObj>();
    }
}