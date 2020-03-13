import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AssetTypeObj } from 'app/shared/model/AssetTypeObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-asset-type-add-edit',
  templateUrl: './asset-type-add-edit.component.html',
  styleUrls: ['./asset-type-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class AssetTypeAddEditComponent implements OnInit {  
  ItemMaxHierarchyLevelNumber = [1,2,3,4,5];
  HierarchyNumber : any;

  AssetTypeForm = this.fb.group({
    AssetTypeCode		: ['', Validators.required],
    AssetTypeName		: ['', Validators.required],
    SerialNo1Label		: ['', Validators.required],
    SerialNo2Label		: [''],
    SerialNo3Label		: [''],
    SerialNo4Label		: [''],
    SerialNo5Label		: [''],
    IsMndtrySerialNo1		: [''],
    IsMndtrySerialNo2		: [''],
    IsMndtrySerialNo3		: [''],
    IsMndtrySerialNo4		: [''],
    IsMndtrySerialNo5		: [''],
    IsLoanObj		: [''],
    IsActive		: [''],
    MaxHierarchyLevel		: [''],

    HierarchyArr: this.fb.array([
      this.fb.group({
        label: ['Hierarchy Level 1 Label'],
        values: [''],
      })
    ])

  });

  getUrl: string;
  addUrl: string;
  editUrl: string;
  pageType: string = "add";
  assetTypeObj: AssetTypeObj;
  assetTypeId: any;
  resultData: any;
  RowVersion: any;
  assetTypeCode: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.getUrl =  AdInsConstant.GetAssetTypeById;
    this.addUrl =  AdInsConstant.AddAssetType;
    this.editUrl =  AdInsConstant.EditAssetType;

    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["AssetTypeId"] != null) {
        this.assetTypeId = params["AssetTypeId"];
      }
    });

  }

  get HierarchyArr() {
    return this.AssetTypeForm.get('HierarchyArr') as FormArray;
  }

  addHierarchyArr() {
    this.HierarchyArr.push(this.fb.control(''));
  }

  clearHierarchyArr(){
      while (this.HierarchyArr.length !== 0) {
        this.HierarchyArr.removeAt(0)
      }
  }

  public onHierarchyLevelChanged(valuesArr=[]){
    this.HierarchyNumber = this.AssetTypeForm.controls.MaxHierarchyLevel.value;

    this.clearHierarchyArr();

    for(let i=1;i<= this.HierarchyNumber;i++){
      this.HierarchyArr.push(this.fb.group({
        label: ['Hierarchy Level '+i + ' Label'],
        values: [valuesArr[i-1]]
      }));
    }
    console.log(this.AssetTypeForm.controls.HierarchyArr["controls"][0]['controls'].values);
  }

  ngOnInit() {
    this.AssetTypeForm.patchValue({
      MaxHierarchyLevel : this.ItemMaxHierarchyLevelNumber[0],
      IsLoanObj : true,
      IsActive : true
    })
    if (this.pageType == "edit") {
      this.assetTypeObj = new AssetTypeObj();
      
      this.assetTypeObj.AssetTypeId = this.assetTypeId;
      this.AssetTypeForm.controls["AssetTypeCode"].disable();
      
      this.http.post(this.getUrl, this.assetTypeObj).subscribe(
        response => {
          this.resultData = response;
          this.RowVersion = this.resultData.RowVersion;
          this.AssetTypeForm.patchValue({
            AssetTypeCode : this.resultData.AssetTypeCode,
            AssetTypeName : this.resultData.AssetTypeName,
            SerialNo1Label : this.resultData.SerialNo1Label,
            SerialNo2Label : this.resultData.SerialNo2Label,
            SerialNo3Label : this.resultData.SerialNo3Label,
            SerialNo4Label : this.resultData.SerialNo4Label,
            SerialNo5Label : this.resultData.SerialNo5Label,
            
            IsMndtrySerialNo1 : this.resultData.IsMndtrySerialNo1,
            IsMndtrySerialNo2 : this.resultData.IsMndtrySerialNo2,
            IsMndtrySerialNo3 : this.resultData.IsMndtrySerialNo3,
            IsMndtrySerialNo4 : this.resultData.IsMndtrySerialNo4,
            IsMndtrySerialNo5 : this.resultData.IsMndtrySerialNo5,
            IsLoanObj : this.resultData.IsLoanObj,
            IsActive : this.resultData.IsActive,
            MaxHierarchyLevel : this.resultData.MaxHierarchyLevel
          });
          this.assetTypeCode = this.resultData.AssetTypeCode;

          this.clearHierarchyArr();
          this.HierarchyNumber = this.resultData.MaxHierarchyLevel;

          var tempArr = [this.resultData.HierarchyLabelLevel1, this.resultData.HierarchyLabelLevel2, this.resultData.HierarchyLabelLevel3, this.resultData.HierarchyLabelLevel4, this.resultData.HierarchyLabelLevel5];

          this.onHierarchyLevelChanged(tempArr);

        },
        error => {
          console.log(error);
        }
      );
    }
  }

  SaveForm() {
    
    this.assetTypeObj = new AssetTypeObj();
    this.assetTypeObj = this.AssetTypeForm.value;
    var tempArr = [];

    for(var i=0;i<this.assetTypeObj.MaxHierarchyLevel;i++){
      tempArr[i] = this.AssetTypeForm.value.HierarchyArr[i].values;
    }

    this.assetTypeObj.HierarchyLabelLevel1 = tempArr[0];
    this.assetTypeObj.HierarchyLabelLevel2 = tempArr[1];
    this.assetTypeObj.HierarchyLabelLevel3 = tempArr[2];
    this.assetTypeObj.HierarchyLabelLevel4 = tempArr[3];
    this.assetTypeObj.HierarchyLabelLevel5 = tempArr[4];

    if(!this.assetTypeObj.IsMndtrySerialNo1 || this.assetTypeObj.IsMndtrySerialNo1 == ""){
      this.assetTypeObj.IsMndtrySerialNo1 = false;
    }
    else{
      this.assetTypeObj.IsMndtrySerialNo1 = true;
    }

    if(!this.assetTypeObj.IsMndtrySerialNo2 || this.assetTypeObj.IsMndtrySerialNo2 == ""){
      this.assetTypeObj.IsMndtrySerialNo2 = false;
    }
    else{
      this.assetTypeObj.IsMndtrySerialNo2 = true;
    }

    if(!this.assetTypeObj.IsMndtrySerialNo3 || this.assetTypeObj.IsMndtrySerialNo3 == ""){
      this.assetTypeObj.IsMndtrySerialNo3 = false;
    }
    else{
      this.assetTypeObj.IsMndtrySerialNo3 = true;
    }

    if(!this.assetTypeObj.IsMndtrySerialNo4 || this.assetTypeObj.IsMndtrySerialNo4 == ""){
      this.assetTypeObj.IsMndtrySerialNo4 = false;
    }
    else{
      this.assetTypeObj.IsMndtrySerialNo4 = true;
    }

    if(!this.assetTypeObj.IsMndtrySerialNo5 || this.assetTypeObj.IsMndtrySerialNo5 == ""){
      this.assetTypeObj.IsMndtrySerialNo5 = false;
    }
    else{
      this.assetTypeObj.IsMndtrySerialNo5 = true;
    }

    if(!this.assetTypeObj.IsLoanObj || this.assetTypeObj.IsLoanObj == ""){
      this.assetTypeObj.IsLoanObj = false;
    }
    else{
      this.assetTypeObj.IsLoanObj = true;
    }

    if(!this.assetTypeObj.IsActive || this.assetTypeObj.IsActive == ""){
      this.assetTypeObj.IsActive = false;
    }
    else{
      this.assetTypeObj.IsActive = true;
    }

    if(this.assetTypeObj.SerialNo2Label == ""){
      this.assetTypeObj.SerialNo2Label = null;
    }

    if(this.assetTypeObj.SerialNo3Label == ""){
      this.assetTypeObj.SerialNo3Label = null;
    }
    if(this.assetTypeObj.SerialNo4Label == ""){
      this.assetTypeObj.SerialNo4Label = null;
    }
    if(this.assetTypeObj.SerialNo5Label == ""){
      this.assetTypeObj.SerialNo5Label = null;
    }

    console.log(this.assetTypeObj);

    if (this.pageType == "add") {
      this.assetTypeObj.RowVersion = "";
      console.log('masuk add');

      this.http.post(this.addUrl, this.assetTypeObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            this.router.navigate(["/Asset/Type/Paging"]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.assetTypeObj.AssetTypeCode = this.assetTypeCode;
      this.assetTypeObj.RowVersion = this.RowVersion;
      this.assetTypeObj.AssetTypeId = this.assetTypeId;
      this.http.post(this.editUrl, this.assetTypeObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/Asset/Type/Paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
}
