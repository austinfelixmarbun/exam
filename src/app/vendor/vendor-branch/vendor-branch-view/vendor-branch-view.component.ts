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

  viewVendorBranchObj: string;
  viewVendorBranchMainPObj: string;
  viewBranchInfoSuppObj: string;
  viewBranchInfoSurObj: string;
  viewBranchInfoAssetObj: string;
  viewBranchInfoLifeObj: string;
  viewBranchAgencyPObj: string;
  viewBranchAgencyCObj: string;
  viewVendorBranchMainCObj: string;
  MrVendorCategoryCode: any;
  viewVendorBranchTaxObj: string;
  viewVendorBranchTaxAddrObj: string;
  viewVendorBranchAddrObj: string;
  viewVendorBranchLtLgObj: string;

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
    this.http.post(AdInsConstant.GetVendorByVendorId, vendorObj).subscribe(
      response => {
        this.MrVendorTypeObj = response;
        this.MrVendorTypeCode = this.MrVendorTypeObj.MrVendorTypeCode;
        this.MrVendorCategoryCode = this.MrVendorTypeObj.MrVendorCategoryCode;
      },
      error => {
        console.log(error);
      }
    )

    this.viewVendorBranchObj = "./assets/ucviewgeneric/viewVendorBranch.json";
    this.viewVendorBranchMainPObj = "./assets/ucviewgeneric/viewVendorBranchMainP.json";
    this.viewVendorBranchMainCObj = "./assets/ucviewgeneric/viewVendorBranchMainC.json";
    this.viewBranchInfoSuppObj = "./assets/ucviewgeneric/viewVendorBranchInfoSupp.json";
    this.viewBranchInfoSurObj = "./assets/ucviewgeneric/viewVendorBranchInfoSur.json";
    this.viewBranchInfoAssetObj = "./assets/ucviewgeneric/viewBranchInfoAsset.json";
    this.viewBranchInfoLifeObj = "./assets/ucviewgeneric/viewBranchInfoLife.json";

    this.viewVendorBranchTaxObj = "./assets/ucviewgeneric/viewVendorBranchTax.json";
    this.viewVendorBranchTaxAddrObj = "./assets/ucviewgeneric/viewVendorBranchTaxAddr.json";
    this.viewVendorBranchAddrObj = "./assets/ucviewgeneric/viewVendorBranchAddr.json";

    this.http.post(AdInsConstant.GetListVendorBankAccByVendorId, {VendorId : this.VendorId}).subscribe(
      response => {
        this.VendorBankAcc = response['ReturnObject']

      },
      error => {
        console.log(error);
      }
    )

    this.http.post(AdInsConstant.GetListVendorGrpByVendorId, {VendorId : this.VendorId}).subscribe(
      response => {
        this.VendorGrp = response['ReturnObject']

      },
      error => {
        console.log(error);
      }
    )

    this.http.post(AdInsConstant.GetListVendorEmpByVendorId, {VendorId : this.VendorId}).subscribe(
      response => {
        this.VendorEmp = response['ReturnObject']
      },
      error => {
        console.log(error);
      }
    )

    this.http.post(AdInsConstant.GetListVendorOfficeMbrByVendorId, {VendorId : this.VendorId}).subscribe(
      response => {
        this.VendorOfficeMbr = response['ReturnObject']
      },
      error => {
        console.log(error);
      }
    )

  }

}
