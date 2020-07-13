import { Component, OnInit, AfterViewInit, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsHelper } from '../AdInsHelper';
import { URLConstant } from '../constant/URLConstant';

@Component({
  selector: 'app-rolepick',
  templateUrl: './rolepick.component.html'
})
export class RolepickComponent implements OnInit, AfterViewInit {
  listRole: any;

  ngAfterViewInit(): void {
    console.log("Role Pick");
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private router: Router) {
    this.listRole = data["response"];
  }

  chooseRole(item) {
    console.log(item);
    var url = environment.FoundationR3Url + URLConstant.GetAllActiveRefFormByRefRoleId;
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
      this.http.post(updateRoleUrl, roleObject).subscribe(
        (response) => {
          localStorage.setItem("Token", response["Token"]);
          localStorage.setItem("Menu", JSON.stringify(response["Menu"]));
          AdInsHelper.CreateUserAccess(response);
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );

    }
    else {
      this.http.post(roleUrl, roleObject).subscribe(
        (response) => {
          localStorage.setItem("Token", response["Token"]);
          localStorage.setItem("Menu", JSON.stringify(response["Menu"]));
          AdInsHelper.CreateUserAccess(response);
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit() {
    console.log("Role Pick");
  }
}
