import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AssetAttrObj } from 'app/shared/model/AssetAttrObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-asset-attribute-detail',
  templateUrl: './asset-attribute-detail.component.html',
  styleUrls: ['./asset-attribute-detail.component.scss']
})
export class AssetAttributeDetailComponent implements OnInit {
  inputLookupObj: InputLookupObj = new InputLookupObj();
  AssetAttrForm = this.fb.group({
    IsEditableAfterGoLive: [false],
    RefAttrId:['']
  });
  assetAttrObj: AssetAttrObj;
  AssetTypeId: number =0;
  pageType: string = "add";
  AssetAttrId: number =0;
  isReady : boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    this.route.queryParams.subscribe(params => {
      if (params["AssetTypeId"] != null) {
        this.AssetTypeId = params["AssetTypeId"];
      }
      if (params["AssetAttrId"] != null) {
        this.AssetAttrId = params["AssetAttrId"];
      }
      if (params["mode"] != null) {
        this.pageType = params["mode"];
      }
    });
  }

  ngOnInit() {
    this.inputLookupObj.urlJson = "./assets/uclookup/AssetAttribute/lookupAssetAttribute.json";
    this.inputLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/uclookup/AssetAttribute/lookupAssetAttribute.json";
    this.inputLookupObj.genericJson = "./assets/uclookup/AssetAttribute/lookupAssetAttribute.json";
    this.inputLookupObj.isRequired = true;
    this.assetAttrObj = new AssetAttrObj();

    this.assetAttrObj.AssetAttrId = this.AssetAttrId;
    if(this.pageType == "edit"){
      this.http.post(URLConstant.GetAssetAttrByAssetAttrId, this.assetAttrObj).subscribe(
        response => {
          this.AssetAttrForm.patchValue({
            IsEditableAfterGoLive : response['IsEditableAfterGoLive'],
            RefAttrId : response['RefAttrId']
          });
          this.inputLookupObj.nameSelect = response['AssetAttrName'];
          this.inputLookupObj.jsonSelect = {AttrName: response['AssetAttrName']};
        });  
    }
  }
  Save(){
    this.assetAttrObj.IsEditableAfterGoLive = this.AssetAttrForm.controls["IsEditableAfterGoLive"].value;
    this.assetAttrObj.AssetTypeId = this.AssetTypeId;
    this.assetAttrObj.RefAttrId = this.AssetAttrForm.controls["RefAttrId"].value;

    if(this.pageType == "add"){
      this.http.post(URLConstant.AddAssetAttr, this.assetAttrObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/Asset/Attribute/Paging"], { queryParams: { "AssetTypeId": this.AssetTypeId } });
        });
    }
    else if(this.pageType == "edit"){
      this.assetAttrObj.AssetAttrId = this.AssetAttrId;

      this.http.post(URLConstant.EditAssetAttr, this.assetAttrObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/Asset/Attribute/Paging"], { queryParams: { "AssetTypeId": this.AssetTypeId } });
        });
    }
  }

  getLookupAssetAttr(e) {
    this.AssetAttrForm.patchValue({
      RefAttrId: e.RefAttrId,
    });
    this.inputLookupObj.nameSelect = e.AttrName;
  }
}
