import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RolePickService } from 'app/shared/rolepick/rolepick.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { formatDate } from '@angular/common';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { NotificationHObj } from '../model/NotificationH/NotificationHObj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from '../constant/URLConstant';
import { CommonConstant } from '../constant/CommonConstant';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    providers: [RolePickService, NGXToastrService]
})

export class NavbarComponent implements AfterViewChecked, OnInit {
    currentLang = 'en';
    toggleClass = 'ft-maximize';
    placement = 'bottom-right'
    displayName: string;
    userId: string;
    roleName: string;
    officeName: string;
    businessDate: string;
    public isCollapsed = true;
    token: string;
    userAccess: any;
    backgroundColor = environment.navbarColor;
    NotificationHListObj = new Array<NotificationHObj>();
    TotalUnread: number = 0;

    notifications: object[] = [];

    constructor(public translate: TranslateService,
        private router: Router, private cookieService: CookieService,
        private http: HttpClient, public rolePickService: RolePickService, private toastr: NGXToastrService) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|id|pt|de/) ? browserLang : 'en');
        var userAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        var businessDate = AdInsHelper.GetCookie(this.cookieService, CommonConstant.BUSINESS_DATE);
        var date = new Date(businessDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        businessDate = formatDate(date, 'dd-MMM-yyyy', 'en-US');
        this.businessDate = businessDate;
        // this.userId = userAccess.userId;
        this.userAccess = userAccess;
        //this.displayName = userAccess.userId + ", " + userAccess.roleName + " - " + userAccess.officeName + " - " + businessDate;
    }

    ngOnInit() {
        this.GetListNotifH();
    }

    GetListNotifH() {
        var requestObj = {
            isLoading: false
        };
        this.http.post(URLConstant.GetListNotificationHByRefUserId, { isLoading: false }).subscribe(
            (response) => {
                this.TotalUnread = response["TotalUnreadNotification"];
                this.NotificationHListObj = response["ResponseNotificationHCustomObjs"];
            });
    }

    InitNotification() {
    }

    ngAfterViewChecked() {
    }

    ClickNotification(item) {
        this.http.post(URLConstant.UpdateReadNotification, { NotificationDId: item.NotificationDId }).subscribe(
            (response) => {
            });
        if (item.MrNotificationMethodCode == CommonConstant.NotificationMethodExtLink) {
            window.open(item.Url, "_blank");
        }
        else if (item.MrNotificationMethodCode = CommonConstant.NotificationMethodIntLink) {
            window.open(item.Url);
        }
    }

    logout() {
        var url = environment.FoundationR3Url + AdInsConstant.Logout;
        this.http.post(url, "");
        AdInsHelper.ClearAllLog(this.cookieService);
        this.cookieService.removeAll();
        this.router.navigate(['pages/login']);
    }

    ShowRole() {
        var data = { status: "200", reason: "OK" };
        this.rolePickService.openDialog(data, "modal");
    }


    ChangeLanguage(language: string) {
        this.translate.use(language);
    }

    changeModul(modul: string) {
        var token = AdInsHelper.GetCookie(this.cookieService, CommonConstant.TOKEN);
        var url = environment.LosURL + URLConstant.LoginURLFrontEnd + "?token=" + token;
        window.open(url, "_blank");
    }

    ToggleClass() {
        if (this.toggleClass == 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        }
        else
            this.toggleClass = 'ft-maximize'
    }
}
