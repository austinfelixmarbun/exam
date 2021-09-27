import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { RefIndustryTypeObj } from 'app/shared/model/RefIndustryTypeObj.Model';
import { DatePipe } from '@angular/common';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';
import { CookieService } from 'ngx-cookie';
import { String } from 'typescript-string-operations';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

@Component({
  selector: 'app-customer-company-detail',
  templateUrl: './customer-company-detail.component.html',
  styleUrls: []
})
export class CustomerCompanyDetailComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  lookUpObj: InputLookupObj;

  tempCustObj: any;
  tempCustCompanyObj: any;
  tempRefIndustryObj: any;

  custCompanyObj: CustCompanyObj;
  refIndustryTypeObj: RefIndustryTypeObj;

  IdCust: number;
  tempRefIndustryTypeId: number = 0;
  Page: String;
  UserAccess: CurrentUserContext;
  MaxDate: Date;

  CustomerDetailForm = this.fb.group({
    NumOfEmp: ['', [Validators.maxLength(100), Validators.required, Validators.pattern("^[0-9]+$")]],
    EstablishmentDt: ['', [Validators.required]],
    MrCustModelCode: [''],
    IsSkt: [false],
    IsVip: [false],
    VipNotes: [''],
    IsAffiliateWithMf: [false],
  });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private cookieService: CookieService) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      if (params["Page"] != null) {
        this.Page = params["Page"];
      }
    });
  }

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;
  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    this.lookUpObj = new InputLookupObj();
    this.lookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    this.UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.MaxDate = this.UserAccess.BusinessDt;

    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypeCompany, false, URLConstant.GetListActiveRefMasterWithMappingCodeAll);

    this.http.post(URLConstant.GetCustByCustId, { Id: this.IdCust }).subscribe(
      (response: CustObj) => {
        this.CustomerDetailForm.patchValue({
          MrCustModelCode: response.MrCustModelCode,
          IsVip: response.IsVip,
          VipNotes: response.VipNotes,
          IsAffiliateWithMf: response.IsAffiliateWithMf,
        });
        this.checkState();
      }
    );
    this.http.post(URLConstant.GetCustCompanyByCustId, { Id: this.IdCust }).subscribe(
      (response) => {
        this.tempCustCompanyObj = response;
        this.CustomerDetailForm.patchValue({
          NumOfEmp: this.tempCustCompanyObj.NumOfEmp,
          EstablishmentDt: datePipe.transform(this.tempCustCompanyObj.EstablishmentDt, 'yyyy-MM-dd'),
          IsSkt: this.tempCustCompanyObj.IsSkt
        });

        if (this.tempCustCompanyObj.RefIndustryTypeId != null) {
          this.refIndustryTypeObj = new RefIndustryTypeObj();
          this.refIndustryTypeObj.RefIndustryTypeId = this.tempCustCompanyObj.RefIndustryTypeId;
          this.http.post(URLConstant.GetRefIndustryTypeById, { Id: this.tempCustCompanyObj.RefIndustryTypeId }).subscribe(
              (response) => {
                this.tempRefIndustryObj = response; 
                this.tempRefIndustryTypeId = this.tempCustCompanyObj.RefIndustryTypeId;
                this.lookUpObj.nameSelect = this.tempRefIndustryObj.IndustryTypeName; 
                this.lookUpObj.jsonSelect = response;
              });
          }
        });
  }

  onFocusOutEstDate(event){
    if(event.target.value > this.MaxDate){
      this.toastr.warningMessage(String.Format(ExceptionConstant.EST_DATE_CANNOT_BE_MORE_THAN_BIZ_DATE));
      return;
    }
  }

  SaveValue() {
    this.custCompanyObj = new CustCompanyObj();
    this.custCompanyObj = this.tempCustCompanyObj;

    this.custCompanyObj.NumOfEmp = this.CustomerDetailForm.controls["NumOfEmp"].value;
    this.custCompanyObj.EstablishmentDt = this.CustomerDetailForm.controls["EstablishmentDt"].value;
    this.custCompanyObj.IsSkt = this.CustomerDetailForm.controls["IsSkt"].value;
    this.custCompanyObj.IsVip = this.CustomerDetailForm.controls["IsVip"].value;
    this.custCompanyObj.VipNotes = this.CustomerDetailForm.controls["VipNotes"].value;
    this.custCompanyObj.IsAffiliateWithMf = this.CustomerDetailForm.controls["IsAffiliateWithMf"].value;
    this.custCompanyObj.MrCustModelCode = this.CustomerDetailForm.controls["MrCustModelCode"].value;

    if(this.CustomerDetailForm.controls["EstablishmentDt"].value > this.MaxDate){
      this.toastr.warningMessage(String.Format(ExceptionConstant.EST_DATE_CANNOT_BE_MORE_THAN_BIZ_DATE));
      return;
    }

    if (this.tempRefIndustryObj != null && this.tempRefIndustryTypeId === null) {
      this.custCompanyObj.RefIndustryTypeId = this.custCompanyObj.RefIndustryTypeId;
    }
    else {
      this.custCompanyObj.RefIndustryTypeId = this.tempRefIndustryTypeId;
    }

    this.http.post(URLConstant.EditCustCompany, this.custCompanyObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["Message"]);
        this.outputTab.emit({ CustCompanyId: this.tempCustCompanyObj.CustCompanyId, stepMode: 'next' });
      }
    );
  }

  getLookUp(event) {
    this.tempRefIndustryTypeId = event.RefIndustryTypeId;
  }

  checkState() {
    if (!this.CustomerDetailForm.controls.IsVip.value) {
      this.CustomerDetailForm.patchValue({
        VipNotes: null
      });
      this.CustomerDetailForm.controls.VipNotes.disable();
      this.CustomerDetailForm.controls.VipNotes.clearAsyncValidators();

    } else {
      this.CustomerDetailForm.controls.VipNotes.enable();
      this.CustomerDetailForm.controls.VipNotes.setValidators(Validators.required);

    }
    this.CustomerDetailForm.controls.VipNotes.updateValueAndValidity();
  }

  back() {
    if (this.Page != null) {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});
    }
    else {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PAGING], {});
    }
  }
}