import { OrgMdlStrucObj } from 'app/shared/model/OrgMdlStrucObj';
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
import { ActivatedRoute, Router } from '@angular/router';
import { Location, DecimalPipe } from "@angular/common";
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';

@Component({
  selector: 'app-org-mdl-struc-paging',
  templateUrl: './org-mdl-struc-paging.component.html',
  providers: [NGXToastrService, NGXToastrService, ExcelService, DecimalPipe]
})
export class OrgMdlStrucPagingComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  urlJson: string = './assets/search/searchOrgMdlStruc.json';
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
  urlQryPaging: string = AdInsConstant.GetOrgMdlStrucPaging;
  urlEnviPaging : string = environment.foundationUrl;
  addCrit: CriteriaObj[];

  orgMdlObj: OrgMdlObj;
  orgMdlStrucObj: OrgMdlStrucObj;
  orgMdlId: any;

  refOrgId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private adInsService: AdInsServiceService,
    private excelService: ExcelService,
    private https: HttpClient,
    private location: Location,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['orgMdlId'] != null) {
        this.orgMdlId = +params['orgMdlId'];
      }
    });
  }

  ngOnInit() {
    this.spinner.show();
    console.log('masuk');
    this.show = AdInsConstant.showData.split(',');
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.apiUrl = this.foundationUrl + AdInsConstant.GetOrgMdlStrucPaging;
    this.initiateForm();
    this.spinner.hide();
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
    var getOrgMdlUrl = this.foundationUrl + AdInsConstant.GetOrgMdlByOrgMdlId;
    this.orgMdlObj = new OrgMdlObj();
    this.orgMdlObj.orgMdlId = +this.orgMdlId;
    this.https.post(getOrgMdlUrl, this.orgMdlObj).subscribe(
      (response) => {
        this.orgMdlObj = response['returnObject'];
        this.refOrgId += response['returnObject']['refOrgId'];
        console.log('response',response['returnObject'])
        console.log(this.refOrgId)
      },
      (error) => {
        this.service.typeErrorCustom(error);
      });

    this.addCrit = new Array();
    var additionCrit = new CriteriaObj();
    additionCrit.propName = "orgMdlId";
    additionCrit.value = this.orgMdlId;
    additionCrit.DataType = 'numeric';
    additionCrit.restriction = AdInsConstant.RestrictionEq;

    this.addCrit.push(additionCrit);
  }

  del(id: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteOrgMdlStruc;
      this.orgMdlStrucObj = new OrgMdlStrucObj();
      this.orgMdlStrucObj.orgMdlStrucId = +id;

      this.https.post(this.deleteUrl, this.orgMdlStrucObj).subscribe(
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

