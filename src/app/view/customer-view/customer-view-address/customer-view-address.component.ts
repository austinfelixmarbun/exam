import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';

@Component({
  selector: 'app-customer-view-address',
  templateUrl: './customer-view-address.component.html'
})
export class CustomerViewAddressComponent implements OnInit {
  CustId: number;

  ddlItem: any;
  arrCrit: any;
  inputObj: any;
  responseResultCustAddr: any;
  responseResultCustAddrHist: any;
  selectedOption: any;

  CustForm = this.fb.group({
    DdlAddress: ['']
  });
  CustType: any;
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
    var custObj = new CustObj();
    custObj.CustId = this.CustId;
    this.http.post(URLConstant.GetCustByCustId, { Id: this.CustId }).subscribe(
      response => {
        this.CustType = response['MrCustTypeCode'];
        let refMasterObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
        refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustAddrType;
        refMasterObj.MappingCode = this.CustType;
        this.http.post(URLConstant.GetListActiveRefMasterWithMappingCodeAll, refMasterObj).subscribe(
          response => {
            if (response[CommonConstant.ReturnObj].length > 0) {
              this.ddlItem = response[CommonConstant.ReturnObj];
              this.CustForm.patchValue({
                DdlAddress: this.ddlItem[0].Value
              });
            }
          }
        );
      });
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
  }
}