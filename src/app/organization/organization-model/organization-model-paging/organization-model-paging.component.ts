import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ExcelService } from 'app/shared/excel-service/excel-service';
import { environment } from 'environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { OrgMdlObj } from 'app/shared/model/OrgMdlObj.Model';
import { OrganizationObj } from 'app/shared/model/OrganizationObj.Model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, DecimalPipe } from "@angular/common";
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';

@Component({
  selector: 'app-organization-model-paging',
  templateUrl: './organization-model-paging.component.html',
  providers: [NGXToastrService, NGXToastrService, ExcelService, DecimalPipe]
})
export class OrganizationModelPagingComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  urlJson: string = './assets/search/searchOrgModel.json';
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  show: any;
  exportData: any;
  excelData: any;
  refOrgId: any;
  orgModelObj: OrgMdlObj;
  orgObj: OrganizationObj;
  orderByKey: any = null;
  orderByValue: boolean = true;
  foundationUrl: string = environment.foundationUrl;
  urlQryPaging: string = AdInsConstant.GetOrgMdlPaging;
  urlEnviPaging : string = environment.foundationUrl;
  addCrit: CriteriaObj[];

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
      if (params['refOrgId'] != null) {
        this.refOrgId = +params['refOrgId'];
      }
    });
  }

  ngOnInit() {
    console.log('masuk');
    this.show = AdInsConstant.showData.split(',');
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.apiUrl = this.foundationUrl + AdInsConstant.GetOrgMdlPaging;
    this.initiateForm()
    // this.adInsService.postData(this.foundationUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
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
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit);
  }

  initiateForm() {
    var getOrgUrl = this.foundationUrl + AdInsConstant.GetRefOrg;
    this.orgObj = new OrganizationObj();
    this.orgObj.refOrgId = +this.refOrgId;
    this.https.post(getOrgUrl, this.orgObj).subscribe(
      (response) => {
        this.orgObj = response['returnObject'];
      },
      (error) => {
        this.service.typeErrorCustom(error);
      });

    this.addCrit = new Array();
    var additionCrit = new CriteriaObj();
    additionCrit.propName = "refOrgId";
    additionCrit.value = this.refOrgId;
    additionCrit.DataType = 'numeric';
    additionCrit.restriction = AdInsConstant.RestrictionEq;

    this.addCrit.push(additionCrit);
  }

  del(id: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteOrgMdl;
      this.orgModelObj = new OrgMdlObj();
      this.orgModelObj.orgMdlId = +id;
      console.log(this.orgModelObj);
      this.https.post(this.deleteUrl, this.orgModelObj).subscribe(
        (response) => {
          this.service.successMessage(response['message']);
          var order = null;
          if (this.orderByKey != null) {
            order = {
              key: this.orderByKey,
              value: this.orderByValue
            }
          }
          this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit);
        });
    }
  }

  searchSort(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue
    } else {
      this.orderByValue = true
    }
    this.orderByKey = event.target.attributes.name.nodeValue
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit);
  }

  Back(): void {
    this.location.back();
  }

}
