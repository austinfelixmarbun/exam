import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UpdateCustPersonalDetailObj } from 'app/shared/model/UpdateMasterCust/UpdateCustPersonalDetailObj.Model';
import { environment } from 'environments/environment';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-customer-personal-detail',
  templateUrl: './update-customer-personal-detail.component.html',
  styles: [],
  providers: [NGXToastrService]
})
export class UpdateCustomerPersonalDetailComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  AppCustPersonalDetail: UpdateCustPersonalDetailObj;
  MrMaritalStatCodeList: Array<any>;
  MrNationalityCodeList: Array<any>;
  MrEducationCodeList: Array<any>;
  MrReligionCodeList: Array<any>;
  DefaultCountry: string;
  LocalNationalityConstant: string;
  // DetailData: Object;
  CustGrpLookupObj: InputLookupObj;
  lookUpObj: InputLookupObj;

  CustomerDetailForm = this.fb.group({
    CustId: [0],
    CustPersonalId: [0],
    CustFullName: ['', [Validators.required]],
    MrMaritalStatCode: ['', [Validators.required]],
    MrNationalityCode: ['', [Validators.required]],
    Country: ['', [Validators.required]],
    MrEducationCode: ['', [Validators.required]],
    MrReligionCode: ['', [Validators.required]],
    FamilyCardNo: ['', [Validators.pattern("^[0-9]+$")]],
    NoOfResidence: ['', [Validators.pattern("^[0-9]+$")]],
    NoOfDependents: ['', [Validators.pattern("^[0-9]+$")]],
    CustomerGroupParentCustId: [0],
    CustomerGroupParentCustName: [''],
    IsAffiliationWithMf: [false],
    IsVip: [false],
    VipNotes: [''],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    MobilePhnNo2: ['', [Validators.pattern("^[0-9]+$")]],
    Email1: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    Email2: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    RowVersionCust: [''],
    RowVersionCustPersonal: [''],
    RowVersionCustGrp: ['']
  }); 

  constructor(
    private http: HttpClient, 
    private toastr: NGXToastrService, 
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.AppCustPersonalDetail = new UpdateCustPersonalDetailObj();  
    this.MrMaritalStatCodeList = new Array<any>();
    this.MrNationalityCodeList = new Array<any>();
    this.MrEducationCodeList = new Array<any>();
    this.MrReligionCodeList = new Array<any>();
    this.ResponseTab = new EventEmitter<any>();
    // this.DetailData = new Object();
    this.LocalNationalityConstant = CommonConstant.NationalityCodeLocal;

    this.CustGrpLookupObj = new InputLookupObj();
    this.CustGrpLookupObj.urlJson = "./assets/uclookup/Customer/CustomerGroup/lookupCustGrp_UpdateMasterCust.json";
    this.CustGrpLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.CustGrpLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.CustGrpLookupObj.pagingJson = "./assets/uclookup/Customer/CustomerGroup/lookupCustGrp_UpdateMasterCust.json";
    this.CustGrpLookupObj.genericJson = "./assets/uclookup/Customer/CustomerGroup/lookupCustGrp_UpdateMasterCust.json";
    this.CustGrpLookupObj.ddlEnvironments = [
      {
        name: "A.MR_CUST_TYPE_CODE",
        environment: environment.FoundationR3Url
      }
    ];
    this.CustGrpLookupObj.isReady = false;
    this.CustGrpLookupObj.isRequired = false;

    this.lookUpObj = new InputLookupObj();
    this.lookUpObj.urlJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookUpObj.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.isReady = false;
    this.lookUpObj.isRequired = false;
  }

  ngOnInit() {
    let getDetail = this.http.post(URLConstant.GetCustDataForUpdateMasterCustDetail, { CustDataTrxId: this.CustDataTrxId });
    let getMaritalStat = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeMaritalStat });
    let getNationality = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeNationality });
    let getEducation = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeEducation });
    let getReligion = this.http.post(URLConstant.GetListActiveRefMaster, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeReligion });
    let getGeneralSettingNationality = this.http.post(URLConstant.GetGeneralSettingByCode, { GsCode: CommonConstant.GSCodeDefLocalNationality });
    forkJoin([getDetail, getMaritalStat, getNationality, getEducation, getReligion, getGeneralSettingNationality]).pipe(
      map((response) => {
        var detailData = response[0];
        this.AppCustPersonalDetail = {...detailData["AppCustDetail"]};
        this.MrMaritalStatCodeList = response[1][CommonConstant.ReturnObj];
        this.MrNationalityCodeList = response[2][CommonConstant.ReturnObj];
        this.MrEducationCodeList = response[3][CommonConstant.ReturnObj];
        this.MrReligionCodeList = response[4][CommonConstant.ReturnObj];
        this.CustomerDetailForm.patchValue({...detailData["MasterCustDetail"]});

        var country = response[5];
        var criteriaList = new Array();
        var criteriaObj = new CriteriaObj();
        criteriaObj.restriction = AdInsConstant.RestrictionNeq;
        criteriaObj.propName = 'COUNTRY_CODE';
        criteriaObj.value = country["GsValue"];
        criteriaList.push(criteriaObj);
        this.lookUpObj.addCritInput = criteriaList;
        detailData["GsValueCountry"] = country["GsValue"];

        criteriaList = new Array();
        criteriaObj = new CriteriaObj();
        criteriaObj.restriction = AdInsConstant.RestrictionNeq;
        criteriaObj.propName = 'A.CUST_ID';
        criteriaObj.value = detailData["MasterCustDetail"]["CustId"];
        criteriaList.push(criteriaObj);
        this.CustGrpLookupObj.addCritInput = criteriaList;
        this.CustGrpLookupObj.nameSelect = detailData["MasterCustDetail"]["CustomerGroupParentCustName"];

        return detailData;
      }),
      mergeMap((response) => {
        let getMasterCountry = this.http.post(URLConstant.GetRefCountryByCountryCode, { CountryCode: response["MasterCustDetail"]["Country"] });
        let getAppCountry = this.http.post(URLConstant.GetRefCountryByCountryCode, { CountryCode: response["AppCustDetail"]["Country"] });  
        let getDefaultCountry = this.http.post(URLConstant.GetRefCountryByCountryCode, { CountryCode: response["GsValueCountry"] });  
        return forkJoin([getMasterCountry, getAppCountry, getDefaultCountry]);
      })
    ).toPromise().then(
      (response) => {
        this.lookUpObj.nameSelect = response[0]["CountryName"];
        this.AppCustPersonalDetail["CountryName"] = response[1]["CountryName"];
        this.DefaultCountry = response[2]["CountryName"];
        this.CustGrpLookupObj.isReady = true;
        this.lookUpObj.isReady = true;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  getCountryData(e){
    this.CustomerDetailForm.patchValue({
      Country: e.CountryCode
    });
  }

  NationalityHandler(){
    var nationality = this.CustomerDetailForm.controls["MrNationalityCode"].value;
    if(nationality == CommonConstant.NationalityCodeLocal){
      this.lookUpObj.isRequired = false;
    }
    else{
      this.lookUpObj.isRequired = true;
    }
  }

  getParentCust(e){
    this.CustomerDetailForm.patchValue({
      CustomerGroupParentCustId: e.custId,
      CustomerGroupParentCustName: e.custName
    });
  }

  CopyAllHandler(){
    var obj = new Object();
    for (const key in this.AppCustPersonalDetail) {
      if(key == "CustId" || key == "CustPersonalId" || key == "CountryName" || key == "CustomerGroupParentCustName" || key == "RowVersionCust" || 
          key == "RowVersionCustPersonal" || key == "RowVersionCustGrp"){
        continue;
      }
      else{
        // if(this.AppCustPersonalDetail[key]){
          obj[key] = this.AppCustPersonalDetail[key];
        // }
      }
    }
    this.CustomerDetailForm.patchValue(obj);
    this.CustGrpLookupObj.isReady = false;
    this.CustGrpLookupObj.nameSelect = this.AppCustPersonalDetail["CustomerGroupParentCustName"];
    this.CustGrpLookupObj.isReady = true;
    this.lookUpObj.nameSelect = this.AppCustPersonalDetail["CountryName"];
    this.lookUpObj.jsonSelect = { CountryName: this.AppCustPersonalDetail["CountryName"] };
    this.CustomerDetailForm.get("CountryCode").patchValue({
      value: this.AppCustPersonalDetail["CountryName"]
    });
    this.CustomerDetailForm.get("ParentCust").patchValue({
      value: this.AppCustPersonalDetail["CustomerGroupParentCustName"]
    });
  }

  CopyHandler(formControlName){
    var obj = new Object();
    obj[formControlName] = this.AppCustPersonalDetail[formControlName];
    this.CustomerDetailForm.patchValue(obj);

    if(formControlName == "MrNationalityCode"){
      this.CustomerDetailForm.patchValue({
        Country: this.AppCustPersonalDetail.Country
      });
      this.CustomerDetailForm.get("CountryCode").patchValue({
        value: this.AppCustPersonalDetail["CountryName"]
      });
      this.lookUpObj.nameSelect = this.AppCustPersonalDetail["CountryName"];
      this.lookUpObj.jsonSelect = { CountryName: this.AppCustPersonalDetail["CountryName"] };
    }
  }

  CopyCustGrpHandler(){
    this.CustomerDetailForm.patchValue({
      CustomerGroupParentCustId: this.AppCustPersonalDetail["CustomerGroupParentCustId"],
      CustomerGroupParentCustName: this.AppCustPersonalDetail["CustomerGroupParentCustName"]
    });
    this.CustGrpLookupObj.isReady = false;
    this.CustGrpLookupObj.nameSelect = this.AppCustPersonalDetail["CustomerGroupParentCustName"];
    this.CustGrpLookupObj.isReady = true;
    this.CustomerDetailForm.get("ParentCust").patchValue({
      value: this.AppCustPersonalDetail["CustomerGroupParentCustName"]
    });
  }

  back(){
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, ["/Customer/UpdateDataCustomer/Paging"], {});
  }

  SaveValue(){
    var formValue = this.CustomerDetailForm.value;
    this.http.post(URLConstant.EditMasterCustomer, formValue).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
}
