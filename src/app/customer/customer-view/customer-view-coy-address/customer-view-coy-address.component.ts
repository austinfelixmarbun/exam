import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsService } from 'app/shared/services/adIns.service';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-customer-view-coy-address',
  templateUrl: './customer-view-coy-address.component.html',
  styleUrls: ['./customer-view-coy-address.component.scss']
})
export class CustomerViewCoyAddressComponent implements OnInit {
  GetListCustAddrByCustIdForCustomerPersonalViewUrl = AdInsConstant.GetListCustAddrByCustIdForCustomerPersonalView;
  GetListCustAddrHistByCustIdForCustomerPersonalViewUrl = AdInsConstant.GetListCustAddrHistByCustIdForCustomerPersonalView;
  GetListActiveRefMasterUrl = AdInsConstant.GetListActiveRefMaster;
  arrCrit: any;
  inputObj: any;
  CustId: any;
  responseResultCustAddr: any;
  responseResultCustAddrHist: any;
  ddlItem: any;
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
    var custAddrObj = { "CustId": this.CustId };
    console.log('debug sini');
    this.http.post(this.GetListCustAddrByCustIdForCustomerPersonalViewUrl, custAddrObj).subscribe(
      response => {
        this.responseResultCustAddr = response['ReturnObject'];
        console.log('isi get list = ', this.responseResultCustAddr);
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
    console.log('debug sini');
    this.http.post(this.GetListCustAddrHistByCustIdForCustomerPersonalViewUrl, custAddrObj).subscribe(
      response => {
        this.responseResultCustAddrHist = response['ReturnObject'];
        console.log('isi get hist list = ', this.responseResultCustAddr);
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
    var refMasterObj = new RefMasterObj();
    refMasterObj.RefMasterTypeCode = "ADDR_TYPE";
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObj).subscribe(
      response => {
        this.ddlItem = response['ReturnObject'];
        this.CustForm.patchValue({
          DdlAddress: this.ddlItem[0].Value
        });
      }
    );
  }
}