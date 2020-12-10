import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AssetMasterObj } from 'app/shared/model/AssetMasterObj.Model';
import { AssetTypeObj } from 'app/shared/model/AssetTypeObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ListRequestCriteriaObj } from 'app/shared/model/ListRequestCriteriaObj.Model';
import { AssetCategoryObj } from 'app/shared/model/AssetCategoryObj.Model';
import { AssetSchmListObj } from 'app/shared/model/AssetSchmListObj.Model';
import { ListAssetSchmDObj } from 'app/shared/model/ListAssetSchmDObj.Model';
import { map, mergeMap, first } from 'rxjs/operators';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { forkJoin } from 'rxjs';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-asset-master-add-edit-child',
  templateUrl: './asset-master-add-edit-child.component.html'
})
export class AssetMasterAddEditChildComponent implements OnInit {

  pageType: string;
  AssetMasterId: number;
  AssetTypeId: number;
  AssetTypeName: string;
  AssetTypeCode: string;
  HierarchyLvl: number;
  FullAssetCode: string;
  FullAssetName: string;
  assetMasterObj: AssetMasterObj = new AssetMasterObj();
  assetTypeObj: AssetTypeObj = new AssetTypeObj();
  assetCategoryObj: AssetCategoryObj = new AssetCategoryObj();
  assetSchmListDObj: AssetSchmListObj = new AssetSchmListObj();
  listAssetSchmDObj: ListAssetSchmDObj = new ListAssetSchmDObj();
  resultAssetType: AssetTypeObj = new AssetTypeObj();
  resultData: AssetMasterObj = new AssetMasterObj();
  resultAssetCategory: any;
  resultParentMaster: AssetMasterObj = new AssetMasterObj();
  listRequest: ListRequestCriteriaObj;
  listAssetScheme: Array<AssetSchmListObj>;
  isFinal: boolean;
  listSelectedId: Array<number> = [];
  checkboxAll: boolean = false;
  listAssetMasterAttrContent: Array<Object>;
  isReadyAssetMasterAttr: boolean = false;

