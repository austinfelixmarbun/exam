import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AdInsHelper } from './shared/AdInsHelper';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { CommonConstant } from './shared/constant/CommonConstant';
import { URLConstant } from './shared/constant/URLConstant';
import { NavigationConstant } from './shared/NavigationConstant';
import { UrlConstantNew } from './shared/constant/URLConstantNew';
// import * as signalR from '@aspnet/signalr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


    private _hubConnection: HubConnection;
    //TEST PUSH MASTER 5
    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router
      , private UrlConstantNew: UrlConstantNew) { }
 
    ngOnInit(): void {
        Object.defineProperty(WebSocket, 'OPEN', { value: 1, });

        if (AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS) != null) {
            // this.checkisEODforlogout();
            // this.validateIp();
        }
        const appVersion = require('../../package.json').version;
        localStorage.setItem("Version", appVersion);
    }

    checkisEODforlogout(){
        this.http.post(this.UrlConstantNew.GetSysCtrlCoyBySysKey, {Code: CommonConstant.IsEodRun}).subscribe(
            (response) => {
              if(response["SysValue"] == '1')
              {
                localStorage.setItem("IsEod",response["SysValue"] );
                this.logout();
              }
            }
          );
    }

    validateIp(){
        let context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        this.http.post(this.UrlConstantNew.GetRefUserByUsername, {Username: context[CommonConstant.USER_NAME]}).subscribe(
            (response) => {
              if(response["LastIpAddress"] != localStorage.getItem("LocalIp"))
              {        
                let version = localStorage.getItem(CommonConstant.VERSION);
                localStorage.clear();
                localStorage.setItem("Version", version);
                this.cookieService.removeAll();
                window.location.reload();
              }
            }
          );
    }

    logout() {
        var url = this.UrlConstantNew.LogoutAuth;
        this.http.post(url, {}).subscribe();
        AdInsHelper.ClearAllLog(this.cookieService);
        this.cookieService.removeAll();
        this.router.navigate([NavigationConstant.PAGES_LOGIN]);
    }
}