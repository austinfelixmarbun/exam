import { formatDate } from "@angular/common";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { environment } from "environments/environment";
import { CommonConstant } from "./constant/CommonConstant";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";

export class AdInsHelper {

    //Function
    public static InsertLog(cookieService: CookieService, url, type, param = "") {
        let today = new Date();
        var dateNow = formatDate(today, 'yyyy-MM-dd hh:mm:ss', 'en-US');

        var listPageAccess = [];
        listPageAccess = JSON.parse(localStorage.getItem(CommonConstant.PAGE_ACCESS));
        var userAcc = JSON.parse(cookieService.get(CommonConstant.USER_ACCESS));
        var pageAccess = listPageAccess;
        if (listPageAccess == null) {
            pageAccess = [];
        }
        else {
            pageAccess = listPageAccess;
        }
        if (userAcc != null) {
            var pageAccessNow = {
                CurrentUrl: url,
                UrlAccessTime: dateNow,
                Type: type,
                UserSessionLogId: userAcc.userSessionLogId
            }
        } else {
            var pageAccessNow = {
                CurrentUrl: url,
                UrlAccessTime: dateNow,
                Type: type,
                UserSessionLogId: null
            }
        }
        pageAccess.push(pageAccessNow);
        localStorage.setItem('PageAccess', JSON.stringify(pageAccess));
    }

    public static ForceLogOut(timeLeft, toastr) {
        let interval = setInterval(() => {
            if (timeLeft > 0) {
                console.log("Time Left : " + timeLeft)
                toastr.errorMessage("Automatic Log out at : " + timeLeft);
                timeLeft--;
            } else {
                this.ClearAllLog();
                window.location.reload();
            }
        }, 1000)
    }

    public static ClearAllLog() {
        let version = localStorage.getItem(CommonConstant.VERSION);
        localStorage.clear();
        localStorage.setItem("Version", version);
    }

    public static ClearPageAccessLog(cookieService: CookieService) {
        localStorage.removeItem("PageAccess");
        cookieService.remove("PageAccess");
    }

    public static CheckSessionTimeout(cookieService: CookieService) {
        let today = new Date();
        var businessDtBefore = cookieService.get(CommonConstant.LAST_ACCESS_TIME);
        var businessDtNow = formatDate(today, 'yyyy-MM-dd HH:mm:ss', 'en-US');
        if (businessDtBefore == undefined || businessDtBefore == null) {
            localStorage.setItem("LastAccessTime", businessDtNow);
            cookieService.put("LastAccessTime", businessDtNow);
        }
        else {
            var bsDtBefore = new Date(businessDtBefore);
            var tempDate = today.getTime() - bsDtBefore.getTime();
            if (tempDate > AdInsConstant.TimeoutSession) {
                var data = { status: "001", reason: "Session Time Out" };
                AdInsHelper.ClearAllLog();
                return "1";
            }
            localStorage.setItem("LastAccessTime", businessDtNow);
            cookieService.put("LastAccessTime", businessDtNow);
        }
        return "0";

    }

    public static CreateUserAccess(cookieService: CookieService, response) {
        var DateParse = formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US');
        localStorage.setItem("BusinessDateRaw", response["Identity"].BusinessDt);
        localStorage.setItem("BusinessDate", DateParse);
        localStorage.setItem("UserAccess", JSON.stringify(response["Identity"]));

        cookieService.put("BusinessDateRaw", response["Identity"].BusinessDt);
        cookieService.put("BusinessDate", DateParse);
        cookieService.put("UserAccess", JSON.stringify(response["Identity"]));
    }

    public static IsGrantAccess(cookieService: CookieService, formPath) {
        var temp = cookieService.get(CommonConstant.MENU);
        var objectMenu = [];
        objectMenu = JSON.parse(temp);
        if (objectMenu != null) {
            var exsisting = objectMenu['find'](x => x.path == formPath);
            if (exsisting == undefined) {
                return false;
            } else {
                return true;
            }
        }
    }


    public static transformAmount(element: any) {
        var formattedAmount = "";
        if (element.target.value != "") {

            if (parseFloat(element.target.value).toLocaleString('en') != "NaN") {
                formattedAmount = parseFloat(element.target.value).toLocaleString('en');
            }
            else {
                formattedAmount = "";
            }
        }
        return formattedAmount;
    }

    public static transformToDecimal(element: any) {
        var parsedValue = 0;
        if (element.target.value != "") {
            if (parseFloat(element.target.value.toString().replace(/,/g, '')).toString() != "NaN") {
                parsedValue = parseFloat(element.target.value.toString().replace(/,/g, ''));
            } else {
                return "";
            }
        }
        return parsedValue;
    }
    public static OpenCustomerViewByCustId(CustId) {
        var url = environment.FoundationR3Web + "/View/Customer/PersonalDetail?CustId=" + CustId;
        window.open(url, "_blank");
    }

    public static RedirectUrl(router: Router, url: Array<string>, queryParams: {}) {
        router.navigate(url, { queryParams: queryParams, skipLocationChange: true });
    }
    public static OpenProdOfferingViewByCodeAndVersion(Code, Version) {
        window.open(environment.FoundationR3Web + "/View/Offering?prodOfferingHId=0&prodOfferingCode=" + Code + "&prodOfferingVersion=" + Version, "_blank");
      }
}
