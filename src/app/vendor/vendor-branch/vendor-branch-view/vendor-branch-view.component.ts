import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VendorObj } from 'app/shared/model/VendorObj.Model';
import { VendorGroupObj } from 'app/shared/model/VendorGroupObj.Model';
import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorHoObj } from 'app/shared/model/VendorHoObj.Model';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { VendorBankAccObj } from 'app/shared/model/VendorBankAccObj.Model';
import { VendorEmpObj } from 'app/shared/model/VendorEmpObj.Model';
import { OfficeObj } from 'app/shared/model/OfficeObj.model';
import { VendorOfficeMbrObj } from 'app/shared/model/VendorOfficeMbrObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

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
        this.MrVendorCategoryCode = this.MrVendorTypeObj.MrVendorCategoryCode;
      }
    )

    this.viewVendorBranchObj.viewInput = "./assets/ucviewgeneric/viewVendorBranch.json";
    this.viewVendorBranchObj.viewEnvironment = environment.FoundationR3Url;
    this.viewVendorBranchMainPObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchMainP.json";
    this.viewVendorBranchMainPObj.viewEnvironment = environment.FoundationR3Url;
    this.viewVendorBranchMainCObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchMainC.json";
    this.viewVendorBranchMainCObj.viewEnvironment = environment.FoundationR3Url;
    this.viewBranchInfoSuppObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchInfoSupp.json";
    this.viewBranchInfoSuppObj.viewEnvironment = environment.FoundationR3Url;
    this.viewBranchInfoSuppObj.ddlEnvironments = [
      {
        name: "LinkSupplierHO",
        environment: environment.FoundationR3Web
      },
    ];
    this.viewBranchInfoSurObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchInfoSur.json";
    this.viewBranchInfoSurObj.viewEnvironment = environment.FoundationR3Url;
    this.viewBranchInfoSurObj.ddlEnvironments = [
      {
        name: "LinkSurveyorHO",
        environment: environment.FoundationR3Web
      },
    ];
    this.viewBranchInfoAssetObj.viewInput = "./assets/ucviewgeneric/viewBranchInfoAsset.json";
    this.viewBranchInfoAssetObj.viewEnvironment = environment.FoundationR3Url;
    this.viewBranchInfoAssetObj.ddlEnvironments = [
      {
        name: "LinkAssetHO",
        environment: environment.FoundationR3Web
      },
    ];
    this.viewBranchInfoLifeObj.viewInput = "./assets/ucviewgeneric/viewBranchInfoLife.json";
    this.viewBranchInfoLifeObj.viewEnvironment = environment.FoundationR3Url;
    this.viewBranchInfoLifeObj.ddlEnvironments = [
      {
        name: "LinkLifeHO",
        environment: environment.FoundationR3Web
      },
    ];
    this.viewVendorBranchTaxObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchTax.json";
    this.viewVendorBranchTaxObj.viewEnvironment = environment.FoundationR3Url;
    this.viewVendorBranchTaxAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchTaxAddr.json";
    this.viewVendorBranchTaxAddrObj.viewEnvironment = environment.FoundationR3Url;
    this.viewVendorBranchAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchAddr.json";
    this.viewVendorBranchAddrObj.viewEnvironment = environment.FoundationR3Url;

    this.http.post(URLConstant.GetListVendorBankAccByVendorId, { VendorId: this.VendorId }).subscribe(
      response => {
        this.VendorBankAcc = response[CommonConstant.ReturnObj]

      }
    )

    this.http.post(URLConstant.GetListVendorGrpByVendorId, { VendorId: this.VendorId }).subscribe(
      response => {
        this.VendorGrp = response[CommonConstant.ReturnObj]

      }
    )

    this.http.post(URLConstant.GetListVendorEmpByVendorId, { VendorId: this.VendorId }).subscribe(
      response => {
        this.VendorEmp = response[CommonConstant.ReturnObj]
      }
    )

    this.http.post(URLConstant.GetListVendorOfficeMbrByVendorId, { VendorId: this.VendorId }).subscribe(
      response => {
        this.VendorOfficeMbr = response[CommonConstant.ReturnObj]
      }
    )
  }
}
