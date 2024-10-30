import { URLConstant } from "app/shared/constant/URLConstant";
import { NavigationConstant } from "app/shared/NavigationConstant";

export class UcModuleSelectionObj {
    urlJson: string;
    urlLogo: string;
    listApis: Object;
    target: string;

    constructor() {
        this.urlJson = '';
        this.urlLogo = 'assets/img/logo-01.png';
        this.listApis = new Object();
        this.listApis['FOU_WEB'] = URLConstant.env.FoundationR3Web + NavigationConstant.PAGES_LOGIN;
        this.listApis['LOS_WEB'] = URLConstant.env.losR3Web + NavigationConstant.PAGES_LOGIN;
        this.listApis['CMS_WEB'] = URLConstant.env.cmsR3Web + NavigationConstant.PAGES_LOGIN;
        this.listApis['AMS_WEB'] = URLConstant.env.amsR3Web + NavigationConstant.PAGES_LOGIN;
        this.listApis['LMS_WEB'] = URLConstant.env.lmsR3Web + NavigationConstant.PAGES_LOGIN;
        this.target = '_self';
    }
}

export class UcModuleSelectionConstant {
    public static TOKEN = "XSRF-TOKEN";
}