import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html'
})

export class OfficeComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.OFFICE_ADD;
  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchOffice.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOffice.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefOffice;
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "A.MR_OFFICE_TYPE_CODE",
        environment: environment.FoundationR3Url
      }
    ];
    this.inputPagingObj.isSearched = true;
    this.inputPagingObj.delay = 200;
  }
}
