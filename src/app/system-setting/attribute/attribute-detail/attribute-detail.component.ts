import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location, DatePipe } from '@angular/common';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-attribute-detail',
  templateUrl: './attribute-detail.component.html'
})
export class AttributeDetailComponent implements OnInit {

 
  pageType: string;
  refAttrId: number;
  attrInputTypeList: any;
  attrTypeCodeList: any;
  patternCodeList: any;
  patternValueList: any;
  attributeGroupList: any;
  isTextBox: boolean = false;
  inputLookupRefMasterType: InputLookupObj;
  RefAttrForm = this.fb.group({
    RefAttrId: [0, [Validators.required]],
    AttrCode: ['', [Validators.required]],
    AttrName: ['', [Validators.required]],
    AttrTypeCode: ['', [Validators.required]],
    AttrInputType: ['', [Validators.required]],
    AttrGroup: ['', [Validators.required]],
    IsActive: [true],
    DefaultValue: [''],
    IsMandatory: [true],
    RowVersion: ['']
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.pageType = params['mode'];
      }
      else {
        this.pageType = "add";
      }

      if (params['refAttrId'] != null) {
        this.refAttrId = params['refAttrId'];
      }
    });

  }

  ngOnInit() {
    this.inputLookupRefMasterType = new InputLookupObj();
    this.inputLookupRefMasterType.urlJson = "./assets/lookup/lookupRefMasterType.json";
    this.inputLookupRefMasterType.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupRefMasterType.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupRefMasterType.pagingJson = "./assets/lookup/lookupRefMasterType.json";
    this.inputLookupRefMasterType.genericJson = "./assets/lookup/lookupRefMasterType.json";
    this.inputLookupRefMasterType.isRequired = false;
    var datePipe = new DatePipe("en-US");
    let getAttrType = this.httpClient.post(URLConstant.GetListActiveRefAttrType, new Object()).pipe(first());
    var RefMasterInputType = new RefMasterObj();
    RefMasterInputType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeAttrInputType;
    let getRefMasterInputType = this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, RefMasterInputType);

    var RefMasterPatternCode = new RefMasterObj();
    RefMasterPatternCode.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeRegularExpression;
    let getRefMasterPatternCode = this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, RefMasterPatternCode);

    var RefMasterAttributeGroup = new RefMasterObj();
    RefMasterAttributeGroup.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeAttributeGroup;
    let getRefMasterAttributeGroup = this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, RefMasterAttributeGroup);




    
    if (this.pageType == "edit") {
      let getRefAttr = this.httpClient.post(URLConstant.GetRefAttrById, { RefAttrId: this.refAttrId }).pipe(first());
      forkJoin([getRefAttr, getAttrType, getRefMasterInputType, getRefMasterPatternCode, getRefMasterAttributeGroup]).subscribe(
        (response) => {
          var refAttr = response[0];
          var attrTypeList = response[1];
          this.attrTypeCodeList = [...attrTypeList[CommonConstant.ReturnObj]];
          this.RefAttrForm.patchValue({ ...refAttr });
          this.attrInputTypeList = response[2][CommonConstant.ReturnObj];
          this.patternCodeList = response[3][CommonConstant.ReturnObj];
          this.attributeGroupList = response[4][CommonConstant.ReturnObj];
          switch (refAttr["AttrInputType"]) {
            case 'L':
              var valueList = refAttr["AttrValue"].split(";");
              console.log("ValueList: " + JSON.stringify(valueList));
              var formArray = this.fb.array([]);
              for (const item of valueList) {
                formArray.push(this.fb.control(item, [Validators.required]));
              }
              this.RefAttrForm.addControl("AttrValue", formArray);
              break;

            case 'RM':
              this.RefAttrForm.addControl("AttrValue", this.fb.control(refAttr["AttrValue"], [Validators.required]));
              this.inputLookupRefMasterType.nameSelect = refAttr["AttrValueDescr"];
              this.inputLookupRefMasterType.jsonSelect = { Descr: refAttr["AttrValueDescr"] };
              this.inputLookupRefMasterType.isRequired = true;
              break;

            case 'T':
              this.isTextBox = true;
              this.RefAttrForm.addControl("PatternCode", this.fb.control(''));
              this.RefAttrForm.addControl("PatternValue", this.fb.control(''));
              this.RefAttrForm.addControl("AttrLength", this.fb.control('', [Validators.required]));
              this.RefAttrForm.patchValue({
                PatternCode: refAttr["PatternCode"],
                PatternValue: refAttr["PatternValue"],
                AttrLength: refAttr["AttrLength"],
              });
              break;

            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      forkJoin([getAttrType, getRefMasterInputType, getRefMasterPatternCode, getRefMasterAttributeGroup]).subscribe(
        (response) => {
          this.attrTypeCodeList = response[0][CommonConstant.ReturnObj];
          this.attrInputTypeList = response[1][CommonConstant.ReturnObj];
          this.patternCodeList = response[2][CommonConstant.ReturnObj];
          this.attributeGroupList = response[3][CommonConstant.ReturnObj];
          
          this.RefAttrForm.patchValue({
            AttrTypeCode: this.attrTypeCodeList[0].AttrTypeCode,
            AttrInputType: this.attrInputTypeList[0].Key,
            PatternCode: this.patternCodeList[0].Key,
            PatternValue: this.patternCodeList[0].Value,
            AttrGroup: this.attributeGroupList[0].Key,
            
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  AttrInputTypeHandler() {
    var type = this.RefAttrForm.controls["AttrInputType"].value;
    if (this.RefAttrForm.contains("AttrValue")) {
      this.RefAttrForm.removeControl("AttrValue");
    }
    if (type == 'T') {
      this.isTextBox = true;
      this.RefAttrForm.addControl("PatternCode", this.fb.control(''));
      this.RefAttrForm.addControl("PatternValue", this.fb.control(''));
      this.RefAttrForm.addControl("AttrLength", this.fb.control('', [Validators.required]));

      this.RefAttrForm.patchValue({
        PatternCode: this.patternCodeList[0].Key,
        PatternValue: this.patternCodeList[0].Value
      });
    }
    else if (type != 'T') {
      this.RefAttrForm.removeControl("AttrLength");
      this.RefAttrForm.removeControl("PatternCode");
      this.RefAttrForm.removeControl("PatternValue");
      this.isTextBox = false;
    }
    if (type == 'RM') {
      this.RefAttrForm.addControl('AttrValue', this.fb.control('', [Validators.required]));
      this.inputLookupRefMasterType.isRequired = true;
    }
    else if (type != 'RM') {
      this.inputLookupRefMasterType.isRequired = false;
      this.RefAttrForm.controls.lookupRefMasterType["controls"].value.clearValidators();
      this.RefAttrForm.controls.lookupRefMasterType["controls"].value.setValue("");
      this.RefAttrForm.controls.lookupRefMasterType.updateValueAndValidity();
    }
    if (type == 'L') {
      this.RefAttrForm.addControl("AttrValue", this.fb.array([]));
    }
  }

  AttrValueRowHandler() {
    var formArray = this.RefAttrForm.get("AttrValue") as FormArray;
    formArray.push(this.fb.control('', [Validators.required]));
  }

  RemoveAttrValueRow(idx) {
    var formArray = this.RefAttrForm.get("AttrValue") as FormArray;
    formArray.removeAt(idx);
  }

  Back() {
    this.location.back();
  }

  Save(enjiForm) {
    var formValue = this.RefAttrForm.value;
    var url = this.pageType == "add" ? URLConstant.AddRefAttr : URLConstant.EditRefAttr;

    if (formValue["AttrInputType"] == "L") {
      if (formValue["AttrValue"].length < 1) {
        this.toastr.warningMessage("Minimal 1 Attribute Value");
        return;
      }
      var attrValue = "";
      for (let index = 0; index < formValue["AttrValue"].length; index++) {
        if (index < formValue["AttrValue"].length - 1) {
          attrValue += formValue["AttrValue"][index] + ";";
        }
        else {
          attrValue += formValue["AttrValue"][index];
        }
      }
      formValue["AttrValue"] = attrValue;
    }

    this.httpClient.post(url, formValue).subscribe(
      (response) => {
        this.toastr.successMessage(response["Message"]);
        AdInsHelper.RedirectUrl(this.router,["/SystemSetting/Attribute/Paging"],{ });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  patternCodeChange(e) {
    this.RefAttrForm.controls.PatternCode
    var temp = this.patternCodeList.find(x => x.Key == e.target.value)
    this.RefAttrForm.patchValue({
      PatternValue: temp.Value
    });
  }
  getLookupAttrValue(e) {
    this.RefAttrForm.patchValue({
      AttrValue: e.RefMasterTypeCode
    });
  }
}