  AssetMasterChildForm = this.fb.group({
    AssetCategoryId: [''],
    AssetTypeId: [0, [Validators.required]],
    AssetCode: ['', [Validators.required, Validators.maxLength(50)]],
    AssetName: ['', [Validators.required, Validators.maxLength(100)]],
    HierarchyLvl: [''],
    FullAssetCode: [''],
    FullAssetName: [''],
    ParentId: [0],
    IsFinal: [false],
    IsActive: [true],
    AssetTypeName: [''],
    AssetCheckbox: [''],
    AssetSchmCode: [''],
    AssetSchmName: [''],
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["AssetMasterId"] != null) {
        this.AssetMasterId = params["AssetMasterId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.AssetMasterChildForm.controls["AssetCode"].disable();
      this.AssetMasterChildForm.controls["AssetName"].disable();
      this.assetMasterObj = new AssetMasterObj();
      this.assetMasterObj.AssetMasterId = this.AssetMasterId;
      this.http.post(URLConstant.GetAssetMasterById, this.assetMasterObj).subscribe(
        (response: AssetMasterObj) => {
          this.resultData = response;
          this.AssetMasterChildForm.patchValue({
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
            AssetTypeName: this.AssetTypeName
          });

          this.assetMasterObj = new AssetMasterObj();
          this.assetMasterObj.AssetMasterId = this.resultData.ParentId;
          this.http.post(URLConstant.GetAssetMasterById, this.assetMasterObj).subscribe(
            (response: AssetMasterObj) => {
              this.resultParentMaster = response;
              this.AssetMasterChildForm.patchValue({
                FullAssetCode: this.resultParentMaster.FullAssetCode,
                FullAssetName: this.resultParentMaster.FullAssetName,
              });
              this.resultData.FullAssetCode = this.resultParentMaster.FullAssetCode;
              this.resultData.FullAssetName = this.resultParentMaster.FullAssetName;
              this.isFinal = this.resultData.IsFinal;
              this.AssetTypeId = this.resultData.AssetTypeId;
            }
          );

          this.assetTypeObj = new AssetTypeObj();
          this.assetTypeObj.AssetTypeId = this.resultData.AssetTypeId;
          this.http.post(URLConstant.GetAssetTypeById, this.assetTypeObj).subscribe(
            (response: AssetTypeObj) => {
              this.resultAssetType = response;
              this.AssetMasterChildForm.patchValue({
                AssetTypeName: this.resultAssetType.AssetTypeName
              });

              if (this.resultAssetType.MaxHierarchyLevel == (this.AssetMasterChildForm.controls["HierarchyLvl"].value)) {
                this.AssetMasterChildForm.patchValue({
                  IsFinal: true
                })
                console.log("Masuk Final");
                  this.AssetMasterChildForm.controls["AssetCategoryId"].setValidators([Validators.required]);
                  this.AssetMasterChildForm.controls['AssetCategoryId'].updateValueAndValidity();
              }
              else {
                this.AssetMasterChildForm.patchValue({
                  IsFinal: false
                });
              }
              this.isFinal = this.AssetMasterChildForm.controls["IsFinal"].value
              var critObj = new CriteriaObj();
              critObj.DataType = 'text';
              critObj.restriction = AdInsConstant.RestrictionEq;
              critObj.propName = 'ASSET_TYPE_CODE';
              critObj.value = this.resultAssetType.AssetTypeCode;

              this.listRequest = new ListRequestCriteriaObj();
              this.listRequest.criteria = new Array();
              this.listRequest.criteria.push(critObj);
              this.http.post(URLConstant.GetListAssetCategory, this.listRequest).subscribe(
                response => {
                  this.resultAssetCategory = response[CommonConstant.ReturnObj];
                  this.AssetMasterChildForm.patchValue({ AssetCategoryId: this.resultData.AssetCategoryId });
                });

              if (this.isFinal) {
                this.http.post(URLConstant.GetAssetMasterAttrContentForAssetMasterByAttrTypeCode, { AssetMasterId: this.AssetMasterId,  AttrTypeCode: CommonConstant.AttrTypeCodeMaster}).pipe(first()).subscribe(
                  (response) => {
                    this.listAssetMasterAttrContent = response["AssetMasterAttrContentObjs"];
                    var formGroupObject = new Object();
                    for (const masterAttr of this.listAssetMasterAttrContent) {
                      formGroupObject[masterAttr["AssetAttrId"]] = [masterAttr["AttrContent"], [Validators.required]];
                    }
                    this.AssetMasterChildForm.addControl("AssetMasterAttrContent", this.fb.group(formGroupObject));
                    this.isReadyAssetMasterAttr = true;
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
            });
          this.assetSchmListDObj = new AssetSchmListObj();
          this.assetSchmListDObj.AssetMasterId = this.AssetMasterId;
          this.assetSchmListDObj.AssetTypeId = this.resultData.AssetTypeId;
          this.http.post(URLConstant.GetListAssetSchmH, this.assetSchmListDObj).subscribe(
            response => {
              this.listAssetScheme = response[CommonConstant.ReturnObj];
              for (let i = 0; i < this.listAssetScheme.length; i++) {
                if (this.listAssetScheme[i].AssetSchmHIdFromD != null) {
                  this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHIdFromD);
                }
              }
            });
        }
      );
    }

    if (this.pageType == "add") {
      this.assetMasterObj = new AssetMasterObj();
      this.assetMasterObj.AssetMasterId = this.AssetMasterId;
      this.http.post(URLConstant.GetAssetMasterById, this.assetMasterObj).subscribe(
        (response: AssetMasterObj) => {
          this.resultData = response;
          this.AssetMasterChildForm.patchValue({
            AssetTypeId: this.resultData.AssetTypeId,
            HierarchyLvl: +this.resultData.HierarchyLvl + 1,
            FullAssetCode: this.resultData.FullAssetCode,
            FullAssetName: this.resultData.FullAssetName,
            ParentId: this.resultData.ParentId,
            IsFinal: this.resultData.IsFinal,
            IsActive: this.resultData.IsActive
          });

          this.assetTypeObj = new AssetTypeObj();
          this.assetTypeObj.AssetTypeId = this.resultData.AssetTypeId;
          this.http.post(URLConstant.GetAssetTypeById, this.assetTypeObj).subscribe(
            (response: AssetTypeObj) => {
              this.resultAssetType = response;
              this.AssetMasterChildForm.patchValue({
                AssetTypeName: this.resultAssetType.AssetTypeName
              });

              if (this.resultAssetType.MaxHierarchyLevel == (this.AssetMasterChildForm.controls["HierarchyLvl"].value)) {
                this.AssetMasterChildForm.patchValue({
                  IsFinal: true
                })
                this.AssetMasterChildForm.controls["AssetCategoryId"].setValidators([Validators.required]);
                this.AssetMasterChildForm.controls['AssetCategoryId'].updateValueAndValidity();
              }
              else {
                this.AssetMasterChildForm.patchValue({
                  IsFinal: false
                });
              }
              this.isFinal = this.AssetMasterChildForm.controls["IsFinal"].value
              var critObj = new CriteriaObj();
              critObj.DataType = 'text';
              critObj.restriction = AdInsConstant.RestrictionEq;
              critObj.propName = 'ASSET_TYPE_CODE';
              critObj.value = this.resultAssetType.AssetTypeCode;

              this.listRequest = new ListRequestCriteriaObj();
              this.listRequest.criteria = new Array();
              this.listRequest.criteria.push(critObj);
              this.http.post(URLConstant.GetListAssetCategory, this.listRequest).subscribe(
                response => {
                  this.resultAssetCategory = response[CommonConstant.ReturnObj];
                  if (this.resultAssetCategory.length > 0) {
                    this.AssetMasterChildForm.patchValue({ AssetCategoryId: response[CommonConstant.ReturnObj][0]['Key'] });
                  }
                });

              if (this.isFinal) {
                this.http.post(URLConstant.GetAssetMasterAttrContentForAssetMaster, { AssetMasterId: this.AssetMasterId }).pipe(first()).subscribe(
                  (response) => {
                    this.listAssetMasterAttrContent = response["AssetMasterAttrContentObjs"];
                    var formGroupObject = new Object();
                    for (const masterAttr of this.listAssetMasterAttrContent) {
                      formGroupObject[masterAttr["AssetAttrId"]] = [masterAttr["AttrAssetAttrIdContent"], [Validators.required]];
                    }
                    this.AssetMasterChildForm.addControl("AssetMasterAttrContent", this.fb.group(formGroupObject));
                    this.isReadyAssetMasterAttr = true;
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
            });
          this.assetSchmListDObj = new AssetSchmListObj();
          this.assetSchmListDObj.AssetMasterId = this.AssetMasterId;
          this.assetSchmListDObj.AssetTypeId = this.resultData.AssetTypeId;
          this.http.post(URLConstant.GetListAssetSchmH, this.assetSchmListDObj).subscribe(
            response => {
              this.listAssetScheme = response[CommonConstant.ReturnObj];
              for (let i = 0; i < this.listAssetScheme.length; i++) {
                if (this.listAssetScheme[i].AssetSchmHIdFromD != null) {
                  this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHIdFromD);
                }
              }
            });
        }
      );
    }
  }

  SplitAttrListValue(value) {
    return value.split(";");
  }


  SelectAll(condition) {
    this.checkboxAll = condition;
    if (condition) {
      for (let i = 0; i < this.listAssetScheme.length; i++) {
        if (this.listSelectedId.indexOf(this.listAssetScheme[i].AssetSchmHIdFromD) < 0) {
          this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHIdFromH);
        }
      }

    } else {
      for (let i = 0; i < this.listAssetScheme.length; i++) {
        let index = this.listSelectedId.indexOf(this.listAssetScheme[i].AssetSchmHIdFromD);
        if (index > -1) {
          this.listSelectedId.splice(index, 1);
        }
      }
    }
  }

  Checked(AssetSchmHIdFromH: any, isChecked: any): void {
    if (isChecked) {
      this.listSelectedId.push(AssetSchmHIdFromH);
    } else {
      let index = this.listSelectedId.indexOf(AssetSchmHIdFromH)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
  }

  SaveForm() {
    var formValue = this.AssetMasterChildForm.value;
    var assetMasterAttrValues = new Array<Object>();

    if (this.AssetMasterChildForm.contains("AssetMasterAttrContent")) {
      if (Object.keys(formValue["AssetMasterAttrContent"]).length > 0 && formValue["AssetMasterAttrContent"].constructor === Object) {
        for (const key in formValue["AssetMasterAttrContent"]) {
          var assetMasterAttr = {
            AssetMasterId: this.AssetMasterId,
            AssetAttrId: key,
            AttrContent: formValue["AssetMasterAttrContent"][key]
          };
          assetMasterAttrValues.push(assetMasterAttr);
        }
      }
    }

    if (this.pageType == "add") {
      this.assetMasterObj = new AssetMasterObj();
      this.assetMasterObj.AssetTypeId = this.AssetMasterChildForm.controls["AssetTypeId"].value;
      this.assetMasterObj.AssetCode = this.AssetMasterChildForm.controls["AssetCode"].value;
      this.assetMasterObj.AssetName = this.AssetMasterChildForm.controls["AssetName"].value;
      this.assetMasterObj.HierarchyLvl = this.AssetMasterChildForm.controls["HierarchyLvl"].value;
      this.assetMasterObj.FullAssetCode = this.AssetMasterChildForm.controls["FullAssetCode"].value + '.' + this.AssetMasterChildForm.controls["AssetCode"].value;
      this.assetMasterObj.FullAssetName = this.AssetMasterChildForm.controls["FullAssetName"].value + ' ' + this.AssetMasterChildForm.controls["AssetName"].value;
      this.assetMasterObj.ParentId = this.AssetMasterId;
      this.assetMasterObj.IsFinal = this.AssetMasterChildForm.controls["IsFinal"].value;
      this.assetMasterObj.IsActive = this.AssetMasterChildForm.controls["IsActive"].value;

      if (this.assetMasterObj.IsFinal == true) {
        this.assetMasterObj.AssetCategoryId = this.AssetMasterChildForm.controls["AssetCategoryId"].value;
      }
      else {
        this.assetMasterObj.AssetCategoryId = '';
      }

      if (this.assetMasterObj.IsFinal == true) {
        this.listAssetSchmDObj = new ListAssetSchmDObj();
        this.listAssetSchmDObj.AssetMasterId = this.AssetMasterId;
        this.listAssetSchmDObj.AssetSchmHId = [];
        for (var i = 0; i < this.listAssetScheme.length; i++) {
          if (this.listSelectedId.length != 0) {
            for (let j = 0; j < this.listSelectedId.length; j++) {
              if (this.listAssetScheme[i].AssetSchmHIdFromH == this.listSelectedId[j]) {
                this.listAssetSchmDObj.AssetSchmHId.push(this.listAssetScheme[i].AssetSchmHIdFromH);
                break;
              } else {
                this.listAssetScheme[i].AssetMasterId = null;
              }
            }
          } else {
            this.listAssetScheme[i].AssetMasterId = null;
          }
        }
        this.http.post(URLConstant.AddAssetMaster, this.assetMasterObj).pipe(
          map((response) => {
            return response;
          }),
          mergeMap((response) => {
            this.listAssetSchmDObj.AssetMasterId = response["AssetMasterId"];
            let observableBatch = [];
            if (assetMasterAttrValues.length > 0) {
              let addAssetMasterAttr = this.http.post(URLConstant.AddAssetMasterAttrContent, { AssetMasterAttrContentObjs: assetMasterAttrValues });
              observableBatch.push(addAssetMasterAttr);
            }
            let editListAssetSchm = this.http.post(URLConstant.EditListAssetSchmDByAssetMasterId, this.listAssetSchmDObj);
            observableBatch.push(editListAssetSchm);
            return forkJoin(observableBatch);
          })
        ).subscribe(
          (response) => {
            this.toastr.successMessage(response[response.length - 1]["Message"]);
            AdInsHelper.RedirectUrl(this.router,["/Asset/AssetMaster/Paging"],{});
          });
      }
      else {
        this.http.post(URLConstant.AddAssetMaster, this.assetMasterObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
            AdInsHelper.RedirectUrl(this.router,["/Asset/AssetMaster/Paging"],{});
          });
      }


    } else {
      this.assetMasterObj = this.resultData;
      this.assetMasterObj.AssetMasterId = this.AssetMasterId;
      this.assetMasterObj.AssetTypeId = this.AssetMasterChildForm.controls["AssetTypeId"].value;
      this.assetMasterObj.AssetCode = this.AssetMasterChildForm.controls["AssetCode"].value;
      this.assetMasterObj.AssetName = this.AssetMasterChildForm.controls["AssetName"].value;
      this.assetMasterObj.HierarchyLvl = this.AssetMasterChildForm.controls["HierarchyLvl"].value;
      this.assetMasterObj.FullAssetCode = this.AssetMasterChildForm.controls["FullAssetCode"].value + '.' + this.AssetMasterChildForm.controls["AssetCode"].value;
      this.assetMasterObj.FullAssetName = this.AssetMasterChildForm.controls["FullAssetName"].value + ' ' + this.AssetMasterChildForm.controls["AssetName"].value;
      this.assetMasterObj.ParentId = this.AssetMasterChildForm.controls["ParentId"].value;
      this.assetMasterObj.IsFinal = this.AssetMasterChildForm.controls["IsFinal"].value;
      this.assetMasterObj.IsActive = this.AssetMasterChildForm.controls["IsActive"].value;

      if (this.assetMasterObj.IsFinal == true) {
        this.assetMasterObj.AssetCategoryId = this.AssetMasterChildForm.controls["AssetCategoryId"].value;
      }
      else {
        this.assetMasterObj.AssetCategoryId = '';
      }

      if (this.assetMasterObj.IsFinal == true) {
        this.listAssetSchmDObj = new ListAssetSchmDObj();
        this.listAssetSchmDObj.AssetMasterId = this.AssetMasterId;
        this.listAssetSchmDObj.AssetSchmHId = [];
        for (var i = 0; i < this.listAssetScheme.length; i++) {
          if (this.listSelectedId.length != 0) {
            for (let j = 0; j < this.listSelectedId.length; j++) {
              if (this.listAssetScheme[i].AssetSchmHIdFromH == this.listSelectedId[j]) {
                this.listAssetSchmDObj.AssetSchmHId.push(this.listAssetScheme[i].AssetSchmHIdFromH);
                break;
              } else {
                this.listAssetScheme[i].AssetMasterId = null;
              }
            }
          } else {
            this.listAssetScheme[i].AssetMasterId = null;
          }
        }

        // Reynard: add / edit kok response ny beda ??
        let editAssetMaster = this.http.post(URLConstant.EditAssetMaster, this.assetMasterObj);
        let editAssetSchm = this.http.post(URLConstant.EditListAssetSchmDByAssetMasterId, this.listAssetSchmDObj);
        let observableBatch = [editAssetMaster, editAssetSchm];
        if (assetMasterAttrValues.length > 0) {
          let addAssetMasterAttr = this.http.post(URLConstant.AddAssetMasterAttrContent, { AssetMasterAttrContentObjs: assetMasterAttrValues });
          observableBatch.push(addAssetMasterAttr);
        }

        forkJoin(observableBatch).subscribe(
          (response) => {
            this.toastr.successMessage(response[response.length - 1]["Message"]);
            AdInsHelper.RedirectUrl(this.router,["/Asset/AssetMaster/Paging"],{});
          },
          (error) => {
            console.log(error);
          }
        );
      }
      else {
        this.http.post(URLConstant.EditAssetMaster, this.assetMasterObj).subscribe(
          response => {
            this.toastr.successMessage(response["Message"]);
            AdInsHelper.RedirectUrl(this.router,["/Asset/AssetMaster/Paging"],{});
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
}
