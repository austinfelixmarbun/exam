import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsService } from 'app/shared/services/adIns.service';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { FormBuilder } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-customer-view-personal-address',
  templateUrl: './customer-view-personal-address.component.html'
})
export class CustomerViewPersonalAddressComponent implements OnInit {
  GetListCustAddrByCustIdForCustomerPersonalViewUrl = URLConstant.GetListCustAddrByCustIdForCustomerPersonalView;
  GetListCustAddrHistByCustIdForCustomerPersonalViewUrl = URLConstant.GetListCustAddrHistByCustIdForCustomerPersonalView;
  GetListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
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
  
  viewCustFinData: any;

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
        this.router.navigateByUrl('Error');
      }
    );
    this.http.post(this.GetListCustAddrHistByCustIdForCustomerPersonalViewUrl, custAddrObj).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.responseResultCustAddrHist = response[CommonConstant.ReturnObj];
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