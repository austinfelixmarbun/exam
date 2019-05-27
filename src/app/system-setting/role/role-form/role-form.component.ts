import { AuthFormObj } from 'app/shared/model/AuthFormObj.Model';
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsServiceService } from "app/ad-ins-service.service";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { SearchComponent } from "app/shared/search/search.component";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RefRoleObj } from "app/shared/model/RefRoleObj.Model";
import { Location } from "@angular/common";
import { NgForm, FormBuilder, FormGroup } from "@angular/forms";
import { UCGridFooterComponent } from "app/shared/UserControl/ucgrid-footer/ucgrid-footer.component";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { Checkbox } from 'primeng/primeng';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  providers: [NGXToastrService, NGXToastrService, ExcelService]
})
export class RoleFormComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  urlJson: string = "./assets/search/searchRefForm.json";
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
  foundationUrl: string = environment.foundationUrl;
  urlQryPaging: string = AdInsConstant.GetRefFormPaging;
  urlEnviPaging: string = environment.foundationUrl;
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

  constructor(
    private http: Http,
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private adInsService: AdInsServiceService,
    private excelService: ExcelService,
    private httpClient: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["refRoleId"] != null) {
        this.refRoleId = params["refRoleId"];
        console.log("RefRoleId", this.refRoleId);
      }
    });

    this.form = this.formBuilder.group({
      data: []
    });
  }

  ngOnInit() {
    console.log("masuk");
    this.initiateForm();
    this.show = AdInsConstant.showData.split(",");
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefFormPaging;
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
    var urlGetRefRole: any =
      this.foundationUrl + AdInsConstant.GetRefRoleByRefRoleId;

    var urlGetRefRoleGateway: any = 'http://172.19.10.228:8280/GWFoundation/v1/RefRole/GetRefRole';

    this.refRoleObj = new AuthFormObj();
    this.refRoleObj.refRoleId = this.refRoleId;
    console.log(urlGetRefRole);
    this.httpClient.post(urlGetRefRole, this.refRoleObj).subscribe(
      response => {
        console.log("Success Get");
        this.refRoleObj = response["returnObject"];
        console.log(this.refRoleObj);
        this.spinner.hide();
      },
      error => {
        console.log("Error Get");
        console.log(error);
        this.spinner.hide();
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
    this.refRoleObj.refRoleId = this.refRoleId;
    this.refRoleObj.listAddRefFormId = this.listSelectedId;
    this.refRoleObj.listDelRefFormId = this.listDeletedId;
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
