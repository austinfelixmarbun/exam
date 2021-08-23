import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { DatePipe } from '@angular/common';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstantX } from 'app/impl/shared/constant/URLConstantX';

@Component({
  selector: 'app-customer-company-detail-x',
  templateUrl: './customer-company-detail-x.component.html'
})
export class CustomerCompanyDetailXComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  lookUpObj: InputLookupObj;

  tempCustObj: any;
  tempCustCompanyObj: any;
  tempRefSectorEconomySlik: any;

  custCompanyObj: CustCompanyObj;
  returnSectorEconomySlikObj: any;

  IdCust: number;
  tempRefIndustryTypeId: number = 0;
  Page: String;

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
    private fb: FormBuilder) {
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
    this.lookUpObj.urlJson = "./assets/lookup/lookupRefSectorEconomySlikX.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupRefSectorEconomySlikX.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupRefSectorEconomySlikX.json";

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
    this.http.post(URLConstantX.GetCustCompanyByCustId, { Id: this.IdCust }).subscribe(
      (response) => {
        this.tempCustCompanyObj = response['responseCustCompanyObj'];
        this.tempRefSectorEconomySlik = response['RefSectorEconomySlikXId'];

        this.CustomerDetailForm.patchValue({
          NumOfEmp: this.tempCustCompanyObj.NumOfEmp,
          EstablishmentDt: datePipe.transform(this.tempCustCompanyObj.EstablishmentDt, 'yyyy-MM-dd'),
          IsSkt: this.tempCustCompanyObj.IsSkt
        });

        if (this.tempCustCompanyObj.RefIndustryTypeId != null && this.tempRefSectorEconomySlik != null &&
          this.tempCustCompanyObj.RefIndustryTypeId != 0 && this.tempRefSectorEconomySlik != 0) {
          this.http.post(URLConstantX.GetRefSectorEconomySlikXById, {Id: this.tempRefSectorEconomySlik}).subscribe(
            (response) => {
              this.returnSectorEconomySlikObj = response;
              this.lookUpObj.nameSelect = this.returnSectorEconomySlikObj.SectorEconomySlikName;
              this.lookUpObj.jsonSelect = this.returnSectorEconomySlikObj;
              this.tempRefIndustryTypeId = this.returnSectorEconomySlikObj.RefIndustryTypeId;
            }
          );
        }
      }
    );
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

    if (this.returnSectorEconomySlikObj != null && this.tempRefIndustryTypeId === null) {
      this.custCompanyObj.RefIndustryTypeId = this.custCompanyObj.RefIndustryTypeId;
    }
    else {
      this.custCompanyObj.RefIndustryTypeId = this.tempRefIndustryTypeId;
    }

    let CustCompanyObjX = {
      CustId: this.IdCust,
      RefSectorEconomySlikXId: this.tempRefSectorEconomySlik
    }

    let reqObj = {
      CustCompanyObj: this.custCompanyObj,
      CustCompanyObjX: CustCompanyObjX
    }

    this.http.post(URLConstantX.EditCustCompany, reqObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["Message"]);
        this.outputTab.emit({ CustCompanyId: this.tempCustCompanyObj.CustCompanyId, stepMode: 'next' });
      }
    );
  }

  getLookUp(event) {
    this.tempRefSectorEconomySlik = event.RefSectorEconomySlikXId;
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
}
