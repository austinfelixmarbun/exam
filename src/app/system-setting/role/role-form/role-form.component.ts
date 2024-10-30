import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { HttpClient } from "@angular/common/http";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { AuthFormObj } from "app/shared/model/auth-form-obj.model";
import { UcViewGenericObj } from "app/shared/model/uc-view-generic-obj.model";
import { FromValueObj, UcTempPagingObj } from "app/shared/model/temp-paging/uc-temp-paging-obj.model";
import { ExceptionConstant } from "app/shared/constant/ExceptionConstant";
import { AdInsHelper } from "app/shared/AdInsHelper";
import { NavigationConstant } from "app/shared/NavigationConstant";
import { NgxRouterService } from "@adins/fe-core";
import { URLConstant } from "app/shared/constant/URLConstant";

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  providers: [ExcelService]
})
export class RoleFormComponent implements OnInit {
  RefRoleId: number;
  AuthFormObj: AuthFormObj;
  listAuthFormObj: {[key: string]: any};
  listSelectedId: Array<number> = new Array<number>();
  RefOfficeAreaId: number;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  readonly CancelLink: string = NavigationConstant.SYSTEM_SETTING_ROLE_FORM;
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService, 
    private ngxRouter: NgxRouterService) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefRoleId = queryParams['RefRoleId'];
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewRefRole.json";
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/roleRefFormTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/roleRefFormTempPaging.json";

    let fromValueObj = new FromValueObj();
    fromValueObj.property = 'RefRoleId';
    fromValueObj.value = this.RefRoleId;
    this.tempPagingObj.fromValue.push(fromValueObj);
    this.tempPagingObj.isReady = true;
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveListAuthForm() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    this.listAuthFormObj = {};
    this.listAuthFormObj.ListAuthFormObj = new Array();


    for (var i = 0; i < this.listSelectedId.length; i++) {
      this.AuthFormObj = new AuthFormObj();
      this.AuthFormObj.RefRoleId = this.RefRoleId;
      this.AuthFormObj.RefFormId = this.listSelectedId[i]
      this.listAuthFormObj.ListAuthFormObj.push(this.AuthFormObj);
    }

    this.http.post(URLConstant.AddListAuthForm, this.listAuthFormObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(this.ngxRouter,[NavigationConstant.SYSTEM_SETTING_ROLE_FORM],{ "RefRoleId": this.RefRoleId });
      });
  }
}
