import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { FromValueObj, UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-mapping-asset-usage-add',
  templateUrl: './mapping-asset-usage-add.component.html',
  styleUrls: ['./mapping-asset-usage-add.component.css']
})
export class MappingAssetUsageAddComponent implements OnInit {

  AssetUsageCode: string;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  listSelectedCode: Array<string> = new Array<string>();
  tempDataExists = false;

  readonly CancelLink: string = NavigationConstant.MAPPING_ASSET_USAGE_DETAIL;

  constructor(private route: ActivatedRoute, private router: Router,
              private toastr: NGXToastrService, private http: HttpClient, ) {
    this.route.queryParams.subscribe(params => {
      if (params["AssetUsageCode"] != null) {
        this.AssetUsageCode = params["AssetUsageCode"];
      }
    });
  }

  ngOnInit() {
    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/assetCategoryUsageMapTempPaging.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/assetCategoryUsageMapTempPaging.json";

    this.tempPagingObj.isReady = true;
  }

  getListTemp(ev) {
    this.listSelectedCode = ev.TempListId;
    this.tempDataExists = this.listSelectedCode && this.listSelectedCode.length > 0
  }

  Save()
  {
    if (this.listSelectedCode.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    var obj = {
      MrAssetUsageCode: this.AssetUsageCode,
      AssetCategoryCode: this.listSelectedCode
    }

    this.http.post(URLConstant.AddListAssetCategoryUsageMap, obj).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.MAPPING_ASSET_USAGE_DETAIL],{ "AssetUsageCode": this.AssetUsageCode });
      });
  }

}
