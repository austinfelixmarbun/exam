import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RolePickService} from 'app/shared/rolepick/rolepick.service'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { formatDate } from '@angular/common';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    providers:[RolePickService]
})

export class NavbarComponent implements AfterViewChecked, OnInit {
    currentLang = 'en';
    toggleClass = 'ft-maximize';
    placement = 'bottom-right'
    displayName : string;
    userId : string;
    roleName : string;
    officeName : string;
    businessDate : string;
    public isCollapsed = true;
    token : string;
    userAccess : any;
    backgroundColor = environment.navbarColor;

    notifications: object[] = [];

    constructor(public translate: TranslateService,
        private router: Router,
        private http:HttpClient,public rolePickService: RolePickService) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|id|pt|de/) ? browserLang : 'en');
        var userAccess = JSON.parse(localStorage.getItem("UserAccess")); 
        var businessDate = localStorage.getItem("BusinessDate");
        var date = new Date(businessDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        businessDate = formatDate(date, 'dd-MMM-yyyy', 'en-US');
        this.businessDate = businessDate;
        this.userId = "User1";
        // this.userId = userAccess.userId;
        this.userAccess = userAccess;
        this.displayName = "User1";
        // this.displayName = userAccess.userId + ", " + userAccess.roleName + " - " + userAccess.officeName + " - " + businessDate;
    }

    ngOnInit(){
        var _hubConnection = new HubConnectionBuilder()
                            .withUrl(environment.FoundationR3Url)
                            .withAutomaticReconnect()
                            .build();

        _hubConnection.start()
                        .then(() => console.log("Connection Started !"))
                        .then(() => _hubConnection.invoke("SubscribeNotification", "TESTER", "ADMIN"))
                        .catch((e) => console.log("Exception : " + e));

        _hubConnection.on("GetUserNotification", (response) => {
            console.log("Response : " + response);
            this.notifications = JSON.parse(response);
        });

        _hubConnection.on("ReceiveNotification", (response) => {
            console.log("Response API : " + response);
            this.notifications.push({title: response, desc: "User " + response});
        });
    }

    InitNotification(){
        
    }

    ngAfterViewChecked() {

        // setTimeout(() => {
        //     var wrapperDiv = document.getElementsByClassName("wrapper")[0];
        //     var dir = wrapperDiv.getAttribute("dir");           
        //     if (dir == 'rtl') {
        //         this.placement = 'bottom-left';
        //     }
        //     else if (dir == 'ltr') {
        //         this.placement = 'bottom-right';
        //     }
        // }, 3000);

        
    }

    logout(){
        var url = environment.foundationUrl+AdInsConstant.Logout;
        this.http.post(url,"");
        AdInsHelper.ClearAllLog();
        this.router.navigate(['pages/login']);
    }

    ShowRole(){
        var data = {status:"200",reason:"OK"};
        this.rolePickService.openDialog(data,"modal");
    }


    ChangeLanguage(language: string) {
        this.translate.use(language);
    }

    changeModul(modul : string) {
        var token = localStorage.getItem("Token");
        var url = environment.losUrl +"?token="+token;
        window.open( url , "_blank");
    }

    ToggleClass() {
        if (this.toggleClass == 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        }
        else
            this.toggleClass = 'ft-maximize'
    }
}
