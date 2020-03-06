import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-asset-document-paging',
  templateUrl: './asset-document-paging.component.html',
  styleUrls: ['./asset-document-paging.component.scss']
})
export class AssetDocumentPagingComponent implements OnInit {
  AssetTypeId:any;
  inputPagingObj: any;
  viewObj:any;
  arrCrit:any;
  
  constructor(private route: ActivatedRoute) { this.route.queryParams.subscribe(params => {

      
    if (params["AssetTypeId"] != null) {
      this.AssetTypeId = params["AssetTypeId"];
    }
  
   
  }); }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetDocument.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetDocument.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteAssetDocList;
    
    this.viewObj = "./assets/ucviewgeneric/viewAssetType.json";

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionLike;
    critObj.propName = 'ASSET_TYPE_ID';
    critObj.value = this.AssetTypeId;
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }

}
