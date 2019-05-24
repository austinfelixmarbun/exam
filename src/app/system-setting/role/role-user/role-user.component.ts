import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { RefRoleObj } from "app/shared/model/RefRoleObj.Model";
import { Location, DecimalPipe } from "@angular/common";
import { NgForm, FormBuilder, FormGroup } from "@angular/forms";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
@Component({
  selector: "app-role-user",
  templateUrl: "./role-user.component.html",
  providers: [NGXToastrService, ExcelService, DecimalPipe]
})
export class RoleUserComponent implements OnInit {
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  urlJson: string = "./assets/search/searchUser.json";
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  show: any;
  exportData: any;
  excelData: any;
  refRoleObj: RefRoleObj = new RefRoleObj();
  orderByKey: any = null;
  orderByValue: boolean = true;
  foundationUrl: string = environment.foundationUrl;
  urlQryPaging: string = AdInsConstant.GetListUserEmployee;
  urlEnviPaging : string = environment.foundationUrl;

  refRoleId: any;
  check: any;

  listSelectedId: Array<any> = [];
  listDeletedId: Array<any> = [];


  form: FormGroup;
  data = [];

  constructor(
    private http: Http,
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
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
    this.apiUrl = this.foundationUrl + AdInsConstant.GetListUserEmployee;
  }

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;

    event.response.returnObject.data.forEach(element => {
      console.log(element);
      if (element.refRoleId === this.refRoleObj.refRoleId) {
        this.listDeletedId.push(element.empPositionId);
        if (element.isActive === '1') { this.listSelectedId.push(element.empPositionId); }
      }
    });

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

    this.refRoleObj = new RefRoleObj();
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

  Save(RoleUserForm: NgForm): void {
    var urlAssignRole = this.foundationUrl + AdInsConstant.AssignRoleToUsers;
    this.refRoleObj.refRoleId = this.refRoleId;
    this.refRoleObj.listAddEmpPositionId = this.listSelectedId;
    this.refRoleObj.listDelEmpPositionId = this.listDeletedId;
    console.log(this.refRoleObj);
    this.httpClient.post(urlAssignRole, this.refRoleObj).subscribe(
      response => {
        console.log(response['message']);
        this.service.typeSave(response['message']);
        this.location.back();
        this.spinner.hide();
      },
      error => {
        console.log("Error Save");
        console.log(error);
        this.service.typeErrorCustom(error);
        this.spinner.hide();
      }
    );
  }

  Checked(empPositionId: any, isChecked: any): void {
    console.log(empPositionId);
    if (isChecked) {
      this.listSelectedId.push(empPositionId);
    } else {
      let index = this.listSelectedId.indexOf(empPositionId)
      console.log(index);
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
    console.log(this.listSelectedId);
    console.log(this.listDeletedId);
  }
}
