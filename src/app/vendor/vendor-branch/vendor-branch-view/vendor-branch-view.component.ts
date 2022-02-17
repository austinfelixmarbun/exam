import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorHoObj } from 'app/shared/model/vendor-ho-obj.model';
import { VendorBankAccObj } from 'app/shared/model/vendor-bank-acc-obj.model';
import { VendorEmpObj } from 'app/shared/model/vendor-emp-obj.model';
import { VendorOfficeMbrObj } from 'app/shared/model/vendor-office-mbr-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-vendor-branch-view',
  templateUrl: './vendor-branch-view.component.html'
})
export class VendorBranchViewComponent implements OnInit {
  VendorId: number;
  viewVendorHoldingObj: string;
  arrCrit: any[];
  vendorHoObj: VendorHoObj;
  MainInfo: any;
  vendorAddrObj: VendorHoObj;
  MrVendorTypeCode: any;

  VendorGrp: any;
  Vendor: any;
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

  viewVendorBranchObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorBranchMainPObj: UcViewGenericObj = new UcViewGenericObj();
  viewBranchInfoSuppObj: UcViewGenericObj = new UcViewGenericObj();
  viewBranchInfoSurObj: UcViewGenericObj = new UcViewGenericObj();
  viewBranchInfoAssetObj: UcViewGenericObj = new UcViewGenericObj();
  viewBranchInfoLifeObj: UcViewGenericObj = new UcViewGenericObj();
  viewBranchAgencyPObj: UcViewGenericObj = new UcViewGenericObj();
  viewBranchAgencyCObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorBranchMainCObj: UcViewGenericObj = new UcViewGenericObj();
  MrVendorCategoryCode: any;
  viewVendorBranchTaxObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorBranchTaxAddrObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorBranchAddrObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorBranchLtLgObj: UcViewGenericObj = new UcViewGenericObj();

  VendorBankAccListObj: VendorBankAccObj;
  VendorBankAcc: any;
  VendorEmpListObj: VendorEmpObj;
  VendorEmp: any;
  VendorOfficeMbrListObj: VendorOfficeMbrObj;
  VendorOfficeMbr: any;



  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew) {

    this.route.queryParams.subscribe(params => {
      if (params["VendorId"] != null) {
        this.VendorId = params["VendorId"];
      }

    });
  }
  ngOnInit() {
    
    this.http.post(this.UrlConstantNew.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
      response => {
        this.MrVendorTypeObj = response;
        this.MrVendorTypeCode = this.MrVendorTypeObj.MrVendorTypeCode;
        this.MrVendorCategoryCode = this.MrVendorTypeObj.MrVendorCategoryCode;
      }
    )

    this.viewVendorBranchObj.viewInput = "./assets/ucviewgeneric/viewVendorBranch.json";
    this.viewVendorBranchMainPObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchMainP.json";
    this.viewVendorBranchMainCObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchMainC.json";
    this.viewBranchInfoSuppObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchInfoSupp.json";

    this.viewBranchInfoSurObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchInfoSur.json";

    this.viewBranchInfoAssetObj.viewInput = "./assets/ucviewgeneric/viewBranchInfoAsset.json";

    this.viewBranchInfoLifeObj.viewInput = "./assets/ucviewgeneric/viewBranchInfoLife.json";

    this.viewVendorBranchTaxObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchTax.json";
    this.viewVendorBranchTaxAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchTaxAddr.json";
    this.viewVendorBranchAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchAddr.json";

    this.http.post(this.UrlConstantNew.GetListVendorBankAccByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorBankAcc = response[CommonConstant.ReturnObj]

      }
    )

    this.http.post(this.UrlConstantNew.GetListVendorGrpByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorGrp = response[CommonConstant.ReturnObj]

      }
    )

    this.http.post(this.UrlConstantNew.GetListVendorEmpByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorEmp = response[CommonConstant.ReturnObj]
      }
    )

    this.http.post(this.UrlConstantNew.GetListVendorOfficeMbrByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorOfficeMbr = response[CommonConstant.ReturnObj]
      }
    )
  }
}
