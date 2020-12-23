import { Component, OnInit, AfterViewInit, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsHelper } from '../AdInsHelper';
import { URLConstant } from '../constant/URLConstant';
import { CookieOptions, CookieService } from 'ngx-cookie';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-rolepick',
  templateUrl: './rolepick.component.html'
})
export class RolepickComponent implements OnInit, AfterViewInit {
  listRole: any;
  cookieOptions: CookieOptions;

  ngAfterViewInit(): void {
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient, private router: Router, public dialog: MatDialog, private cookieService: CookieService) {
    this.listRole = data["response"];
  }

  chooseRole(item) {
    console.log('Shinano');
    var roleUrl = environment.FoundationR3Url + URLConstant.LoginByRole;
    var roleObject = {
      UserName: this.data.user,
      Password: this.data.pwd,
      OfficeCode: item.OfficeCode,
      RoleCode: item.RoleCode,
      JobTitleCode: item.JobTitleCode,
      RequestDateTime: item.BusinessDt,
      ModuleCode: environment.Module,
      Ip: "",
      RowVersion: ""

    };
    if (this.data.pwd == null) {
      var updateRoleUrl = environment.FoundationR3Url + URLConstant.UpdateToken;
      this.http.post(updateRoleUrl, roleObject, { withCredentials: true}).subscribe(
        (response) => {
          localStorage.setItem("Token", response["Token"]);
          //localStorage.setItem("Menu", JSON.stringify(response["Menu"]));
          localStorage.setItem("EnvironmentModule", environment.Module);
          AdInsHelper.CreateUserAccess(this.cookieService, response);

          const cookieOptions: CookieOptions = {httpOnly: false, secure: true, sameSite: 'lax', expires: response['Exp']};
          //this.cookieService.put('access_token', localStorage['Token'], cookieOptions);

          let currPath = this.router.routerState.snapshot.url;
          this.router.navigateByUrl("/pages/content", { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,[currPath],{});
            this.dialog.closeAll();
          });
        }
      );

    }
    else {
      this.http.post(roleUrl, roleObject, { withCredentials: true}).subscribe(
        (response) => {
          // localStorage.setItem("Token", response["Token"]);
          localStorage.setItem("Menu", JSON.stringify(response["Menu"]));
          localStorage.setItem("EnvironmentModule", environment.Module);
          AdInsHelper.CreateUserAccess(this.cookieService, response);

          var cookieOptions = <CookieOptions>{httpOnly: false, secure: true, sameSite: 'lax'};

          // const cookieOptions: CookieOptions = {httpOnly: false, secure: true, sameSite: 'lax'};
          var DateParse = formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US');
          this.cookieService.put("EnvironmentModule", environment.Module);

          //this.cookieService.put('access_token', response['Token']);
          this.cookieService.put("Menu", JSON.stringify(response["Menu"]));
          //this.cookieService.put('BusinessDateRaw', response["Identity"].BusinessDt);
          //this.cookieService.put("BusinessDate", DateParse);
          //this.cookieService.put("UserAccess", JSON.stringify(response["Identity"]));

          this.router.navigate(["/dashboard/dash-board"]);
          this.dialog.closeAll();
        }
      );
    }
  }

  ngOnInit() {
  }
}
