import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-general-setting-admin',
  templateUrl: './general-setting-admin.component.html',
  styles: []
})
export class GeneralSettingAdminComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchGeneralSettingAdmin.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchGeneralSettingAdmin.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "MODULE_CODE",
        environment: environment.FoundationR3Url
      }
    ];

    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'IS_UPDATABLE';
    critObj.value = '0';
    this.inputPagingObj.addCritInput.push(critObj);
  }

}
