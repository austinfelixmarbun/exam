import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-customer-view-personal-address',
  templateUrl: './customer-view-personal-address.component.html'
})
export class CustomerViewPersonalAddressComponent implements OnInit {
  arrCrit: any;
  inputObj: any;
  CustId: number;
  responseResultCustAddr: any;
  responseResultCustAddrHist: any;
  ddlItem: any;
  selectedOption: any;

  CustForm = this.fb.group({
    DdlAddress: ['']
  });

  viewCustFinData: UcViewGenericObj = new UcViewGenericObj();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    this.viewCustFinData.viewInput = "./assets/ucviewgeneric/viewCustFinData.json";
    this.http.post(URLConstant.GetListCustAddrByCustIdForCustomerPersonalView, { Id: this.CustId }).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.responseResultCustAddr = response[CommonConstant.ReturnObj];
        }
      },
      error => {
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.ERROR], {});
      }
    );
    this.http.post(URLConstant.GetListCustAddrHistByCustIdForCustomerPersonalView, { Id: this.CustId }).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.responseResultCustAddrHist = response[CommonConstant.ReturnObj];
        }
      },
      error => {
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.ERROR], {});
      }
    );

    var refMasterObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeAddrType;
    this.http.post(URLConstant.GetListActiveRefMaster, refMasterObj).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.ddlItem = response[CommonConstant.ReturnObj];
          this.CustForm.patchValue({
            DdlAddress: this.ddlItem[0].Value
          });
        }
      }
    );
  }
}