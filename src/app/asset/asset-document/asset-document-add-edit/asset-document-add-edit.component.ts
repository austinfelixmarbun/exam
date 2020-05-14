import { Component, OnInit } from '@angular/core';
import { AssetDocListObj } from 'app/shared/model/AssetDocListObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { RefAssetDocObj } from 'app/shared/model/RefAssetDocObj.Model';
import { GeneralSettingObj } from 'app/shared/model/GeneralSettingObj.Model';

@Component({
  selector: 'app-asset-document-add-edit',
  templateUrl: './asset-document-add-edit.component.html',
  styleUrls: ['./asset-document-add-edit.component.scss'],
  providers: [NGXToastrService]
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
  assetTypeName:string;
  assetDocName: string;
  pageType: string;
  AssetTypeId: number;
  AssetDocListId: number;
  apiUrl: string;
  settingUrl: string = environment.FoundationR3Url;
  urlEnviPaging: string = environment.foundationUrl;
  result: AssetDocListObj;
  assetDocListObj: AssetDocListObj;
  GetListRefAssetDocUrl: string;
  AddNewAssetDocListUrl: string;
  EditAssetDocListUrl: string;
  getRefAssetDocUrl: string;
  tempAssetName: any;
  temp: RefAssetDocObj;
  GetAssetTypeById : string;
  generalSettingUrl: string;
  isShowCbxBorrow: boolean;
  isShowCbxPledge: boolean;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

    this.AddNewAssetDocListUrl =  AdInsConstant.AddNewAssetDocList;
    this.EditAssetDocListUrl =  AdInsConstant.EditAssetDocList;
    this.GetListRefAssetDocUrl = AdInsConstant.GetListRefAssetDoc;
    this.GetAssetTypeById = AdInsConstant.GetAssetTypeById;
    this.generalSettingUrl = AdInsConstant.GetListGeneralSettingByListGsCode;
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
    console.log("wd");
    this.http.post(this.GetListRefAssetDocUrl, assetDocListObj).subscribe(
      (response) => {
        this.tempAssetName = response["ReturnObject"];
        this.AssetDocumentForm.patchValue({
          AssetDocName: this.tempAssetName[0].RefAssetDocId
        });
      }
    );
    var assetTypeReq = {"AssetTypeId": this.AssetTypeId};
    this.http.post(this.GetAssetTypeById, assetTypeReq).subscribe(
      (response) => {
        this.assetTypeName = response['AssetTypeName'];
      }
    );

    var generalSettingObj : GeneralSettingObj = new GeneralSettingObj();
    generalSettingObj.ListGsCode = ["IS_SHOW_CBX_BORROW","IS_SHOW_CBX_PLEDGE"];
    this.http.post(this.generalSettingUrl, generalSettingObj).subscribe(
      (response) => {
        var tempResponse = response['ResponseGeneralSettingObj'];
        if(tempResponse[0]['GsCode'] == "IS_SHOW_CBX_BORROW"){
          this.isShowCbxBorrow = tempResponse[0]["GsValue"];
        }
        else if(tempResponse[1]['GsCode'] == "IS_SHOW_CBX_BORROW"){
          this.isShowCbxBorrow = tempResponse[1]["GsValue"];
        }
        if(tempResponse[0]['GsCode'] == "IS_SHOW_CBX_PLEDGE"){
          this.isShowCbxPledge = tempResponse[0]["GsValue"];
        }
        else if(tempResponse[1]['GsCode'] == "IS_SHOW_CBX_PLEDGE"){
          this.isShowCbxPledge = tempResponse[1]["GsValue"];
        }
      }
    );

    if (this.pageType == "edit") {
      this.apiUrl = AdInsConstant.GetAssetDocListByAssetDocListId;
      this.getRefAssetDocUrl = AdInsConstant.GetRefAssetDocByRefAssetDocId;
      var assetDocListObj = new AssetDocListObj();
      var refAssetDocObj = new RefAssetDocObj();
      assetDocListObj.AssetDocListId = this.AssetDocListId;

      this.http.post(this.apiUrl, assetDocListObj).subscribe(
        (response: AssetDocListObj) => {
          this.result = response;
          refAssetDocObj.RefAssetDocId = this.result.RefAssetDocId;

          this.http.post(this.getRefAssetDocUrl, refAssetDocObj).subscribe(
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

      this.http.post(this.AddNewAssetDocListUrl, this.assetDocListObj).subscribe(
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

      this.http.post(this.EditAssetDocListUrl, this.assetDocListObj).subscribe(
        response => {
          console.log(response);
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
