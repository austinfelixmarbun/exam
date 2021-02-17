import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AssetSchemeHObj } from 'app/shared/model/AssetSchemeHObj.Model';
import { AssetTypeObj } from 'app/shared/model/AssetTypeObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-asset-scheme-add-edit-information',
  templateUrl: './asset-scheme-add-edit-information.component.html'
})
export class AssetSchemeAddEditInformationComponent implements OnInit {
  AssetSchemeInfoForm = this.fb.group({
    AssetSchmCode: ['', Validators.required],
    AssetSchmName: ['', Validators.required],
    AssetTypeId: [''],
    IsActive: ['']
  });
  pageType: string = "add";
  assetSchmHObj: AssetSchemeHObj = new AssetSchemeHObj();
  AssetSchmHId: number;
  resultData: AssetSchemeHObj = new AssetSchemeHObj();
  RowVersion: string;
  ItemAssetType: Array<AssetTypeObj> = new Array<AssetTypeObj>();
  AssetSchmCode: string;

  readonly CancelLink: string = NavigationConstant.ASSET_SCHM_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["AssetSchmHId"] != null) {
        this.AssetSchmHId = params["AssetSchmHId"];
      }
    });
  }

  ngOnInit() {
    var assetTypeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeAssetTypeId,
      RowVersion: ""
    }
    this.http.post(URLConstant.GetListActiveAssetType, assetTypeObj).subscribe(
      (response) => {
        this.ItemAssetType = response[CommonConstant.ReturnObj];
        if (this.pageType == "add") {
          this.AssetSchemeInfoForm.patchValue({
            AssetTypeId: this.ItemAssetType[0].AssetTypeId,
            IsActive: true
          });
        }
      }
    );

    if (this.pageType == "edit") {
      this.assetSchmHObj = new AssetSchemeHObj();
      this.assetSchmHObj.AssetSchmHId = this.AssetSchmHId;
      this.AssetSchemeInfoForm.controls["AssetSchmCode"].disable();

      this.http.post(URLConstant.GetAssetSchmHById, this.assetSchmHObj).subscribe(
        (response: AssetSchemeHObj) => {
          this.resultData = response;
          this.RowVersion = this.resultData.RowVersion;
          this.AssetSchemeInfoForm.patchValue({
            AssetSchmCode: this.resultData.AssetSchmCode,
            AssetSchmName: this.resultData.AssetSchmName,
            AssetTypeId: this.resultData.AssetTypeId,
            IsActive: this.resultData.IsActive,
          });
          this.AssetSchmCode = this.resultData.AssetSchmCode;
        }
      );
    }
  }
  SaveForm() {
    this.assetSchmHObj = new AssetSchemeHObj();
    this.assetSchmHObj = this.AssetSchemeInfoForm.value;
    if (!this.assetSchmHObj.IsActive || this.assetSchmHObj.IsActive == "") {
      this.assetSchmHObj.IsActive = false;
    }
    else {
      this.assetSchmHObj.IsActive = true;
    }
    if (this.pageType == "add") {
      this.assetSchmHObj.RowVersion = "";
      this.http.post(URLConstant.AddAssetSchmH, this.assetSchmHObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ASSET_SCHM_PAGING],{});
        }
      );
    }
    else {
      this.assetSchmHObj.AssetSchmHId = this.AssetSchmHId;
      this.assetSchmHObj.RowVersion = this.RowVersion;
      this.assetSchmHObj.AssetSchmCode = this.AssetSchmCode;
      this.http.post(URLConstant.EditAssetSchmH, this.assetSchmHObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ASSET_SCHM_PAGING],{});
        }
      );
    }
  }
}