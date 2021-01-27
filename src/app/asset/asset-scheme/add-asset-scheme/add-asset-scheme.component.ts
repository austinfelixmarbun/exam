import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AssetSchemeHObj } from 'app/shared/model/AssetSchemeHObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { AssetSchmDObj } from 'app/shared/model/AssetSchmDObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-add-asset-scheme',
  templateUrl: './add-asset-scheme.component.html'
})

export class AddAssetSchemeComponent implements OnInit {
  pageType: string = 'add';
  assetSchmHObj: AssetSchemeHObj;
  AssetTypeId: number;
  arrAssetSchmD: Array<AssetSchmDObj> = new Array<AssetSchmDObj>();
  responseResultData: AssetSchemeHObj;

  AssetSchmHId: any;
  viewObj: string;
  getListAssetSchmDByAssetSchmHId = URLConstant.GetListAssetSchmDByAssetSchmHId;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.pageType = params['param'];
      } else {
        this.pageType = 'add';
      }
      if (params['AssetSchmHId'] != null) {
        this.AssetSchmHId = params['AssetSchmHId'];
      }
      if (params['AssetTypeId'] != null) {
        this.AssetTypeId = params['AssetTypeId'];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewAssetSchemeMember.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/assetSchmMbrTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/assetSchmMbrTempPaging.json";
    this.tempPagingObj.isReady = true;

    var arr = [0];
    var temp;
    this.http.post(URLConstant.GetListAssetSchmDByAssetSchmHId, { "AssetSchmHId": this.AssetSchmHId, "RowVersion": "" }).subscribe(
      response => {
        temp = response[CommonConstant.ReturnObj];

        for (var i = 0; i < temp.length; i++) {
          arr.push(temp[i]['AssetMasterId']);
        }

        this.http.post(URLConstant.GetAssetSchmHById, { AssetSchmHId: this.AssetSchmHId, "RowVersion": "" }).subscribe(
          (response: AssetSchemeHObj) => {
            this.responseResultData = response;
            this.AssetTypeId = this.responseResultData.AssetTypeId;

            const addCritAssetMasterId = new CriteriaObj();
            addCritAssetMasterId.DataType = 'numeric';
            addCritAssetMasterId.propName = 'AM.ASSET_MASTER_ID';
            addCritAssetMasterId.restriction = AdInsConstant.RestrictionNotIn;
            addCritAssetMasterId.listValue = arr;
            this.tempPagingObj.addCritInput.push(addCritAssetMasterId);

            const addCritAssetType = new CriteriaObj();
            addCritAssetType.DataType = 'numeric';
            addCritAssetType.propName = 'AM.ASSET_TYPE_ID';
            addCritAssetType.restriction = AdInsConstant.RestrictionEq;
            addCritAssetType.value = this.AssetTypeId.toString();
            this.tempPagingObj.addCritInput.push(addCritAssetType);
          });
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,["/Error"],{});
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveAssetSchmMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    for (let index = 0; index < this.listSelectedId.length; index++) {
      var assetSchmDObj = new AssetSchmDObj();
      assetSchmDObj.AssetSchmHId = this.AssetSchmHId;
      assetSchmDObj.AssetMasterId = this.listSelectedId[index];
      this.arrAssetSchmD.push(assetSchmDObj);
    }

    var AssetSchmObj = {
      AssetSchmH: this.assetSchmHObj,
      AssetSchmDObjs: this.arrAssetSchmD
    }
    this.http.post(URLConstant.AddRangeAssetSchmD, AssetSchmObj).subscribe(
      response => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.router,["/Asset/Scheme/MemberDetail"],{ "AssetSchmHId": this.AssetSchmHId });
      }
    );
  }
}