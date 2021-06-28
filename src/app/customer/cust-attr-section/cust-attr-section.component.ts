import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CustOtherInfoObj } from 'app/shared/model/CustOtherInfoObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';

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
  From: string;
  CustOtherInfo: any;
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
    LbppmsDebtGrpId: ['', [Validators.required]],
    LbppmsCntrprtId: ['', [Validators.required]],
    LbppmsBizSustainId: ['', [Validators.required]],
    LbppmsBizSclId: ['', [Validators.required]]
  });
  inputDebitorGroupLookupObj: InputLookupObj;
  inputDebitorBusinessScaleLookupObj: InputLookupObj;
  inputCounterpartCategoryLookupObj: InputLookupObj;
  inputSustaianableFinancialBusinessLookupObj: InputLookupObj;

  isExistData: boolean = false;
  async ngOnInit() {
    this.attrGroup = this.MrCustTypeCode == CommonConstant.CustTypeCompany ? CommonConstant.AttrGroupCustCompanyOther : CommonConstant.AttrGroupCustPersonalOther;
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.CustId;
    await this.httpClient.post(URLConstant.GetCustOtherInfoByCustId, reqObj).toPromise().then(
      (response: any) => {
        this.CustOtherInfo = response;
      });
    this.inputDebitorGroupLookupObj = new InputLookupObj();
    this.inputDebitorGroupLookupObj.urlJson = "./assets/lookup/lookupDebitorGroup.json";
    this.inputDebitorGroupLookupObj.pagingJson = "./assets/lookup/lookupDebitorGroup.json";
    this.inputDebitorGroupLookupObj.genericJson = "./assets/lookup/lookupDebitorGroup.json";
    this.inputDebitorGroupLookupObj.isReady = true;

    this.inputDebitorBusinessScaleLookupObj = new InputLookupObj();
    this.inputDebitorBusinessScaleLookupObj.urlJson = "./assets/lookup/lookupDebitorBusinessScale.json";
    this.inputDebitorBusinessScaleLookupObj.pagingJson = "./assets/lookup/lookupDebitorBusinessScale.json";
    this.inputDebitorBusinessScaleLookupObj.genericJson = "./assets/lookup/lookupDebitorBusinessScale.json";
    this.inputDebitorBusinessScaleLookupObj.isReady = true;

    this.inputCounterpartCategoryLookupObj = new InputLookupObj();
    this.inputCounterpartCategoryLookupObj.urlJson = "./assets/lookup/lookupCounterpartCategory.json";
    this.inputCounterpartCategoryLookupObj.pagingJson = "./assets/lookup/lookupCounterpartCategory.json";
    this.inputCounterpartCategoryLookupObj.genericJson = "./assets/lookup/lookupCounterpartCategory.json";
    this.inputCounterpartCategoryLookupObj.isReady = true;

    this.inputSustaianableFinancialBusinessLookupObj = new InputLookupObj();
    this.inputSustaianableFinancialBusinessLookupObj.urlJson = "./assets/lookup/lookupSustainableFinancialBusiness.json";
    this.inputSustaianableFinancialBusinessLookupObj.pagingJson = "./assets/lookup/lookupSustainableFinancialBusiness.json";
    this.inputSustaianableFinancialBusinessLookupObj.genericJson = "./assets/lookup/lookupSustainableFinancialBusiness.json";
    this.inputSustaianableFinancialBusinessLookupObj.isReady = true;
    if (this.CustOtherInfo.CustOtherInfoId != 0) {
      this.isExistData = true;
      this.inputDebitorGroupLookupObj.jsonSelect = { Descr: this.CustOtherInfo.LbppmsDebtGrpDescr };
      this.inputDebitorBusinessScaleLookupObj.jsonSelect = { Descr: this.CustOtherInfo.LbppmsBizSclDescr };
      this.inputCounterpartCategoryLookupObj.jsonSelect = { Descr: this.CustOtherInfo.LbppmsCntrprtDescr };
      this.inputSustaianableFinancialBusinessLookupObj.jsonSelect = { Descr: this.CustOtherInfo.LbppmsBizSustainDescr };

      this.OtherInformationForm.patchValue({
        LbppmsDebtGrpId: this.CustOtherInfo.LbppmsDebtGrpId,
        LbppmsCntrprtId: this.CustOtherInfo.LbppmsCntrprtId,
        LbppmsBizSustainId: this.CustOtherInfo.LbppmsBizSustainId,
        LbppmsBizSclId: this.CustOtherInfo.LbppmsBizSclId
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

  SaveForm() {
    var formValue = this.OtherInformationForm['controls']['AttrList'].value;
    var custAttrRequest = new Array<Object>();
    if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
      for (const key in formValue) {
        if (formValue[key]["AttrValue"] != null) {
          var custAttr = {
            CustId: this.CustId,
            RefAttrId: formValue[key]["RefAttrId"],
            AttrValue: formValue[key]["AttrValue"],
            AttrGroup: this.attrGroup
          };
          custAttrRequest.push(custAttr);
        }
      }
      var custOtherInfo = new CustOtherInfoObj();
      custOtherInfo = this.OtherInformationForm.value;
      custOtherInfo.CustId = this.CustId;

      var RequestAppCustOtherInfoObj = {
        CustAttrContentObjs: custAttrRequest,
        RCustOtherInfoObj: custOtherInfo
      };

      let url: string = this.getUrlSave();
      this.httpClient.post(url, RequestAppCustOtherInfoObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          if (this.From == 'CustPaging') {
            AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PAGING], {});
          } else {
            AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});

          }
        });
    }
    else {
      this.toastr.errorMessage("No Attribute To Save");
    }
  }

  getUrlSave(): string {
    if (this.isExistData) {
      return URLConstant.EditCustOtherInfo;
    }
    return URLConstant.AddCustOtherInfo;
  }

  getLookupDebitorGroup(e) {
    this.OtherInformationForm.patchValue({
      LbppmsDebtGrpId: e.LbppmsDebtGrpId
    });
  }

  getLookupDebitorBusinessScale(e) {
    this.OtherInformationForm.patchValue({
      LbppmsBizSclId: e.LbppmsBizSclId
    });
  }
  getLookupCounterpartCategory(e) {
    this.OtherInformationForm.patchValue({
      LbppmsCntrprtId: e.LbppmsCntrprtId
    });

  }
  getLookupSustainableFinancialBusiness(e) {
    this.OtherInformationForm.patchValue({
      LbppmsBizSustainId: e.LbppmsBizSustainId
    });
  }

}
