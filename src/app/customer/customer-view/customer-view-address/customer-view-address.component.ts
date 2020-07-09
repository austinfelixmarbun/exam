import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsService } from 'app/shared/services/adIns.service';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { FormBuilder } from '@angular/forms';
import { CustObj } from 'app/shared/model/CustObj.Model';

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

  CustForm = this.fb.group({
    DdlAddress: ['']
  });
  viewCustFinData: string;
  GetListActiveRefMasterWithReserveFieldAllUrl = AdInsConstant.GetListActiveRefMasterWithReserveFieldAll;
  GetCustByCustIdUrl = AdInsConstant.GetCustByCustId;
  CustType: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService,
    private fb: FormBuilder
  ) { 
  this.GetListCustAddrByCustIdForCustomerPersonalViewUrl = AdInsConstant.GetListCustAddrByCustIdForCustomerPersonalView;
  this.GetListCustAddrHistByCustIdForCustomerPersonalViewUrl = AdInsConstant.GetListCustAddrHistByCustIdForCustomerPersonalView;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    var custAddrObj = { "CustId": this.CustId };
    this.http.post(this.GetListCustAddrByCustIdForCustomerPersonalViewUrl, custAddrObj).subscribe(
      response => {
        if (response['ReturnObject'].length > 0) {
          this.responseResultCustAddr = response['ReturnObject'];
        }
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
    var custObj = new CustObj();
    custObj.CustId = this.CustId;
    this.http.post(this.GetCustByCustIdUrl, custObj).subscribe(
      response => {
        this.CustType = response['MrCustTypeCode'];
        var refMasterObj = new RefMasterObj();
        refMasterObj.RefMasterTypeCode = "CUST_ADDR_TYPE";
        refMasterObj.ReserveField1 = this.CustType;
        this.http.post(this.GetListActiveRefMasterWithReserveFieldAllUrl, refMasterObj).subscribe(
          response => {
            if (response['ReturnObject'].length > 0) {
              this.ddlItem = response['ReturnObject'];
              this.CustForm.patchValue({
                DdlAddress: this.ddlItem[0].Value
              });
            }
          }
        );
      });
    this.http.post(this.GetListCustAddrHistByCustIdForCustomerPersonalViewUrl, custAddrObj).subscribe(
      response => {
        if (response['ReturnObject'].length > 0) {
          this.responseResultCustAddrHist = response['ReturnObject'];
        }
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }
}