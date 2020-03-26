import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AssetSchemeHObj } from 'app/shared/model/AssetSchemeHObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-asset-scheme-add-edit-information',
  templateUrl: './asset-scheme-add-edit-information.component.html',
  styleUrls: ['./asset-scheme-add-edit-information.component.scss'],
  providers: [NGXToastrService]
})
export class AssetSchemeAddEditInformationComponent implements OnInit {
  AssetSchemeInfoForm = this.fb.group({
    AssetSchmCode: ['', Validators.required],
    AssetSchmName: ['', Validators.required],
    AssetTypeId: [''],
    IsActive: ['']
  });
  pageType: string = "add";
  assetSchmHObj: any;
  getUrl: string;
  addUrl: string;
  editUrl: string;
  AssetSchmHId: any;
  resultData: any;
  RowVersion: any;
  ItemAssetType: any;
  getAssetTypeUrl: string;
  AssetSchmCode: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.getUrl = AdInsConstant.GetAssetSchmHById;
    this.addUrl = AdInsConstant.AddAssetSchmH;
    this.editUrl = AdInsConstant.EditAssetSchmH;
    this.getAssetTypeUrl = AdInsConstant.GetListActiveAssetType;
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
      RefMasterTypeCode: "ASSET_TYPE_ID",
      RowVersion: ""
    }
    this.http.post(this.getAssetTypeUrl, assetTypeObj).subscribe(
      (response) => {
        this.ItemAssetType = response["ReturnObject"];
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

      this.http.post(this.getUrl, this.assetSchmHObj).subscribe(
        response => {
          this.resultData = response;
          this.RowVersion = this.resultData.RowVersion;
          this.AssetSchemeInfoForm.patchValue({
            AssetSchmCode: this.resultData.AssetSchmCode,
            AssetSchmName: this.resultData.AssetSchmName,
            AssetTypeId: this.resultData.AssetTypeId,
            IsActive: this.resultData.IsActive,
          });
          this.AssetSchmCode = this.resultData.AssetSchmCode;
        },
        error => {
          console.log(error);
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
      this.http.post(this.addUrl, this.assetSchmHObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/Asset/Scheme/Paging"]);
        },
        error => {
          console.log(error);
        }
      );
    } 
    else {
      this.assetSchmHObj.AssetSchmHId = this.AssetSchmHId;
      this.assetSchmHObj.RowVersion = this.RowVersion;
      this.assetSchmHObj.AssetSchmCode = this.AssetSchmCode;
      this.http.post(this.editUrl, this.assetSchmHObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/Asset/Scheme/Paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}