import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AssetAttrObj } from 'app/shared/model/AssetAttrObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { forkJoin } from 'rxjs';

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
  responseListAssetAttr: Array<any>;
  listRefAttrId: Array<number> = new Array();
  criteriaList: any[];
  criteriaObj: any;
  reqGetListObj: any;
  RowVersion: any;
  @ViewChild('LookupAssetAttr') ucLookupAssetAttr: UclookupgenericComponent;
  
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
    this.inputLookupObj.addCritInput = new CriteriaObj();

    this.criteriaList = new Array();
    this.criteriaObj = new CriteriaObj();
    this.criteriaObj.restriction = AdInsConstant.RestrictionNotIn;
    this.criteriaObj.propName = 'A.REF_ATTR_ID';

    this.assetAttrObj = new AssetAttrObj();

    this.assetAttrObj.AssetAttrId = this.AssetAttrId;
    this.reqGetListObj = new AssetAttrObj();
    this.reqGetListObj.AssetTypeId = this.AssetTypeId;
    let getListAssetAttr = this.http.post(URLConstant.GetListAssetAttrByAssetTypeId, this.reqGetListObj);
    let getAssetAttr = this.http.post(URLConstant.GetAssetAttrByAssetAttrId, this.assetAttrObj);
    if(this.pageType == "add"){
    getListAssetAttr.subscribe(
      response => {
          this.responseListAssetAttr = response['ListAssetAttrObj'];
          if(this.responseListAssetAttr.length > 0){
            for(var i=0;i<this.responseListAssetAttr.length;i++){
              this.listRefAttrId.push(this.responseListAssetAttr[i]['RefAttrId']);
            }
            this.criteriaObj.listValue = this.listRefAttrId;
            this.criteriaList.push(this.criteriaObj);
            this.inputLookupObj.addCritInput = this.criteriaList;
            this.ucLookupAssetAttr.setAddCritInput();
          }
      }
    );
  }
    else if(this.pageType == "edit"){
      forkJoin([getAssetAttr,getListAssetAttr]) .subscribe(
        response => {
          this.AssetAttrForm.patchValue({
            IsEditableAfterGoLive : response[0]['IsEditableAfterGoLive'],
            RefAttrId : response[0]['RefAttrId']
          });
          this.inputLookupObj.nameSelect = response[0]['AssetAttrName'];
          this.inputLookupObj.jsonSelect = {AttrName: response[0]['AssetAttrName']};

          this.responseListAssetAttr = response[1]['ListAssetAttrObj'];
          for(var i=0;i<this.responseListAssetAttr.length;i++){
            this.listRefAttrId.push(this.responseListAssetAttr[i]['RefAttrId']);
          }
          let index = this.listRefAttrId.indexOf(response[0]['RefAttrId'])
          if(index > -1){
            this.listRefAttrId.splice(index,1);
          }
          if(this.listRefAttrId.length > 0){
            this.criteriaObj.listValue = this.listRefAttrId;
            this.criteriaList.push(this.criteriaObj);
            this.inputLookupObj.addCritInput = this.criteriaList;
            this.ucLookupAssetAttr.setAddCritInput();
          }

          this.RowVersion = response[0]['RowVersion'];
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
      this.assetAttrObj.RowVersion = this.RowVersion;
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
