import { Component, OnInit } from '@angular/core';
import { AssetDocListObj } from 'app/shared/model/AssetDocListObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefAssetDocObj } from 'app/shared/model/RefAssetDocObj.Model';
import { GeneralSettingObj } from 'app/shared/model/GeneralSettingObj.Model';

@Component({
  selector: 'app-asset-document-add-edit',
  templateUrl: './asset-document-add-edit.component.html'
})

export class AssetDocumentAddEditComponent implements OnInit {

  AssetDocumentForm = this.fb.group({
    AssetDocName: [''],
    IsMainDoc: [false],
    IsValueNeeded: [false],
    IsPledge: [false],
    IsBorrow: [false],
    IsMandatoryNew: [false],
    IsMandatoryUsed: [false],
    IsActive: [true],
  });
  assetTypeName: string;
  assetDocName: string;
  pageType: string;
  AssetTypeId: number;
  AssetDocListId: number;
  result: AssetDocListObj = new AssetDocListObj();
  assetDocListObj: AssetDocListObj = new AssetDocListObj();
  getRefAssetDocUrl: string;
  tempAssetName: any;
  temp: RefAssetDocObj = new RefAssetDocObj();
  isShowCbxBorrow: boolean;
  isShowCbxPledge: boolean;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params["AssetTypeId"] != null) {
        this.AssetTypeId = params["AssetTypeId"];
      }
      if (params["mode"] != null) {
        this.pageType = params["mode"];
      }
      if (params["AssetDocListId"] != null) {
        this.AssetDocListId = params["AssetDocListId"];
      }
    });
  }
  ngOnInit() {
    this.http.post(AdInsConstant.GetListRefAssetDoc, this.assetDocListObj).subscribe(
      (response) => {
        // console.log(response);
        this.tempAssetName = response["ReturnObject"];
        if (this.tempAssetName.length > 0) {
          let AssetDocData = this.tempAssetName.find(x => x.AssetDocCode == "AssetDocument");
          this.AssetDocumentForm.patchValue({
            AssetDocName: AssetDocData.RefAssetDocId
          });
        }
      }
    );
    this.http.post(AdInsConstant.GetAssetTypeById, { AssetTypeId: this.AssetTypeId }).subscribe(
      (response) => {
        this.assetTypeName = response['AssetTypeName'];
      }
    );

    var generalSettingObj: GeneralSettingObj = new GeneralSettingObj();
    generalSettingObj.ListGsCode = ["IS_SHOW_CBX_BORROW", "IS_SHOW_CBX_PLEDGE"];
    this.http.post(AdInsConstant.GetListGeneralSettingByListGsCode, generalSettingObj).subscribe(
      (response) => {
        var tempResponse = response['ResponseGeneralSettingObj'];
        // console.log(tempResponse);
        let GSIsShowCbxBorrow = tempResponse.find(x => x.GsCode == "IS_SHOW_CBX_BORROW");
        let GSIsShowCbxPledge = tempResponse.find(x => x.GsCode == "IS_SHOW_CBX_PLEDGE");
        // console.log(GSIsShowCbxBorrow);
        // console.log(GSIsShowCbxPledge);

        if (GSIsShowCbxBorrow != undefined || GSIsShowCbxBorrow != null)
          this.isShowCbxBorrow = GSIsShowCbxBorrow["GsValue"];
        if (GSIsShowCbxPledge != undefined || GSIsShowCbxPledge != null)
          this.isShowCbxPledge = GSIsShowCbxPledge["GsValue"];
      }
    );

    if (this.pageType == "edit") {
      this.getRefAssetDocUrl = AdInsConstant.GetRefAssetDocByRefAssetDocId;

      this.http.post(AdInsConstant.GetAssetDocListByAssetDocListId, { AssetDocListId: this.AssetDocListId }).subscribe(
        (response: AssetDocListObj) => {
          this.result = response;
          this.http.post(this.getRefAssetDocUrl, { RefAssetDocId: this.result.RefAssetDocId }).subscribe(
            (response: RefAssetDocObj) => {
              this.temp = response;
              this.assetDocName = this.temp.AssetDocName;
            });

          this.AssetDocumentForm.patchValue({
            IsMainDoc: this.result.IsMainDoc,
            IsValueNeeded: this.result.IsValueNeeded,
            IsPledge: this.result.IsPledge,
            IsBorrow: this.result.IsBorrow,
            IsMandatoryNew: this.result.IsMandatoryNew,
            IsMandatoryUsed: this.result.IsMandatoryUsed,
            IsActive: this.result.IsActive,
          })
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  SaveForm() {
    if (this.pageType == "add") {
      this.assetDocListObj = new AssetDocListObj();
      this.assetDocListObj.RefAssetDocId = this.AssetDocumentForm.controls["AssetDocName"].value;
      this.assetDocListObj.IsValueNeeded = this.AssetDocumentForm.controls["IsValueNeeded"].value;
      this.assetDocListObj.IsMainDoc = this.AssetDocumentForm.controls["IsMainDoc"].value;
      this.assetDocListObj.IsPledge = this.AssetDocumentForm.controls["IsPledge"].value;
      this.assetDocListObj.IsBorrow = this.AssetDocumentForm.controls["IsBorrow"].value;
      this.assetDocListObj.IsMandatoryNew = this.AssetDocumentForm.controls["IsMandatoryNew"].value;
      this.assetDocListObj.IsMandatoryUsed = this.AssetDocumentForm.controls["IsMandatoryUsed"].value;
      this.assetDocListObj.IsActive = this.AssetDocumentForm.controls["IsActive"].value;
      this.assetDocListObj.AssetTypeId = this.AssetTypeId;

      this.http.post(AdInsConstant.AddNewAssetDocList, this.assetDocListObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/Asset/Document/Paging"], { queryParams: { "AssetTypeId": this.assetDocListObj.AssetTypeId } });
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.assetDocListObj = this.result;
      this.assetDocListObj.IsValueNeeded = this.AssetDocumentForm.controls["IsValueNeeded"].value;
      this.assetDocListObj.IsMainDoc = this.AssetDocumentForm.controls["IsMainDoc"].value;
      this.assetDocListObj.IsPledge = this.AssetDocumentForm.controls["IsPledge"].value;
      this.assetDocListObj.IsBorrow = this.AssetDocumentForm.controls["IsBorrow"].value;
      this.assetDocListObj.IsMandatoryNew = this.AssetDocumentForm.controls["IsMandatoryNew"].value;
      this.assetDocListObj.IsMandatoryUsed = this.AssetDocumentForm.controls["IsMandatoryUsed"].value;
      this.assetDocListObj.IsActive = this.AssetDocumentForm.controls["IsActive"].value;

      this.http.post(AdInsConstant.EditAssetDocList, this.assetDocListObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/Asset/Document/Paging"], { queryParams: { "AssetTypeId": this.assetDocListObj.AssetTypeId } });
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
