import { URLConstant } from "../constant/URLConstant";
import { NavigationConstant } from "../NavigationConstant";
import { CriteriaObj } from "./criteria-obj.model";
import { IntegrationObj } from "./library/integration-obj.model";

export class UcPagingObj {
    _url: string;
    enviromentUrl: string;
    title: string;
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
    listEnvironments: Array<EnvisObj>;
    isJoinExAPI: boolean;
    isGetAllData: boolean;
    integrationObj: IntegrationObj;
    ListPageSize: number[];
    dicts: any

    constructor() {
        this.dicts = {};
        this._url = "";
        this.title = "";
      this.enviromentUrl = URLConstant.env.LocalHostBE + '/v1'; //Ubah ke local host masing-masing
        this.apiQryPaging = URLConstant.GetPagingObjectBySQL;
        this.deleteUrl = "";
        this.pagingJson = "";
        this.arrCritObj = null;
        this.addCritInput = new Array<CriteriaObj>();
        this.ddlEnvironments = new Array<EnviObj>();
        this.listEnvironments = new Array<EnvisObj>();
      this.listEnvironments.push({ environment: "FOU", url: URLConstant.env.LocalHostBE + '/v1' });
      this.listEnvironments.push({ environment: "FOU_WEB", url: URLConstant.env.LocalHostBE });
      this.listEnvironments.push({ environment: "NOTIF_ENGINE", url: URLConstant.env.LocalHostBE + '/v1' });
        this.whereValue = new Array<WhereValueObj>();
        this.isHideSearch = false;
        this.delay = 0;
        this.isSearched = false;
        this.navigationConst = NavigationConstant;
        this.isJoinExAPI = false;
        this.isGetAllData = false;
        this.integrationObj = new IntegrationObj();
        this.ListPageSize = [10, 20, 50, 100];
        this.dicts = {};
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
export class EnvisObj {
    environment: string;
    url: string;

    constructor() {
        this.environment = "";
        this.url = "";
    }
}
