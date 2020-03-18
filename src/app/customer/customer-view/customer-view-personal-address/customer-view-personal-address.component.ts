import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsService } from 'app/shared/services/adIns.service';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { FormBuilder } from '@angular/forms';


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
  CustId: any;
  responseResultCustAddr: any;
  responseResultCustAddrHist: any;
  ddlItem: any;

  CustForm = this.fb.group({
    DdlAddress: ['']
  });

  // WHERE CA.CUST_ID = 16

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
        this.responseResultCustAddr = response['ReturnObject'];
        console.log('isi get list = ', this.responseResultCustAddr);

      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );

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
      response =>{
        this.ddlItem = response['ReturnObject'];

        this.CustForm.patchValue({
          DdlAddress: this.ddlItem[0].Value
        });
      }
    );
  }
}