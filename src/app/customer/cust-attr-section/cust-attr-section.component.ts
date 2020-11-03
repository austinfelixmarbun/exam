import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
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
  isLookupReady: boolean;
  attrGroup: string;
  From : string;
  CustOtherInfo : any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) { 
    this.pageType = "add";
    this.isLookupReady = false;
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.From = params["From"];
      } 
    });
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
  async ngOnInit() { 
    this.attrGroup = this.MrCustTypeCode == CommonConstant.CustTypeCompany ? CommonConstant.AttrGroupCustCompanyOther:CommonConstant.AttrGroupCustPersonalOther;
    var custOtherInfo = new CustOtherInfoObj();
    custOtherInfo.CustId = this.CustId;
    await this.httpClient.post(URLConstant.GetCustOtherInfoByCustId, custOtherInfo).toPromise().then(
      (response:any) => { 
        this.CustOtherInfo = response;  
      }); 
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
      if(this.CustOtherInfo.CustOtherInfoId != 0){
        this.inputDebitorGroupLookupObj.jsonSelect =  {Descr: this.CustOtherInfo.LbppmsDebtGrpDescr};
        this.inputDebitorBusinessScaleLookupObj.jsonSelect = {Descr: this.CustOtherInfo.LbppmsBizSclDescr};
        this.inputCounterpartCategoryLookupObj.jsonSelect = {Descr: this.CustOtherInfo.LbppmsCntrprtDescr};
        this.inputSustaianableFinancialBusinessLookupObj.jsonSelect = {Descr: this.CustOtherInfo.LbppmsBizSustainDescr};

        this.OtherInformationForm.patchValue({
          LbppmsDebtGrpCode:   this.CustOtherInfo.LbppmsDebtGrpCode,
          LbppmsCntrprtId: this.CustOtherInfo.LbppmsCntrprtId,
          LbppmsBizSustainId: this.CustOtherInfo.LbppmsBizSustainId,
          LbppmsBizSclCode: this.CustOtherInfo.LbppmsBizSclCode
        });
      }
      this.isLookupReady = true;
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

  SaveForm(){ 
    var formValue = this.OtherInformationForm['controls']['AttrList'].value;
    var custAttrRequest = new Array<Object>();
    var url = URLConstant.AddEditListCustAttrContent  
    if(Object.keys(formValue).length > 0 && formValue.constructor === Object){
      for (const key in formValue) {
        if(formValue[key]["AttrValue"]!=null ) { 
        var custAttr = { 
          CustId: this.CustId,
          RefAttrId: formValue[key]["RefAttrId"],
          AttrValue: formValue[key]["AttrValue"],
          AttrGroup: this.attrGroup
        };
        custAttrRequest.push(custAttr);}
      }  
      var custOtherInfo = new CustOtherInfoObj();
      custOtherInfo = this.OtherInformationForm.value;
      custOtherInfo.CustId = this.CustId;

      var RequestAppCustOtherInfoObj= {
        CustAttrContentObjs: custAttrRequest,
        RequestCustOtherInfoObj:custOtherInfo
      }
      this.httpClient.post(URLConstant.AddEditCustOtherInfo, RequestAppCustOtherInfoObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          if (this.From == 'CustPaging') {
            this.router.navigate(["/Customer/Paging"]);
          } else {
            this.router.navigate(["/Customer/EditMainData/Paging"]);
          }
        }); 
    }
    else{
      this.toastr.errorMessage("No Attribute To Save");
    }
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
