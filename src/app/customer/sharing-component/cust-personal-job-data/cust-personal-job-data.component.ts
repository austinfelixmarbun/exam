import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustPersonalJobDataObj } from 'app/shared/model/CustPersonalJobDataObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { RefIndustryTypeObj } from 'app/shared/model/RefIndustryTypeObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMasterCodeObj.Model';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { RefProfessionObj } from 'app/shared/model/RefProfessionObj.Model';
import { RequestCustPersonalJobDataObj } from 'app/shared/model/RequestCustPersonalJobDataObj.Model';
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
  DictCustAddr: { [Id: string]: CustAddrObj } = {};

  readonly RefMasterTypeCodeJobPosition: string = CommonConstant.RefMasterTypeCodeJobPosition;
  readonly RefMasterTypeCodeJobStat: string = CommonConstant.RefMasterTypeCodeJobStat;
  readonly RefMasterTypeCodeCoyScale: string = CommonConstant.RefMasterTypeCodeCoyScale;
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel; //mapping code CommonConstant.CustTypePersonal
  readonly RefMasterTypeCodeInvestmentType: string = CommonConstant.RefMasterTypeCodeInvestmentType;

  readonly CustAddrTypeJob: string = CommonConstant.CustAddrTypeJob;
  readonly CustAddrTypeOthBiz: string = CommonConstant.CustAddrTypeOthBiz;
  readonly CustAddrTypePreJob: string = CommonConstant.CustAddrTypePreJob;

  readonly CUST_MODEL_EMP: string = CommonConstant.CUST_MODEL_EMP;
  readonly CUST_MODEL_PROF: string = CommonConstant.CUST_MODEL_PROF;
  readonly CUST_MODEL_SME: string = CommonConstant.CUST_MODEL_SME;
  readonly CUST_MODEL_NONPROF: string = CommonConstant.CUST_MODEL_NONPROF;

  constructor(private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService, private cookieService: CookieService) { }

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
        if (response.CustPersonalJobDataId != 0) {
          this.tempCustPersonalJobDataObj = response;
          let datePipe = new DatePipe("en-US");
          this.CustomerJobForm.patchValue({
            IsWellknownCoy: response.IsWellknownCoy == null ? false : response.IsWellknownCoy,
            IsMfEmp: response.IsMfEmp == null ? false : response.IsMfEmp,
            ProfessionalNo: response.ProfessionalNo,
            JobTitleName: response.JobTitleName,
            MrJobStatCode: response.MrJobStatCode,
            MrCoyScaleCode: response.MrCoyScaleCode,
            MrJobPositionCode: response.MrJobPositionCode,
            NoOfEmploy: response.NoOfEmploy,
            EmploymentEstablishmentDt: datePipe.transform(response.EmploymentEstablishmentDt, 'yyyy-MM-dd'),
            MrWellknownCoyCode: response.MrWellknownCoyCode,
            CoyName: response.CoyName,
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
    tempForm.get("RefIndustryTypeId").updateValueAndValidity();
    tempForm.get("EmploymentEstablishmentDt").updateValueAndValidity();
    tempForm.get("MrCoyScaleCode").updateValueAndValidity();
    tempForm.get("MrInvestmentTypeCode").updateValueAndValidity();
  }

  //#region change validator
  CheckRequiredCompanyName() {
    let tempCustModel: string = this.CustomerJobForm.get("MrCustModelCode").value;
    let tempMrWellknownCoyCode = this.CustomerJobForm.get("MrWellknownCoyCode");
    let tempCoyName = this.CustomerJobForm.get("CoyName");
    let tempIsWellknownCoy: boolean = this.CustomerJobForm.get("IsWellknownCoy").value;

    if (tempIsWellknownCoy) {
      if (tempCustModel == this.CUST_MODEL_EMP || tempCustModel == this.CUST_MODEL_SME) {
        this.companyLookupObj.isRequired = true;
        tempMrWellknownCoyCode.setValidators(Validators.required);
        tempCoyName.setValidators(Validators.required);
        tempMrWellknownCoyCode.updateValueAndValidity();
        tempCoyName.updateValueAndValidity();
        return;
      }
    }
    tempMrWellknownCoyCode.patchValue("");
    tempMrWellknownCoyCode.clearValidators();
    tempCoyName.clearValidators();
    this.companyLookupObj.isRequired = false;
    tempMrWellknownCoyCode.updateValueAndValidity();
    tempCoyName.updateValueAndValidity();
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
      CoyName: ev.Descr,
    });
  }
  //#endregion

  SaveForm() {
    console.log(this.CustomerJobForm);
    let tempCustModel: string = this.CustomerJobForm.get("MrCustModelCode").value;
    let reqObjSave: RequestCustPersonalJobDataObj = new RequestCustPersonalJobDataObj();
    reqObjSave.CustPersonalJobData = this.SetReqObjPersonalJobSave(tempCustModel);

    if (tempCustModel != this.CUST_MODEL_NONPROF) {
      reqObjSave.JobAddr = this.SetAddrObj(this.CustAddrTypeJob);
      reqObjSave.OthBizAddr = this.SetAddrObj(this.CustAddrTypeOthBiz);
      reqObjSave.PreJobAddr = this.SetAddrObj(this.CustAddrTypePreJob);
    }
    console.log(reqObjSave);
    let urlSave: string = URLConstant.AddCustPersonalJobData;
    if (this.tempCustPersonalJobDataObj.CustPersonalJobDataId != 0) urlSave = URLConstant.EditCustPersonalJobData;
    this.http.post(urlSave, reqObjSave).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        this.outputTab.emit({ stepMode: "next" });
      }
    );
  }

  SetReqObjPersonalJobSave(CustModel: string): CustPersonalJobDataObj {
    let tempForm = this.CustomerJobForm.getRawValue();
    console.log(tempForm);
    let tempPersonalJob: CustPersonalJobDataObj = new CustPersonalJobDataObj();
    tempPersonalJob.CustPersonalJobDataId = this.tempCustPersonalJobDataObj.CustPersonalJobDataId;
    tempPersonalJob.RowVersion = this.tempCustPersonalJobDataObj.RowVersion;
    tempPersonalJob.CustId = this.CustId;
    tempPersonalJob.RefProfessionId = tempForm["RefProfessionId"];
    if (CustModel != this.CUST_MODEL_NONPROF) {
      tempPersonalJob.RefIndustryTypeId = tempForm["RefIndustryTypeId"];
      tempPersonalJob.JobTitleName = tempForm["JobTitleName"];
      tempPersonalJob.PrevCoyName = tempForm["PrevCoyName"];
      tempPersonalJob.PrevEmploymentDt = tempForm["PrevEmploymentDt"];
      tempPersonalJob.OthBizName = tempForm["OthBizName"];
      tempPersonalJob.OthBizIndustryTypeCode = tempForm["OthBizIndustryTypeCode"];
      tempPersonalJob.OthBizEstablishmentDt = tempForm["OthBizEstablishmentDt"];
      tempPersonalJob.OthBizType = tempForm["OthBizType"];
      tempPersonalJob.OthBizJobPosition = tempForm["OthBizJobPosition"];

      if (CustModel == this.CUST_MODEL_PROF) {
        tempPersonalJob.ProfessionalNo = tempForm["ProfessionalNo"];
      } else {
        tempPersonalJob.IsWellknownCoy = tempForm["IsWellknownCoy"];
        tempPersonalJob.MrWellknownCoyCode = tempForm["MrWellknownCoyCode"];
        tempPersonalJob.CoyName = tempForm["CoyName"];
        tempPersonalJob.MrJobPositionCode = tempForm["MrJobPositionCode"];
        tempPersonalJob.MrCoyScaleCode = tempForm["MrCoyScaleCode"];
        tempPersonalJob.NoOfEmploy = tempForm["NoOfEmploy"];

        if (CustModel == this.CUST_MODEL_SME) {
          tempPersonalJob.MrInvestmentTypeCode = tempForm["MrInvestmentTypeCode"];
        }
        if (CustModel == this.CUST_MODEL_EMP) {
          tempPersonalJob.EmploymentEstablishmentDt = tempForm["EmploymentEstablishmentDt"];
          tempPersonalJob.MrJobStatCode = tempForm["MrJobStatCode"];
          tempPersonalJob.IsMfEmp = tempForm["IsMfEmp"];
        }
      }
    }
    return tempPersonalJob;
  }

  SetAddrObj(addrTypeCode: string): CustAddrObj {
    let tempAddrObj: CustAddrObj = new CustAddrObj();
    let tempJobForm = this.CustomerJobForm.get(addrTypeCode + 'UcAddress') as FormGroup;
    let tempJobZipCodeForm = this.CustomerJobForm.get(addrTypeCode + 'UcAddressZipcode') as FormGroup;
    let tempJobValue = tempJobForm.getRawValue();
    let tempJobZipCodeValue = tempJobZipCodeForm.getRawValue();
    tempAddrObj.CustAddrId = this.DictCustAddr[addrTypeCode].CustAddrId;
    tempAddrObj.CustId = this.CustId;
    tempAddrObj.RowVersion = this.DictCustAddr[addrTypeCode].RowVersion;
    tempAddrObj.MrCustAddrTypeCode = addrTypeCode;
    tempAddrObj.Addr = tempJobValue.Addr;
    tempAddrObj.FullAddr = tempJobValue.Addr + " RT: " + tempJobValue.AreaCode4 + " RW: " + tempJobValue.AreaCode3 + " " + tempJobValue.AreaCode2 + ", " + tempJobValue.AreaCode1 + " " + tempJobZipCodeValue.value;
    tempAddrObj.AreaCode3 = tempJobValue.AreaCode3;
    tempAddrObj.AreaCode4 = tempJobValue.AreaCode4;
    tempAddrObj.Zipcode = tempJobZipCodeValue.value;
    tempAddrObj.AreaCode1 = tempJobValue.AreaCode1;
    tempAddrObj.AreaCode2 = tempJobValue.AreaCode2;
    tempAddrObj.City = tempJobValue.City;
    tempAddrObj.PhnArea1 = tempJobValue.PhnArea1;
    tempAddrObj.Phn1 = tempJobValue.Phn1;
    tempAddrObj.PhnExt1 = tempJobValue.PhnExt1;
    tempAddrObj.PhnArea2 = tempJobValue.PhnArea2;
    tempAddrObj.Phn2 = tempJobValue.Phn2;
    tempAddrObj.PhnExt2 = tempJobValue.PhnExt2;
    tempAddrObj.PhnArea3 = tempJobValue.PhnArea3;
    tempAddrObj.Phn3 = tempJobValue.Phn3;
    tempAddrObj.PhnExt3 = tempJobValue.PhnExt3;
    tempAddrObj.FaxArea = tempJobValue.FaxArea;
    tempAddrObj.Fax = tempJobValue.Fax;
    tempAddrObj.MrBuildingOwnershipCode = tempJobValue.MrHouseOwnershipCode;
    
    return tempAddrObj
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
