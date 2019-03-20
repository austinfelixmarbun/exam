import { formatDate } from "@angular/common";

export class AdInsHelper{
    //Function
    public static InsertLog(url,type,param="") {
        let today = new Date();
        var dateNow = formatDate(today, 'dd-MM-yyyy hh:mm:ss', 'en-US');

        var listPageAccess = [];
        listPageAccess = JSON.parse(localStorage.getItem("PageAccess"));
        var pageAccess = listPageAccess;
        if (listPageAccess == null) {
            pageAccess = [];
        }
        else {
            pageAccess = listPageAccess;
        }
        var pageAccessNow = {
            CurrentUrl: url,
            UrlAccessTime: dateNow,
            Type: type
        }
        pageAccess.push(pageAccessNow);
        localStorage.setItem('PageAccess', JSON.stringify(pageAccess));
    }

    public static ClearAllLog(){
        localStorage.removeItem("UserContext");
        localStorage.removeItem("PageAccess");
        localStorage.removeItem("RoleId");
        localStorage.removeItem("Username");
        localStorage.removeItem("BusinessDate");
        localStorage.removeItem("UserAccess");
        localStorage.removeItem("Token");
        localStorage.removeItem("Menu");
    }

    public static ClearPageAccessLog(){
        localStorage.removeItem("PageAccess");
    }
}