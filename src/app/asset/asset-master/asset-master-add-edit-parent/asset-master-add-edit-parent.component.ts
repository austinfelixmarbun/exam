import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AssetMasterObj } from 'app/shared/model/AssetMasterObj.Model';
import { AssetTypeObj } from 'app/shared/model/AssetTypeObj.Model';

@Component({
  selector: 'app-asset-master-add-edit-parent',
  templateUrl: './asset-master-add-edit-parent.component.html',
  styleUrls: ['./asset-master-add-edit-parent.component.scss'],
  providers: [NGXToastrService]
})
export class AssetMasterAddEditParentComponent implements OnInit {

  pageType: string = "add";
  assetMasterId: any;
  assetMasterObj: AssetMasterObj;
  assetTypeObj: AssetTypeObj;
  resultAssetType: any;
  resultData: any;
  getUrl: any;
  addUrl: any;
  editUrl: any;
  getValueAssetType: any;
  getAssetType: any;
  allAssetMasterMethod: any;
  refCustModelCode: any;
  AssetMasterParentForm = this.fb.group({
    AssetCategoryId: [''],
    AssetTypeId: [0, [Validators.required]],
    AssetCode: ['', [Validators.required, Validators.maxLength(50)]],
    AssetName: ['', [Validators.required, Validators.maxLength(100)]],
    HierarchyLvl: [1],
    FullAssetCode: ['', [Validators.maxLength(500)]],
    FullAssetName: ['', [Validators.maxLength(1000)]],
    ParentId: [0],
    IsFinal: [false],
    IsActive: [false],
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.getUrl = AdInsConstant.GetAssetMasterById;
    this.addUrl = AdInsConstant.AddAssetMaster;
    this.editUrl = AdInsConstant.EditAssetMaster;
    this.getValueAssetType = AdInsConstant.GetValueAssetType;
    this.getAssetType = AdInsConstant.GetAssetTypeById;


    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["assetMasterId"] != null) {
        this.assetMasterId = params["assetMasterId"];
      }
    });
  }

  onChange() {
    this.assetTypeObj = new AssetTypeObj();
    this.assetTypeObj.AssetTypeId = this.AssetMasterParentForm.controls['AssetTypeId'].value;
    this.http.post(this.getAssetType, this.assetTypeObj).subscribe(
        response => {
          this.resultAssetType = response;
          console.log(this.resultAssetType);
          if (this.resultAssetType.MaxHierarchyLevel == 1)
          {
              this.AssetMasterParentForm.patchValue({
                  IsFinal: true
              });
          }
          else {
            this.AssetMasterParentForm.patchValue({
                IsFinal: false
            });
          }
        });
  }

  ngOnInit() {
    
    this.http.post(this.getValueAssetType, null).subscribe(
        (response) => {
            console.log(response);
          this.allAssetMasterMethod = response['ReturnObject'];
          this.AssetMasterParentForm.patchValue({ AssetTypeId: response['ReturnObject'][0]['Key'] });
        },
        (error) => {
          console.log(error);
        });


    if (this.pageType == "edit") {
      this.assetMasterObj = new AssetMasterObj();
      this.assetMasterObj.AssetMasterId = this.assetMasterId;
      this.http.post(this.getUrl, this.assetMasterObj).subscribe(
        response => {
          this.resultData = response;
          this.AssetMasterParentForm.patchValue({
            AssetCategoryId: this.resultData.AssetCategoryId,
            AssetTypeId: this.resultData.AssetTypeId,
            AssetCode: this.resultData.AssetCode,
            AssetName: this.resultData.AssetName,
            HierarchyLvl: this.resultData.HierarchyLvl,
            FullAssetCode: this.resultData.FullAssetCode,
            FullAssetName: this.resultData.FullAssetName,
            ParentId: this.resultData.ParentId,
            IsFinal: this.resultData.IsFinal,
            IsActive: this.resultData.IsActive,
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.assetMasterObj = new AssetMasterObj();
      this.assetMasterObj.AssetCategoryId = null;
      this.assetMasterObj.AssetTypeId = this.AssetMasterParentForm.controls["AssetTypeId"].value;
      this.assetMasterObj.AssetCode = this.AssetMasterParentForm.controls["AssetCode"].value;
      this.assetMasterObj.AssetName = this.AssetMasterParentForm.controls["AssetName"].value;
      this.assetMasterObj.HierarchyLvl = 1;
      this.assetMasterObj.FullAssetCode = this.AssetMasterParentForm.controls["AssetCode"].value;
      this.assetMasterObj.FullAssetName = this.AssetMasterParentForm.controls["AssetName"].value;
      this.assetMasterObj.ParentId = null;
      this.assetMasterObj.IsFinal = this.AssetMasterParentForm.controls["IsFinal"].value;
      this.assetMasterObj.IsActive = this.AssetMasterParentForm.controls["IsActive"].value;
      this.http.post(this.addUrl, this.assetMasterObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            this.router.navigate(["/CommonSetting/AssetMaster/Paging"]);
            console.log(response)
          
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.assetMasterObj = this.resultData;
      this.assetMasterObj.AssetMasterId = this.assetMasterId;
      this.assetMasterObj.AssetCategoryId = this.AssetMasterParentForm.controls["AssetCategoryId"].value
      this.assetMasterObj.AssetTypeId = this.AssetMasterParentForm.controls["AssetTypeId"].value;
      this.assetMasterObj.AssetCode = this.AssetMasterParentForm.controls["AssetCode"].value;
      this.assetMasterObj.AssetName = this.AssetMasterParentForm.controls["AssetName"].value;
      this.assetMasterObj.HierarchyLvl = this.AssetMasterParentForm.controls["HierarchyLvl"].value;
      this.assetMasterObj.FullAssetCode = this.AssetMasterParentForm.controls["FullAssetCode"].value;
      this.assetMasterObj.FullAssetName = this.AssetMasterParentForm.controls["FullAssetName"].value;
      this.assetMasterObj.ParentId = this.AssetMasterParentForm.controls["ParentId"].value;
      this.assetMasterObj.IsFinal = this.AssetMasterParentForm.controls["IsFinal"].value;
      this.assetMasterObj.IsActive = this.AssetMasterParentForm.controls["IsActive"].value;
      this.http.post(this.editUrl, this.assetMasterObj).subscribe(
        response => {
          console.log(response);
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/Asset/AssetMaster/Paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
}
