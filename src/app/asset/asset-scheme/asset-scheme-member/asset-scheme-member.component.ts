import { Component, OnInit, ViewChild } from '@angular/core';
import { UCSearchComponent } from '@adins/ucsearch';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AssetSchemeHObj } from 'app/shared/model/AssetSchemeHObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsService } from 'app/shared/services/adIns.service';


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';


// WHERE AM.IS_ACTIVE = '1' AND AM.IS_FINAL = '1' AND ASD.ASSET_SCHM_H_ID = 1
// tambain

@Component({
  selector: 'app-asset-scheme-member',
  templateUrl: './asset-scheme-member.component.html',
  styleUrls: ['./asset-scheme-member.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService]
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
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetAccessory.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetAccessory.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteAssetAccessory;
    
    this.viewObj = "./assets/ucviewgeneric/viewAssetType.json";
    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionLike;
    critObj.propName = 'ASSET_TYPE_ID';
    critObj.value = this.AssetSchmHId;
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;


  }

}



