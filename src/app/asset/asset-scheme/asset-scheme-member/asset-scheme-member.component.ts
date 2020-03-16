import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-asset-scheme-member',
  templateUrl: './asset-scheme-member.component.html',
  styleUrls: ['./asset-scheme-member.component.scss']
})

export class AssetSchemeMemberComponent implements OnInit {
  AssetSchmHId:any;
  inputPagingObj: any;
  viewObj:any;
  arrCrit:any;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params["AssetSchmHId"] != null) {
        this.AssetSchmHId = params["AssetSchmHId"];
      }
    });
   }
 
  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetSchemeMember.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetSchemeMember.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteAssetSchmD;
    
    this.viewObj = "./assets/ucviewgeneric/viewAssetSchemeMember.json";
    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'ASD.ASSET_SCHM_H_ID';
    critObj.value = this.AssetSchmHId;

    var critObjIsActive = new CriteriaObj();
    critObjIsActive.restriction = AdInsConstant.RestrictionEq;
    critObjIsActive.propName = 'AM.IS_ACTIVE';
    critObjIsActive.value = "true";

    var critObjIsFinal = new CriteriaObj();
    critObjIsFinal.restriction = AdInsConstant.RestrictionEq;
    critObjIsFinal.propName = 'AM.IS_FINAL';
    critObjIsFinal.value = "true";

    this.arrCrit.push(critObj);
    this.arrCrit.push(critObjIsActive);
    this.arrCrit.push(critObjIsFinal);

    this.inputPagingObj.addCritInput = this.arrCrit;
  }
}