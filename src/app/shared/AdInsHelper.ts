import { formatDate } from "@angular/common";

export class AdInsHelper{
    //Function
    public static InsertLog(url,type,param="") {
        let today = new Date();
        var dateNow = formatDate(today, 'dd-MM-yyyy hh:mm:ss', 'en-US');

        var listPageAccess;
        listPageAccess = JSON.parse(localStorage.getItem("PageAccess"));
        var pageAccess;
        if (listPageAccess == null) {
            pageAccess = [];
        }
        else {
            pageAccess = listPageAccess;
        }
        var pageAccessNow = {
            CurrentUrl: url,
            UrlAccessTime: dateNow,
            Type: type,
            Param: param
        }
        pageAccess.push(pageAccessNow);
        localStorage.setItem('PageAccess', JSON.stringify(pageAccess));
    }
}