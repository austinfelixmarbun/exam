import { environment } from "environments/environment";
import { NavigationConstant } from "../NavigationConstant";

export class UcViewGenericObj {
    viewInput: string;
    viewEnvironment: string;
    ddlEnvironments: Array<EnviObj>;
    whereValue: Array<WhereValueObj>;
    navigationConst: any;
    listEnvironments: Array<EnvisObj>;

    constructor() {
        this.viewInput = "";
        this.viewEnvironment = environment.FoundationR3Url;
        this.ddlEnvironments = new Array<EnviObj>();
        this.listEnvironments = new Array<EnvisObj>();
        this.listEnvironments.push({ environment: "FOU", url: environment.FoundationR3Url });
        this.listEnvironments.push({ environment: "FOU_WEB", url: environment.FoundationR3Web });
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