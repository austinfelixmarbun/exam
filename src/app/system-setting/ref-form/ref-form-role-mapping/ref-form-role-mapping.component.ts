import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthFormObj } from 'app/shared/model/AuthFormObj.Model';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ListAuthFormObj } from 'app/shared/model/ListAuthFormObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

@Component({
  selector: 'app-ref-form-role-mapping',
  templateUrl: './ref-form-role-mapping.component.html',
  providers: [NGXToastrService]
})

export class RefFormRoleMappingComponent implements OnInit {
  RefFormId: number;
  AuthFormObj: AuthFormObj;
  listAuthFormObj: ListAuthFormObj;
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.RefFormId = params['RefFormId'];
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewRefForm.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/refFormRoleTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/refFormRoleTempPaging.json";

    this.GetListRefFormRoleByRefFormId();
  }

  GetListRefFormRoleByRefFormId() {
    this.http.post(URLConstant.GetListAuthFormByRefFormId, { RefFormId: this.RefFormId }).subscribe(
      (response) => {
        var arrMemberList = new Array();

        for (let index = 0; index < response[CommonConstant.ReturnObj].length; index++) {
          arrMemberList.push(response[CommonConstant.ReturnObj][index].RefRoleId)
        }

        if (arrMemberList.length != 0) {
          var addCritListRefRoleId = new CriteriaObj();
          addCritListRefRoleId.DataType = "numeric";
          addCritListRefRoleId.propName = "REF_ROLE_ID";
          addCritListRefRoleId.restriction = AdInsConstant.RestrictionNotIn;
          addCritListRefRoleId.listValue = arrMemberList;
          this.tempPagingObj.addCritInput.push(addCritListRefRoleId);
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
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    this.listAuthFormObj = new ListAuthFormObj();
    this.listAuthFormObj.ListAuthFormObj = new Array();


    for (var i = 0; i < this.listSelectedId.length; i++) {
      this.AuthFormObj = new AuthFormObj();
      this.AuthFormObj.RefRoleId = this.listSelectedId[i];
      this.AuthFormObj.RefFormId = this.RefFormId;
      this.listAuthFormObj.ListAuthFormObj.push(this.AuthFormObj);
    }

    this.http.post(URLConstant.AddListAuthForm, this.listAuthFormObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        this.router.navigate(['/SystemSetting/RefForm/RoleMapping'], { queryParams: { "RefFormId": this.RefFormId } });
      },
      (error) => {
        console.log(error);
      });
  }
}
