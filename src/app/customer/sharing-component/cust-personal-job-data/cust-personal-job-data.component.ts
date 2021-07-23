import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustPersonalJobDataObj } from 'app/shared/model/CustPersonalJobDataObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { RefIndustryTypeObj } from 'app/shared/model/RefIndustryTypeObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMasterCodeObj.Model';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { RefProfessionObj } from 'app/shared/model/RefProfessionObj.Model';
import { CookieService } from 'ngx-cookie';
import { JobAddrSectionComponent } from './job-addr-section/job-addr-section.component';

@Component({
  selector: 'app-cust-personal-job-data',
  templateUrl: './cust-personal-job-data.component.html',
})
export class CustPersonalJobDataComponent implements OnInit {

  @ViewChild('JobAddrForm') jobAddrForm: JobAddrSectionComponent;
  @Input() CustId: number = 0;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  CustomerJobForm: FormGroup = this.fb.group({});

  readonly RefMasterTypeCodeJobPosition: string = CommonConstant.RefMasterTypeCodeJobPosition;
  readonly RefMasterTypeCodeJobStat: string = CommonConstant.RefMasterTypeCodeJobStat;
  readonly RefMasterTypeCodeCoyScale: string = CommonConstant.RefMasterTypeCodeCoyScale;
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel; //mapping code CommonConstant.CustTypePersonal
  readonly RefMasterTypeCodeInvestmentType: string = CommonConstant.RefMasterTypeCodeInvestmentType;


  readonly CUST_MODEL_EMP: string = CommonConstant.CUST_MODEL_EMP;
  readonly CUST_MODEL_PROF: string = CommonConstant.CUST_MODEL_PROF;
  readonly CUST_MODEL_SME: string = CommonConstant.CUST_MODEL_SME;
  readonly CUST_MODEL_NONPROF: string = CommonConstant.CUST_MODEL_NONPROF;

  constructor(private http: HttpClient, private fb: FormBuilder, private cookieService: CookieService) { }

  async ngOnInit() {
    this.InitData();
    await this.GetExisting();
    this.professionLookUpObj.isReady = true;
    this.companyLookupObj.isReady = true;
    this.industryLookUpObj.isReady = false;
    this.jobPositionLookupObj.isReady = true;
  }

