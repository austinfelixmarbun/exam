import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment'; 
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefIndustryTypeObj } from 'app/shared/model/RefIndustryTypeObj.Model';
import { DatePipe } from '@angular/common';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-customer-company-detail',
  templateUrl: './customer-company-detail.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerCompanyDetailComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  lookUpObj: InputLookupObj; 

  tempCustObj: any;
  tempCustCompanyObj: any;
  tempRefSectorEconomySlik: any;

  custCompanyObj: CustCompanyObj;
  refIndustryTypeObj: RefIndustryTypeObj;

  IdCust: number;
  tempRefIndustryTypeId: number =0;
  tempRefSectorEconomySlikId :number = 0;
  Page: String;
  editCustCompanyUrl: string;
  getCustByCustIdUrl: string;
  getCustCompanyByCustIdUrl: string;
  getRefIndustryTypeByIndustryTypeIdUrl: string;

  CustomerDetailForm = this.fb.group({
    NumOfEmp: ['', [Validators.maxLength(100), Validators.required, Validators.pattern("^[0-9]+$")]],
    EstablishmentDt: ['', [Validators.required]]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
 
    this.editCustCompanyUrl = URLConstant.EditCustCompany;
    this.getCustCompanyByCustIdUrl = URLConstant.GetCustCompanyByCustId;
    this.getCustByCustIdUrl = URLConstant.GetCustByCustId;
    this.getRefIndustryTypeByIndustryTypeIdUrl = URLConstant.GetRefIndustryTypeById;
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
    this.lookUpObj.urlJson = "./assets/lookup/lookupRefSectorEconomySlik.json";
    this.lookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookUpObj.pagingJson = "./assets/lookup/lookupRefSectorEconomySlik.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupRefSectorEconomySlik.json";
 
    this.custCompanyObj = new CustCompanyObj();
    this.custCompanyObj.CustId = this.IdCust;
    this.http.post(this.getCustCompanyByCustIdUrl, this.custCompanyObj).subscribe(
      (response) => {
        this.tempCustCompanyObj = response;
        this.CustomerDetailForm.patchValue({
          NumOfEmp: this.tempCustCompanyObj.NumOfEmp,
          EstablishmentDt: datePipe.transform(this.tempCustCompanyObj.EstablishmentDt, 'yyyy-MM-dd'),
        });
        
        if (this.tempCustCompanyObj.RefSectorEconomySlikId != null) { 
          this.http.post(URLConstant.GetRefSectorEconomySlikCustomObjectByRefSectorEconomySlikId, {"RefSectorEconomySlikId": this.tempCustCompanyObj.RefSectorEconomySlikId }).subscribe(
            (response) => {
              this.tempRefSectorEconomySlikId= this.tempCustCompanyObj.RefSectorEconomySlikId;
              this.tempRefIndustryTypeId = this.tempCustCompanyObj.RefIndustryTypeId;
              this.tempRefSectorEconomySlik = response; 
              this.lookUpObj.nameSelect = this.tempRefSectorEconomySlik.RefSectorEconomySlikName; 
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
    
    if(this.tempRefIndustryTypeId !=0 || this.tempRefIndustryTypeId != undefined)
    this.custCompanyObj.RefIndustryTypeId = this.tempRefIndustryTypeId;

    if(this.tempRefSectorEconomySlikId !=0 || this.tempRefSectorEconomySlikId != undefined)
    this.custCompanyObj.RefSectorEconomySlikId = this.tempRefSectorEconomySlikId; 
    
        this.http.post(this.editCustCompanyUrl, this.custCompanyObj).subscribe(
          (response) => { 
            this.toastr.successMessage(response["Message"]);
            this.outputTab.emit({ CustCompanyId: this.tempCustCompanyObj.CustCompanyId, stepMode: 'next'});
          }
        );  
  }
  getLookUp(event) {
    this.tempRefIndustryTypeId = event.RefIndustryTypeId;
    this.tempRefSectorEconomySlikId = event.RefSectorEconomySlikId;
  }
  back() {
    if (this.Page != null) {
      AdInsHelper.RedirectUrl(this.router,['/Customer/EditMainData/Paging'],{});
    } else {
      AdInsHelper.RedirectUrl(this.router,['/Customer/Paging'],{});
    }
  }
  }

