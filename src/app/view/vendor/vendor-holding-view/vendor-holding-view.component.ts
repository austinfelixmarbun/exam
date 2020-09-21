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
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-vendor-holding-view',
  templateUrl: './vendor-holding-view.component.html',
  providers: [NGXToastrService]
})
export class VendorHoldingViewComponent implements OnInit {
  @ViewChild(UcgridfooterComponent) UCGridFooter;
  @ViewChild(UCSearchComponent) UCSearchComponent;
  VendorId: any;
  viewVendorHoldingObj: UcViewGenericObj = new UcViewGenericObj();
  arrCrit: any[];
  vendorHoObj: VendorHoObj;
  MainInfo: any;
  vendorAddrObj: VendorHoObj;
  MrVendorTypeCode: any;
  viewVendorHoldingMainPObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorHoldingMainCObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorHoldingTaxObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorHoldingTaxAddrObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorHoldingAddrObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorHoldingLtLgObj: UcViewGenericObj = new UcViewGenericObj();
  
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
        this.MrVendorTypeObj = response;
        this.MrVendorTypeCode = this.MrVendorTypeObj.MrVendorTypeCode;
      }
    )

    this.viewVendorHoldingObj.viewInput = "./assets/ucviewgeneric/viewVendorHolding.json";
    this.viewVendorHoldingObj.viewEnvironment = environment.FoundationR3Url;
    this.viewVendorHoldingMainPObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingMainP.json";
    this.viewVendorHoldingMainPObj.viewEnvironment = environment.FoundationR3Url;
    this.viewVendorHoldingMainCObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingMainC.json";
    this.viewVendorHoldingMainCObj.viewEnvironment = environment.FoundationR3Url;
    this.viewVendorHoldingTaxObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingTax.json";
    this.viewVendorHoldingTaxObj.viewEnvironment = environment.FoundationR3Url;
    this.viewVendorHoldingTaxAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingTaxAddr.json";
    this.viewVendorHoldingTaxAddrObj.viewEnvironment = environment.FoundationR3Url;
    this.viewVendorHoldingAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingAddr.json";
    this.viewVendorHoldingAddrObj.viewEnvironment = environment.FoundationR3Url;
    this.viewVendorHoldingLtLgObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingLtLg.json";
    this.viewVendorHoldingLtLgObj.viewEnvironment = environment.FoundationR3Url;
    
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
        this.VendorGrp = response[CommonConstant.ReturnObj]

      }
    )
    this.HoListObj = new VendorObj();
    this.HoListObj.VendorId = this.VendorId;

    this.http.post(URLConstant.GetListHoByVendorId, this.HoListObj).subscribe(
      response => {
        this.Vendor = response[CommonConstant.ReturnObj]

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
        this.vendorContactPerson = response[CommonConstant.ReturnObj];
      }
    );
  }
}
