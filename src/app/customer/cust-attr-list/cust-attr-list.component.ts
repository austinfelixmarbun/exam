import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AttrContent } from 'app/shared/model/AttrContent.model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { KeyValueObj } from 'app/shared/model/KeyValue/KeyValueObj.Model';
import { RefAttr } from 'app/shared/model/RefAttr.Model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMasterCodeObj.Model';
import { ReqCustAttrContentByCustIdAndAttrGroupObj } from 'app/shared/model/Request/CustAttrContent/ReqCustAttrContentByCustIdAndAttrGroupObj.model';
import { ReqRefAttrByAttrGroupObj } from 'app/shared/model/Request/RefAttr/ReqRefAttrByAttrGroupObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-cust-attr-list',
  templateUrl: './cust-attr-list.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CustAttrListComponent implements OnInit {
  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() identifier: any;
  @Input() attrGroup: string;
  @Input() attrGroups: Array<string>;
  @Input() CustId: any;
  @Input() title: any;
  @Output() IncomeAmt: EventEmitter<{Index: number, Amount: number}> = new EventEmitter();
  @Output() ExpenseAmt: EventEmitter<{Index: number, Amount: number}> = new EventEmitter();

  ListAttrContent: Array<any> = new Array<any>();
  tempLookup = {};
  RefAttrList:  Array<RefAttr> = new Array<RefAttr>();
  ReqByIdAndAttrObj: ReqCustAttrContentByCustIdAndAttrGroupObj = new ReqCustAttrContentByCustIdAndAttrGroupObj();
  ListInputLookUpObj = new Array();
  isFormReady: boolean = false;
  AttrContent: AttrContent;
  AmountList: Array<{Index: number, Amount: number}> = new Array<{Index: number, Amount: number}>();

  constructor(private httpClient: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.CustId = params["Page"];
      }
    });
  }

  async ngOnInit() {
    if(this.attrGroup !== undefined) {
      let custGrp: ReqRefAttrByAttrGroupObj = new ReqRefAttrByAttrGroupObj();
      custGrp.AttrGroup = this.attrGroup;

      this.ReqByIdAndAttrObj.CustId = this.CustId;
      this.ReqByIdAndAttrObj.AttrGroup = this.attrGroup;
      await this.httpClient.post<Array<AttrContent>>(URLConstant.GetListCustAttrContentByCustIdAndAttrGroup, this.ReqByIdAndAttrObj).toPromise().then(
        (response) => {
          this.ListAttrContent = response[CommonConstant.ReturnObj];
          let parentFormGroup = new Object();

          this.httpClient.post<Array<RefAttr>>(URLConstant.GetListActiveRefAttrByAttrGroup, custGrp).subscribe(
            async (response: any) => {
              this.RefAttrList = response[CommonConstant.ReturnObj];

              if(this.RefAttrList != null) {
                for (const refAttr of this.RefAttrList) {
                  this.AttrContent = new AttrContent();
                  let isUpdateValue = false;
                  if (this.ListAttrContent.find(x => x.RefAttrId == refAttr.RefAttrId)) {
                    this.AttrContent = this.ListAttrContent.find(x => x.RefAttrId == refAttr.RefAttrId);
                    isUpdateValue = true;
                  } 
                  var formGroupObject = new Object();
                  formGroupObject["RefAttrId"] = [refAttr.RefAttrId];
                  formGroupObject["IsMandatory"] = [refAttr.IsMandatory];
                  formGroupObject["AttrGroup"] = this.attrGroup;
                  this.setFormGroupValue(refAttr, formGroupObject, parentFormGroup, isUpdateValue);
                } 
                this.ListInputLookUpObj.push(this.tempLookup);
                this.parentForm.addControl(this.identifier, this.fb.group(parentFormGroup));
                this.isFormReady = true;
              }
            }
          );
        }
      );
    }
    else if(this.attrGroups !== undefined) {
      await this.httpClient.post<Array<AttrContent>>(URLConstant.GetListCustFinDataAttrContentByCustIdAndListAttrGroup, { CustId: this.CustId, AttrGroups: this.attrGroups }).toPromise().then(
        (response) => {
          this.ListAttrContent = response[CommonConstant.ReturnObj];
          let parentFormGroup = new Object();

          this.httpClient.post<Array<RefAttr>>(URLConstant.GetListActiveRefAttrByListAttrGroup, { AttrGroups: this.attrGroups }).subscribe(
            async (response: any) => {
              this.RefAttrList = response[CommonConstant.ReturnObj];

              if(this.RefAttrList != null) {
                let index = 0;
                for (const refAttr of this.RefAttrList) {
                  this.AttrContent = new AttrContent();
                  let isUpdateValue = false;
                  let findListAttrContentObj = this.ListAttrContent.find(x => x.RefAttrId == refAttr.RefAttrId);
                  if (findListAttrContentObj !== undefined) {
                    this.AttrContent = findListAttrContentObj;
                    isUpdateValue = true;
                  } 
                  var formGroupObject = new Object();
                  formGroupObject["RefAttrId"] = [refAttr.RefAttrId];
                  formGroupObject["IsMandatory"] = [refAttr.IsMandatory];
                  formGroupObject["AttrGroup"] = [refAttr.AttrGroup];
                  this.setFormGroupValueForAttrGroups(refAttr, formGroupObject, parentFormGroup, isUpdateValue, index);
                  index++;
                } 
                this.ListInputLookUpObj.push(this.tempLookup);
                this.parentForm.addControl(this.identifier, this.fb.group(parentFormGroup));
                this.isFormReady = true;
              }
            }
          );
        }
      );
    }
  }

  SplitAttrListValue(value) {
    return value.split(";");
  }

  getLookUp(e, AttrCode) {
    this.parentForm['controls'][this.identifier]["controls"][AttrCode].patchValue({
      AttrValue: e.MasterCode
    });
  }

  setFormGroupValue(refAttr: RefAttr, formGroupObject: object, parentFormGroup, isUpdateValue: boolean) {
    if (isUpdateValue == false) {
      if (refAttr.AttrInputType == 'T' && refAttr.PatternValue != "" && refAttr.PatternValue != null) {
        if (refAttr.IsMandatory == true) {
          formGroupObject["AttrValue"] = ['', [Validators.required, Validators.pattern(refAttr.PatternValue)]];
        }
        else {
          formGroupObject["AttrValue"] = ['', [Validators.pattern(refAttr.PatternValue)]];
        }
      }
      else if (refAttr.AttrInputType == 'L') {
        let temp = refAttr.AttrValue.split(";");
        formGroupObject["AttrValue"] = [temp[0]];
      }
      else if (refAttr.AttrInputType == 'P' || refAttr.AttrInputType == 'N') {
        formGroupObject["AttrValue"] = [0];
      }
      else {
        formGroupObject["AttrValue"] = [''];
      }
      if (refAttr["DefaultValue"] != null && refAttr["DefaultValue"].trim() != '') {
        formGroupObject["AttrValue"] = [refAttr.DefaultValue];
      }
    }
    else {
      if (refAttr.AttrInputType == 'T' && refAttr.PatternValue != "" && refAttr.PatternValue != null) {
        if (refAttr.IsMandatory == true) {
          formGroupObject["AttrValue"] = [this.AttrContent.AttrValue, [Validators.required, Validators.pattern(refAttr.PatternValue)]];
        }
        else {
          formGroupObject["AttrValue"] = [this.AttrContent["AttrValue"], [Validators.pattern(refAttr['PatternValue'])]];
        }
      }
      else {
        formGroupObject["AttrValue"] = [this.AttrContent.AttrValue];
      }
    }
    if (refAttr["IsMandatory"] == true && refAttr["AttrInputType"] != 'T') {
      formGroupObject["AttrValue"].push(Validators.required)
    }
    parentFormGroup[refAttr.AttrCode] = this.fb.group(formGroupObject);
    if (refAttr["AttrInputType"] == 'RM') {
      this.tempLookup[refAttr["AttrCode"]] = new InputLookupObj();
      this.tempLookup[refAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].urlQryPaging = URLConstant.GetPagingObjectBySQL;
      this.tempLookup[refAttr["AttrCode"]].urlEnviPaging = environment.FoundationR3Url;
      this.tempLookup[refAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].title = refAttr.AttrName;
      if (refAttr["IsMandatory"] == true) {
        this.tempLookup[refAttr["AttrCode"]].isRequired = true;
      }
      else {
        this.tempLookup[refAttr["AttrCode"]].isRequired = false;
      }
      if (isUpdateValue == false) {
        if (refAttr["DefaultValue"] != null) {
          let refMaster: ReqRefMasterByTypeCodeAndMasterCodeObj = {
            RefMasterTypeCode: refAttr.AttrValue,
            MasterCode: refAttr.DefaultValue
          };
          this.httpClient.post(URLConstant.GetKvpRefMasterByRefMasterTypeCodeAndMasterCode, refMaster).subscribe(
            (response: KeyValueObj) => {
              this.tempLookup[refAttr["AttrCode"]].jsonSelect = { Descr: response.Value };
            });
        }
      }
      else {
        this.tempLookup[this.AttrContent.AttrCode].jsonSelect = { Descr: this.AttrContent.Descr }
      }
      let arrAddCrit = new Array();
      let critAssetObj = new CriteriaObj();
      critAssetObj.DataType = 'text';
      critAssetObj.restriction = AdInsConstant.RestrictionEq;
      critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
      isUpdateValue == false ? critAssetObj.value = refAttr.AttrValue : critAssetObj.value = this.AttrContent.MasterCode;
      arrAddCrit.push(critAssetObj);
      this.tempLookup[refAttr["AttrCode"]].addCritInput = arrAddCrit;
    }
  }

  setFormGroupValueForAttrGroups(refAttr: RefAttr, formGroupObject: object, parentFormGroup, isUpdateValue: boolean, index: number) {
    if (isUpdateValue == false) {
      if (refAttr.AttrInputType == 'T' && refAttr.PatternValue != "" && refAttr.PatternValue != null) {
        if (refAttr.IsMandatory == true) {
          formGroupObject["AttrValue"] = ['', [Validators.required, Validators.pattern(refAttr.PatternValue)]];
        }
        else {
          formGroupObject["AttrValue"] = ['', [Validators.pattern(refAttr.PatternValue)]];
        }
      }
      else if (refAttr.AttrInputType == 'L') {
        let temp = refAttr.AttrValue.split(";");
        formGroupObject["AttrValue"] = [temp[0]];
      }
      else if (refAttr.AttrInputType == 'P' || refAttr.AttrInputType == 'N') {
        formGroupObject["AttrValue"] = [0];
      }
      else {
        formGroupObject["AttrValue"] = [''];
      }
      if (refAttr["DefaultValue"] != null && refAttr["DefaultValue"].trim() != '') {
        formGroupObject["AttrValue"] = [refAttr.DefaultValue];
      }
    }
    else {
      if (refAttr.AttrInputType == 'T' && refAttr.PatternValue != "" && refAttr.PatternValue != null) {
        if (refAttr.IsMandatory == true) {
          formGroupObject["AttrValue"] = [this.AttrContent.AttrValue, [Validators.required, Validators.pattern(refAttr.PatternValue)]];
        }
        else {
          formGroupObject["AttrValue"] = [this.AttrContent["AttrValue"], [Validators.pattern(refAttr['PatternValue'])]];
        }
      }
      else {
        formGroupObject["AttrValue"] = [this.AttrContent.AttrValue];
        this.CalculateAmt(refAttr.AttrGroup, this.AttrContent.AttrValue, index);
      }
    }
    if (refAttr["IsMandatory"] == true && refAttr["AttrInputType"] != 'T') {
      formGroupObject["AttrValue"].push(Validators.required)
    }
    parentFormGroup[refAttr.AttrCode] = this.fb.group(formGroupObject);
    if (refAttr["AttrInputType"] == 'RM') {
      this.tempLookup[refAttr["AttrCode"]] = new InputLookupObj();
      this.tempLookup[refAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].urlQryPaging = URLConstant.GetPagingObjectBySQL;
      this.tempLookup[refAttr["AttrCode"]].urlEnviPaging = environment.FoundationR3Url;
      this.tempLookup[refAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
      this.tempLookup[refAttr["AttrCode"]].title = refAttr.AttrName;
      if (refAttr["IsMandatory"] == true) {
        this.tempLookup[refAttr["AttrCode"]].isRequired = true;
      }
      else {
        this.tempLookup[refAttr["AttrCode"]].isRequired = false;
      }
      if (isUpdateValue == false) {
        if (refAttr["DefaultValue"] != null) {
          let refMaster: ReqRefMasterByTypeCodeAndMasterCodeObj = {
            RefMasterTypeCode: refAttr.AttrValue,
            MasterCode: refAttr.DefaultValue
          };
          this.httpClient.post(URLConstant.GetKvpRefMasterByRefMasterTypeCodeAndMasterCode, refMaster).subscribe(
            (response: KeyValueObj) => {
              this.tempLookup[refAttr["AttrCode"]].jsonSelect = { Descr: response.Value };
            });
        }
      }
      else {
        this.tempLookup[this.AttrContent.AttrCode].jsonSelect = { Descr: this.AttrContent.Descr }
      }
      let arrAddCrit = new Array();
      let critAssetObj = new CriteriaObj();
      critAssetObj.DataType = 'text';
      critAssetObj.restriction = AdInsConstant.RestrictionEq;
      critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
      isUpdateValue == false ? critAssetObj.value = refAttr.AttrValue : critAssetObj.value = this.AttrContent.MasterCode;
      arrAddCrit.push(critAssetObj);
      this.tempLookup[refAttr["AttrCode"]].addCritInput = arrAddCrit;
    }
  }

  CalculateAmt(attrGroup: string, amount: string, index: number) {
    if(attrGroup === CommonConstant.AttrGroupCustPersonalFinDataIncome) {
      this.IncomeAmt.emit({Index: index, Amount: parseFloat(amount.replace(/,/g, ''))});
    }
    else if(attrGroup === CommonConstant.AttrGroupCustPersonalFinDataExpense) {
      this.ExpenseAmt.emit({Index: index, Amount: parseFloat(amount.replace(/,/g, ''))});
    }
  }
}