  import { Component, OnInit, Output, EventEmitter } from '@angular/core';
  import { Validators, FormBuilder } from '@angular/forms';
  import { Router, ActivatedRoute } from '@angular/router';
  import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
  import { HttpClient } from '@angular/common/http';
  import { WizardComponent } from 'angular-archwizard';
  import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
  import { environment } from 'environments/environment';
  import { CustObj } from 'app/shared/model/CustObj.Model';
  import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
  import { AdInsConstant } from 'app/shared/AdInstConstant';
  import { RefIndustryTypeObj } from 'app/shared/model/RefIndustryTypeObj.Model';
  import { DatePipe } from '@angular/common';

  @Component({
    selector: 'app-customer-company-detail',
    templateUrl: './customer-company-detail.component.html',
    styleUrls: ['./customer-company-detail.component.scss'],
    providers: [NGXToastrService],
  })
  export class CustomerCompanyDetailComponent implements OnInit {
    CustomerDetailForm = this.fb.group({
      NumOfEmp: ['', [Validators.maxLength(100),Validators.required,Validators.pattern("^[0-9]+$")]],
      IsAffiliateWithMf: [false],
      IsVip: [false],
      VipNotes: [''],
      EstablishmentDt: ['',[Validators.required]]
    });
    lookUpObj: any;
    custObj: any;
    custCompanyObj: any;
    tempRefIndustryTypeId: any;
    editCustUrl: any;
    editCustCompanyUrl: any;
    IdCust: any;
    getCustCompanyByCustIdUrl: any;
    tempCustCompanyObj: any;
    getCustByCustIdUrl: any;
    tempCustObj: any;
    refIndustryTypeObj: any;
    getRefIndustryTypeByIndustryTypeIdUrl: any;
    tempRefIndustryObj: any;
    @Output() outputValue: EventEmitter<object> = new EventEmitter();

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) {
      this.editCustUrl = AdInsConstant.EditCust;
      this.editCustCompanyUrl = AdInsConstant.EditCustCompany;
      this.getCustCompanyByCustIdUrl = AdInsConstant.GetCustCompanyByCustId;
      this.getCustByCustIdUrl = AdInsConstant.GetCustByCustId;
      this.getRefIndustryTypeByIndustryTypeIdUrl = AdInsConstant.GetRefIndustryTypeById;
      this.route.queryParams.subscribe(params => {
        if (params["IdCust"] != null) {
          this.IdCust = params["IdCust"];
        }
      });
    }

    ngOnInit() {

      var datePipe = new DatePipe("en-US");
      this.lookUpObj = new InputLookupObj();
      this.lookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
      this.lookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
      this.lookUpObj.urlEnviPaging = environment.FoundationR3Url;
      this.lookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
      this.lookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";
     

      this.custObj = new CustObj()
      this.custObj.CustId = this.IdCust;

      this.http.post(this.getCustByCustIdUrl, this.custObj).subscribe(
        (response) => {
          this.tempCustObj = response;
          this.CustomerDetailForm.patchValue({
            IsAffiliateWithMf: this.tempCustObj.IsAffiliateWithMf,
            IsVip: this.tempCustObj.IsVip,
            VipNotes: this.tempCustObj.VipNotes,
          });
        });      this.custCompanyObj = new CustCompanyObj();
        this.custCompanyObj.CustId = this.IdCust;
        this.http.post(this.getCustCompanyByCustIdUrl, this.custCompanyObj).subscribe(
          (response) => {
            this.tempCustCompanyObj = response;
            this.CustomerDetailForm.patchValue({
              NumOfEmp: this.tempCustCompanyObj.NumOfEmp,
              EstablishmentDt: datePipe.transform(this.tempCustCompanyObj.EstablishmentDt, 'yyyy-MM-dd'),
            });   
           if(this.tempCustCompanyObj.RefIndustryTypeId !=null){
            this.refIndustryTypeObj = new RefIndustryTypeObj();
            this.refIndustryTypeObj.RefIndustryTypeId = this.tempCustCompanyObj.RefIndustryTypeId;
            this.http.post(this.getRefIndustryTypeByIndustryTypeIdUrl, this.refIndustryTypeObj).subscribe(
              (response) => {
                this.tempRefIndustryObj = response;
                this.lookUpObj.nameSelect = this.tempRefIndustryObj.IndustryTypeName;
                console.log(this.tempRefIndustryObj.IndustryTypeName);
              });
           } 
          });

    }
    SaveValue() {
      this.custObj = new CustObj();
      this.custCompanyObj = new CustCompanyObj();
      this.custCompanyObj = this.tempCustCompanyObj;
      this.custObj = this.tempCustObj;
      this.custObj.IsVip = this.CustomerDetailForm.controls["IsVip"].value;
      this.custObj.VipNotes = this.CustomerDetailForm.controls["VipNotes"].value;
      this.custObj.IsAffiliateWithMf = this.CustomerDetailForm.controls["IsAffiliateWithMf"].value;
      this.custCompanyObj.NumOfEmp = this.CustomerDetailForm.controls["NumOfEmp"].value;
      this.custCompanyObj.EstablishmentDt = this.CustomerDetailForm.controls["EstablishmentDt"].value;
      this.custCompanyObj.RefIndustryTypeId = this.tempRefIndustryTypeId;

      this.http.post(this.editCustUrl, this.custObj).subscribe(
        (response) => {
          this.http.post(this.editCustCompanyUrl, this.custCompanyObj).subscribe(
            (response) => {
              this.toastr.successMessage(response["Message"]);
              this.outputValue.emit({ CustCompanyId: this.tempCustCompanyObj.CustCompanyId });
              this.wizard.goToNextStep();
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        }
      );
    }
    getLookUp(event) {
      this.tempRefIndustryTypeId = event.RefIndustryTypeId;
    }
  }

