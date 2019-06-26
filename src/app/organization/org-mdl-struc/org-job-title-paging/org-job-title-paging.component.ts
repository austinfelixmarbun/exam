import { OrgMdlStrucObj } from "app/shared/model/OrgMdlStrucObj";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { OrgJobTitleObj } from "app/shared/model/OrgJobTitleObj.Model";
import { Location, DecimalPipe } from "@angular/common";
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from "app/shared/model/InputSearchObj.Model";

@Component({
  selector: "app-org-job-title-paging",
  templateUrl: "./org-job-title-paging.component.html",
  providers: [NGXToastrService, NGXToastrService, ExcelService, DecimalPipe]
})
export class OrgJobTitlePagingComponent implements OnInit {
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  exportData: any;
  excelData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  foundationUrl: string = environment.foundationUrl;
  addCrit: CriteriaObj[];

  orgJobTitleObj: OrgJobTitleObj;
  orgMdlStrucObj: OrgMdlStrucObj;
  orgMdlStrucId: any;
  bizUnitName: any;

  refOrgId: any;

  constructor(
    private route: ActivatedRoute,
    private service: NGXToastrService,
    private https: HttpClient,
    private location: Location
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["orgMdlStrucId"] != null) {
        this.orgMdlStrucId = params["orgMdlStrucId"];
      }
      if (params["bizUnitName"] != null) {
        this.bizUnitName = params["bizUnitName"];
      }
      if (params["refOrgId"] != null) {
        this.refOrgId = params["refOrgId"];
      }
    });
  }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchOrgJobTitle.json";
    this.inputObj.enviromentUrl = environment.foundationUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetOrgJobTitlePaging;
    
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetOrgJobTitlePaging;
    this.initiateForm();
  }

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
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
    this.searchComponent
      .search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit);
  }

  initiateForm() {

    /* #region  Addition Criteria */
    this.addCrit = new Array();
    var additionCrit = new CriteriaObj();
    additionCrit.propName = "orgMdlStrucId";
    additionCrit.value = this.orgMdlStrucId;
    additionCrit.DataType = "numeric";
    additionCrit.restriction = AdInsConstant.RestrictionEq;
    this.addCrit.push(additionCrit);

    this.inputObj.addCritInput = this.addCrit;
    /* #endregion */
  }

  del(id: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteOrgJobTitle;
      this.orgJobTitleObj = new OrgJobTitleObj();
      this.orgJobTitleObj.orgJobTitleId = +id;

      this.https
        .post(this.deleteUrl, this.orgJobTitleObj)
        .subscribe(response => {
          this.service.successMessage(response["message"]);
          var order = null;
          if (this.orderByKey != null) {
            order = {
              key: this.orderByKey,
              value: this.orderByValue
            };
          }
          this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit);
        });
    }
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit);
  }

  Back(): void {
    this.location.back();
  }
}
