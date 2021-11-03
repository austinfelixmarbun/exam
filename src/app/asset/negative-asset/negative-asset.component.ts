import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-negative-asset',
  templateUrl: './negative-asset.component.html'
})
export class NegativeAssetComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.ASSET_NEG_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchNegativeAsset.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchNegativeAsset.json";

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
