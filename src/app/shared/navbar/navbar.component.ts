import { Component, AfterViewChecked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RolePickService} from '../rolepick/rolepick.service'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { AdInsConstant } from '../AdInstConstant';
import { Router } from '@angular/router';
import { AdInsHelper } from '../AdInsHelper';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    providers:[RolePickService]
})

export class NavbarComponent implements AfterViewChecked {
    currentLang = 'en';
    toggleClass = 'ft-maximize';
    placement = 'bottom-right'
    displayName : string;
    public isCollapsed = true;

    constructor(public translate: TranslateService,
        private router: Router,
        private http:HttpClient,public rolePickService: RolePickService) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|id|pt|de/) ? browserLang : 'en');
        var userAccess = JSON.parse(localStorage.getItem("UserAccess")); 
        var businessDate = localStorage.getItem("BusinessDate");
        this.displayName = userAccess.userId + ", " + userAccess.roleName + " - " + userAccess.officeName + " - " + businessDate;
    }

    ngAfterViewChecked() {

        // setTimeout(() => {
        //     var wrapperDiv = document.getElementsByClassName("wrapper")[0];
        //     var dir = wrapperDiv.getAttribute("dir");           
        //     if (dir === 'rtl') {
        //         this.placement = 'bottom-left';
        //     }
        //     else if (dir === 'ltr') {
        //         this.placement = 'bottom-right';
        //     }
        // }, 3000);

        
    }

    logout(){
        var url = environment.coreUrl+AdInsConstant.Logout;
        this.http.post(url,"");
        AdInsHelper.ClearAllLog();
        this.router.navigate(['pages/login']);
    }

    ShowRole(){
        // var apiUrl = environment.coereUrl+AdInsConstant.GetRefRole;
        // this.http.post(apiUrl,)
        console.log("Show Role");
        var data = {status:"200",reason:"OK"};
        this.rolePickService.openDialog(data,"modal");
    }


    ChangeLanguage(language: string) {
        this.translate.use(language);
    }

    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        }
        else
            this.toggleClass = 'ft-maximize'
    }
}
