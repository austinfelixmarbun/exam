import { Component, AfterViewChecked, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RolePickService } from 'app/shared/rolepick/rolepick.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { formatDate } from '@angular/common';
import { NotificationHObj } from '../model/notification-h/notification-h-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from '../constant/URLConstant';
import { CommonConstant } from '../constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from '../NavigationConstant';
import { StorageService } from '../services/StorageService';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { UrlConstantNew } from '../constant/URLConstantNew';
import { AdInsHelperService } from '../services/AdInsHelper.service';
import { RolePickNewService } from '../rolepick/rolepick-new.service';
import { UcnotificationComponent } from '@adins/ucnotification';
import { UcNotificationObj } from '../model/uc-notification-obj.model';
import { GenericObj } from '../model/generic/generic-obj.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    providers: [NGXToastrService]
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
    NotificationObj: UcNotificationObj = new UcNotificationObj(this.cookieService, this.UrlConstantNew);
    IsUseNotification: number = 0;
    @ViewChild('appnotif') appnotif: UcnotificationComponent;

    notifications: object[] = [];

    readonly ChangeLink: string = NavigationConstant.PAGES_CHANGE_PASSWORD;
    constructor(public translate: TranslateService,
        private router: Router, private cookieService: CookieService, private strService: StorageService,
        private http: HttpClient, public rolePickService: RolePickService, private toastr: NGXToastrService, 
        private UrlConstantNew: UrlConstantNew,
        private adInsHelperService: AdInsHelperService,
        private rolePickNewService: RolePickNewService) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|id|pt|de/) ? browserLang : 'en');
    }

    ngOnInit() {
        this.checkUseNotification();
        this.GetListNotifH();
        this.setUser();
        Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
        
        this.setUser();
        console.log(this.userAccess.UserName);
        // var _hubConnection = new HubConnectionBuilder()
        //     .withUrl(this.UrlConstantNew.WebSocketUrl)
        //     .withAutomaticReconnect()
        //     .build();

        // _hubConnection.start()
        //     .then(() => console.log("Connection Started !"))
        //     .then(() => _hubConnection.invoke("SubscribeNotification", this.userAccess.UserName, this.userAccess.RoleCode))
        //     .catch((e) => console.log("Exception : " + e));

        // _hubConnection.on("ReceiveNotification", (response) => {
        //     console.log("Response API : " + response);
        //     if (response.type == "SUCCESS") {
        //         this.toastr.successMessageTitle(response.title, response.message);
        //     }
        //     else if (response.type == "ERROR") {
        //         this.toastr.errorMessageTitle(response.title, response.message);
        //     }
        //     else if (response.type == "INFO") {
        //         this.toastr.infoMessageTitle(response.title, response.message);
        //     }
        //     else if (response.type == "INFO" && response.removeLocalCookie == true) {
        //         this.toastr.infoMessageTitleTimeout(response.title, response.message, 8000);
        //     }

        //     //this.GetListNotifH();
        //     if (response.isNeedLogout == true) {
        //         this.adInsHelperService.ForceLogOut(this.cookieService, response.timeLogOut, this.toastr, this.http);
        //     }
        //     //this.notifications.push({ title: response, desc: "User " + response });
        // });
        // this.connectWebSocket();
    }
    
    setUser(){
        this.userAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        let businessDate = AdInsHelper.GetCookie(this.cookieService, CommonConstant.BUSINESS_DATE);
        let date = new Date(businessDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        businessDate = formatDate(date, 'dd-MMM-yyyy', 'en-US');
        this.businessDate = businessDate;
    }

    GetListNotifH() {
        var requestObj = {
            isLoading: false
        };
        this.http.post(this.UrlConstantNew.GetListNotificationHByRefUserId, { isLoading: false }).subscribe(
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
        this.http.post(this.UrlConstantNew.UpdateReadNotification, { Id: item.NotificationDId }).subscribe(
            (response) => {
            });
        if (item.MrNotificationMethodCode == CommonConstant.NotificationMethodExtLink) {
            window.open(item.Url, "_blank");
        }
        else if (item.MrNotificationMethodCode = CommonConstant.NotificationMethodIntLink) {
            window.open(item.Url);
        }
    }

    notifLogoutHandler(event){
        if(event) {
            this.logout();
        }
    }

    checkUseNotification() {
        let reqByCode: GenericObj = new GenericObj();
        reqByCode.Code = CommonConstant.GSCodeIsUseNotification;
        this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, reqByCode).subscribe(
            response => {
                this.IsUseNotification = response['GsValue'];
            }
        )
    }

    logout() {
        this.http.post(this.UrlConstantNew.Logout, "", AdInsConstant.SpinnerOptions);
        AdInsHelper.ClearAllLog(this.cookieService);
        this.appnotif.UnsubNotification();
        this.cookieService.removeAll();
        this.router.navigate([NavigationConstant.PAGES_LOGIN]);
    }

    ShowRole() {
        var data = { status: "200", reason: "OK" };

        let isUseNewRolepick: string = AdInsHelper.GetLocalStorage(CommonConstant.IS_USE_NEW_ROLEPICK);
        if(isUseNewRolepick == '0'){
            this.rolePickService.openDialog(data, "modal");
        }
        else {
            this.rolePickNewService.openDialog(data, "modal");
        }
    }


    ChangeLanguage(language: string) {
        localStorage.setItem('lang',language);
        this.strService.set('lang', language);
        this.translate.use(language);
    }

    changeModul(modul: string) {
        if(modul == 'cm') {
            this.router.navigate([NavigationConstant.PAGES_MODULE_SELECTION]);
        }
        else {
            var token = AdInsHelper.GetCookie(this.cookieService, CommonConstant.TOKEN);
            var url = this.UrlConstantNew.env.losR3Web + NavigationConstant.PAGES_LOGIN + "?token=" + token;
            window.open(url, "_blank");
        }
        
    }

    ToggleClass() {
        if (this.toggleClass == 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        }
        else
            this.toggleClass = 'ft-maximize'
    }

    connectWebSocket(){
        Object.defineProperty(WebSocket, 'OPEN', { value: 1, });

        console.log(this.userAccess.UserName);
        var _hubConnection = new HubConnectionBuilder()
            .withUrl(this.UrlConstantNew.WebSocketUrl)
            .withAutomaticReconnect()
            .build();

        _hubConnection.start()
            .then(() => console.log("Connection Started !"))
            .then(() => _hubConnection.invoke("SubscribeNotification", this.userAccess.UserName, this.userAccess.RoleCode))
            .catch((e) => console.log("Exception : " + e));

        _hubConnection.on("ReceiveNotification", (response) => {
            console.log("Response API : " + response);
            if (response.type == "SUCCESS") {
                this.toastr.successMessageTitle(response.title, response.message);
            }
            else if (response.type == "ERROR") {
                this.toastr.errorMessageTitle(response.title, response.message);
            }
            else if (response.type == "INFO") {
                this.toastr.infoMessageTitle(response.title, response.message);
            }


            this.GetListNotifH();
            if (response.isNeedLogout == true) {
                this.adInsHelperService.ForceLogOut(this.cookieService, response.timeLogOut, this.toastr, this.http);
            }
            //this.notifications.push({ title: response, desc: "User " + response });
        });
    }
}
