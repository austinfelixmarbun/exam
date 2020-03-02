import { AuthFormObj } from 'app/shared/model/AuthFormObj.Model';
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from "@angular/common/http";
import { Location, DecimalPipe } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  providers: [NGXToastrService, ExcelService, DecimalPipe]
})
export class RoleFormComponent implements OnInit {
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  show: any;
  exportData: any;
  excelData: any;
  refRoleObj: AuthFormObj = new AuthFormObj();
  orderByKey: any = null;
  orderByValue: boolean = true;
  foundationUrl: string = environment.FoundationR3Url;
  tempListId: Array<any> = [];
  refRoleId: any;
  check: any;
  tempData: Array<any> = [];
  listSelectedId: Array<any> = [];
  listDeletedId: Array<any> = [];
  checkboxAll = false;
  
  arrAddCrit = new Array<CriteriaObj>();
  form: FormGroup;
  data = [];
  RefRoleForm = this.formBuilder.group({
    RoleCode: ['', [Validators.required, Validators.maxLength(50)]],
    RoleName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });
  constructor(
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private httpClient: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["RefRoleId"] != null) {
        this.refRoleId = params["RefRoleId"];
        console.log("RefRoleId", this.refRoleId);
      }
    });

    this.form = this.formBuilder.group({
      data: []
    });
  }

  ngOnInit() {
    // this.inputObj = new InputSearchObj();
    // this.inputObj._url = "./assets/search/searchRefForm.json";
    // this.inputObj.enviromentUrl = environment.foundationUrl;
    // this.inputObj.apiQryPaging = AdInsConstant.GetRefFormPaging;
    
    console.log("masuk");
    this.initiateForm();
    // this.show = AdInsConstant.showData.split(",");
    // this.pageNow = 1;
    // this.pageSize = this.show[0];
    // this.apiUrl = this.foundationUrl + AdInsConstant.GetRefFormPaging;
  }

  getResult(event) {
    this.checkboxAll = false;
    console.log(event);
    var getAuthFormUrl: any = this.foundationUrl + AdInsConstant.GetAllAuthFormsByRefRoleId;
    var arrayPaging: Array<any> = [];
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
    console.log(this.refRoleObj);

    this.httpClient.post(getAuthFormUrl, this.refRoleObj).subscribe(
      response => {
        this.listDeletedId = [];
        this.listSelectedId = [];
        arrayPaging = event.response.returnObject.data;
        console.log(arrayPaging);
        response['returnObject'].forEach(element => {
          this.listSelectedId.push(element.refFormId);
          this.listDeletedId.push(element.refFormId);
        });
        console.log('Sel', this.listSelectedId);
        console.log('Del', this.listDeletedId);
      },
      error => {
        console.log(error);
        this.spinner.hide();



      }
    );
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }
  searchPagination(event: number) {
    this.pageNow = event;

    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      };
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  initiateForm() {
    this.spinner.show();
    /// GET INFO USER AND EMPLOYEE
    var urlGetRefRole: any = AdInsConstant.GetRefRoleByRefRoleId;

    //var urlGetRefRoleGateway: any = 'http://172.19.10.228:8280/GWFoundation/v1/RefRole/GetRefRole';

    this.refRoleObj = new AuthFormObj();
    this.refRoleObj.RefRoleId = this.refRoleId;
    console.log(urlGetRefRole);
    this.httpClient.post(AdInsConstant.GetRefRoleByRefRoleId, this.refRoleObj).subscribe(
      response => {
        this.resultData = response;
        this.RefRoleForm.patchValue({
          RoleCode: this.resultData.RoleCode,
          RoleName: this.resultData.RoleName,
          IsActive: this.resultData.IsActive
        });

      },
      error => {
        console.log(error);
      }
    );



  }

  searchSort(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue;
    } else {
      this.orderByValue = true;
    }
    this.orderByKey = event.target.attributes.name.nodeValue;
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    };
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  Back(): void {
    this.location.back();
  }

  Save(): void {
    var assignRoleToFormsUrl = this.foundationUrl + AdInsConstant.AssignRoleToForms;
    this.refRoleObj.RefRoleId = this.refRoleId;
    this.refRoleObj.ListAddRefFormId = this.listSelectedId;
    this.refRoleObj.ListDelRefFormId = this.listDeletedId;
    console.log(this.refRoleObj);
    this.httpClient.post(assignRoleToFormsUrl, this.refRoleObj).subscribe(
      response => {
        this.service.typeSave(response['message']);
        this.location.back();
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.service.typeErrorCustom(error);
        this.spinner.hide();
      }
    );
  }

  Checked(refFormId: any, isChecked: any): void {
    console.log(refFormId);
    if (isChecked) {
      this.listSelectedId.push(refFormId);
    } else {
      let index = this.listSelectedId.indexOf(refFormId)
      console.log(index);
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
    console.log('Sel', this.listSelectedId);
    console.log('Del', this.listDeletedId);
  }

  SelectAll(condition) {
    this.checkboxAll = condition;
    console.log(condition);
    if (condition) {
      for (var i = 0; i < this.resultData.data.length; i++) {
        if (this.listSelectedId.indexOf(this.resultData.data[i].refFormId) < 0) {
          this.listSelectedId.push(this.resultData.data[i].refFormId);
        }
      }

    } else {
      for (var i = 0; i < this.resultData.data.length; i++) {
        var index = this.listSelectedId.indexOf(this.resultData.data[i].refFormId);
        if (index > -1) {
          this.listSelectedId.splice(index, 1);
        }
      }
    }
    console.log(this.checkboxAll);
    console.log(this.listSelectedId);
  }

  AddToTemp() {
    this.checkboxAll = false;
    console.log(this.resultData);
    var value = "";
    for(var i = 0; i < this.listSelectedId.length;i++){
      this.tempListId.push(this.listSelectedId[i]);
      
    }
    for (var i = 0; i < this.listSelectedId.length; i++) {
      var object = this.resultData.data.find(x => x.refFormId == this.listSelectedId[i]);
      this.tempData.push(object);
    }
    this.arrAddCrit = new Array<CriteriaObj>();
    var addCrit = new CriteriaObj();
    addCrit.DataType = "numeric";
    addCrit.propName = "refFormId";
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);

    this.listSelectedId = [];
    console.log(this.listSelectedId);
    console.log(this.tempData);
  }

  deleteFromTemp(refFormId) {
    var index = this.tempListId.indexOf(refFormId);
    if (index > -1) {
      this.tempListId.splice(index, 1);
      this.tempData.splice(index, 1);
    }
    var value = "";
    var addCrit = new CriteriaObj();
    addCrit.DataType = "numeric";
    addCrit.propName = "refFormId";
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);
    console.log("selectedID : " + this.listSelectedId)
    console.log("templateID : " + this.tempListId);
    console.log(this.tempData);
    console.log(this.resultData.data);
  }
}
