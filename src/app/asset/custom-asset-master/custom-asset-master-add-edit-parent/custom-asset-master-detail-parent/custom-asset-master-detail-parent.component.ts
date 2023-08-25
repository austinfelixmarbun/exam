import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { GenericKeyValueListObj } from 'app/shared/model/generic/generic-key-value-list-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ListRequestCriteriaObj } from 'app/shared/model/list-request-criteria-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ListAssetSchemeHObj } from 'app/shared/model/response/asset-master/res-get-list-asset-scheme-h-obj.model';
import { Subscription } from 'rxjs';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-custom-asset-master-detail-parent',
  templateUrl: './custom-asset-master-detail-parent.component.html'
})
export class CustomAssetMasterDetailParentComponent implements OnInit, AfterViewInit, OnDestroy {

  // @Input()
  // ListAssetScheme: any[];

  @Input()
  parentForm: FormGroup;

  @Input()
  dicts: Record<string, any> = {};

  @Output()
  data: EventEmitter<any> = new EventEmitter<any>();

  valueSub: Subscription;

  AssetTypeId: string;
  checkboxAll: boolean = false;
  isFinal: boolean = false;
  MaxHierarchyLvl: any;
  AssetTypeCode: any;
  listAssetScheme: Array<ListAssetSchemeHObj> = new Array<ListAssetSchemeHObj>();
  listSelectedId: Array<number> = new Array<number>();
  listRequest: ListRequestCriteriaObj;
  resultAssetCategory: Array<KeyValueObj>;

  listItem: any[];

  AssetMasterParentForm = this.fb.group({
    IsFinal: [false],
    AssetCategoryId: ['']
  });


  constructor(private http: HttpClient, private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private cdr: ChangeDetectorRef) { 
  }

  ngOnDestroy(): void {
    this.valueSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('View Init Custom Asset Master Add Edit');
  }

  ngOnInit(): void {
    console.log('dictionary', this.dicts);

    this.valueSub = this.parentForm.valueChanges.subscribe(values => {
      // this.Show(values['AssetTypeId']);
      this.getListAssetScheme(values['AssetTypeId']);
      // this.listAssetScheme = this.dicts?.ListAssetScheme || [];
      console.log('formValues', values);
    });
  }

  Show(key: string){
    if (this.AssetTypeId === key && key !== '') {
      return;
    }
    
    this.AssetTypeId = key;
    const request = {
      Id: this.AssetTypeId
    };
    this.http.post('https://r3app-server.ad-ins.com/FOUNDATION_CORE_DEV/v1/AssetType/GetAssetTypeById', request)
    .subscribe(res => {
      console.log('AssetTypeId for MaxHierarchyLvl', res['AssetTypeId']);
      console.log('AssetCategory: ', res['AssetTypeCode']);
      this.AssetTypeCode = res['AssetTypeCode'];
      this.MaxHierarchyLvl = res['MaxHierarchyLevel'];
      if (this.MaxHierarchyLvl == 1) {
        this.isFinal = true;
        console.log("IsFinal: ",this.isFinal);
        this.AssetMasterParentForm.controls["AssetCategoryId"].setValidators([Validators.required]);
        this.AssetMasterParentForm.controls['AssetCategoryId'].updateValueAndValidity();
      }
      else {
        this.isFinal = false;
      }
      // this.data.emit({ListAssetScheme: this.listAssetScheme});
    })

    // this.isFinal = this.AssetMasterParentForm.controls["IsFinal"].value;

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
        if (this.resultAssetCategory.length == 0) {
          this.AssetMasterParentForm.patchValue({ AssetCategoryId: null });
        } else {
          this.AssetMasterParentForm.patchValue({ AssetCategoryId: response[CommonConstant.ReturnObj][0]['Key'] });
        }
      });
  }

  Checked(AssetSchmHIdFromH: number, isChecked: boolean): void {
    if (isChecked) {
      this.listSelectedId.push(AssetSchmHIdFromH);
    } else {
      let index = this.listSelectedId.indexOf(AssetSchmHIdFromH)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }

    this.data.emit({listSelectedSchm: this.listSelectedId});
    console.log('dicts', this.dicts);
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
        if (index >= -1) {
          this.listSelectedId.splice(index, 1);
        }
      }
    }
  }

  getListAssetScheme(key: string) {
    console.log('key', key);
    if (this.AssetTypeId === key && key === '') {
      return;
    }
    
    this.AssetTypeId = key;
    const request = {
      AssetTypeId: this.AssetTypeId
    };

    console.log('parentForm', request);
    this.http.post('https://r3app-server.ad-ins.com/FOUNDATION_CORE_DEV/v1/AssetSchmH/GetListAssetSchmHByAssetMasterId', request)
    .subscribe(res => {
      console.log('Response Assets', res);
      this.listAssetScheme = res['ReturnObject'];
      this.isFinal = true;
      this.parentForm.get('IsFinal').setValue(this.isFinal);
      this.parentForm.updateValueAndValidity();
      this.cdr.detectChanges();
      console.log('last asset Assets', this.listAssetScheme);
      // this.data.emit({ListAssetScheme: this.listAssetScheme});
    })
  }

}
