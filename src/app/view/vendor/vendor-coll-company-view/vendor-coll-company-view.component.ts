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
  selector: 'app-vendor-coll-company-view',
  templateUrl: './vendor-coll-company-view.component.html'
})
export class VendorCollCompanyViewComponent implements OnInit {
  VendorId: number;
  viewVendorHoldingObj: string;
  arrCrit: any[];
  vendorHoObj: VendorHoObj;
  MainInfo: any;
  vendorAddrObj: VendorHoObj;

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

  viewVendorCollCompanyObj: UcViewGenericObj = new UcViewGenericObj();
  viewBranchAgencyPObj: UcViewGenericObj = new UcViewGenericObj();
  viewBranchAgencyCObj: UcViewGenericObj = new UcViewGenericObj();
  viewCollCompanyMainInfoObj: UcViewGenericObj = new UcViewGenericObj();
  MrVendorCategoryCode: any;
  viewVendorCollCompanyTaxObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorCollCompanyTaxAddrObj: UcViewGenericObj = new UcViewGenericObj();
  viewVendorCollCompanyAddrObj: UcViewGenericObj = new UcViewGenericObj();
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
        this.MrVendorCategoryCode = this.MrVendorTypeObj.MrVendorCategoryCode;
      }
    )

    this.viewVendorCollCompanyObj.viewInput = "./assets/ucviewgeneric/viewCollCompany.json";
    this.viewCollCompanyMainInfoObj.viewInput = "./assets/ucviewgeneric/viewCollCompanyMainInfo.json";

    this.viewVendorCollCompanyTaxObj.viewInput = "./assets/ucviewgeneric/viewVendorCollCompanyTax.json";
    this.viewVendorCollCompanyTaxAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorCollCompanyTaxAddr.json";
    this.viewVendorCollCompanyAddrObj.viewInput = "./assets/ucviewgeneric/viewVendorCollCompanyAddr.json";

    this.http.post(this.UrlConstantNew.GetListVendorBankAccByVendorId, { Id: this.VendorId }).subscribe(
      response => {
        this.VendorBankAcc = response[CommonConstant.ReturnObj]

      }
    )

    // this.http.post(this.UrlConstantNew.GetListVendorGrpByVendorId, { Id: this.VendorId }).subscribe(
    //   response => {
    //     this.VendorGrp = response[CommonConstant.ReturnObj]

    //   }
    // )

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
