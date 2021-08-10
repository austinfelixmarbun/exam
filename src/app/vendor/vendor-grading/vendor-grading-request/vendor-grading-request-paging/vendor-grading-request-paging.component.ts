import { Component, OnInit } from "@angular/core";
import { UcPagingObj } from "app/shared/model/UcPagingObj.Model";
@Component({
  selector: "app-vendor-grading-request-paging",
  templateUrl: "./vendor-grading-request-paging.component.html",
})
export class VendorGradingRequestPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  mode: string;
  constructor() {
  }

  ngOnInit(): void {

    this.inputPagingObj.pagingJson = "./assets/ucpaging/dealer-grading/searchDealerGradingRequest.json";
    this.inputPagingObj._url = "./assets/ucpaging/dealer-grading/searchDealerGradingRequest.json";
  }
}
