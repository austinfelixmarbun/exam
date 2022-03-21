import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { NavigationConstant } from "app/shared/NavigationConstant";
import { environment } from "environments/environment";

export class UcModuleSelectionObj {
    urlJson: string;
    urlLogo: string;
    listApis: Object;
    target: string;

    constructor(private UrlConstantNew: UrlConstantNew) {
        this.urlJson = '';
        this.urlLogo = 'assets/img/logo-01.png';
        this.listApis = new Object();
        this.listApis['FOU_WEB'] = this.UrlConstantNew.env.FoundationR3Web + NavigationConstant.PAGES_LOGIN;
        this.listApis['LOS_WEB'] = this.UrlConstantNew.env.losR3Web + NavigationConstant.PAGES_LOGIN;
        this.target = '_self';
    }
}

export class UcModuleSelectionConstant {
    public static TOKEN = "XSRF-TOKEN";
}