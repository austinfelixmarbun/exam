import {Component, OnInit} from '@angular/core';
import {AdInsConstant} from 'app/shared/AdInstConstant';
import {URLConstant} from 'app/shared/constant/URLConstant';
import {NavigationConstant} from 'app/shared/NavigationConstant';
import {UcPagingObj} from 'app/shared/model/uc-paging-obj.model';
import {CriteriaObj} from 'app/shared/model/criteria-obj.model';

@Component({
  selector: 'app-customer-paging-x',
  templateUrl: './customer-paging-x.component.html',
  styleUrls: []
})
export class CustomerPagingXComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();
  readonly AddLinkNewCust: string = NavigationConstant.CUST_NEW_FORM;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchCustomer.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustomer.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetAccessory;

    this.inputPagingObj.addCritInput = [];
    let critObj = new CriteriaObj();
    critObj.propName = "C.IS_CUSTOMER";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = '1';
    this.inputPagingObj.addCritInput.push(critObj);
  }

}
