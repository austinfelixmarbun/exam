import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsService } from 'app/shared/services/adIns.service';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { FormBuilder } from '@angular/forms';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

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

  GetListCustAddrByCustIdForCustomerPersonalViewUrl: string;
  GetListCustAddrHistByCustIdForCustomerPersonalViewUrl: string;
  selectedOption: any;

  CustForm = this.fb.group({
    DdlAddress: ['']
  });
  viewCustFinData: any;
  GetListActiveRefMasterWithMappingCodeAllUrl = URLConstant.GetListActiveRefMasterWithMappingCodeAll;
  GetCustByCustIdUrl = URLConstant.GetCustByCustId;
  CustType: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService,
    private fb: FormBuilder
  ) { 
  this.GetListCustAddrByCustIdForCustomerPersonalViewUrl = URLConstant.GetListCustAddrByCustIdForCustomerPersonalView;
  this.GetListCustAddrHistByCustIdForCustomerPersonalViewUrl = URLConstant.GetListCustAddrHistByCustIdForCustomerPersonalView;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    this.viewCustFinData.viewInput =   "./assets/ucviewgeneric/viewCustFinData.json";
    this.viewCustFinData.viewEnvironment = environment.FoundationR3Url;
    var custAddrObj = { "CustId": this.CustId };
    this.http.post(this.GetListCustAddrByCustIdForCustomerPersonalViewUrl, custAddrObj).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.responseResultCustAddr = response[CommonConstant.ReturnObj];
        }
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
    var custObj = new CustObj();
    custObj.CustId = this.CustId;
    this.http.post(this.GetCustByCustIdUrl, custObj).subscribe(
      response => {
        this.CustType = response['MrCustTypeCode'];
        var refMasterObj = new RefMasterObj();
        refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustAddrType;
        refMasterObj.MappingCode = this.CustType;
        this.http.post(this.GetListActiveRefMasterWithMappingCodeAllUrl, refMasterObj).subscribe(
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
    this.http.post(this.GetListCustAddrHistByCustIdForCustomerPersonalViewUrl, custAddrObj).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.responseResultCustAddrHist = response[CommonConstant.ReturnObj];
        }
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
  }
}