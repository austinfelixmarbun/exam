import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VendorHoObj } from 'app/shared/model/VendorHoObj.Model';
import { VendorGroupObj } from 'app/shared/model/VendorGroupObj.Model';
import { VendorObj } from 'app/shared/model/VendorObj.Model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-vendor-holding-view',
  templateUrl: './vendor-holding-view.component.html',
  providers: [NGXToastrService]
})
export class VendorHoldingViewComponent implements OnInit {
  @ViewChild(UcgridfooterComponent) UCGridFooter;
  @ViewChild(UCSearchComponent) UCSearchComponent;
  VendorId: any;
  viewVendorHoldingObj: string;
  arrCrit: any[];
  vendorHoObj: VendorHoObj;
  MainInfo: any;
  vendorAddrObj: VendorHoObj;
  MrVendorTypeCode: any;
  viewVendorHoldingMainPObj: string;
  viewVendorHoldingMainCObj: string;
  viewVendorHoldingTaxObj: string;
  viewVendorHoldingTaxAddrObj: string;
  viewVendorHoldingAddrObj: string;
  viewVendorHoldingLtLgObj: string;

  VendorGrp: any;
  GroupListObj: VendorGroupObj;
  HoListObj: VendorObj;
  Vendor: any;
  vendorContactPerson: Object;
  pageNow: any;
  pageSize: any;
  totalData: any;
  apiUrl: any;
  resultData: any;
  orderByValue: any;
  orderByKey: any;
  tempData: any[];
  tempListId: any[];
  listSelectedId: any[];
  MrVendorTypeObj: any;



  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {

    this.route.queryParams.subscribe(params => {
      if (params["VendorId"] != null) {
        this.VendorId = params["VendorId"];
      }

    });
  }

  ngOnInit() {
    var vendorObj = {
      VendorId: this.VendorId
    }
    this.http.post(URLConstant.GetVendorByVendorId, vendorObj).subscribe(
      response => {
        console.log(response);
        this.MrVendorTypeObj = response;
        this.MrVendorTypeCode = this.MrVendorTypeObj.MrVendorTypeCode;
      },
      error => {
        console.log(error);
      }
    )


    console.log(this.MrVendorTypeCode);
    this.viewVendorHoldingObj = "./assets/ucviewgeneric/viewVendorHolding.json";
    this.viewVendorHoldingMainPObj = "./assets/ucviewgeneric/viewVendorHoldingMainP.json";
    this.viewVendorHoldingMainCObj = "./assets/ucviewgeneric/viewVendorHoldingMainC.json";
    this.viewVendorHoldingTaxObj = "./assets/ucviewgeneric/viewVendorHoldingTax.json";
    this.viewVendorHoldingTaxAddrObj = "./assets/ucviewgeneric/viewVendorHoldingTaxAddr.json";
    this.viewVendorHoldingAddrObj = "./assets/ucviewgeneric/viewVendorHoldingAddr.json";
    this.viewVendorHoldingLtLgObj = "./assets/ucviewgeneric/viewVendorHoldingLtLg.json";
    this.GetListVendorContactPersonByVendorId();

    this.listSelectedId = new Array();
    this.tempListId = new Array();
    this.tempData = new Array();
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = environment.FoundationR3Url + URLConstant.GetPagingObjectBySQL;

    this.GroupListObj = new VendorGroupObj();
    this.GroupListObj.VendorId = this.VendorId;

    this.http.post(URLConstant.GetListVendorGrpByVendorId, this.GroupListObj).subscribe(
      response => {
        console.log(response);
        this.VendorGrp = response['ReturnObject']

      },
      error => {
        console.log(error);
      }
    )
    this.HoListObj = new VendorObj();
    this.HoListObj.VendorId = this.VendorId;

    this.http.post(URLConstant.GetListHoByVendorId, this.HoListObj).subscribe(
      response => {
        console.log(response);
        this.Vendor = response['ReturnObject']

      },
      error => {
        console.log(error);
      }
    )
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
    console.log(this.resultData);
    this.totalData = event.response.Count;
    this.UCGridFooter.pageNow = event.pageNow;
    this.UCGridFooter.totalData = this.totalData;
    this.UCGridFooter.resultData = this.resultData;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.totalData = event.Count;
    this.searchPagination(this.pageNow);
  }

  GetListVendorContactPersonByVendorId() {
    var obj = {
      VendorId: this.VendorId
    }
    var getListUrl = URLConstant.GetListVendorContactPersonByVendorId;
    this.http.post(getListUrl, obj).subscribe(
      (response) => {
        console.log(response);
        this.vendorContactPerson = response['ReturnObject'];
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
