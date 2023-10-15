import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NavigationConstantX } from '../../shared/NavigationConstantX';

@Component({
  selector: 'app-asset-document-paging-x',
  templateUrl: './asset-document-paging-x.component.html',
})
export class AssetDocumentPagingXComponent implements OnInit {

  AssetTypeId: number;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  critObj: CriteriaObj = new CriteriaObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  
  readonly AddLink: string = NavigationConstantX.BACK_TO_DETAIL_X;
  readonly CancelLink: string = NavigationConstant.ASSET_CONFIG_PAGING;
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["AssetTypeId"] != null) {
        this.AssetTypeId = params["AssetTypeId"];
      }
    });
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetDocumentX.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetDocumentX.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAssetDocList;

    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewAssetType.json";

    this.critObj.restriction = AdInsConstant.RestrictionLike;
    this.critObj.propName = 'ASSET_TYPE_ID';
    this.critObj.value = this.AssetTypeId.toString();
    this.arrCrit.push(this.critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }

}
