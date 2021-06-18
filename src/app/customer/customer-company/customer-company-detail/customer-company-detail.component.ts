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

  CustomerDetailForm = this.fb.group({
    NumOfEmp: ['', [Validators.maxLength(100), Validators.required, Validators.pattern("^[0-9]+$")]],
    EstablishmentDt: ['', [Validators.required]],
    IsSkt: [false]
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

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    this.lookUpObj = new InputLookupObj();
    this.lookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";

    this.custCompanyObj = new CustCompanyObj();
    this.custCompanyObj.CustId = this.IdCust;
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

  SaveValue() {
    this.custCompanyObj = new CustCompanyObj();
    this.custCompanyObj = this.tempCustCompanyObj;

    this.custCompanyObj.NumOfEmp = this.CustomerDetailForm.controls["NumOfEmp"].value;
    this.custCompanyObj.EstablishmentDt = this.CustomerDetailForm.controls["EstablishmentDt"].value;
    this.custCompanyObj.IsSkt = this.CustomerDetailForm.controls["IsSkt"].value;

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

  back() {
    if (this.Page != null) {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});
    }
    else {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PAGING], {});
    }
  }
}