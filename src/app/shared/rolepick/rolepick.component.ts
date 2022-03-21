import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsHelper } from '../AdInsHelper';
import { CookieOptions, CookieService } from 'ngx-cookie';
import { formatDate } from '@angular/common';
import { CommonConstant } from '../constant/CommonConstant';
import { NavigationConstant } from '../NavigationConstant';
import { AdInsConstant } from '../AdInstConstant';
import { StorageService } from '../services/StorageService';
import { UcDropdownSearchConstant, UcDropdownSearchObj } from '../model/library/uc-dropdown-search-obj.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rolepick',
  templateUrl: './rolepick.component.html'
})
export class RolepickComponent implements OnInit, AfterViewInit {
  listRole: any;
  refUser: any;
  cookieOptions: CookieOptions;
  officeDropdownSearchObj: UcDropdownSearchObj = new UcDropdownSearchObj();
  rolesDropdownSearchObj: UcDropdownSearchObj = new UcDropdownSearchObj();
  selectedOffice: number = -1;
  selectedRole: number= -1;
  tempList: Array<any> = new Array<any>();

  RolepickForm = this.fb.group({
    Office: ['', [Validators.required]],
    Role: ['', [Validators.required]],
  });

  ngOnInit() {
    this.officeDropdownSearchObj.ddsType = UcDropdownSearchConstant.DDL_TYPE_ONE;
    this.officeDropdownSearchObj.isObject = true;
    this.officeDropdownSearchObj.placeholder = "Choose your office";
    this.officeDropdownSearchObj.isSelectOutput = true;
    this.officeDropdownSearchObj.customKey = "OfficeCode";
    this.officeDropdownSearchObj.customValue = "OfficeName";
    this.officeDropdownSearchObj.isCustomList = true;

    this.rolesDropdownSearchObj.ddsType = UcDropdownSearchConstant.DDL_TYPE_ONE;
    this.rolesDropdownSearchObj.isObject = true;
    this.rolesDropdownSearchObj.placeholder = "Choose your role";
    this.rolesDropdownSearchObj.isSelectOutput = true;
    this.rolesDropdownSearchObj.customKey = "JobTitleAndRoleName";
    this.rolesDropdownSearchObj.customValue = "JobTitleAndRoleName";
    this.rolesDropdownSearchObj.isCustomList = true;
  }

  ngAfterViewInit(): void {
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private http: HttpClient, private router: Router, public dialog: MatDialog, private cookieService: CookieService, private strService: StorageService) {
    this.refUser = data["response"];
    this.listRole = data["response"]["RefUserRoles"];
  }

  setRole(event) {
    this.selectedRole = event.selectedObj.Index;
  }

  setOffice(event) {
    this.selectedOffice = event.selectedObj.Index;
    this.selectedRole = 0;
    this.rolesDropdownSearchObj.size = (this.listRole[event.selectedObj.Index].Roles.length) + 1;
    this.RolepickForm.patchValue({
      Office: event.selectedObj.OfficeName,
      Role: this.listRole[event.selectedObj.Index].Roles[0].JobTitleAndRoleName
    });
    this.rolesDropdownSearchObj.ddsValue = this.listRole[event.selectedObj.Index].Roles[0].JobTitleAndRoleName;
  }

