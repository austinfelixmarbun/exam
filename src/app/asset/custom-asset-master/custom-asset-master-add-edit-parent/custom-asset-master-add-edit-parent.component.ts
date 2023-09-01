import { UcTemplateService } from '@adins/uctemplate';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { Subscription } from 'rxjs';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ListRequestCriteriaObj } from 'app/shared/model/list-request-criteria-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { GenericKeyValueListObj } from 'app/shared/model/generic/generic-key-value-list-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { FormDropDownListService } from '@adins/ucform';

@Component({
  selector: 'app-custom-asset-master-add-edit-parent',
  templateUrl: './custom-asset-master-add-edit-parent.component.html'
})
export class CustomAssetMasterAddEditParentComponent implements OnInit, AfterViewInit {

  parentForm: FormGroup;
  data: EventEmitter<any> = new EventEmitter<any>();
  listRequest: ListRequestCriteriaObj;
  resultAssetCategory: Array<KeyValueObj>;
  valueSub: Subscription;
  isFinal: boolean = false;
  AssetTypeCode: any;
  AssetTypeId: string;
  mode: string;
  pageName: string = "AssetMasterDetail";

  AssetMasterParentForm = this.fb.group({
    IsFinal: [false],
    AssetCategoryId: ['']
  });
  
  handler = {
    callback: ($event) => this.callback($event)
  };

  constructor(private http: HttpClient, private templateService: UcTemplateService, private UrlConstantNew: UrlConstantNew, private fb: FormBuilder, private ddlSvc: FormDropDownListService) {}

  // ngOnDestroy(): void {
  //   if (this.valueSub) {
  //     this.valueSub.unsubscribe();
  //   }
  // }

  ngAfterViewInit(): void {
    // console.log("masook: ", this.data.emit({ListAssetScheme: []}));
    // this.data.emit({ListAssetScheme: []});
  }

  onFormCreate(ev) {
    this.parentForm = ev;
  }

  ngOnInit(): void {
    console.log("masook");

    // this.pageName = ''
    // this.valueSub = this.templateService.callback.subscribe(key => {
    //   if (!event.hasOwnProperty('pageId')) {
    //     console.log('event', key);
    //     const value = this.parentForm.get(key).value;
    //     this.checkFinal(value);
    //     this.getListAssetCategory(value);
    //   }
    // });
    
  }

  callback(ev: any) {
    if(ev === 'AssetTypeId') {
      console.log(this.parentForm.get(ev).value);
      console.log("Parent Form",this.parentForm);
      const _ddl = this.ddlSvc.GetDictDDL(ev);
      console.log("ddl: ",_ddl);
      const y = this.parentForm.get(ev).value;
      const x = _ddl.find(x=>x.Key == y);
      console.log("AssetTypeCode", x.Value);
      this. getListAssetCategory(x.Value)
    }
  }

  getListAssetCategory(val: string){
    if (this.AssetTypeCode === val && val !== '') {
      return;
    }
    
    this.AssetTypeCode = val;
    
    var critObj = new CriteriaObj();
        critObj.DataType = 'text';
        critObj.restriction = AdInsConstant.RestrictionEq;
        critObj.propName = 'ASSET_TYPE_CODE';
        critObj.value = this.AssetTypeCode;
        console.log("crit val: ", critObj.value);
    
    this.listRequest = new ListRequestCriteriaObj();
    this.listRequest.criteria = new Array();
    this.listRequest.criteria.push(critObj);

    this.http.post<GenericKeyValueListObj>(this.UrlConstantNew.GetListAssetCategory, this.listRequest).subscribe(
      (response) => {
        this.resultAssetCategory = response[CommonConstant.ReturnObj];
        console.log("resultAssetCategory", this.resultAssetCategory)
        // if (this.resultAssetCategory.length == 0) {
        //   this.AssetMasterParentForm.patchValue({ AssetCategoryId: null });
        // } else {
        //   this.AssetMasterParentForm.patchValue({ AssetCategoryId: response[CommonConstant.ReturnObj][0]['Key'] });
        // }
        this.ddlSvc.SetDictDDL("AssetCategoryId", this.resultAssetCategory);
      });
  }
  
  // checkFinal(key: string){
  //   if (this.AssetTypeId === key && key !== '') {
  //     return;
  //   }
    
  //   this.AssetTypeId = key;
  //   const request = {
  //     Id: this.AssetTypeId
  //   };
  //   console.log("checkFinal");
  //   this.http.post(this.UrlConstantNew.GetAssetTypeById, request)
  //   .subscribe(res => {
  //     console.log('MaxHierarchyLevel', res['MaxHierarchyLevel']);

  //       if ( res['MaxHierarchyLevel'] == 1) {
  //         this.isFinal = true;
  //         // this.AssetMasterParentForm.controls["AssetCategoryId"].setValidators([Validators.required]);
  //         // this.AssetMasterParentForm.controls['AssetCategoryId'].updateValueAndValidity();
  //       }
  //       else {
  //         this.isFinal = false;
  //       }
  //     this.parentForm.get('IsFinal').setValue(this.isFinal);

  //   })
  // }

}
