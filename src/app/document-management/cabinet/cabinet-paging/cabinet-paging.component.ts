import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-cabinet-paging',
  templateUrl: './cabinet-paging.component.html'
})
export class CabinetPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  isReady: boolean;

  readonly AddLink: string = NavigationConstant.BACK_TO_ADD_EDIT;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/document-management/cabinet/searchCabinet.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/document-management/cabinet/searchCabinet.json";
    this.inputPagingObj.deleteUrl = environment.FoundationR3Url + "/v1" + "/DocManagement/DeleteCabinet";
    
    this.isReady = true;
  }
}