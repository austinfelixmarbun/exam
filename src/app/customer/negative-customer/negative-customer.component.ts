import { Component, OnInit, ViewChild } from '@angular/core';
import { UcpagingComponent } from '@adins/ucpaging';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-negative-customer',
  templateUrl: './negative-customer.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class NegativeCustomerComponent implements OnInit {
  @ViewChild(UcpagingComponent) ucpaging;
  inputPagingObj: UcPagingObj;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchNegativeCustomer.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteNegativeCustomer;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchNegativeCustomer.json";

    this.inputPagingObj.ddlEnvironments = [
      {
        name: "A.MR_CUST_TYPE_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "A.MR_NEG_CUST_TYPE_CODE",
        environment: environment.FoundationR3Url
      }
    ];
  }
}
