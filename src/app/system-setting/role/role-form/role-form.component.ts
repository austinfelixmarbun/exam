import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { HttpClient } from "@angular/common/http";
import { Location, DecimalPipe } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { AuthFormObj } from "app/shared/model/AuthFormObj.Model";
import { ListAuthFormObj } from "app/shared/model/ListAuthFormObj.Model";

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  providers: [NGXToastrService, ExcelService, DecimalPipe]
})
export class RoleFormComponent implements OnInit {
  @ViewChild(UcgridfooterComponent) UCGridFooter;
  @ViewChild(UCSearchComponent) UCSearchComponent;

  inputObj: any;
  arrCrit: any[];
  checkboxAll = false;
  listSelectedId: any;
  tempListId: any;
  orderByKey: any;
  orderByValue: any;
  pageNow: number;
  pageSize: number;
  apiUrl: any;
  totalData: any;
  resultData: any;
  tempData: any;
  arrAddCrit: any[] = new Array();
  viewObj: any;
  Data = [];
  member: AuthFormObj[];
  RefRoleId: number;
  AuthFormObj: AuthFormObj;
  listAuthFormObj: ListAuthFormObj;
  
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.RefRoleId = params['RefRoleId'];
    });
  }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewRefRole.json";

    this.GetListRefFormRoleByRefRoleId();

    this.listSelectedId = new Array();
    this.tempListId = new Array();
    this.tempData = new Array();
    this.arrCrit = new Array();

    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchRoleRefForm.json";
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputObj.addCritInput = new Array();

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetPagingObjectBySQL;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetPagingObjectBySQL;
  }

  searchSort(event: any) {
    if (this.resultData != null) {
      if (this.orderByKey == event.target.attributes.name.nodeValue) {
        this.orderByValue = !this.orderByValue
      } else {
        this.orderByValue = true
      }
      this.orderByKey = event.target.attributes.name.nodeValue
      let order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
      this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
    }
  }

  Checked(RefFormId: any, isChecked: any): void {
    if (isChecked) {
      this.listSelectedId.push(RefFormId);
      console.log(this.listSelectedId)
    } else {
      const index = this.listSelectedId.indexOf(RefFormId)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
  }

  searchPagination(event: number) {
    this.pageNow = event;
    let order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
  }

  getResult(event) {
    this.resultData = event.response;
    this.totalData = event.response.Count;
    this.UCGridFooter.pageNow = event.pageNow;
    this.UCGridFooter.totalData = this.totalData;
    this.UCGridFooter.resultData = this.resultData;
    this.listSelectedId = [];
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.totalData = event.Count;
    this.searchPagination(this.pageNow);
  }

  SelectAll(condition) {
    this.checkboxAll = condition;
    if (condition) {
      for (let i = 0; i < this.resultData.Data.length; i++) {
        if (this.listSelectedId.indexOf(this.resultData.Data[i].RefFormId) < 0) {
          this.listSelectedId.push(this.resultData.Data[i].RefFormId);
        }
      }

    } else {
      for (let i = 0; i < this.resultData.Data.length; i++) {
        let index = this.listSelectedId.indexOf(this.resultData.Data[i].RefFormId);
        if (index > -1) {
          this.listSelectedId.splice(index, 1);
        }
      }
    }
  }

  addToTemp() {
    if (this.listSelectedId.length != 0) {
      for (var i = 0; i < this.listSelectedId.length; i++) {
        this.tempListId.push(this.listSelectedId[i]);
      }
      for (var i = 0; i < this.listSelectedId.length; i++) {
        var object = this.resultData.Data.find(x => x.RefFormId == this.listSelectedId[i]);
        this.tempData.push(object);
      }

      this.arrAddCrit = new Array();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }

      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "REF_FORM_ID";
      addCrit.restriction = AdInsConstant.RestrictionNotIn;
      addCrit.listValue = this.tempListId;
      this.arrAddCrit.push(addCrit);

      var order = null;
      if (this.orderByKey != null) {
        order = {
          key: this.orderByKey,
          value: this.orderByValue
        };
      }
      this.inputObj.addCritInput = this.arrAddCrit;
      this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);
      this.listSelectedId = [];
    } else {
      this.toastr.typeErrorCustom("Please select at least one Role");
    }
  }

  deleteFromTemp(RefFormId: any) {
    if (confirm('Are you sure to delete this record?')) {
      this.arrAddCrit = new Array();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }

      var index = this.tempListId.indexOf(RefFormId);
      if (index > -1) {
        this.tempListId.splice(index, 1);
        this.tempData.splice(index, 1);
      }
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "REF_FORM_ID";
      addCrit.restriction = AdInsConstant.RestrictionNotIn;
      addCrit.listValue = this.tempListId;
      if (this.tempListId.length != 0) {
        this.arrAddCrit.push(addCrit);
      }
      var order = null;
      if (this.orderByKey != null) {
        order = {
          key: this.orderByKey,
          value: this.orderByValue
        };
      }
      this.inputObj.addCritInput = this.arrAddCrit;
      this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);
    }
  }

  SaveListAuthForm() {
    if (this.tempListId.length == 0) {
      this.toastr.typeErrorCustom('Please Add At Least One Data');
      return;
    }

    this.listAuthFormObj = new ListAuthFormObj();
    this.listAuthFormObj.ListAuthFormObj = new Array();


    for (var i = 0; i < this.tempListId.length; i++) {
      this.AuthFormObj = new AuthFormObj();
      this.AuthFormObj.RefRoleId = this.RefRoleId;
      this.AuthFormObj.RefFormId = this.tempListId[i]
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

  GetListRefFormRoleByRefRoleId() {
    var obj = {
      RefRoleId: this.RefRoleId
    }

    this.http.post<Array<AuthFormObj>>(AdInsConstant.GetListAuthFormByRefRoleId, obj).subscribe(
      (response) => {
        this.member = response["ReturnObject"];

        var arrMemberList = new Array();

        for (let index = 0; index < this.member.length; index++) {
          arrMemberList.push(this.member[index].RefFormId)
        }

        if (this.member.length != 0) {
          var addCritListRefFormId = new CriteriaObj();
          addCritListRefFormId.DataType = "numeric";
          addCritListRefFormId.propName = "REF_FORM_ID";
          addCritListRefFormId.restriction = AdInsConstant.RestrictionNotIn;
          addCritListRefFormId.listValue = arrMemberList;
          this.arrCrit.push(addCritListRefFormId);
          this.inputObj.addCritInput.push(addCritListRefFormId);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
