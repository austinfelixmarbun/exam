import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-customer-paging',
  templateUrl: './customer-paging.component.html',
  styleUrls: []
})
export class CustomerPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  readonly AddLinkPersonal: string = NavigationConstant.CUST_PERSONAL_MAIN_INFO;
  readonly AddLinkCoy: string = NavigationConstant.CUST_COY_MAIN_INFO;
  readonly AddLinkNewCust: string = NavigationConstant.CUST_NEW_FORM;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchCustomer.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustomer.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetAccessory;

    this.inputPagingObj.addCritInput = [];
    var critObj = new CriteriaObj();
    critObj.propName = "C.IS_CUSTOMER";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = '1';
    this.inputPagingObj.addCritInput.push(critObj);
  }

}
