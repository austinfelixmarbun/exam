import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AttrContent } from 'app/shared/model/AttrContent.model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { GenericListObj } from 'app/shared/model/Generic/GenericListObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { ReqCustAttrContentByCustIdAndAttrGroupAndListAttrCodeObj } from 'app/shared/model/Request/CustAttrContent/ReqCustAttrContentByCustIdAndAttrGroupObj.model';

@Component({
  selector: 'app-cust-attr-form',
  templateUrl: './cust-attr-form.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CustAttrFormComponent implements OnInit {

  @Input() Label: string = "";
  @Input() CustId: number = 0;
  @Input() AttrGroup: string = "";
  @Input() AttrCodes: Array<string> = [];
  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() identifier: string = "CustAttrForm";

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.parentForm.addControl(this.identifier, this.fb.array([]));
    this.GetQuestion();
    console.log(this.parentForm);
    console.log(this.parentForm.get(this.identifier));
  }

  GetQuestion(custId: number = this.CustId) {
    let tempReq: ReqCustAttrContentByCustIdAndAttrGroupAndListAttrCodeObj = {
      AttrCodes: this.AttrCodes,
      AttrGroup: this.AttrGroup,
      CustId: custId,
      RowVersion: ""
    };
    let urlApi: string = URLConstant.GetListCustAttrContentByCustIdAndAttrGroup;
    if (this.AttrCodes.length > 0) urlApi = URLConstant.GetListCustAttrContentByCustIdAndAttrGroupAndListAttrCodes;
    this.http.post(urlApi, tempReq).subscribe(
      (response: GenericListObj) => {
        console.log(response);
        let tempList: Array<AttrContent> = response.ReturnObject;
        console.log(tempList);
        let tempFormArray: FormArray = this.parentForm.get("CustAttrForm") as FormArray;
        while (tempFormArray.length > 0) {
          tempFormArray.removeAt(0);
        }
        for (let index = 0; index < tempList.length; index++) {
          const element = tempList[index];
          tempFormArray.push(this.SetFormGroup(element));
        }
        console.log(tempFormArray);
      }
    )
  }

  readonly AttrInputTypeDate: string = CommonConstant.AttrInputTypeDate;
  readonly AttrInputTypeNum: string = CommonConstant.AttrInputTypeNum;
  readonly AttrInputTypeNumPerc: string = CommonConstant.AttrInputTypeNumPerc;
  readonly AttrInputTypeList: string = CommonConstant.AttrInputTypeList;
  readonly AttrInputTypeText: string = CommonConstant.AttrInputTypeText;
  readonly AttrInputTypeTextArea: string = CommonConstant.AttrInputTypeTextArea;
  readonly AttrInputTypeRefMaster: string = CommonConstant.AttrInputTypeRefMaster;
  SetFormGroup(QA: AttrContent): FormGroup {
    let tempFormGroup: FormGroup = this.fb.group({
      RefAttrId: QA.RefAttrId,
      CustAttrContentId: QA.CustAttrContentId,
      CustId: QA.CustId,
      AttrCode: QA.AttrCode,
      AttrName: QA.AttrName,
      AttrInputType: QA.AttrInputType,
      AttrValue: QA.AttrValue,
      IsMandatory: QA.IsMandatory,
      RowVersion: QA.RowVersion,
    });

    switch (QA.AttrInputType) {
      case this.AttrInputTypeRefMaster:
        this.SetRefMasterInputType(QA.AttrCode, QA.AttrName, QA.IsMandatory, QA.Descr, QA.MasterCode);
        break;
      default:
        tempFormGroup = this.SetValidator(tempFormGroup, QA.PatternValue, QA.IsMandatory);
        break;
    };
    return tempFormGroup;
  }

  SetValidator(tempFormGroup: FormGroup, pattern: string, isMandatory: boolean): FormGroup {
    let tempListValidators: Array<ValidatorFn> = new Array();
    if (isMandatory) tempListValidators.push(Validators.required);
    if (pattern) tempListValidators.push(Validators.pattern(pattern));

    if (tempListValidators.length > 0) tempFormGroup.setValidators(tempListValidators)
    return tempFormGroup;
  }

  dictRefMasterLookup: { [id: string]: InputLookupObj } = {};
  SetRefMasterInputType(attrCode: string, attrName: string, isMandatory: boolean, Descr: string, masterCode: string) {
    this.dictRefMasterLookup[attrCode] = new InputLookupObj();
    this.dictRefMasterLookup[attrCode].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
    this.dictRefMasterLookup[attrCode].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
    this.dictRefMasterLookup[attrCode].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
    this.dictRefMasterLookup[attrCode].title = attrName;
    this.dictRefMasterLookup[attrCode].isRequired = isMandatory;

    let arrAddCrit = new Array();
    let critAssetObj = new CriteriaObj();
    critAssetObj.DataType = 'text';
    critAssetObj.restriction = AdInsConstant.RestrictionEq;
    critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
    critAssetObj.value = masterCode;
    arrAddCrit.push(critAssetObj);
    this.dictRefMasterLookup[attrCode].addCritInput = arrAddCrit;

    this.dictRefMasterLookup[attrCode].jsonSelect = { Descr: Descr };
  }

  getLookUp(e: RefMasterObj, idx: number) {
    // this.parentForm['controls'][this.identifier]["controls"][AttrCode].patchValue({
    //   AttrValue: e.MasterCode
    // });
    console.log(e);
    console.log(idx);
    let tempArray = this.parentForm.get(this.identifier) as FormArray;
    let tempFb = tempArray.get(idx.toString()) as FormGroup;
    tempFb.get("AttrValue").patchValue(e.MasterCode);
  }
}
