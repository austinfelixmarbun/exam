import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AssetAccessoryObj } from 'app/shared/model/AssetAccesorryObj.Model';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-asset-accessory-add-edit',
  templateUrl: './asset-accessory-add-edit.component.html'
})
export class AssetAccessoryAddEditComponent implements OnInit {
  AssetAccessoryForm = this.fb.group({
    AssetAccessoryName: ['', [Validators.required, Validators.maxLength(100)]],
    AssetAccessoryCode: ['', [Validators.required, Validators.maxLength(50)]],
    IsActive: [true]
  });
  pageType: string = 'add';
  AssetTypeId: number;
  AssetAccessoryId: number;
  result: AssetAccessoryObj = new AssetAccessoryObj();
  acObj: AssetAccessoryObj = new AssetAccessoryObj();
  assetTypeName: string;

  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params["AssetTypeId"] != null) {
        this.AssetTypeId = params["AssetTypeId"];
      }
      if (params["mode"] != null) {
        this.pageType = params["mode"];
      }
      if (params["AssetAccessoryId"] != null) {
        this.AssetAccessoryId = params["AssetAccessoryId"];
      }
    });
  }
  ngOnInit() {
    this.http.post(URLConstant.GetAssetTypeById, { AssetTypeId: this.AssetTypeId }).subscribe(
      (response) => {
        this.assetTypeName = response['AssetTypeName'];
      }
    );
    if (this.pageType == "edit") {
      var acObj = new AssetAccessoryObj();
      acObj.AssetAccessoryId = this.AssetAccessoryId;
      acObj.AssetTypeId = this.AssetTypeId;
      this.AssetAccessoryForm.controls.AssetAccessoryCode.disable();

      this.http.post<AssetAccessoryObj>(URLConstant.GetAssetAccessorybyAssetAccessoryId, acObj).subscribe(
        (response) => {
          this.result = response;
          this.AssetAccessoryForm.patchValue({
            AssetAccessoryCode: this.result.AssetAccessoryCode,
            AssetAccessoryName: this.result.AssetAccessoryName,
            IsActive: this.result.IsActive
          })
        }
      );
    }
  }
  SaveForm() {
    if (this.pageType == "add") {
      this.acObj = new AssetAccessoryObj();
      this.acObj.AssetAccessoryCode = this.AssetAccessoryForm.controls["AssetAccessoryCode"].value;
      this.acObj.AssetAccessoryName = this.AssetAccessoryForm.controls["AssetAccessoryName"].value;
      this.acObj.IsActive = this.AssetAccessoryForm.controls["IsActive"].value;
      this.acObj.AssetTypeId = this.AssetTypeId;
      this.http.post(URLConstant.AddNewAssetAccesory, this.acObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ASSET_ACC_PAGING],{ "AssetTypeId": this.acObj.AssetTypeId });
        }
      );
    } else {
      this.acObj = this.result;
      this.acObj.AssetAccessoryCode = this.AssetAccessoryForm.controls["AssetAccessoryCode"].value;
      this.acObj.AssetAccessoryName = this.AssetAccessoryForm.controls["AssetAccessoryName"].value;
      this.acObj.IsActive = this.AssetAccessoryForm.controls["IsActive"].value;
      this.http.post(URLConstant.EditAssetAccessory, this.acObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ASSET_ACC_PAGING],{ "AssetTypeId": this.acObj.AssetTypeId });
        }
      );
    }
  }
}
