import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsService } from 'app/shared/services/adIns.service';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { FormBuilder } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';


@Component({
  selector: 'app-customer-view-personal-address',
  templateUrl: './customer-view-personal-address.component.html',
  styleUrls: ['./customer-view-personal-address.component.scss']
})
export class CustomerViewPersonalAddressComponent implements OnInit {
  GetListCustAddrByCustIdForCustomerPersonalViewUrl = AdInsConstant.GetListCustAddrByCustIdForCustomerPersonalView;
  GetListCustAddrHistByCustIdForCustomerPersonalViewUrl = AdInsConstant.GetListCustAddrHistByCustIdForCustomerPersonalView;
  GetListActiveRefMasterUrl = AdInsConstant.GetListActiveRefMaster;
  arrCrit: any;
  inputObj: any;
  CustId: number;
  responseResultCustAddr: any;
  responseResultCustAddrHist: any;
  ddlItem: any;

  CustForm = this.fb.group({
    DdlAddress: ['']
  });
  
  viewCustFinData: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService,
    private fb: FormBuilder
  ) {
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

    var refMasterObj = new RefMasterObj();
    refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeAddrType;
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObj).subscribe(
      response => {
        if (response['ReturnObject'].length > 0) {
          this.ddlItem = response['ReturnObject'];
          this.CustForm.patchValue({
            DdlAddress: this.ddlItem[0].Value
          });
        }
      }
    );
  }
}