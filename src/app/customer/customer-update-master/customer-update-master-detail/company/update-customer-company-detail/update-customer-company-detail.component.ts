import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UpdateCustCompanyDetailObj } from 'app/shared/model/UpdateMasterCust/UpdateCustCompanyDetailObj.Model';
import { environment } from 'environments/environment';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-customer-company-detail',
  templateUrl: './update-customer-company-detail.component.html',
  styles: [],
  providers: [NGXToastrService]
})
export class UpdateCustomerCompanyDetailComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  AppCustCompanyDetail: UpdateCustCompanyDetailObj;
  AppIndustryName: string;
  IndustryLookupObj: InputLookupObj;
  businessDtMax: Date;

  CustomerDetailForm = this.fb.group({
    CustCompanyId: [0],
    RefIndustryTypeId: [0, [Validators.required]],
    NumOfEmp: [0, [Validators.required, Validators.pattern("^[0-9]+$")]],
    EstablishmentDt: ['', [Validators.required]],
    RowVersion: ['']
  });

  constructor(
    private http: HttpClient, 
    private toastr: NGXToastrService, 
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.AppCustCompanyDetail = new UpdateCustCompanyDetailObj();
    this.ResponseTab = new EventEmitter<any>();
    this.IndustryLookupObj = new InputLookupObj();
    this.IndustryLookupObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.IndustryLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.IndustryLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.IndustryLookupObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.IndustryLookupObj.genericJson = "./assets/lookup/lookupIndustryType.json";
  }

  ngOnInit() {
    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.http.post(URLConstant.GetCustCompanyDataForUpdateMasterCustCompany, { CustDataTrxId: this.CustDataTrxId }).pipe(
      map((response) => {
        this.AppCustCompanyDetail = {...response["AppCustCompany"]};
        this.CustomerDetailForm.patchValue({...response["MasterCustCompany"]});
        return response;
      }),
      mergeMap((response) => {
        let getMasterIndustry = this.http.post(URLConstant.GetRefIndustryTypeById, { RefIndustryTypeId: response["MasterCustCompany"]["RefIndustryTypeId"] });
        let getAppIndustry = this.http.post(URLConstant.GetRefIndustryTypeById, { RefIndustryTypeId: response["AppCustCompany"]["RefIndustryTypeId"] });
        return forkJoin([getMasterIndustry, getAppIndustry]);
      })
    ).toPromise().then(
      (response) => {
        this.IndustryLookupObj.nameSelect = response[0]["IndustryTypeName"];
        this.AppIndustryName = response[1]["IndustryTypeName"];
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  getIndustry(e){
    this.CustomerDetailForm.patchValue({
      RefIndustryTypeId: e.RefIndustryTypeId
    });
  }

  CopyAllHandler(){
    this.CustomerDetailForm.patchValue({
      RefIndustryTypeId: this.AppCustCompanyDetail.RefIndustryTypeId,
      NumOfEmp: this.AppCustCompanyDetail.NumOfEmp,
      EstablishmentDt: this.AppCustCompanyDetail.EstablishmentDt,
    });
    this.IndustryLookupObj.isReady = false;
    this.IndustryLookupObj.nameSelect = this.AppIndustryName;
    this.IndustryLookupObj.isReady = true;
  }

  CopyHandler(formControlName){
    var obj = new Object();
    obj[formControlName] = this.AppCustCompanyDetail[formControlName];
    this.CustomerDetailForm.patchValue(obj);
  }

  back(){
    this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
  }

  SaveValue(){
    this.http.post(URLConstant.EditMasterCustCompanyDetail, this.CustomerDetailForm.value).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

}
