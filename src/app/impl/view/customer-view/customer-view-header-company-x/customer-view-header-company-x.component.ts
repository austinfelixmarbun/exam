import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstantX } from 'app/impl/shared/constant/URLConstantX';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-customer-view-header-company-x',
  templateUrl: './customer-view-header-company-x.component.html'
})
export class CustomerViewHeaderCompanyXComponent implements OnInit {
  IdCust: number; 
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  CustStatus: string = '-';
  urlGetAppCustStatusXByCustNo = URLConstantX.GetAppCustStatusXByCustNo;

  // Input CustNo didapat dari value CustNo yang dikirim dari component customer-view
  @Input('CustNo') CustNo: string;
  
  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.route.queryParams.subscribe(params => {

      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      else if (params["CustId"] != null) {
        this.IdCust = params["CustId"];
      }
    });
  }
  async ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustCompanyHeader.json";
    await this.getCustomerStatus();
  }

  ClickLinkViewCustExposure() {
    AdInsHelper.OpenCustExposure(this.IdCust);
  }

  async getCustomerStatus(){
    // get cust status ke api di LOS menggunakan variable custNo.
    // set cust status ke variable custStatus.
    await this.http.post(this.urlGetAppCustStatusXByCustNo, { CustNo: this.CustNo }).toPromise().then(
      (response) => {
        this.CustStatus = response['CustStatus'];
      }
    );
  }
}
