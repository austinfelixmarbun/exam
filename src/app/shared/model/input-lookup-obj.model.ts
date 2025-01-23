import { URLConstant } from "../constant/URLConstant"

export class InputLookupObj {
    urlJson: string;
    urlQryPaging: string;
    urlEnviPaging: string;
    _url: any
    nameSelect: any
    idSelect: any
    jsonSelect: any
    addCritInput: any
    isRequired: boolean
    pagingJson: any
    genericJson: any
    isReadonly: boolean
    isReady: boolean
    isDisable: boolean
    ddlEnvironments: Array<EnviObj>;
    listEnvironments: Array<EnvisObj>;
    title: any;
    isClear : boolean;
    
    constructor() {
        this.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
        this.urlQryPaging = URLConstant.GetPagingObjectBySQL; //taruh di adins constant
        this.urlEnviPaging = URLConstant.env.LocalHostBE + "/v1"; //Ubah sesuai local host msg"
        this.jsonSelect = "";
        this.idSelect = "";
        this.nameSelect = "";
        this.addCritInput = null;
        this.ddlEnvironments = new Array<EnviObj>();
        this.listEnvironments = new Array<EnvisObj>();
        this.listEnvironments.push({ environment: "FOU", url: URLConstant.env.FoundationR3Url  + "/v1"});
        this.listEnvironments.push({ environment: "FOU_WEB", url: URLConstant.env.FoundationR3Web });
        this.isRequired = true;
        this.isReadonly = true;
        this.isReady = false;
        this.title = "";
        this.isDisable = false;
        this.isClear = false;
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
export class EnvisObj {
    environment: string;
    url: string;

    constructor() {
        this.environment = "";
        this.url = "";
    }
}