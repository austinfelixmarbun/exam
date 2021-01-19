import { environment } from "environments/environment";
import { Component, OnInit } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { UcPagingObj } from "app/shared/model/UcPagingObj.Model";
import { CriteriaObj } from "app/shared/model/CriteriaObj.Model";
import { URLConstant } from "app/shared/constant/URLConstant";

@Component({
  selector: "app-general-setting-paging",
  templateUrl: "./general-setting-paging.component.html"
})
export class GeneralSettingPagingComponent implements OnInit {
  inputPagingObj: any;
  arrCrit: any;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchGeneralSetting.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchGeneralSetting.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "MODULE_CODE",
        environment: environment.FoundationR3Url
      }
    ];

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'IS_UPDATEABLE';
    critObj.value = '1';
    //this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }
}
