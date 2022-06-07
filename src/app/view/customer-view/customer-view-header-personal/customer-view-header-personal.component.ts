import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-customer-view-header-personal',
  templateUrl: './customer-view-header-personal.component.html'
})
export class CustomerViewHeaderPersonalComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  IdCust: number;
  CustStatus: string = '-';
  urlGetAppCustStatusXByCustNo = URLConstant.GetAppCustStatusXByCustNo;
  
  // Input CustNo didapat dari value CustNo yang dikirim dari component customer-view
  @Input('CustNo') CustNo: string;

  constructor(public Translate: TranslateService, private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      else if (params["CustId"] != null) {
        this.IdCust = params["CustId"];
      }
    });
    console.log(Translate);
  }

  async ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustPersonalHeader.json";
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
