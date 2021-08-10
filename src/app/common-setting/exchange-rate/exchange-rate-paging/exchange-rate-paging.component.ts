import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-exchange-rate-paging',
  templateUrl: './exchange-rate-paging.component.html'
})
export class ExchangeRatePagingComponent implements OnInit {
  RefCurrId: string;

  critObj: CriteriaObj = new CriteriaObj();
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  inputPagingObj: UcPagingObj = new UcPagingObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  readonly CancelLink: string = NavigationConstant.CS_CURRENCY_PAGING;
  readonly AddLink: string = NavigationConstant.CS_EXCHANGE_RATE_DETAIL;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.RefCurrId = params["RefCurrId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewRefCurr.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchExchangeRate.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchExchangeRate.json";

    this.critObj.restriction = AdInsConstant.RestrictionEq;
    this.critObj.propName = 'ER.REF_CURR_ID';
    this.critObj.value = this.RefCurrId.toString();
    this.arrCrit.push(this.critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }

}
