import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-source-paging',
  templateUrl: './app-source-paging.component.html'
})
export class AppSourcePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor(private router: Router) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAppSource.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAppSource.json";
  }

  AddClick()
  {
    AdInsHelper.RedirectUrl(this.router,["/CommonSetting/AppSource/Detail"],{ "mode": "Add"})
  }
}
