import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-auction-company-paging',
  templateUrl: './auction-company-paging.component.html'
})
export class AuctionCompanyPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  isReady: boolean;

  readonly AddLink: string = NavigationConstant.BACK_TO_ADD_EDIT;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/vendor/auction-company/searchAuctionCompany.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/vendor/auction-company/searchAuctionCompany.json";
    
    this.isReady = true;
  }
}