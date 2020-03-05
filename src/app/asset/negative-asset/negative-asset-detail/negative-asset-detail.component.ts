import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { map, mergeMap } from 'rxjs/operators';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { forkJoin } from 'rxjs';
import { AssetNegativeObj } from 'app/shared/model/AssetNegativeObj.Model';

@Component({
  selector: 'app-negative-asset-detail',
  templateUrl: './negative-asset-detail.component.html',
  styleUrls: ['./negative-asset-detail.component.scss'],
  providers: [NGXToastrService]
})
export class NegativeAssetDetailComponent implements OnInit {
  pageType: string = "add";
  assetNegativeId: number;
  inputLookupObj: InputLookupObj;
  criteriaList: Array<CriteriaObj>;
  criteriaObj: CriteriaObj;
  assetTypeList: any;
  negativeAssetSourceList: any;

  AssetNegativeForm = this.fb.group({
    AssetNegativeId: [0, [Validators.required]],
    AssetMasterId: ['', [Validators.required]],
    AssetTypeId: ['', [Validators.required]],
    SerialNo1: ['', [Validators.required]],
    SerialNo2: [''],
    SerialNo3: [''],
    SerialNo4: [''],
    SerialNo5: [''],
    MrNegAssetSourceCode: ['', [Validators.required]],
    Notes: ['', [Validators.required]],
    IsActive: [true],
    RowVersion: ['']
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.pageType = params['param'];
      }
      if (params['assetNegativeId'] != null) {
        this.assetNegativeId = params['assetNegativeId'];
      }
    });
  }

  ngOnInit() {
    var lookupNameSelect;

    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/uclookup/NegativeAsset/lookupAssetMaster_NegAst.json";
    this.inputLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/uclookup/NegativeAsset/lookupAssetMaster_NegAst.json";
    this.inputLookupObj.genericJson = "./assets/uclookup/NegativeAsset/lookupAssetMaster_NegAst.json";

    this.criteriaList = new Array();
    this.criteriaObj = new CriteriaObj();
    this.criteriaObj.restriction = AdInsConstant.RestrictionEq;
    this.criteriaObj.propName = 'IS_ACTIVE';
    this.criteriaObj.value = "1";
    this.criteriaList.push(this.criteriaObj);

    this.criteriaObj = new CriteriaObj();
    this.criteriaObj.restriction = AdInsConstant.RestrictionEq;
    this.criteriaObj.propName = 'IS_FINAL';
    this.criteriaObj.value = "1";
    this.criteriaList.push(this.criteriaObj);

    this.inputLookupObj.addCritInput = this.criteriaList;

    this.httpClient.post(AdInsConstant.GetActiveAssetTypeValue, null).pipe(
      map( (response) => {
        return response;
      }),
      mergeMap( (response) => {
        var refMasterObj = new RefMasterObj();
        refMasterObj.RefMasterTypeCode = "NEGATIVE_AST_SOURCE";
        const negativeSource = this.httpClient.post(environment.FoundationR3Url + AdInsConstant.GetListActiveRefMaster, refMasterObj);
        var tempResponse = [response];
        return forkJoin(tempResponse, negativeSource);
      })
    ).subscribe(
      (response: any) => {
        this.assetTypeList = response[0];
        this.negativeAssetSourceList = response[1];
        this.inputLookupObj.nameSelect = lookupNameSelect;
      }
    );

    var negativeAsset = new AssetNegativeObj();
    negativeAsset.AssetNegativeId = this.assetNegativeId;
    if(this.pageType == "edit"){
      this.httpClient.post(AdInsConstant.GetAssetNegativeByIdEditPage, negativeAsset).subscribe(
        (response: any) => {
          // console.log("Response Edit : " + JSON.stringify(response));
          this.AssetNegativeForm.patchValue({
            AssetNegativeId: response.AssetNegativeObj.AssetNegativeId,
            AssetMasterId: response.AssetNegativeObj.AssetMasterId,
            AssetTypeId: response.AssetMasterObj.AssetTypeId,
            SerialNo1: response.AssetNegativeObj.SerialNo1,
            SerialNo2: response.AssetNegativeObj.SerialNo2,
            SerialNo3: response.AssetNegativeObj.SerialNo3,
            SerialNo4: response.AssetNegativeObj.SerialNo4,
            SerialNo5: response.AssetNegativeObj.SerialNo5,
            MrNegAssetSourceCode: response.AssetNegativeObj.MrNegAssetSourceCode,
            Notes: response.AssetNegativeObj.Notes,
            IsActive: response.AssetNegativeObj.IsActive,
            RowVersion: response.AssetNegativeObj.RowVersion
          });

          lookupNameSelect = response.AssetMasterObj.FullAssetName;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  assetTypeChange(e){
    this.criteriaObj = new CriteriaObj();
    this.criteriaObj.restriction = AdInsConstant.RestrictionEq;
    this.criteriaObj.propName = 'ASSET_TYPE_ID';
    this.criteriaObj.value = e.target.value;
    this.criteriaList.push(this.criteriaObj);
    this.inputLookupObj.addCritInput = this.criteriaList;
  }

  getLookupAssetMasterResponse(e){
    this.AssetNegativeForm.patchValue({
      AssetMasterId: e.assetMasterId
    });
  }

  Back(){
    this.location.back();
  }

  Save(){
    var assetNegativeObj = this.AssetNegativeForm.value;
    if (this.pageType == "add") {
      this.httpClient.post(AdInsConstant.AddAssetNegative, assetNegativeObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/Asset/NegativeAsset/Paging', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/Asset/NegativeAsset/Detail']))
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
    else {
      this.httpClient.post(AdInsConstant.EditAssetNegative, assetNegativeObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Asset/NegativeAsset/Paging"]);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }
}
