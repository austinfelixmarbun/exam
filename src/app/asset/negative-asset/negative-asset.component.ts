import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-negative-asset',
  templateUrl: './negative-asset.component.html'
})
export class NegativeAssetComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchNegativeAsset.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObj.deleteUrl = "";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchNegativeAsset.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "A.MR_NEG_ASSET_SOURCE_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "ATH.ASSET_TYPE_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "AC.ASSET_CATEGORY_CODE",
        environment: environment.FoundationR3Url
      }
    ];

    var criteriaList = new Array();
    var criteriaObj = new CriteriaObj();

    criteriaObj = new CriteriaObj();
    criteriaObj.restriction = AdInsConstant.RestrictionEq;
    criteriaObj.propName = 'D.REF_MASTER_TYPE_CODE';
    criteriaObj.value = "NEG_ASSET_SOURCE";
    criteriaList.push(criteriaObj);
    this.inputPagingObj.addCritInput = criteriaList;
  }
}
