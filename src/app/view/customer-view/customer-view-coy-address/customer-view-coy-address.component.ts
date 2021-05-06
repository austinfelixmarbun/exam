import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsService } from 'app/shared/services/adIns.service';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { FormBuilder } from '@angular/forms';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';

@Component({
  selector: 'app-customer-view-coy-address',
  templateUrl: './customer-view-coy-address.component.html'
})
export class CustomerViewCoyAddressComponent implements OnInit {
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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService,
    private fb: FormBuilder
  ) { }

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
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
    this.http.post(URLConstant.GetListCustAddrHistByCustIdForCustomerPersonalView, { Id: this.CustId }).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.responseResultCustAddrHist = response[CommonConstant.ReturnObj];
        }
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
    var refMasterObj: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    refMasterObj.RefMasterTypeCode = RefMasterConstant.AddrType;
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