import { Component, OnInit } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { UcPagingObj } from "app/shared/model/UcPagingObj.Model";

@Component({
  selector: "app-ref-status-paging",
  templateUrl: "./ref-status-paging.component.html",
  providers: [DecimalPipe]
})
export class RefStatusPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchRefStatus.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefStatus.json";
  }
}