  chooseRole(item) {
    var UserIdentityObj = {
      RefUserId: item.RefUserId,
      UserName: item.UserName,
      EmpNo: item.EmpNo,
      EmpName: item.EmpName,
      OfficeId: item.RefOfficeId,
      OfficeCode: item.OfficeCode,
      OfficeName: item.OfficeName,
      MrOfficeTypeCode: item.MrOfficeTypeCode,
      RoleId: item.RefRoleId,
      RoleCode: item.RoleCode,
      RoleName: item.RoleName,
      JobTitleId: item.RefJobTitleId,
      JobTitleCode: item.JobTitleCode,
      JobTitleName: item.JobTitleName,
      BusinessDt: item.BusinessDt,
      BusinessDtStr: item.BusinessDtStr,
      Email: item.Email1,
      CoyName: item.CoyName
    }

    var roleObject = {
      UserName: this.data.user,
      Password: this.data.pwd,
      OfficeCode: item.OfficeCode,
      RoleCode: item.RoleCode,
      JobTitleCode: item.JobTitleCode,
      RequestDateTime: item.BusinessDt,
      ModuleCode: environment.Module,
      RowVersion: "",
      UserIdentityObj: UserIdentityObj
    };

    if (this.data.pwd == null) {
      this.http.post(AdInsConstant.UpdateTokenV2, roleObject, { withCredentials: true }).subscribe(
        (response) => {
          //Cookie sudah diambil dari BE (Di set manual dulu)

          var DateParse = formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US');
          AdInsHelper.SetCookie(this.cookieService, CommonConstant.TOKEN, response['Token']);
          AdInsHelper.SetCookie(this.cookieService, "XSRF-TOKEN", response['Token']);
          AdInsHelper.SetCookie(this.cookieService, "BusinessDateRaw", formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US'));
          AdInsHelper.SetCookie(this.cookieService, "BusinessDate", DateParse);
          AdInsHelper.SetCookie(this.cookieService, "UserAccess", JSON.stringify(response["Identity"]));
          AdInsHelper.SetCookie(this.cookieService, "Username", JSON.stringify(response["Identity"]["UserName"]));
          AdInsHelper.SetLocalStorage(CommonConstant.ENVIRONMENT_MODULE, environment.Module);

          this.http.post(AdInsConstant.GetAllActiveRefFormByRoleCodeAndModuleCode, { RoleCode: item.RoleCode, ModuleCode: environment.Module }, { withCredentials: true }).subscribe(
            (response) => {
              AdInsHelper.SetLocalStorage(CommonConstant.MENU, JSON.stringify(response[CommonConstant.ReturnObj]));
              this.strService.set(AdInsConstant.WatchRoleState, true);
              this.router.navigateByUrl(NavigationConstant.DASHEMPTY, { skipLocationChange: true }).then(() => {
                AdInsHelper.RedirectUrl(this.router, [NavigationConstant.DASHBOARD], {}, true);
              });
              this.dialog.closeAll();
            });


        }
      );

    }
    else {
      this.http.post(AdInsConstant.LoginByRoleV2, roleObject, { withCredentials: true }).subscribe(
        (response) => {
          //Cookie sudah diambil dari BE (Di set manual dulu)

          this.http.post(AdInsConstant.CheckUserSessionLog, roleObject, { withCredentials: true }).subscribe(
            (response) => {});
          
          var DateParse = formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US');
          AdInsHelper.SetCookie(this.cookieService, CommonConstant.TOKEN, response['Token']);
          AdInsHelper.SetCookie(this.cookieService, "XSRF-TOKEN", response['Token']);
          AdInsHelper.SetCookie(this.cookieService, "BusinessDateRaw", formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US'));
          AdInsHelper.SetCookie(this.cookieService, "BusinessDate", DateParse);
          AdInsHelper.SetCookie(this.cookieService, "UserAccess", JSON.stringify(response["Identity"]));
          AdInsHelper.SetCookie(this.cookieService, "Username", JSON.stringify(response["Identity"]["UserName"]));
          AdInsHelper.SetLocalStorage(CommonConstant.ENVIRONMENT_MODULE, environment.Module);

          this.http.post(AdInsConstant.GetAllActiveRefFormByRoleCodeAndModuleCode, { RoleCode: item.RoleCode, ModuleCode: environment.Module }, { withCredentials: true }).subscribe(
            (response) => {
              AdInsHelper.SetLocalStorage(CommonConstant.MENU, JSON.stringify(response[CommonConstant.ReturnObj]));
              this.router.navigate([NavigationConstant.DASHBOARD]);
              this.dialog.closeAll();
            });
        }
      );
    }
  }
}
