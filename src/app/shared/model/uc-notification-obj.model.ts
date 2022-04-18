import { environment } from "environments/environment";
import { CookieService } from "ngx-cookie";
import { AdInsHelper } from "../AdInsHelper";
import { CommonConstant } from "../constant/CommonConstant";
import { UrlConstantNew } from "../constant/URLConstantNew";

export class UcNotificationObj {
    Username: string;
    EnvUrl: string;
    PathUrlSubs: string;
    PathUrlUnsubs: string;
    PathUrlGetAllNotif: string;
    PublicKey: string;

    constructor(private cookieService: CookieService, private UrlConstantNew: UrlConstantNew) {
        let context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        this.Username = context[CommonConstant.USER_NAME];;
        this.EnvUrl = this.UrlConstantNew.env.NotificationUrl;
        this.PathUrlSubs = "";
        this.PathUrlUnsubs = "";
        this.PathUrlGetAllNotif = "";
        this.PublicKey = environment.NotificationPublicKey;
    }
}