import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
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
  RefAttrList: any;
  ListInputLookUpObj = new Array();
  isAdd: boolean = true;
  isFormReady: boolean = false;
  async ngOnInit() {
    var AttrContent = {
      CustId: this.CustId,
      AttrGroup: this.attrGroup
    };

    await this.httpClient.post(URLConstant.GetListCustAttrContentByCustIdAndAttrGroup, AttrContent).toPromise().then(
      (response) => {
        this.ListAttrContent = response[CommonConstant.ReturnObj]
        if (this.ListAttrContent.length < 1) {
          var custGrp = {
            AttrGroup: this.attrGroup
          };
          this.httpClient.post(URLConstant.GetListActiveRefAttrByAttrGroup, custGrp).subscribe(
            async (response: any) => {
              var parentFormGroup = new Object();
              this.RefAttrList = response[CommonConstant.ReturnObj];

              let tempLookup = {};
              for (const refAttr of this.RefAttrList) {

                var formGroupObject = new Object();
                formGroupObject["CustAttrContentId"] = [0];
                formGroupObject["RefAttrId"] = [refAttr["RefAttrId"]];
                formGroupObject["IsMandatory"] = [refAttr["IsMandatory"]];

                if (refAttr["AttrInputType"] == 'T' && refAttr["PatternValue"] != "" && refAttr["PatternValue"] != null) {
                  if (refAttr["IsMandatory"] == true) {
                    formGroupObject["AttrValue"] = ['', [Validators.required, Validators.pattern(refAttr['PatternValue'])]];
                  } else {
                    formGroupObject["AttrValue"] = ['', [Validators.pattern(refAttr['PatternValue'])]];
                  }
                }
                else if (refAttr["AttrInputType"] == 'L') {
                  var temp = refAttr["AttrValue"].split(";");
                  formGroupObject["AttrValue"] = [temp[0]];
                }
                else {
                  formGroupObject["AttrValue"] = [''];
                }
                if (refAttr["DefaultValue"] != null) {
                  formGroupObject["AttrValue"] = [refAttr["DefaultValue"]];
                }
                if (refAttr["IsMandatory"] == true && refAttr["AttrInputType"] != 'T') {
                  formGroupObject["AttrValue"].push(Validators.required)
                }

                parentFormGroup[refAttr["AttrCode"]] = this.fb.group(formGroupObject);

                if (refAttr["AttrInputType"] == 'RM') {
                  tempLookup[refAttr["AttrCode"]] = new InputLookupObj();
                  tempLookup[refAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                  tempLookup[refAttr["AttrCode"]].urlQryPaging = URLConstant.GetPagingObjectBySQL;
                  tempLookup[refAttr["AttrCode"]].urlEnviPaging = environment.FoundationR3Url;
                  tempLookup[refAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                  tempLookup[refAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";

                  tempLookup[refAttr["AttrCode"]].title = refAttr.AttrName;
                  if (refAttr["IsMandatory"] == true) {
                    tempLookup[refAttr["AttrCode"]].isRequired = true;
                  } else {
                    tempLookup[refAttr["AttrCode"]].isRequired = false;
                  }
                  var arrAddCrit = new Array();
                  var critAssetObj = new CriteriaObj();
                  critAssetObj.DataType = 'text';
                  critAssetObj.restriction = AdInsConstant.RestrictionEq;
                  critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                  critAssetObj.value = refAttr.AttrValue;
                  arrAddCrit.push(critAssetObj);
                  tempLookup[refAttr["AttrCode"]].addCritInput = arrAddCrit;

                  if (refAttr["DefaultValue"] != null) {
                    var refMaster = {
                      RefMasterTypeCode: refAttr["AttrValue"],
                      MasterCode: refAttr["DefaultValue"]
                    };
                  await this.httpClient.post(URLConstant.GetRefMasterByRefMasterTypeCodeAndMasterCode, refMaster).toPromise().then(
                      (response) => {
                        tempLookup[refAttr["AttrCode"]].jsonSelect = { Descr: response['Descr'] }
                      });
                  }
                }

              }
              this.ListInputLookUpObj.push(tempLookup);
              this.parentForm.addControl(this.identifier, this.fb.group(parentFormGroup));
              this.isFormReady = true;
            }
          );
        }
        else {
          this.isAdd = false;
          var parentFormGroup = new Object();
          let tempLookup = {};

          var custGrp = {
            AttrGroup: this.attrGroup
          };
          this.httpClient.post(URLConstant.GetListActiveRefAttrByAttrGroup, custGrp).subscribe(
            async (response: any) => {
              this.RefAttrList = response[CommonConstant.ReturnObj];
              for (const refAttr of this.RefAttrList) {
                var item = this.ListAttrContent.find(x => x.RefAttrId == refAttr.RefAttrId);
                if (item == undefined) {
                  var formGroupObject = new Object();
                  formGroupObject["CustAttrContentId"] = [0];
                  formGroupObject["RefAttrId"] = [refAttr["RefAttrId"]];
                  formGroupObject["IsMandatory"] = [refAttr["IsMandatory"]];

                  if (refAttr["AttrInputType"] == 'T' && refAttr["PatternValue"] != "" && refAttr["PatternValue"] != null) {
                    if (refAttr["IsMandatory"] == true) {
                      formGroupObject["AttrValue"] = ['', [Validators.required, Validators.pattern(refAttr['PatternValue'])]];
                    } else {
                      formGroupObject["AttrValue"] = ['', [Validators.pattern(refAttr['PatternValue'])]];
                    }
                  }
                  else if (refAttr["AttrInputType"] == 'L') {
                    var temp = refAttr["AttrValue"].split(";");
                    formGroupObject["AttrValue"] = [temp[0]];
                  } else {
                    formGroupObject["AttrValue"] = [''];
                  }
                  if (refAttr["DefaultValue"] != null) {
                    formGroupObject["AttrValue"] = [refAttr["DefaultValue"]];
                  }

                  if (refAttr["IsMandatory"] == true && refAttr["AttrInputType"] != 'T') {
                    formGroupObject["AttrValue"].push(Validators.required)
                  }

                  parentFormGroup[refAttr["AttrCode"]] = this.fb.group(formGroupObject);

                  if (refAttr["AttrInputType"] == 'RM') {

                    tempLookup[refAttr["AttrCode"]] = new InputLookupObj();
                    tempLookup[refAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    tempLookup[refAttr["AttrCode"]].urlQryPaging = URLConstant.GetPagingObjectBySQL;
                    tempLookup[refAttr["AttrCode"]].urlEnviPaging = environment.FoundationR3Url;
                    tempLookup[refAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    tempLookup[refAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    if (refAttr["DefaultValue"] != null) {
                      var refMaster = {
                        RefMasterTypeCode: refAttr["AttrValue"],
                        MasterCode: refAttr["DefaultValue"]
                      };
                      this.httpClient.post(URLConstant.GetRefMasterByRefMasterTypeCodeAndMasterCode, refMaster).subscribe(
                        (response) => { 
                          tempLookup[refAttr["AttrCode"]].jsonSelect = { Descr: response['Descr'] }
                        });
                    } 
                    tempLookup[refAttr["AttrCode"]].title = refAttr.AttrName;
                    if (refAttr["IsMandatory"] == true) {
                      tempLookup[refAttr["AttrCode"]].isRequired = true;
                    } else {
                      tempLookup[refAttr["AttrCode"]].isRequired = false;
                    }
                    if (refAttr["DefaultValue"] != null) {
                      var refMaster = {
                        RefMasterTypeCode: refAttr["AttrValue"],
                        MasterCode: refAttr["DefaultValue"]
                      };
                    await this.httpClient.post(URLConstant.GetRefMasterByRefMasterTypeCodeAndMasterCode, refMaster).toPromise().then(
                        (response) => {
                          tempLookup[refAttr["AttrCode"]].jsonSelect = { Descr: response['Descr'] }
                        });
                    }
                    var arrAddCrit = new Array();
                    var critAssetObj = new CriteriaObj();
                    critAssetObj.DataType = 'text';
                    critAssetObj.restriction = AdInsConstant.RestrictionEq;
                    critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                    critAssetObj.value = refAttr.AttrValue;
                    arrAddCrit.push(critAssetObj);
                    tempLookup[refAttr["AttrCode"]].addCritInput = arrAddCrit;
              
                  }

                } else {
                  var formGroupObject = new Object();
                  formGroupObject["CustAttrContentId"] = [item["CustAttrContentId"]];
                  formGroupObject["RefAttrId"] = [item["RefAttrId"]];
                  formGroupObject["IsMandatory"] = [refAttr["IsMandatory"]];

                  if (refAttr["AttrInputType"] == 'T' && refAttr["PatternValue"] != "" && refAttr["PatternValue"] != null) {
                    if (refAttr["IsMandatory"] == true) {
                      formGroupObject["AttrValue"] = [item["AttrValue"], [Validators.required, Validators.pattern(refAttr['PatternValue'])]];
                    } else {
                      formGroupObject["AttrValue"] = [item["AttrValue"], [Validators.pattern(refAttr['PatternValue'])]];
                    }
                  } else {
                    formGroupObject["AttrValue"] = [item["AttrValue"]];
                  }
                  if (refAttr["IsMandatory"] == true && refAttr["AttrInputType"] != 'T') {
                    formGroupObject["AttrValue"].push(Validators.required)
                  }
                  parentFormGroup[item["AttrCode"]] = this.fb.group(formGroupObject);
                  if (item["AttrInputType"] == 'RM') {
                    tempLookup[item["AttrCode"]] = new InputLookupObj();
                    tempLookup[item["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    tempLookup[item["AttrCode"]].urlQryPaging = URLConstant.GetPagingObjectBySQL;
                    tempLookup[item["AttrCode"]].urlEnviPaging = environment.FoundationR3Url;
                    tempLookup[item["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    tempLookup[item["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    tempLookup[refAttr["AttrCode"]].title = refAttr.AttrName;
                    if (refAttr["IsMandatory"] == true) {
                      tempLookup[refAttr["AttrCode"]].isRequired = true;
                    } else {
                      tempLookup[refAttr["AttrCode"]].isRequired = false;
                    }
                     tempLookup[item["AttrCode"]].jsonSelect = { Descr: item["Descr"] }
                    var arrAddCrit = new Array();
                    var critAssetObj = new CriteriaObj();
                    critAssetObj.DataType = 'text';
                    critAssetObj.restriction = AdInsConstant.RestrictionEq;
                    critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                    critAssetObj.value = item.MasterCode;
                    arrAddCrit.push(critAssetObj);
                    tempLookup[item["AttrCode"]].addCritInput = arrAddCrit;
                  }
                }
              }
              this.ListInputLookUpObj.push(tempLookup);
              this.parentForm.addControl(this.identifier, this.fb.group(parentFormGroup));
              this.isFormReady = true;

            });
        }
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
}
