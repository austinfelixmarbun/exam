import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AttrContent } from 'app/shared/model/AttrContent.model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { RefAttr } from 'app/shared/model/RefAttr.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-cust-attr-list',
  templateUrl: './cust-attr-list.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CustAttrListComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.CustId = params["Page"];
      }
    });
  }

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() identifier: any;
  @Input() attrGroup: any;
  @Input() CustId: any;
  @Input() title: any;
  ListAttrContent: any;
  tempLookup = {};
  RefAttrList:  Array<RefAttr> = new Array<RefAttr>();
  ListInputLookUpObj = new Array();
  isFormReady: boolean = false;
  AttrContent: AttrContent;
  async ngOnInit() {
    let custGrp = {
      AttrGroup: this.attrGroup
    };
    await this.httpClient.post<Array<AttrContent>>(URLConstant.GetListCustAttrContentByCustIdAndAttrGroup, { CustId: this.CustId, AttrGroup: this.attrGroup }).toPromise().then(
      (response) => {
        this.ListAttrContent = response[CommonConstant.ReturnObj]
        let parentFormGroup = new Object();

        this.httpClient.post<Array<RefAttr>>(URLConstant.GetListActiveRefAttrByAttrGroup, custGrp).subscribe(
          async (response: any) => {
            this.RefAttrList = response[CommonConstant.ReturnObj];
            for (const refAttr of this.RefAttrList) {
              this.AttrContent = new AttrContent();
              let isUpdateValue = false;
              if (this.ListAttrContent.find(x => x.RefAttrId == refAttr.RefAttrId)) {
                this.AttrContent = this.ListAttrContent.find(x => x.RefAttrId == refAttr.RefAttrId);
                isUpdateValue = true;
              } 
              var formGroupObject = new Object();
              formGroupObject["RefAttrId"] = [refAttr["RefAttrId"]];
              formGroupObject["IsMandatory"] = [refAttr.IsMandatory];
              this.setFormGroupValue(refAttr, formGroupObject, parentFormGroup, isUpdateValue);
            } 
            this.ListInputLookUpObj.push(this.tempLookup);
            this.parentForm.addControl(this.identifier, this.fb.group(parentFormGroup));
            this.isFormReady = true;

          });

      });
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
        } else {
          formGroupObject["AttrValue"] = ['', [Validators.pattern(refAttr.PatternValue)]];
        }
      }
      else if (refAttr.AttrInputType == 'L') {
        let temp = refAttr.AttrValue.split(";");
        formGroupObject["AttrValue"] = [temp[0]];
      } else if (refAttr.AttrInputType == 'P' || refAttr.AttrInputType == 'N') {
        formGroupObject["AttrValue"] = [0];
      } else {
        formGroupObject["AttrValue"] = [''];
      }
      if (refAttr["DefaultValue"] != null && refAttr["DefaultValue"].trim() != '') {
        formGroupObject["AttrValue"] = [refAttr.DefaultValue];
      }


    } else {
      if (refAttr.AttrInputType == 'T' && refAttr.PatternValue != "" && refAttr.PatternValue != null) {
        if (refAttr.IsMandatory == true) {
          formGroupObject["AttrValue"] = [this.AttrContent.AttrValue, [Validators.required, Validators.pattern(refAttr.PatternValue)]];
        } else {
          formGroupObject["AttrValue"] = [this.AttrContent["AttrValue"], [Validators.pattern(refAttr['PatternValue'])]];
        }
      } else {
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
      } else {
        this.tempLookup[refAttr["AttrCode"]].isRequired = false;
      }
      if (isUpdateValue == false) {
        if (refAttr["DefaultValue"] != null) {
          let refMaster = {
            RefMasterTypeCode: refAttr.AttrValue,
            MasterCode: refAttr.DefaultValue
          };
          this.httpClient.post(URLConstant.GetRefMasterByRefMasterTypeCodeAndMasterCode, refMaster).subscribe(
            (response) => {
              this.tempLookup[refAttr["AttrCode"]].jsonSelect = { Descr: response['Descr'] }
            });
        }
      } else {
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

}
