import { formatDate } from "@angular/common";
import { AdInsConstant } from "./AdInstConstant";

export class AdInsHelper{
    //Function
    public static InsertLog(url,type,param="") {
        let today = new Date();
        var dateNow = formatDate(today, 'yyyy-MM-dd hh:mm:ss', 'en-US');

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
        // localStorage.removeItem("UserContext");
        // localStorage.removeItem("PageAccess");
        // localStorage.removeItem("RoleId");
        // localStorage.removeItem("Username");
        // localStorage.removeItem("BusinessDate");
        // localStorage.removeItem("UserAccess");
        // localStorage.removeItem("Token");
        // localStorage.removeItem("Menu");

        localStorage.clear();
    }

    public static ClearPageAccessLog(){
        localStorage.removeItem("PageAccess");
    }

    public static CheckSessionTimeout(){
        let today = new Date();
        var businessDtBefore = localStorage.getItem("LastAccessTime");
        var businessDtNow = formatDate(today, 'yyyy-MM-dd HH:mm:ss', 'en-US');
        if(businessDtBefore==undefined || businessDtBefore==null)
        {
            localStorage.setItem("LastAccessTime",businessDtNow);
        }
        else
        {
            var bsDtBefore = new Date(businessDtBefore);
            var tempDate = today.getTime()-bsDtBefore.getTime();
            console.log(tempDate);
            if(tempDate>AdInsConstant.TimeoutSession)
            {
                var data = {status:"001",reason:"Session Time Out"};
                AdInsHelper.ClearAllLog();
                return "1";
            }
            localStorage.setItem("LastAccessTime",businessDtNow);
        }
        return "0";

    }

    public static IsGrantAccess(formPath)
    {
        var temp = localStorage.getItem("Menu");
        var objectMenu = [];
        objectMenu = JSON.parse(temp);
        var exsisting=objectMenu.find(x=>x.path === formPath);
        if(exsisting==undefined){
            return false;
        }
        return true;
    }
}
