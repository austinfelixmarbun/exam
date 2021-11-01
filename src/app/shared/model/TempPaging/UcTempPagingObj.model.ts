import { URLConstant } from 'app/shared/constant/URLConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { CriteriaObj } from '../CriteriaObj.Model';

export class UcTempPagingObj {
    urlJson: string;
    enviromentUrl: string;
    apiQryPaging: string;
    pagingJson: string;
    isReady: boolean;
    addCritInput: Array<CriteriaObj>;
    ddlEnvironments: Array<EnviObj>;
    whereValue: Array<WhereValueObj>;
    fromValue: Array<FromValueObj>;
    navigationConst: any;
    listEnvironments: Array<EnvisObj>;

    constructor() {
        this.urlJson = "";
        this.enviromentUrl = environment.isCore ? environment.FoundationR3Url + "/v2.1" : environment.FoundationR3Url + "/v1";
        this.apiQryPaging = URLConstant.GetPagingObjectBySQL;
        this.pagingJson = "";
        this.isReady = false;
        this.addCritInput = new Array<CriteriaObj>();
        this.ddlEnvironments = new Array<EnviObj>();
        this.listEnvironments = new Array<EnvisObj>();
        this.listEnvironments.push({ environment: "FOU", url: environment.FoundationR3Url + "/v1" });
        this.listEnvironments.push({ environment: "FOU_WEB", url: environment.FoundationR3Web });
        this.whereValue = new Array<WhereValueObj>();
        this.fromValue = new Array<FromValueObj>();
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

export class FromValueObj {
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