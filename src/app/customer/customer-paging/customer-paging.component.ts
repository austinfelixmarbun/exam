import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-customer-paging',
  templateUrl: './customer-paging.component.html',
  styleUrls: []
})
export class CustomerPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj;
  readonly AddLinkPersonal: string = NavigationConstant.CUST_PERSONAL_MAIN_INFO;
  readonly AddLinkCoy: string = NavigationConstant.CUST_COY_MAIN_INFO;
  readonly Test1: string = NavigationConstant.TEST_1;
  readonly Test2: string = NavigationConstant.TEST_2;
  readonly Test3: string = NavigationConstant.TEST_3;
  constructor(private router: Router) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchCustomer.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustomer.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetAccessory;
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "C.MR_CUST_TYPE_CODE",
        environment: environment.FoundationR3Url
      }
    ];
    this.inputPagingObj.addCritInput = [];
    var critObj = new CriteriaObj();
    critObj.propName = "C.IS_CUSTOMER";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = '1';
    this.inputPagingObj.addCritInput.push(critObj);
  }

  navigate1(){
    AdInsHelper.RedirectUrl(this.router,[this.Test1],{});
  }
  navigate2(){
    AdInsHelper.RedirectUrl(this.router,[this.Test2],{});
  }
  navigate3(){
    AdInsHelper.RedirectUrl(this.router,[this.Test3],{});
  }
  navigate4(){
    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PERSONAL_MAIN_INFO],{});
  }
  navigate5(){
    AdInsHelper.RedirectUrl(this.router,["../CustomerPersonal/MainInfo"],{});
  }

}
