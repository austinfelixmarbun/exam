import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AssetCategoryObj } from 'app/shared/model/AssetCategoryObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-asset-category-add-edit',
  templateUrl: './asset-category-add-edit.component.html'
})
export class AssetCategoryAddEditComponent implements OnInit {
  AssetCategoryForm = this.fb.group({
    AssetCategoryName: ['', [Validators.required, Validators.maxLength(100)]],
    AssetCategoryCode: ['', [Validators.required, Validators.maxLength(50)]],
    IsActive: [true]
  });
  pageType: string = 'add';
  AssetTypeId: number;
  AssetCategoryId: number;
  result: AssetCategoryObj;
  acObj: AssetCategoryObj;
  assetTypeName: string;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params["AssetTypeId"] != null) {
        this.AssetTypeId = params["AssetTypeId"];
      }
      if (params["mode"] != null) {
        this.pageType = params["mode"];
      }
      if (params["AssetCategoryId"] != null) {
        this.AssetCategoryId = params["AssetCategoryId"];
      }
    });
  }

  ngOnInit() {
    this.http.post(URLConstant.GetAssetTypeById, { AssetTypeId: this.AssetTypeId }).subscribe(
      (response) => {
        this.assetTypeName = response['AssetTypeName'];
      });
    if (this.pageType == "edit") {
      var acObj = new AssetCategoryObj();
      this.AssetCategoryForm.controls.AssetCategoryCode.disable();
      acObj.AssetTypeId = this.AssetTypeId;
      acObj.AssetCategoryId = this.AssetCategoryId;
      this.http.post(URLConstant.GetAssetCategorybyAssetCategoryId, acObj).subscribe(
        (response: AssetCategoryObj) => {
          this.result = response;
          this.AssetCategoryForm.patchValue({
            AssetCategoryCode: this.result.AssetCategoryCode,
            AssetCategoryName: this.result.AssetCategoryName,
            IsActive: this.result.IsActive
          })
        });
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.acObj = new AssetCategoryObj();
      this.acObj.AssetCategoryCode = this.AssetCategoryForm.controls["AssetCategoryCode"].value;
      this.acObj.AssetCategoryName = this.AssetCategoryForm.controls["AssetCategoryName"].value;
      this.acObj.IsActive = this.AssetCategoryForm.controls["IsActive"].value;
      this.acObj.AssetTypeId = this.AssetTypeId;
      this.http.post(URLConstant.AddNewAssetCategory, this.acObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,["/Asset/Category/Paging"],{ "AssetTypeId": this.acObj.AssetTypeId });
        });
    } else {
      this.acObj = this.result;
      this.acObj.AssetCategoryCode = this.AssetCategoryForm.controls["AssetCategoryCode"].value;
      this.acObj.AssetCategoryName = this.AssetCategoryForm.controls["AssetCategoryName"].value;
      this.acObj.IsActive = this.AssetCategoryForm.controls["IsActive"].value;

      this.http.post(URLConstant.EditAssetCategory, this.acObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,["/Asset/Category/Paging"],{ "AssetTypeId": this.acObj.AssetTypeId });
        });
    }
  }
}
