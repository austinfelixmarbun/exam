import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { AuthFormObj } from "app/shared/model/AuthFormObj.Model";
import { ListAuthFormObj } from "app/shared/model/ListAuthFormObj.Model";
import { UcTempPagingObj } from "app/shared/model/TempPaging/UcTempPagingObj.model";

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
})
export class RoleFormComponent implements OnInit {
  viewObj: any;
  RefRoleId: number;
  AuthFormObj: AuthFormObj;
  listAuthFormObj: ListAuthFormObj;
  listSelectedId: Array<number> = new Array<number>();
  RefOfficeAreaId: number;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.RefRoleId = params['RefRoleId'];
    });
  }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewRefRole.json";
    
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/roleRefFormTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/roleRefFormTempPaging.json";

    this.GetListRefFormRoleByRefRoleId();
  }

  GetListRefFormRoleByRefRoleId() {
    this.http.post<Array<AuthFormObj>>(AdInsConstant.GetListAuthFormByRefRoleId, {RefRoleId: this.RefRoleId}).subscribe(
      (response) => {
        var arrMemberList = new Array();

        for (let index = 0; index < response["ReturnObject"].length; index++) {
          arrMemberList.push(response["ReturnObject"][index].RefFormId)
        }

        if (response["ReturnObject"].length != 0) {
          var addCritListRefFormId = new CriteriaObj();
          addCritListRefFormId.DataType = "numeric";
          addCritListRefFormId.propName = "REF_FORM_ID";
          addCritListRefFormId.restriction = AdInsConstant.RestrictionNotIn;
          addCritListRefFormId.listValue = arrMemberList;
          this.tempPagingObj.addCritInput.push(addCritListRefFormId);
        }
        this.tempPagingObj.isReady = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }
  
  SaveListAuthForm() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage('Please Add At Least One Data');
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

    this.http.post(AdInsConstant.AddListAuthForm, this.listAuthFormObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        this.router.navigate(['/SystemSetting/RoleForm'], { queryParams: { "RefRoleId": this.RefRoleId} });
      },
      (error) => {
        console.log(error);
      });
  }
}
