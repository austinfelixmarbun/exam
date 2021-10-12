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
import { ReqRefAttrByAttrGroupObj } from 'app/shared/model/Request/RefAttr/ReqRefAttrByAttrGroupObj.model';

@Component({
  selector: 'app-vendor-branch-view',
  templateUrl: './vendor-branch-view.component.html',
  providers : [NGXToastrService]
})
export class VendorBranchViewComponent implements OnInit {
  VendorId: number;
  viewVendorHoldingObj: string;
  arrCrit: any[];
  vendorHoObj: VendorHoObj;
  MainInfo: any;
  vendorAddrObj: VendorHoObj;
  MrVendorTypeCode: string;

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
  ListVendorAttrContent: any;
  VendorAttrList: any;
  IsReady: boolean = false;



  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {

    this.route.queryParams.subscribe(params => {
      if (params["VendorId"] != null) {
        this.VendorId = params["VendorId"];
      }

    });
  }
  ngOnInit() {
    
    this.http.post(URLConstant.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
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

    this.http.post(URLConstant.GetListVendorBankAccByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorBankAcc = response[CommonConstant.ReturnObj]

      }
    )

    this.http.post(URLConstant.GetListVendorGrpByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorGrp = response[CommonConstant.ReturnObj]

      }
    )

    this.http.post(URLConstant.GetListVendorEmpByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorEmp = response[CommonConstant.ReturnObj]
      }
    )

    this.http.post(URLConstant.GetListVendorOfficeMbrByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorOfficeMbr = response[CommonConstant.ReturnObj]
      }
    )

    this.http.post(URLConstant.GetListVendorAttrContentByVendorId, { Id: this.VendorId }).subscribe(
      (response) => {
        this.ListVendorAttrContent = response[CommonConstant.ReturnObj];
        if (this.ListVendorAttrContent != null) {
          let reqByAttrGroup: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
          reqByAttrGroup.AttrGroup = CommonConstant.SUPPLIER;
          this.http.post(URLConstant.GetListActiveRefAttrByAttrGroup, reqByAttrGroup).subscribe( 
            (res) => {
              this.VendorAttrList = res[CommonConstant.ReturnObj];
              this.VendorAttrList.forEach((x, index) => {
                if(!this.ListVendorAttrContent.find(({AttrCode}) => AttrCode == x.AttrCode)){
                  this.ListVendorAttrContent.splice(index,0,{'AttrContent':''});
                }
              });
              this.IsReady = true;
            });
        }
      }
    )
  }
}
