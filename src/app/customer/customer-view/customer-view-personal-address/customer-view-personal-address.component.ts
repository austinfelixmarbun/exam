import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsService } from 'app/shared/services/adIns.service';


@Component({
  selector: 'app-customer-view-personal-address',
  templateUrl: './customer-view-personal-address.component.html',
  styleUrls: ['./customer-view-personal-address.component.scss']
})
export class CustomerViewPersonalAddressComponent implements OnInit {

  GetListCustAddrHistByCustIdUrl = AdInsConstant.GetListCustAddrHistByCustId;
  GetListCustAddrByCustIdUrl = AdInsConstant.GetListCustAddrByCustId;
  arrCrit: any;
  inputObj: any;
  CustId: any;
  responseResultCustAddr: any;
  // WHERE CA.CUST_ID = 16

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });

    var custAddrObj = { "CustId": this.CustId };
    this.http.post(this.GetListCustAddrByCustIdUrl, custAddrObj).subscribe(
      response => {
        this.responseResultCustAddr = response;
        console.log('isi get list = ', this.responseResultCustAddr);

      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }
}