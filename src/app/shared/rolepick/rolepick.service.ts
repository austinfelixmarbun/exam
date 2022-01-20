import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RolepickComponent } from 'app/shared/rolepick/rolepick.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { CurrentUserContextService } from 'app/shared/current-user-context/current-user-context.service';
import { AdInsHelper } from '../AdInsHelper';
import { CommonConstant } from '../constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { formatDate } from '@angular/common';
import { NavigationConstant } from '../NavigationConstant';
import { AdInsConstant } from '../AdInstConstant';

@Injectable()
export class RolePickService {
    constructor(public dialog: MatDialog, private http: HttpClient,
        private currentUserContextService: CurrentUserContextService,
        private router: Router, private cookieService: CookieService) { }
    openDialog(data, type = ""): void {
        if (type == "modal") {
            var roleObject2 = {
                RequestDateTime: AdInsHelper.GetCookie(this.cookieService, CommonConstant.BUSINESS_DATE_RAW),
                RowVersion: ""
            };

            this.http.post(AdInsConstant.LoginByTokenV2, roleObject2, AdInsConstant.SpinnerOptions).subscribe(
                (response) => {
                    const object = {
                        response: response[CommonConstant.ReturnObj]
                    };

                    const dialogRef = this.dialog.open(RolepickComponent, {
                        id: 'role-modal',
                        width: '85%',
                        // position: {
                        //     top: '12px'
                        // },
                        data: object
                    });

                    dialogRef.afterClosed().subscribe(result => {
                    });
                }
            );


        } else {
            if (data.response.length == 1 && type == "") {
                let item = data.response[0];
                let UserIdentityObj = {
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

                let roleObject = {
                    UserName: data.user,
                    Password: data.pwd,
                    OfficeCode: item.OfficeCode,
                    RoleCode: item.RoleCode,
                    JobTitleCode: item.JobTitleCode,
                    RequestDateTime: item.BusinessDt,
                    RowVersion: "",
                    Ip: "",
                    ModuleCode: environment.Module,
                    UserIdentityObj: UserIdentityObj
                };
                let SpinnerHeaders = new HttpHeaders({
                  'IsLoading': "true"
                });
                let SpinnerOptions = { headers: SpinnerHeaders, withCredentials: true };
                this.http.post(AdInsConstant.LoginByRoleV2, roleObject, SpinnerOptions).subscribe(
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

                        this.http.post(AdInsConstant.GetAllActiveRefFormByRoleCodeAndModuleCode, {RoleCode: item.RoleCode, ModuleCode: environment.Module}, { withCredentials: true }).subscribe(
                            (response) => {
                                AdInsHelper.SetLocalStorage(CommonConstant.MENU, JSON.stringify(response[CommonConstant.ReturnObj]));
                                this.router.navigate([NavigationConstant.DASHBOARD]);
                            });
                    });
            }
            //Ini kalau dia ada lebih dari 1 Role, maka buka modal
            else {
                const dialogConfig = new MatDialogConfig();
                // dialogConfig.disableClose = true;
                dialogConfig.id = 'role-modal';
                dialogConfig.width = '85%';
                dialogConfig.data = data;
                const dialogRef = this.dialog.open(RolepickComponent, dialogConfig);

                dialogRef.afterClosed().subscribe(result => {
                });
            }
        }
    }

    closeDialog() {
        this.dialog.closeAll;
    }
}