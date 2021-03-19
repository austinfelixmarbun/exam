import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-general-setting-admin',
  templateUrl: './general-setting-admin.component.html',
  styles: []
})
export class GeneralSettingAdminComponent implements OnInit {
  inputPagingObj: any;
  arrCrit: any;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchGeneralSettingAdmin.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchGeneralSettingAdmin.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "MODULE_CODE",
        environment: environment.FoundationR3Url
      }
    ];

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'IS_UPDATABLE';
    critObj.value = '0';
    //this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }

}
