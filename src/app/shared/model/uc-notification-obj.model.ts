import { environment } from "environments/environment";
import { CookieService } from "ngx-cookie";
import { AdInsHelper } from "../AdInsHelper";
import { CommonConstant } from "../constant/CommonConstant";
import { URLConstant } from "../constant/URLConstant";

export class UcNotificationObj {
    Username: string;
    EnvUrl: string;
    PathUrlSubs: string;
    PathUrlUnsubs: string;
    PathUrlGetAllNotif: string;
    PathUrlUpdateReadNotif: string;
    PublicKey: string;
    ListEnvironments: Array<EnvisObj>;
    IsClickable: boolean;
    ClickMethodLink: string;
    IsReady: boolean;

    constructor(private cookieService: CookieService, ) {
        let context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        this.Username = context[CommonConstant.USER_NAME];
        this.EnvUrl = URLConstant.env.NotifEngineURL;
        this.PathUrlSubs = URLConstant.PushNotifSubscribe;
        this.PathUrlUnsubs = URLConstant.PushNotifUnsubscribe;
        this.PathUrlGetAllNotif = URLConstant.GetNotReadPushNotif;
        this.PathUrlUpdateReadNotif = URLConstant.UpdateReadPushNotif;
        this.PublicKey = environment.NotificationPublicKey;
        this.ListEnvironments = new Array<EnvisObj>();
        this.ListEnvironments.push({ environment: "FOU", url: URLConstant.env.FoundationR3Web});
        this.ListEnvironments.push({ environment: "LOS", url: URLConstant.env.losR3Web});
        this.IsClickable = false;
        this.ClickMethodLink = CommonConstant.NOTIF_METHOD_INT_LINK;
        this.IsReady = false;
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