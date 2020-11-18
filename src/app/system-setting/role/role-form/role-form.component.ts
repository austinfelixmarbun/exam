import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { HttpClient } from "@angular/common/http";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { AuthFormObj } from "app/shared/model/AuthFormObj.Model";
import { ListAuthFormObj } from "app/shared/model/ListAuthFormObj.Model";
import { URLConstant } from "app/shared/constant/URLConstant";
import { UcViewGenericObj } from "app/shared/model/UcViewGenericObj.model";
import { UcTempPagingObj } from "app/shared/model/TempPaging/UcTempPagingObj.model";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { ExceptionConstant } from "app/shared/constant/ExceptionConstant";
import { AdInsHelper } from "app/shared/AdInsHelper";

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  providers: [NGXToastrService, ExcelService]
})
export class RoleFormComponent implements OnInit {
  RefRoleId: number;
  AuthFormObj: AuthFormObj;
  listAuthFormObj: ListAuthFormObj;
  listSelectedId: Array<number> = new Array<number>();
  RefOfficeAreaId: number;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.RefRoleId = params['RefRoleId'];
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewRefRole.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/roleRefFormTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/roleRefFormTempPaging.json";

    this.GetListRefFormRoleByRefRoleId();
  }

  GetListRefFormRoleByRefRoleId() {
    this.http.post<Array<AuthFormObj>>(URLConstant.GetListAuthFormByRefRoleId, { RefRoleId: this.RefRoleId }).subscribe(
      (response) => {
        var arrMemberList = new Array();

        for (let index = 0; index < response[CommonConstant.ReturnObj].length; index++) {
          arrMemberList.push(response[CommonConstant.ReturnObj][index].RefFormId)
        }

        if (response[CommonConstant.ReturnObj].length != 0) {
          var addCritListRefFormId = new CriteriaObj();
          addCritListRefFormId.DataType = "numeric";
          addCritListRefFormId.propName = "REF_FORM_ID";
          addCritListRefFormId.restriction = AdInsConstant.RestrictionNotIn;
          addCritListRefFormId.listValue = arrMemberList;
          this.tempPagingObj.addCritInput.push(addCritListRefFormId);
        }
        this.tempPagingObj.isReady = true;
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveListAuthForm() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    this.listAuthFormObj = new ListAuthFormObj();
    this.listAuthFormObj.ListAuthFormObj = new Array();


    for (var i = 0; i < this.listSelectedId.length; i++) {
      this.AuthFormObj = new AuthFormObj();
      this.AuthFormObj.RefRoleId = this.RefRoleId;
      this.AuthFormObj.RefFormId = this.listSelectedId[i]
      this.listAuthFormObj.ListAuthFormObj.push(this.AuthFormObj);
    }

    this.http.post(URLConstant.AddListAuthForm, this.listAuthFormObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(this.router,["/SystemSetting/RoleForm"],{ "RefRoleId": this.RefRoleId });
      });
  }
}
