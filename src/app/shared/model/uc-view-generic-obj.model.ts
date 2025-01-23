import { NavigationConstant } from "../NavigationConstant";
import { URLConstant } from "../constant/URLConstant";

export class UcViewGenericObj {
    viewInput: string;
    viewEnvironment: string;
    ddlEnvironments: Array<EnviObj>;
    whereValue: Array<WhereValueObj>;
    navigationConst: any;
    listEnvironments: Array<EnvisObj>;
    IsCard: boolean;
    dataInput: any;

    constructor() {
        this.viewInput = "";
      this.viewEnvironment = URLConstant.env.LocalHostBE + '/v1';  //Ubah ke local host masing-masing
        this.ddlEnvironments = new Array<EnviObj>();
        this.listEnvironments = new Array<EnvisObj>();
        this.listEnvironments.push({ environment: "FOU", url: URLConstant.env.FoundationR3Url + '/v1' });
        this.listEnvironments.push({ environment: "FOU_WEB", url: URLConstant.env.FoundationR3Web });
        this.whereValue = new Array<WhereValueObj>();
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

export class EnvisObj {
    environment: string;
    url: string;

    constructor() {
        this.environment = "";
        this.url = "";
    }
}
