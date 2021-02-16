import { NavigationConstant } from "../NavigationConstant";
import { CriteriaObj } from "./CriteriaObj.Model";

export class UcPagingObj {
    _url: string;
    enviromentUrl: string;
    apiQryPaging: string;
    deleteUrl: string;
    pagingJson: string;
    arrCritObj: any;
    addCritInput: Array<CriteriaObj>;
    ddlEnvironments: Array<EnviObj>;
    whereValue: Array<WhereValueObj>;
    isHideSearch: boolean;
    isSearched: boolean;
    delay: number;
    navigationConst: any;

    constructor() {
        this._url = "";
        this.enviromentUrl = "";
        this.apiQryPaging = "";
        this.deleteUrl = "";
        this.pagingJson = "";
        this.arrCritObj = null;
        this.addCritInput = new Array<CriteriaObj>();
        this.ddlEnvironments = new Array<EnviObj>();
        this.whereValue = new Array<WhereValueObj>();
        this.isHideSearch = false;
        this.delay = 0;
        this.isSearched = false;
        this.navigationConst = NavigationConstant;
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