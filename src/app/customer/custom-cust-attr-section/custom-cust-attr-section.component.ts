import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { CustAttrContentObj } from 'app/shared/model/new-cust/cust-attr-content-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustAttrFormComponent } from 'app/customer/sharing-component/new-cust-component/component/cust-attr-form/cust-attr-form.component';
import { CustAttrListComponent } from 'app/customer/cust-attr-list/cust-attr-list.component';

@Component({
  selector: 'app-custom-cust-attr-section',
  templateUrl: './custom-cust-attr-section.component.html'
})
export class CustomCustAttrSectionComponent implements OnInit {

  @ViewChild('CustAttrForm') custAttrForm: CustAttrFormComponent;
  @ViewChild('CustAttrFormOld') custAttrFormOld: CustAttrListComponent;
  @Input() MrCustTypeCode: string;
  @Input() CustId: number = 0;
  @Output() outputTab: EventEmitter<Object> = new EventEmitter<Object>();

  attrGroup: string;
  From: string;
  CustOtherInfo: any;
  identifierCustAttr: string = "CustAttrForm";
  isExistData: boolean = false;

  OtherInformationForm = this.fb.group({
    LbppmsDebtGrpId: ['', [Validators.required]],
    LbppmsCntrprtId: ['', [Validators.required]],
    LbppmsBizSustainId: ['', [Validators.required]],
    LbppmsBizSclId: ['', [Validators.required]]
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private http: HttpClient,
    private fb: FormBuilder, 
    private UrlConstantNew: UrlConstantNew) { }

  async ngOnInit() {
    console.log("test data:", this.CustId, this.MrCustTypeCode)
    this.attrGroup = this.MrCustTypeCode == CommonConstant.CustTypeCompany ? CommonConstant.AttrGroupCustCompanyOther : CommonConstant.AttrGroupCustPersonalOther;
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.CustId;
    await this.http.post(this.UrlConstantNew.GetCustOtherInfoByCustId, reqObj).toPromise().then(
      (response: any) => {
        this.CustOtherInfo = response;
      });
    
    if (this.CustOtherInfo.CustOtherInfoId != 0) {
      this.isExistData = true;
      this.OtherInformationForm.patchValue({
        LbppmsDebtGrpId: this.CustOtherInfo.LbppmsDebtGrpId,
        LbppmsCntrprtId: this.CustOtherInfo.LbppmsCntrprtId,
        LbppmsBizSustainId: this.CustOtherInfo.LbppmsBizSustainId,
        LbppmsBizSclId: this.CustOtherInfo.LbppmsBizSclId
      });
    }
    
    console.log("FormGroup: ", this.OtherInformationForm.value);
    console.log("IdentifierCustAttr: ", this.identifierCustAttr);
    console.log("AttrGroup: ", this.attrGroup);

  }

  SaveForm(isRedirectAfterSuccess:boolean = false){
    // this.http.post(this.getUrlSave(), RequestAppCustOtherInfoObj, AdInsConstant.SpinnerOptions).then(
    //   (response) => {
    //     this.toastr.successMessage(response["Message"]);

    //     if(isRedirectAfterSuccess)
    //     {
    //       if (this.From === "EditMainData") {
    //         AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});
    //       }
    //       else if (this.From === "CustFamily") {
    //         AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_FAMILY_PAGING], {});
    //       }
    //       else if (this.From === "CustShareholder") {
    //         AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_SHRHLDR_PAGING], {});
    //       } else {
    //         AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PAGING], {});
    //       }
    //     }
    //   });
  }

}
