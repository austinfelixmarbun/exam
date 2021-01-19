import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-auction-company-paging',
  templateUrl: './auction-company-paging.component.html',
  styleUrls: ['./auction-company-paging.component.scss']
})
export class AuctionCompanyPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  isReady: boolean;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/vendor/auction-company/searchAuctionCompany.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/vendor/auction-company/searchAuctionCompany.json";
    this.inputPagingObj.deleteUrl = "/Vendor/DeleteVendor";
    
    this.isReady = true;
  }
}