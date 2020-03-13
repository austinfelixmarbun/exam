import { Component, OnInit, ɵConsole } from '@angular/core';
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
import { AssetSchmDObj } from 'app/shared/model/AssetSchmDObj.Model';
import { AssetSchmListObj } from 'app/shared/model/AssetSchmListObj.Model';
import { ListAssetSchmDObj } from 'app/shared/model/ListAssetSchmDObj.Model';

@Component({
  selector: 'app-asset-master-add-edit-child',
  templateUrl: './asset-master-add-edit-child.component.html',
  styleUrls: ['./asset-master-add-edit-child.component.scss'],
  providers: [NGXToastrService]
})
export class AssetMasterAddEditChildComponent implements OnInit {

  pageType: string = "add";
  AssetMasterId: any;
  AssetTypeId: any;
  AssetTypeName: any;
  AssetTypeCode: any;
  HierarchyLvl: any;
  FullAssetCode: any;
  FullAssetName: any;
  assetMasterObj: AssetMasterObj;
  assetTypeObj: AssetTypeObj;
  assetCategoryObj : AssetCategoryObj;
  assetSchmListDObj : AssetSchmListObj;
  listAssetSchmDObj: ListAssetSchmDObj;
  resultAssetType: any;
  resultData: any;
  resultAssetCategory: any;
  resultParentMaster:any;
  getUrl: any;
  addUrl: any;
  editUrl: any;
  getAssetType: any;
  getListAssetCategory: any;
  getListAssetSchmH: any;
  editListAssetSchmD: any;
  listRequest: any;
  listAssetScheme: any;
  isFinal: any;
  listSelectedId: Array<any> = [];
  checkboxAll: any = false;
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
    this.getUrl = AdInsConstant.GetAssetMasterById;
    this.addUrl = AdInsConstant.AddAssetMaster;
    this.editUrl = AdInsConstant.EditAssetMaster;
    this.getAssetType = AdInsConstant.GetAssetTypeById;
    this.getListAssetCategory = AdInsConstant.GetListAssetCategory;
    this.getListAssetSchmH = AdInsConstant.GetListAssetSchmH;
    this.editListAssetSchmD = AdInsConstant.EditListAssetSchmDByAssetMasterId;

    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["AssetMasterId"] != null) {
        this.AssetMasterId = params["AssetMasterId"];
      }
      if (params["AssetTypeId"] != null) {
        this.AssetTypeId = params["AssetTypeId"];
      }
      if (params["AssetTypeCode"] != null) {
        this.AssetTypeCode = params["AssetTypeCode"];
      }
      if (params["AssetTypeName"] != null) {
        this.AssetTypeName = params["AssetTypeName"];
      }
      if (params["HierarchyLvl"] != null) {
        this.HierarchyLvl = params["HierarchyLvl"];
      }
      if (params["FullAssetCode"] != null) {
        this.FullAssetCode = params["FullAssetCode"];
      }
      if (params["FullAssetName"] != null) {
        this.FullAssetName = params["FullAssetName"];
      }
    });
  }

  ngOnInit() {
    var critObj = new CriteriaObj();
    critObj.DataType = 'text';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'ASSET_TYPE_CODE';
    critObj.value = this.AssetTypeCode;

    this.listRequest = new ListRequestCriteriaObj();
    this.listRequest.criteria = new Array();
    this.listRequest.criteria.push(critObj);
    this.http.post(this.getListAssetCategory, this.listRequest).subscribe(
      response => {
        this.resultAssetCategory = response['ReturnObject'];
        this.AssetMasterChildForm.patchValue({ AssetCategoryId: response['ReturnObject'][0]['Key'] });
        console.log();
      },
      (error) => {
        console.log(error);
      });


    if (this.pageType == "edit") {
      this.AssetMasterChildForm.controls["AssetCode"].disable();
      this.AssetMasterChildForm.controls["AssetName"].disable();
      this.assetMasterObj = new AssetMasterObj();
      this.assetMasterObj.AssetMasterId = this.AssetMasterId;
      this.http.post(this.getUrl, this.assetMasterObj).subscribe(
        response => {
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
          this.http.post(this.getUrl, this.assetMasterObj).subscribe(
          response => {
            this.resultParentMaster = response;
            this.AssetMasterChildForm.patchValue({
              FullAssetCode: this.resultParentMaster.FullAssetCode,
              FullAssetName: this.resultParentMaster.FullAssetName,
            });
            this.resultData.FullAssetCode = this.resultParentMaster.FullAssetCode
            this.resultData.FullAssetName = this.resultParentMaster.FullAssetName
            this.isFinal = this.resultData.IsFinal
          },
          error => {
            console.log(error);
          }
        );
        },
        error => {
          console.log(error);
        }
      );
    }

    if (this.pageType == "add") {
      this.AssetMasterChildForm.patchValue({
        AssetTypeName: this.AssetTypeName,
        HierarchyLvl: +this.HierarchyLvl + 1,
        FullAssetCode: this.FullAssetCode,
        FullAssetName: this.FullAssetName,
      });

      this.assetTypeObj = new AssetTypeObj();
      this.assetTypeObj.AssetTypeId = this.AssetTypeId;
      this.http.post(this.getAssetType, this.assetTypeObj).subscribe(
        response => {
          this.resultAssetType = response;
          if (this.resultAssetType.MaxHierarchyLevel == (+this.HierarchyLvl + 1))
          {
            this.AssetMasterChildForm.patchValue({
                IsFinal: true
            });
          }
          else {
            this.AssetMasterChildForm.patchValue({
                IsFinal: false
            });
          }

          if (this.resultAssetType.MaxHierarchyLevel == this.HierarchyLvl )
          {
              this.toastr.errorMessage(["This hierarchy reach Max Level"]);
              this.router.navigate(["/Asset/AssetMaster/Paging"]);
          }

          this.isFinal = this.AssetMasterChildForm.controls["IsFinal"].value
        });
    }
    
      this.assetSchmListDObj = new AssetSchmListObj();
      this.assetSchmListDObj.AssetMasterId = this.AssetMasterId;
      this.assetSchmListDObj.AssetTypeId = this.AssetTypeId;
      this.http.post(this.getListAssetSchmH, this.assetSchmListDObj).subscribe(
        response => {
          this.listAssetScheme = response['ReturnObject'];
          console.log("ddd");
          console.log(this.listAssetScheme);

          for (let i = 0; i < this.listAssetScheme.length; i++) {
            if(this.listAssetScheme[i].AssetSchmHId != null)
            {
              this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHId);
            }
            console.log("ccc");
            console.log(this.listSelectedId);
          }
        });
  }

  SelectAll(condition) {
    this.checkboxAll = condition;
    console.log(condition);
    if (condition) {
      for (let i = 0; i < this.listAssetScheme.length; i++) {
        if (this.listSelectedId.indexOf(this.listAssetScheme[i].AssetSchmHId) < 0) {
          this.listSelectedId.push(this.listAssetScheme[i].AssetSchmHId);
        }
      }

    } else {
      for (let i = 0; i < this.listAssetScheme.length; i++) {
        let index = this.listSelectedId.indexOf(this.listAssetScheme[i].AssetSchmHId);
        if (index >= -1) {
          this.listSelectedId.splice(index, 1);
        }
        console.log(this.listAssetScheme[i]);
      }
    }
    console.log(this.checkboxAll);
    console.log(this.listSelectedId);
  }

  Checked(assetSchmHId: any, isChecked: any): void {
    if (isChecked) {
      this.listSelectedId.push(assetSchmHId);
    } else {
      let index = this.listSelectedId.indexOf(assetSchmHId)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
    // console.log("bbbb");
    // console.log(assetSchmHId);
    // for (let i = 0; i < this.listAssetScheme.length; i++) {
    //   if (isChecked) {
    //     this.listSelectedId.push(assetSchmHId);
    //     this.listAssetScheme[i].assetSchmHId = this.AssetMasterId;
    //   } else {
    //     const index = this.listSelectedId.indexOf(assetMasterId)
    //     console.log(index);
    //     if (index >= -1) { 
    //       this.listSelectedId.splice(index, 1);
    //       this.listAssetScheme[i].AssetMasterId = null
    //     }
    //   }
    //   console.log('Sel', this.listSelectedId);
    // }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.assetMasterObj = new AssetMasterObj();
      this.assetMasterObj.AssetTypeId = this.AssetTypeId;
      this.assetMasterObj.AssetCode = this.AssetMasterChildForm.controls["AssetCode"].value;
      this.assetMasterObj.AssetName = this.AssetMasterChildForm.controls["AssetName"].value;
      this.assetMasterObj.HierarchyLvl = this.AssetMasterChildForm.controls["HierarchyLvl"].value;
      this.assetMasterObj.FullAssetCode = this.AssetMasterChildForm.controls["FullAssetCode"].value + '.' + this.AssetMasterChildForm.controls["AssetCode"].value;
      this.assetMasterObj.FullAssetName = this.AssetMasterChildForm.controls["FullAssetName"].value + ' ' + this.AssetMasterChildForm.controls["AssetName"].value;
      this.assetMasterObj.ParentId = this.AssetMasterId;
      this.assetMasterObj.IsFinal = this.AssetMasterChildForm.controls["IsFinal"].value;
      this.assetMasterObj.IsActive = this.AssetMasterChildForm.controls["IsActive"].value;

      if(this.assetMasterObj.IsFinal == true)
      {
        this.assetMasterObj.AssetCategoryId = this.AssetMasterChildForm.controls["AssetCategoryId"].value;
      }
      else
      {
        this.assetMasterObj.AssetCategoryId = '';
      }

      this.listAssetSchmDObj = new ListAssetSchmDObj();
      this.listAssetSchmDObj.AssetMasterId = this.AssetMasterId;
      this.listAssetSchmDObj.AssetSchmHId = [];
      for (var i = 0; i < this.listAssetScheme.length; i++) {
        if(this.listSelectedId.length != 0){
          for (let j = 0; j < this.listSelectedId.length; j++) {
            if(this.listAssetScheme[i].AssetSchmHId == this.listSelectedId[j]){
              this.listAssetSchmDObj.AssetSchmHId.push(this.listAssetScheme[i].AssetSchmHId);
              break;
            }else {
              this.listAssetScheme[i].AssetMasterId = null;
            }
          }
        }else{
          this.listAssetScheme[i].AssetMasterId = null;
        }
      }
      this.http.post(this.editListAssetSchmD, this.listAssetSchmDObj).subscribe(
        response => {
          console.log(response['ReturnObject']);
        });

      this.http.post(this.addUrl, this.assetMasterObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            this.router.navigate(["/Asset/AssetMaster/Paging"]);
            console.log(response)
          
        },
        error => {
          console.log(error);
        }
      );
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

      if(this.assetMasterObj.IsFinal == true)
      {
        this.assetMasterObj.AssetCategoryId = this.AssetMasterChildForm.controls["AssetCategoryId"].value;
      }
      else
      {
        this.assetMasterObj.AssetCategoryId = '';
      }

      this.listAssetSchmDObj = new ListAssetSchmDObj();
      this.listAssetSchmDObj.AssetMasterId = this.AssetMasterId;
      this.listAssetSchmDObj.AssetSchmHId = [];
      for (var i = 0; i < this.listAssetScheme.length; i++) {
        if(this.listSelectedId.length != 0){
          for (let j = 0; j < this.listSelectedId.length; j++) {
            if(this.listAssetScheme[i].AssetSchmHId == this.listSelectedId[j]){
              this.listAssetSchmDObj.AssetSchmHId.push(this.listAssetScheme[i].AssetSchmHId);
              break;
            }else {
              this.listAssetScheme[i].AssetMasterId = null;
            }
          }
        }else{
          this.listAssetScheme[i].AssetMasterId = null;
        }
      }
      console.log("aaaaa");
      console.log(this.listAssetSchmDObj);
      this.http.post(this.editListAssetSchmD, this.listAssetSchmDObj).subscribe(
        response => {
          console.log(response['ReturnObject']);
        });

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
