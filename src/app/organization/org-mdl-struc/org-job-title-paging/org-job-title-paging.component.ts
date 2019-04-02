import { OrgMdlStrucObj } from "app/shared/model/OrgMdlStrucObj";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsServiceService } from "app/ad-ins-service.service";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { SearchComponent } from "app/shared/search/search.component";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { UCGridFooterComponent } from "app/shared/UserControl/ucgrid-footer/ucgrid-footer.component";
import { ActivatedRoute, Router } from "@angular/router";
import { OrgJobTitleObj } from "app/shared/model/OrgJobTitleObj.Model";
import { Location } from "@angular/common";

@Component({
  selector: "app-org-job-title-paging",
  templateUrl: "./org-job-title-paging.component.html",
  providers: [NGXToastrService, NGXToastrService, ExcelService]
})
export class OrgJobTitlePagingComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  urlJson: string = "./assets/search/searchOrgJobTitle.json";
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  show: any;
  exportData: any;
  excelData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  foundationUrl: string = environment.foundationUrl;
  urlQryPaging: string = AdInsConstant.GetOrgJobTitlePaging;
  addCrit: CriteriaObj[];

  orgJobTitleObj: OrgJobTitleObj;
  orgMdlStrucObj: OrgMdlStrucObj;
  orgMdlStrucId: any;
  bizUnitName: any;

  refOrgId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private adInsService: AdInsServiceService,
    private excelService: ExcelService,
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
    console.log("masuk");
    this.show = AdInsConstant.showData.split(",");
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.apiUrl = this.foundationUrl + AdInsConstant.GetOrgJobTitlePaging;
    this.initiateForm();
  }

  getResult(event) {
    this.resultData = event;
    this.totalData = event.returnObject.count;
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
      .search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit)
      .subscribe(
        response => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        error => {
          console.log(error);
        }
      );
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
          this.searchComponent
            .search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit)
            .subscribe(
              response => {
                console.log("Success");
                this.resultData = response;
                this.totalData = response.returnObject.count;
                console.log(this.resultData);
              },
              error => {
                console.log("Error");
                this.service.typeErrorCustom(error);
              }
            );
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
    this.searchComponent
      .search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit)
      .subscribe(
        response => {
          console.log("Success");
          this.resultData = response;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
  }

  Back(): void {
    this.location.back();
  }
}