  //#region Get
  businessDtMin: Date;
  InitData() {
    this.BindLookupProfession();
    this.BindLookupCompany();
    this.BindLookupIndustry();
    this.BindLookupJobPosition();

    this.initDdlRefMaster(this.RefMasterTypeCodeJobPosition);
    this.initDdlRefMaster(this.RefMasterTypeCodeJobStat);
    this.initDdlRefMaster(this.RefMasterTypeCodeCoyScale);
    this.initDdlRefMaster(this.RefMasterTypeCodeInvestmentType);
    this.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypePersonal, true);
    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel].ddlType = UcDropdownListConstant.DDL_TYPE_BLANK;

    console.log(this.DictUcDDLObj);
    this.ResetForm();

    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
  }

  ResetForm() {
    this.CustomerJobForm = this.fb.group({
      MrCustModelCode: ['', Validators.required],
      RefProfessionId: [0, Validators.required],
      CoyName: [''],
      MrJobPositionCode: [''],
      RefIndustryTypeId: [0],
      MrJobStatCode: [''],
      ProfessionalNo: [''],
      JobTitleName: [''],
      EmploymentEstablishmentDt: [''],
      IsMfEmp: [false],
      IsWellknownCoy: [false],
      MrWellknownCoyCode: [''],
      MrCoyScaleCode: [''],
      NoOfEmploy: [''],
      MrInvestmentTypeCode: [''],
      EmpNo: [''],
      RowVersion: [''],
      RefSectorEconomySlikId: [0],
    });
  }

  //#region Bind lookup
  professionLookUpObj: InputLookupObj = new InputLookupObj();
  BindLookupProfession() {
    this.professionLookUpObj = new InputLookupObj();
    this.professionLookUpObj.isRequired = true;
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";
  }

  companyLookupObj: InputLookupObj = new InputLookupObj();
  BindLookupCompany() {
    this.companyLookupObj = new InputLookupObj();
    this.companyLookupObj.urlJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.pagingJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.genericJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.isRequired = true;

    this.companyLookupObj.addCritInput = new Array();
    let ArrAddCritCoy = new Array<CriteriaObj>();
    let critCoyObj = new CriteriaObj();
    critCoyObj.DataType = "text";
    critCoyObj.propName = 'REF_MASTER_TYPE_CODE';
    critCoyObj.restriction = AdInsConstant.RestrictionEq;
    critCoyObj.value = "WELLKNOWN_COY";
    ArrAddCritCoy.push(critCoyObj);

    let critCoyObj1 = new CriteriaObj();
    critCoyObj1.DataType = "text";
    critCoyObj1.propName = 'IS_ACTIVE';
    critCoyObj1.restriction = AdInsConstant.RestrictionEq;
    critCoyObj1.value = "1";
    ArrAddCritCoy.push(critCoyObj1);
    this.companyLookupObj.addCritInput = ArrAddCritCoy;
  }

  industryLookUpObj: InputLookupObj = new InputLookupObj();
  BindLookupIndustry() {
    this.industryLookUpObj = new InputLookupObj();
    this.industryLookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.isRequired = false;
  }

  jobPositionLookupObj: InputLookupObj = new InputLookupObj();
  BindLookupJobPosition() {
    this.jobPositionLookupObj = new InputLookupObj();
    this.jobPositionLookupObj.isRequired = false;
    this.jobPositionLookupObj.urlJson = "./assets/uclookup/Customer/lookupJobPosition.json";
    this.jobPositionLookupObj.pagingJson = "./assets/uclookup/Customer/lookupJobPosition.json";
    this.jobPositionLookupObj.genericJson = "./assets/uclookup/Customer/lookupJobPosition.json";
  }
  //#endregion

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  initDdlRefMaster(refMasterTypeCode: string, mappingCode: string = null, isSelectOutput: boolean = false) {
    let tempDdlObj: UcDropdownListObj = new UcDropdownListObj();
    let refMasterObj: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: refMasterTypeCode,
      MappingCode: mappingCode
    };
    tempDdlObj.apiUrl = URLConstant.GetListActiveRefMaster;
    tempDdlObj.requestObj = refMasterObj;
    tempDdlObj.customObjName = CommonConstant.ReturnObj;
    tempDdlObj.ddlType = UcDropdownListConstant.DDL_TYPE_ONE;
    tempDdlObj.isSelectOutput = isSelectOutput;
    tempDdlObj.isReady = true;
    this.DictUcDDLObj[refMasterTypeCode] = tempDdlObj;
  }
  //#endregion

  tempCustPersonalJobDataObj: CustPersonalJobDataObj = new CustPersonalJobDataObj();
  async GetExisting() {
    this.http.post(URLConstant.GetCustByCustId, { Id: this.CustId }).subscribe(
      async (response: CustObj) => {
        console.log(response);
        this.CustomerJobForm.patchValue({
          MrCustModelCode: response.MrCustModelCode,
        });
        this.changeCustModel();
      }
    )
    await this.http.post(URLConstant.GetCustPersonalJobDataByCustId, { Id: this.CustId }).toPromise().then(
      async (response: CustPersonalJobDataObj) => {
        console.log(response);
        this.tempCustPersonalJobDataObj = response;

        if (response.CustPersonalJobDataId != 0) {
          this.CustomerJobForm.patchValue({
            IsWellknownCoy: response.IsWellknownCoy == null ? false: response.IsWellknownCoy,
            IsMfEmp: response.IsMfEmp == null ? false: response.IsMfEmp,
            ProfessionalNo: response.ProfessionalNo,
            JobTitleName: response.JobTitleName,
            MrJobStatCode: response.MrJobStatCode,
            MrCoyScaleCode: response.MrCoyScaleCode,
            MrJobPositionCode: response.MrJobPositionCode,
            NoOfEmploy: response.NoOfEmploy,
            EmploymentEstablishmentDt: response.EmploymentEstablishmentDt,
            MrWellknownCoyCode: response.MrWellknownCoyCode,
          });
          this.companyLookupObj.nameSelect = this.tempCustPersonalJobDataObj.CoyName;
          this.companyLookupObj.jsonSelect = { Descr: this.tempCustPersonalJobDataObj.CoyName };

          if (response.RefProfessionId != null) {
            if (!response.RefProfessionId) return;
            this.CustomerJobForm.patchValue({
              RefProfessionId: response.RefProfessionId,
            });
            this.http.post(URLConstant.GetRefProfessionByRefProfessionId, { Id: response.RefProfessionId }).subscribe(
              (response: RefProfessionObj) => {
                this.professionLookUpObj.nameSelect = response.ProfessionName;
                this.professionLookUpObj.jsonSelect = response;
              });
          }

          if (response.RefIndustryTypeId != null) {
            if (!response.RefIndustryTypeId) return;
            this.CustomerJobForm.patchValue({
              RefIndustryTypeId: response.RefIndustryTypeId,
            });
            this.http.post(URLConstant.GetRefIndustryTypeById, { Id: response.RefIndustryTypeId }).subscribe(
              (response: RefIndustryTypeObj) => {
                this.industryLookUpObj.nameSelect = response.IndustryTypeName;
                this.industryLookUpObj.jsonSelect = response;
              }
            );
          }

          this.CustomerJobForm.patchValue({
            MrJobPositionCode: response.MrJobPositionCode,
          });
          let tempDesc: string = await this.PatchValueDesc(response.MrJobPositionCode, CommonConstant.RefMasterTypeCodeJobPosition);
          this.jobPositionLookupObj.nameSelect = tempDesc;
          this.jobPositionLookupObj.jsonSelect = { JobDesc: tempDesc };
        }
      }
    );
  }

  async PatchValueDesc(MasterCode: string, refMasterTypeCode: string) {
    let reqMasterObj: ReqRefMasterByTypeCodeAndMasterCodeObj = {
      MasterCode: MasterCode,
      RefMasterTypeCode: refMasterTypeCode
    };
    let tempDesc: string = "";
    await this.http.post(URLConstant.GetRefMasterByRefMasterTypeCodeAndMasterCode, reqMasterObj).toPromise().then(
      (response: RefMasterObj) => {
        tempDesc = response.Descr;
      }
    );
    return tempDesc;
  }

  //#region Change
  dictIsShow: { [Id: string]: boolean } = {};
  changeCustModel() {
    let tempCustModel: string = this.CustomerJobForm.get("MrCustModelCode").value;
    console.log(tempCustModel);

    let tempForm: FormGroup = this.CustomerJobForm as FormGroup;
    this.ClearValidatorAllForm(tempForm);
    switch (tempCustModel) {
      case this.CUST_MODEL_EMP:
        this.requiredInEmp(tempForm);
        this.CheckRequiredCompanyName();
        break;
      case this.CUST_MODEL_SME:
        this.requiredInSme(tempForm);
        this.CheckRequiredCompanyName();
        break;
      case this.CUST_MODEL_PROF:
        this.requiredInProf();
        break;
      case this.CUST_MODEL_NONPROF:
        this.requiredInNonProf(tempForm);
        break;
    }
    tempForm.get("MrWellknownCoyCode").updateValueAndValidity();
    tempForm.get("RefIndustryTypeId").updateValueAndValidity();
    tempForm.get("EmploymentEstablishmentDt").updateValueAndValidity();
    tempForm.get("MrCoyScaleCode").updateValueAndValidity();
    tempForm.get("MrInvestmentTypeCode").updateValueAndValidity();
  }

  //#region change validator
  CheckRequiredCompanyName() {
    let tempCustModel: string = this.CustomerJobForm.get("MrCustModelCode").value;
    let tempIsWellknownCoy: boolean = this.CustomerJobForm.get("IsWellknownCoy").value;

    if (tempIsWellknownCoy) {
      if (tempCustModel == this.CUST_MODEL_EMP || tempCustModel == this.CUST_MODEL_SME) {
        this.companyLookupObj.isRequired = true;
        return;
      }
    }
    this.companyLookupObj.isRequired = false;
  }

  ClearValidatorAllForm(tempForm: FormGroup) {
    this.dictIsShow["RefIndustryTypeId"] = true;
    this.dictIsShow["JobTitleName"] = true;
    this.dictIsShow["IsShowJobAddr"] = true;

    this.dictIsShow["MrJobStatCode"] = false;
    this.dictIsShow["IsWellknownCoy"] = false;
    this.dictIsShow["MrJobPositionCode"] = false;
    this.dictIsShow["IsMfEmp"] = false;
    this.dictIsShow["NoOfEmploy"] = false;
    this.dictIsShow["MrWellknownCoyCode"] = false;
    this.dictIsShow["EmploymentEstablishmentDt"] = false;
    this.dictIsShow["MrCoyScaleCode"] = false;
    this.dictIsShow["MrInvestmentTypeCode"] = false;
    this.dictIsShow["ProfessionalNo"] = false;

    tempForm.get("MrWellknownCoyCode").clearValidators();
    tempForm.get("EmploymentEstablishmentDt").clearValidators();
    tempForm.get("MrCoyScaleCode").clearValidators();
    tempForm.get("MrInvestmentTypeCode").clearValidators();
    tempForm.get("RefIndustryTypeId").setValidators(Validators.required);
  }

  requiredInEmp(tempForm: FormGroup) {
    tempForm.get("MrWellknownCoyCode").setValidators(Validators.required);
    tempForm.get("EmploymentEstablishmentDt").setValidators(Validators.required);
    tempForm.get("MrCoyScaleCode").setValidators(Validators.required);
    this.dictIsShow["MrWellknownCoyCode"] = true;
    this.dictIsShow["MrCoyScaleCode"] = true;
    this.dictIsShow["EmploymentEstablishmentDt"] = true;
    this.dictIsShow["NoOfEmploy"] = true;
    this.dictIsShow["IsMfEmp"] = true;
    this.dictIsShow["MrJobPositionCode"] = true;
    this.dictIsShow["IsWellknownCoy"] = true;
    this.dictIsShow["MrJobStatCode"] = true;
  }
  requiredInSme(tempForm: FormGroup) {
    tempForm.get("MrWellknownCoyCode").setValidators(Validators.required);
    tempForm.get("MrCoyScaleCode").setValidators(Validators.required);
    tempForm.get("MrInvestmentTypeCode").setValidators(Validators.required);
    this.dictIsShow["MrWellknownCoyCode"] = true;
    this.dictIsShow["MrCoyScaleCode"] = true;
    this.dictIsShow["MrInvestmentTypeCode"] = true;
    this.dictIsShow["NoOfEmploy"] = true;
    this.dictIsShow["MrJobPositionCode"] = true;
    this.dictIsShow["IsWellknownCoy"] = true;
  }
  requiredInProf() {
    this.dictIsShow["ProfessionalNo"] = true;
  }
  requiredInNonProf(tempForm: FormGroup) {
    tempForm.get("RefIndustryTypeId").clearValidators();
    this.dictIsShow["RefIndustryTypeId"] = false;
    this.dictIsShow["JobTitleName"] = false;
    this.dictIsShow["IsShowJobAddr"] = false;
  }
  //#endregion

  getLookUpProfession(event) {
    this.CustomerJobForm.patchValue({
      RefProfessionId: event.RefProfessionId,
    });
  }

  getLookUpIndustryType(event) {
    console.log(event);
    this.CustomerJobForm.patchValue({
      RefIndustryTypeId: event.RefIndustryTypeId,
    });
  }

  getLookUpJobPosition(ev) {
    this.CustomerJobForm.patchValue({
      MrJobPositionCode: ev.JobCode,
    });
  }

  getLookUpCompanyName(ev: RefMasterObj) {
    console.log(ev);

    this.CustomerJobForm.patchValue({
      MrWellknownCoyCode: ev.MasterCode,
    });
  }
  //#endregion

  SaveForm() {
    let tempForm = this.CustomerJobForm.getRawValue();
    console.log(tempForm);
    // this.outputTab.emit({ stepMode: 'next' });
  }

  getFormValidationErrors() {
    const invalid = [];
    const controls = this.CustomerJobForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
        console.log(name);
      }
    }
    console.log(invalid);
  }
}
