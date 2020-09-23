import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { first } from 'rxjs/operators';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustOtherInfoObj } from 'app/shared/model/CustOtherInfoObj.Model';

@Component({
  selector: 'app-cust-attr-section',
  templateUrl: './cust-attr-section.component.html',
  styles: [],
  providers: [NGXToastrService]
})
export class CustAttrSectionComponent implements OnInit {
  @Input() CustId: number;
  @Input() MrCustTypeCode: string;
  @Output() outputTab: EventEmitter<Object> = new EventEmitter<Object>();
  pageType: string;
  listCustAttrContent: Array<Object>;
  isCustAttrReady: boolean;

  CustAttrContentForm: FormGroup;
  ListAttrContent : any;
  RefAttrList : any;
  ListInputLookUpObj = new Array(); 
  isAdd: boolean = true; 
  isReady : boolean= false;
  attrGroup: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) { 
    this.pageType = "add";
    this.listCustAttrContent = new Array<Object>();
    this.isCustAttrReady = false;
  }

  OtherInformationForm = this.fb.group({
    LbppmsDebtGrpCode: ['', [Validators.required]],
    LbppmsCntrprtId: ['', [Validators.required]],
    LbppmsBizSustainId: ['', [Validators.required]],
    LbppmsBizSclCode: ['', [Validators.required]]
  }); 
  inputDebitorGroupLookupObj : InputLookupObj;
  inputDebitorBusinessScaleLookupObj: InputLookupObj;
  inputCounterpartCategoryLookupObj: InputLookupObj;
  inputSustaianableFinancialBusinessLookupObj: InputLookupObj;
  ngOnInit() { 

    this.attrGroup = this.MrCustTypeCode == CommonConstant.CustTypeCompany ? CommonConstant.AttrGroupCustCompanyOther:CommonConstant.AttrGroupCustPersonalOther;
 
    this.bindFinancialAttribute();
    var custOtherInfo = new CustOtherInfoObj();
    custOtherInfo.CustId = this.CustId;
    this.inputDebitorGroupLookupObj = new InputLookupObj();
    this.inputDebitorGroupLookupObj.urlJson = "./assets/lookup/lookupDebitorGroup.json";
    this.inputDebitorGroupLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputDebitorGroupLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputDebitorGroupLookupObj.pagingJson = "./assets/lookup/lookupDebitorGroup.json";
    this.inputDebitorGroupLookupObj.genericJson = "./assets/lookup/lookupDebitorGroup.json";
    this.inputDebitorGroupLookupObj.isReady = true;

    this.inputDebitorBusinessScaleLookupObj = new InputLookupObj(); 
    this.inputDebitorBusinessScaleLookupObj.urlJson = "./assets/lookup/lookupDebitorBusinessScale.json";
    this.inputDebitorBusinessScaleLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputDebitorBusinessScaleLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputDebitorBusinessScaleLookupObj.pagingJson = "./assets/lookup/lookupDebitorBusinessScale.json";
    this.inputDebitorBusinessScaleLookupObj.genericJson = "./assets/lookup/lookupDebitorBusinessScale.json";
    this.inputDebitorBusinessScaleLookupObj.isReady = true;
    
    this.inputCounterpartCategoryLookupObj = new InputLookupObj(); 
    this.inputCounterpartCategoryLookupObj.urlJson = "./assets/lookup/lookupCounterpartCategory.json";
    this.inputCounterpartCategoryLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputCounterpartCategoryLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputCounterpartCategoryLookupObj.pagingJson = "./assets/lookup/lookupCounterpartCategory.json";
    this.inputCounterpartCategoryLookupObj.genericJson = "./assets/lookup/lookupCounterpartCategory.json";
    this.inputCounterpartCategoryLookupObj.isReady = true;

    this.inputSustaianableFinancialBusinessLookupObj = new InputLookupObj();
    this.inputSustaianableFinancialBusinessLookupObj.urlJson = "./assets/lookup/lookupSustainableFinancialBusiness.json";
    this.inputSustaianableFinancialBusinessLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputSustaianableFinancialBusinessLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputSustaianableFinancialBusinessLookupObj.pagingJson = "./assets/lookup/lookupSustainableFinancialBusiness.json";
    this.inputSustaianableFinancialBusinessLookupObj.genericJson = "./assets/lookup/lookupSustainableFinancialBusiness.json";
    this.inputSustaianableFinancialBusinessLookupObj.isReady = true;
    this.httpClient.post(URLConstant.GetCustOtherInfoByCustId, custOtherInfo).subscribe(
      (response:any) => {  
      if(response!=null){
        this.inputDebitorGroupLookupObj.jsonSelect =  {Descr: response.LbppmsDebtGrpDescr};
        this.inputDebitorBusinessScaleLookupObj.jsonSelect = {Descr: response.LbppmsBizSclDescr};
        this.inputCounterpartCategoryLookupObj.jsonSelect = {Descr: response.LbppmsCntrprtDescr};
        this.inputSustaianableFinancialBusinessLookupObj.jsonSelect = {Descr: response.LbppmsBizSustainDescr};

        this.OtherInformationForm.patchValue({
          LbppmsDebtGrpCode:   response.LbppmsDebtGrpCode,
          LbppmsCntrprtId: response.LbppmsCntrprtId,
          LbppmsBizSustainId: response.LbppmsBizSustainId,
          LbppmsBizSclCode: response.LbppmsBizSclCode
        });
      }
      }); 
    // this.httpClient.post(URLConstant.GetListCustAttrContentByCustIdForCust, { CustId: this.CustId }).pipe(first()).subscribe(
    //   (response) => {
    //     var parentFormGroup = new Object();
    //     this.listCustAttrContent = response["NewCustAttrContentObjs"];
    //     if(this.listCustAttrContent[0]["CustAttrContentId"] > 0){
    //       this.pageType = "edit";
    //     }
    //     for (const custAttr of this.listCustAttrContent) {
    //       var formGroupObject = new Object();
    //       formGroupObject["CustAttrContentId"] = [custAttr["CustAttrContentId"], [Validators.required]];
    //       formGroupObject["RefAttrId"] = [custAttr["RefAttrId"], [Validators.required]];
    //       formGroupObject["AttrValue"] = [custAttr["AttrValue"], [Validators.required]];
    //       parentFormGroup[custAttr["AttrCode"]] = this.fb.group(formGroupObject);
    //     }
    //     this.CustAttrContentForm = this.fb.group(parentFormGroup);
    //     this.isCustAttrReady = true;
    //     // console.log("CustAttrContentForm: " + JSON.stringify(this.CustAttrContentForm.controls[this.listCustAttrContent[0]["AttrCode"]].value));
    //     // console.log("listCustAttrContent: " + JSON.stringify(this.listCustAttrContent));
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  SplitAttrListValue(value){
    return value.split(";");
  }

  SaveForm(){
    var formValue = this.CustAttrContentForm.value;
    var custAttrRequest = new Array<Object>();
    var url = URLConstant.AddEditListCustAttrContent  
    if(Object.keys(formValue).length > 0 && formValue.constructor === Object){
      for (const key in formValue) {
        if(formValue[key]["AttrValue"]!=null ) { 
        var custAttr = {
          CustAttrContentId: formValue[key]["CustAttrContentId"],
          CustId: this.CustId,
          RefAttrId: formValue[key]["RefAttrId"],
          AttrValue: formValue[key]["AttrValue"],
          AttrGroup: this.attrGroup
        };
        custAttrRequest.push(custAttr);}

      }  
      this.httpClient.post(url, { CustAttrContentObjs: custAttrRequest }).pipe(first()).subscribe(
        (response) => { 
          var custOtherInfo = new CustOtherInfoObj();
          custOtherInfo = this.OtherInformationForm.value;
          custOtherInfo.CustId = this.CustId;

          this.httpClient.post(URLConstant.AddEditCustOtherInfo, custOtherInfo).subscribe(
            (response) => { 
              this.toastr.successMessage(response["Message"]);
              this.outputTab.emit({ stepMode: "next"});
            }); 

        },
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      this.toastr.errorMessage("No Attribute To Save");
    }
  }

  async bindFinancialAttribute(){
    var AttrContent = {
      CustId: this.CustId,
      AttrGroup: this.attrGroup
    };

    await this.httpClient.post(URLConstant.GetListCustAttrContentByCustIdAndAttrGroup, AttrContent).toPromise().then(
      (response) => {
        console.log(response)
        this.ListAttrContent = response[CommonConstant.ReturnObj]
        if (this.ListAttrContent.length < 1) {
          var custGrp = {
            AttrGroup: this.attrGroup
          };
          this.httpClient.post(URLConstant.GetListActiveRefAttrByAttrGroup, custGrp).subscribe(
            (response: any) => {
              var parentFormGroup = new Object();
              this.RefAttrList = response[CommonConstant.ReturnObj];

              let _temp = {};
              for (const refAttr of this.RefAttrList) {

                var formGroupObject = new Object();
                formGroupObject["CustAttrContentId"] = [0];
                formGroupObject["RefAttrId"] = [refAttr["RefAttrId"], [Validators.required]];
                if (refAttr["AttrInputType"] == 'L') { 
                  var temp = refAttr["AttrValue"].split(";"); 
                  formGroupObject["AttrValue"] = [temp[0], [Validators.required]];
                }else{
                  formGroupObject["AttrValue"] = [refAttr["AttrValue"], [Validators.required]];
                }

                parentFormGroup[refAttr["AttrCode"]] = this.fb.group(formGroupObject);
                
                if (refAttr["AttrInputType"] == 'RM') {
                  _temp[refAttr["AttrCode"]] = new InputLookupObj();
                  _temp[refAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                  _temp[refAttr["AttrCode"]].urlQryPaging = URLConstant.GetPagingObjectBySQL;
                  _temp[refAttr["AttrCode"]].urlEnviPaging = environment.FoundationR3Url;
                  _temp[refAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                  _temp[refAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";

                  var arrAddCrit = new Array();
                  var critAssetObj = new CriteriaObj();
                  critAssetObj.DataType = 'text';
                  critAssetObj.restriction = AdInsConstant.RestrictionEq;
                  critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                  critAssetObj.value = refAttr.AttrValue;
                  arrAddCrit.push(critAssetObj);
                  _temp[refAttr["AttrCode"]].addCritInput = arrAddCrit;
                } 
              }
              this.ListInputLookUpObj.push(_temp);
              this.CustAttrContentForm = this.fb.group(parentFormGroup);
              this.isCustAttrReady = true;
            }
          );
        }
        else {
          this.isAdd = false;
          var parentFormGroup = new Object();
          let _temp = {};
          var custGrp = {
            AttrGroup: this.attrGroup
          };
          this.httpClient.post(URLConstant.GetListActiveRefAttrByAttrGroup, custGrp).subscribe(
            (response: any) => {
              this.RefAttrList = response[CommonConstant.ReturnObj];

              for (const refAttr of this.RefAttrList) {
                var item = this.ListAttrContent.find(x => x.RefAttrId == refAttr.RefAttrId);
                if (item == undefined) {
                  var formGroupObject = new Object();
                  formGroupObject["CustAttrContentId"] = [0];
                  formGroupObject["RefAttrId"] = [refAttr["RefAttrId"], [Validators.required]];
                  if (refAttr["AttrInputType"] == 'L') { 
                    var temp = refAttr["AttrValue"].split(";"); 
                    formGroupObject["AttrValue"] = [temp[0], [Validators.required]];
                  } else{
                    formGroupObject["AttrValue"] = [refAttr["AttrValue"], [Validators.required]];
                  }
                  parentFormGroup[refAttr["AttrCode"]] = this.fb.group(formGroupObject);

                  if (refAttr["AttrInputType"] == 'RM') {
                    _temp[refAttr["AttrCode"]] = new InputLookupObj();
                    _temp[refAttr["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    _temp[refAttr["AttrCode"]].urlQryPaging = URLConstant.GetPagingObjectBySQL;
                    _temp[refAttr["AttrCode"]].urlEnviPaging = environment.FoundationR3Url;
                    _temp[refAttr["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    _temp[refAttr["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";

                    var arrAddCrit = new Array();
                    var critAssetObj = new CriteriaObj();
                    critAssetObj.DataType = 'text';
                    critAssetObj.restriction = AdInsConstant.RestrictionEq;
                    critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                    critAssetObj.value = refAttr.AttrValue;
                    arrAddCrit.push(critAssetObj);
                    _temp[refAttr["AttrCode"]].addCritInput = arrAddCrit;
                  }

                } else { 
                  var formGroupObject = new Object();
                  formGroupObject["CustAttrContentId"] = [item["CustAttrContentId"], [Validators.required]];
                  formGroupObject["RefAttrId"] = [item["RefAttrId"], [Validators.required]];
                  formGroupObject["AttrValue"] = [item["AttrValue"], [Validators.required]];
                  parentFormGroup[item["AttrCode"]] = this.fb.group(formGroupObject);
 
                  if (item["AttrInputType"] == 'RM') {
                    _temp[item["AttrCode"]] = new InputLookupObj();
                    _temp[item["AttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    _temp[item["AttrCode"]].urlQryPaging = URLConstant.GetPagingObjectBySQL;
                    _temp[item["AttrCode"]].urlEnviPaging = environment.FoundationR3Url;
                    _temp[item["AttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    _temp[item["AttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    _temp[item["AttrCode"]].jsonSelect = { Descr: item["Descr"] }

                    var arrAddCrit = new Array();
                    var critAssetObj = new CriteriaObj();
                    critAssetObj.DataType = 'text';
                    critAssetObj.restriction = AdInsConstant.RestrictionEq;
                    critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                    critAssetObj.value = item.MasterCode;
                    arrAddCrit.push(critAssetObj);
                    _temp[item["AttrCode"]].addCritInput = arrAddCrit;
                  }
                }
              }
              this.ListInputLookUpObj.push(_temp);
              this.CustAttrContentForm = this.fb.group(parentFormGroup);
              this.isCustAttrReady = true; 
            });
        }
      });
  }
 
  getLookUp(e,AttrCode){ 
    this.CustAttrContentForm["controls"][AttrCode].patchValue({
      AttrValue: e.MasterCode
    }); 
  }
  getLookupDebitorGroup(e){
    this.OtherInformationForm.patchValue({
      LbppmsDebtGrpCode: e.LbppmsDebtGrpCode
    }); 
  }

  getLookupDebitorBusinessScale(e){
    this.OtherInformationForm.patchValue({
      LbppmsBizSclCode: e.LbppmsBizSclCode
    }); 
  }
  getLookupCounterpartCategory(e){
    this.OtherInformationForm.patchValue({
      LbppmsCntrprtId: e.LbppmsCntrprtId
    });  

  }
  getLookupSustainableFinancialBusiness(e){
    this.OtherInformationForm.patchValue({
      LbppmsBizSustainId: e.LbppmsBizSustainId
    }); 
  }

}
