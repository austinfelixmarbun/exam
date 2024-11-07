import { Component, AfterViewChecked, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RolePickService } from 'app/shared/rolepick/rolepick.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { formatDate } from '@angular/common';
import { NotificationHObj } from '../model/notification-h/notification-h-obj.model';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { CommonConstant } from '../constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from '../NavigationConstant';
import { StorageService } from '../services/StorageService';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { AdInsHelperService } from '../services/AdInsHelper.service';
import { RolePickNewService } from '../rolepick/rolepick-new.service';
import { UcnotificationComponent } from '@adins/ucnotification';
import { UcNotificationObj } from '../model/uc-notification-obj.model';
import { ConfinsAuthService } from '../auth/confins-auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UcloginhistComponent } from '@adins/ucloginhist';
import { URLConstant } from '../constant/URLConstant';
import { NgxRouterService } from '@adins/fe-core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
   // providers: [NGXToastrService]
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
    NotificationObj: UcNotificationObj = new UcNotificationObj(this.cookieService);
    IsUseNotification: string = '';
    @ViewChild('appnotif') appnotif: UcnotificationComponent;

    passwordExpirationObj: any = {
        isNotify: false
    };

    notifications: object[] = [];

    readonly ChangeLink: string = NavigationConstant.PAGES_CHANGE_PASSWORD;
    constructor(public translate: TranslateService, 
        private route: ActivatedRoute,
        private authService: ConfinsAuthService,
        private router: Router, private cookieService: CookieService, private strService: StorageService,
        private http: HttpClient, public rolePickService: RolePickService, private toastr: NGXToastrService,
        private adInsHelperService: AdInsHelperService,
        private rolePickNewService: RolePickNewService,
        public dialog: MatDialog,
        private ngxRouter: NgxRouterService) {
        const lastLangUsed = localStorage.getItem(CommonConstant.LANG);
        const _browserLang: string = lastLangUsed ?? translate.getBrowserLang();
        const browserLang = _browserLang.match(/en|id|pt|de/) ? _browserLang : 'en';
        translate.use(browserLang);
        this.currentLang = browserLang;
        this.route.queryParams.subscribe(params => {
            const queryParams = this.ngxRouter.getQueryParams(params);
            if (queryParams.showLoginHistory == 1) {
                this.showLoginHistory();
                window.history.replaceState({}, "", window.location.href.split("?")[0])
            }
        })
    }

    needUnsubscribe(){
        if(AdInsHelper.GetLocalStorage(CommonConstant.GSCodeIsUseNotification) == '1' && this.appnotif){
            this.appnotif.UnsubNotification();
        }
    }

    async ngOnInit() {
        this.checkUseNotification();
        this.checkPasswordExpiration();
        this.setUser();
        Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
        
        // var _hubConnection = new HubConnectionBuilder()
        //     .withUrl(URLConstant.WebSocketUrl)
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
        this.http.post(URLConstant.UpdateReadNotification, { Id: item.NotificationDId }).subscribe(
            (response) => {
            });
        if (item.MrNotificationMethodCode == CommonConstant.NOTIF_METHOD_EXT_LINK) {
            window.open(item.Url, "_blank");
        }
        else if (item.MrNotificationMethodCode = CommonConstant.NOTIF_METHOD_INT_LINK) {
            window.open(item.Url);
        }
    }

    notifLogoutHandler(event){
        if(event) {
            this.logout();
        }
    }

    checkUseNotification() {
        this.IsUseNotification = URLConstant.env.IseUseNotification;
        AdInsHelper.SetLocalStorage(CommonConstant.GSCodeIsUseNotification, URLConstant.env.IseUseNotification);
        if(this.IsUseNotification == "1") {
            this.NotificationObj.IsClickable = true;
        }
    }

    logout() {
        const logoutObj = {
            RefreshToken: this.authService.token?.RefreshToken
        };

        this.http.post(URLConstant.LogoutV2, logoutObj, AdInsConstant.SpinnerOptions).subscribe({
            next: () => {
                AdInsHelper.ClearAllLog(this.cookieService);
                this.clearSession();
                this.cookieService.removeAll();
                this.router.navigate([NavigationConstant.PAGES_LOGIN]);
                this.authService.revoke();
            }
        });
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
        this.strService.set(CommonConstant.LANG, language);
        this.translate.use(language);
    }

    changeModul(modul: string) {
        if(modul == 'cm') {
            this.router.navigate([NavigationConstant.PAGES_MODULE_SELECTION]);
        }
        else {
            var token = AdInsHelper.GetCookie(this.cookieService, CommonConstant.TOKEN);
            var url = URLConstant.env.losR3Web + NavigationConstant.PAGES_LOGIN + "?token=" + token;
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
            .withUrl(URLConstant.WebSocketUrl)
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

    showLoginHistory() {
        const user = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        const dialogConfig = new MatDialogConfig();
        const object = {
            id: user.RefUserId
        };  
        dialogConfig.id = 'login-history-modal';
        dialogConfig.width = '45%';
        dialogConfig.data = object;
        dialogConfig.backdropClass = "blur-bg";
        dialogConfig.maxHeight = '80vh';
        const dialogRef = this.dialog.open(UcloginhistComponent, dialogConfig);
        dialogRef.componentInstance['envi']  = URLConstant.env;
    }

    checkPasswordExpiration() {
        const useraccess: any = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        const data = AdInsHelper.GetCookie(this.cookieService, `PASSWORD_EXPIRATION_STATUS_${useraccess.RefUserId}`);
        if (data !== null && data !== undefined) {
            this.passwordExpirationObj = JSON.parse(data);
            return;
        }
        this.http.post(URLConstant.GetRefUserPasswordExpirationDtById, {id: useraccess.RefUserId}).subscribe(
            (res: any) => {
                this.passwordExpirationObj = {
                    username: res.Username,
                    isNotify: res.IsNotify,
                    remainingPasswordExpirationDays: res.RemainingPasswordExpirationDays,
                    passwordExpirationDt: res.PasswordExpirationDt
                };
                const expiredDt = new Date();
                expiredDt.setMinutes(expiredDt.getMinutes() + 10);
                AdInsHelper.SetCookie(this.cookieService, `PASSWORD_EXPIRATION_STATUS_${useraccess.RefUserId}`, JSON.stringify(this.passwordExpirationObj), {
                    expires: expiredDt
                });
            }
        )
    }

    private clearSession() {
      sessionStorage.clear();
      const event: CustomEvent = new CustomEvent<any>('user:logout');
      window.dispatchEvent(event);
    }
}
