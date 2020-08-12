import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-negative-customer',
  templateUrl: './negative-customer.component.html',
  providers: [NGXToastrService],
})
export class NegativeCustomerComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchNegativeCustomer.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteNegativeCustomer;
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
