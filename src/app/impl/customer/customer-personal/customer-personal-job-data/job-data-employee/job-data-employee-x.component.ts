import {DatePipe, formatDate} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NGXToastrService} from 'app/components/extra/toastr/toastr.service';
import {URLConstantX} from 'app/impl/shared/constant/URLConstantX';
import {AdInsHelper} from 'app/shared/AdInsHelper';
import {AdInsConstant} from 'app/shared/AdInstConstant';
import {CommonConstant} from 'app/shared/constant/CommonConstant';
import {CookieService} from 'ngx-cookie';
import {CustObj} from 'app/shared/model/cust-obj.model';
import {CustAddrObj} from 'app/shared/model/cust-addr-obj.model';
import {InputFieldObj} from 'app/shared/model/input-field-obj.model';
import {ReqRefMasterByTypeCodeAndMappingCodeObj} from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import {InputLookupObj} from 'app/shared/model/input-lookup-obj.model';
import {CustPersonalJobDataObj} from 'app/shared/model/cust-personal-job-data-obj.model';
import {RequestCustPersonalJobDataObj} from 'app/shared/model/request-cust-personal-job-data-obj.model';
import {CriteriaObj} from 'app/shared/model/criteria-obj.model';
import {InputAddressObj} from 'app/shared/model/input-address-obj.model';
import {URLConstant} from 'app/shared/constant/URLConstant';
import {GenericObj} from 'app/shared/model/Generic/generic-obj.model';
import {NewCustSetData} from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { AddressService } from 'app/shared/services/custAddr.service';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-job-data-employee-x',
  templateUrl: './job-data-employee-x.component.html'
})

export class JobDataEmployeeXComponent implements OnInit {
  @Input() IsReset: boolean = false;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  jobAddrId: number;
  othBizAddrId: number;
  preJobAddrId: number;
  jobDataId: any;
  rowVersion: any;
  typePage: string;
  IdCust: number;
  IdCustPersonal: number;
  custObj: any;
  objCust: CustObj;
  jobAddressObj: CustAddrObj;
  otherAddressObj: CustAddrObj;
  preJobAddressObj: CustAddrObj;
  inputJobAddressObj: InputFieldObj;
  inputOtherAddressObj: InputFieldObj;
  inputPreJobAddressObj: InputFieldObj;
  jobStatus: ReqRefMasterByTypeCodeAndMappingCodeObj;
  listJobStatus: any;
  jobPosition: ReqRefMasterByTypeCodeAndMappingCodeObj;
  listJobPosition: any;
  companyScale: ReqRefMasterByTypeCodeAndMappingCodeObj;
  listCompanyScale: any;
  tempProfession: number;
  tempRefIndustryType: any;
  tempRefSectorEconomySlik: any;
  professionLookUpObj: InputLookupObj;
  economicSectorSlikLookUpObj: InputLookupObj;
  companyLookupObj: InputLookupObj;
  inputLookupCommodityObj: InputLookupObj;
  custPersonalJobDataObj: CustPersonalJobDataObj;
  returnCustJobDataObj: any;
  returnRefProfessionObj: any;
  reqCustPersonalJobDataObj: RequestCustPersonalJobDataObj;
  returnSectorEconomySlikObj: any;
  custJobAddrObj: CustAddrObj;
  custOthBizAddrObj: CustAddrObj;
  getJobAddr: any;
  getOthBizAddr: any;
  getPreJobAddr: any;
  addressObj: CustAddrObj;
  otherAddrObj: CustAddrObj;
  preJobAddrObj: CustAddrObj;
  IsWellknownCoy: boolean = false;
  ArrAddCritCoy: Array<CriteriaObj> = new Array<CriteriaObj>();
  EconomicSectorName: string;
  IndustryTypeCategoryName: string;
  IndustryTypeName: string;
  IsShowData: boolean = false;

  JobDataEmpForm = this.fb.group({
    JobDataType: [''],
    ProfessionName: [''],
    JobPosition: [''],
    JobTitleName: [''],
    JobStatus: [''],
    IndustryName: ['', [Validators.required, Validators.minLength(2)]],
    InternalEmployee: [false],
    IsWellknownCoy: [false],
    MrWellknownCoyCode: [''],
    IndustryTypeName: [''],
    CompanyScale: [''],
    EmpEstablishmentDate: [''],
    NotesJob: [''],
    LocationClass: [''],
    PriceEstimates: [''],
    StayLength: [''],
    OtherBusinessName: [''],
    OtherBusinessType: [''],
    OtherBusinessIndustry: [''],
    OtherJobPosition: [''],
    EstablishmentDate: [''],
    NotesOther: [''],
    OtherLocationClass: [''],
    OtherPriceEstimates: [''],
    OtherStayLength: [''],
    PreviIndustryName: [''],
    PreviEmploymentDate: [''],
    NotesPreJob: [''],
    NoOfEmploy: [''],
    CommodityCode: ['']
  });

  inputAddressObj: InputAddressObj;
  inputPreviousAddressObj: InputAddressObj;
  inputOthBizAddressObj: InputAddressObj;
  listAddrRequiredOwnership: Array<string> = new Array();
  isReady: boolean = false;
  UserAccess: CurrentUserContext;
  MaxDate: Date;
  MaxDtValidate: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private toastr: NGXToastrService,
              private fb: FormBuilder,
              private cookieService: CookieService,
              private addressService: AddressService) {

    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      if (params["IdCustPersonal"] != null) {
        this.IdCustPersonal = params["IdCustPersonal"];
      }
    });
  }

  getLookUpProfession(event) {
    this.tempProfession = event.RefProfessionId;
  }

  getLookUpEconomicSectorSlik(event) {
    this.tempRefSectorEconomySlik = event.RefSectorEconomySlikXId;
    this.tempRefIndustryType = event.RefIndustryTypeId;
    this.IndustryTypeCategoryName = event.RefIndustryTypeCategoryName;
    this.EconomicSectorName = event.EconomicSectorName;
    this.IndustryTypeName = event.IndustryTypeName;
    this.IsShowData = true;
  }

  async ngOnInit() {
    await this.getAddrTypeOwnershipRequired();

    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Job Address";

    this.inputPreviousAddressObj = new InputAddressObj();
    this.inputPreviousAddressObj.showSubsection = false;
    this.inputPreviousAddressObj.title = "Previous Job Address";
    this.inputPreviousAddressObj.showOwnership = true;
    this.inputPreviousAddressObj.requiredOwnership = this.setOwnership(CommonConstant.CustAddrTypePreJob);
    this.inputPreviousAddressObj.isRequired = false;

    this.inputOthBizAddressObj = new InputAddressObj();
    this.inputOthBizAddressObj.showSubsection = false;
    this.inputOthBizAddressObj.isRequired = false;
    this.inputOthBizAddressObj.title = "Other Business Address";
    this.inputOthBizAddressObj.showOwnership = true;
    this.inputOthBizAddressObj.requiredOwnership = this.setOwnership(CommonConstant.CustAddrTypeOthBiz);

    this.UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));

    var datePipe = new DatePipe("en-US");
    this.MaxDate = new Date(this.UserAccess.BusinessDt);
    this.MaxDate.setDate(this.MaxDate.getDate() - 1);
    this.MaxDtValidate = datePipe.transform(this.MaxDate, "yyyy-MM-dd");

    this.inputJobAddressObj = new InputFieldObj();
    this.inputJobAddressObj.inputLookupObj = new InputLookupObj();

    this.inputOtherAddressObj = new InputFieldObj();
    this.inputOtherAddressObj.inputLookupObj = new InputLookupObj();
    this.inputOtherAddressObj.inputLookupObj.isRequired = false;
    this.inputOthBizAddressObj.inputField = this.inputOtherAddressObj;

    this.inputPreJobAddressObj = new InputFieldObj();
    this.inputPreJobAddressObj.inputLookupObj = new InputLookupObj();
    this.inputPreJobAddressObj.inputLookupObj.isRequired = false;
    this.inputPreviousAddressObj.inputField = this.inputPreJobAddressObj;

    this.professionLookUpObj = new InputLookupObj();
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";

    let listCriteriaObj: Array<CriteriaObj> = new Array();
    let criteriaCustObj = new CriteriaObj();
    criteriaCustObj.DataType = "text";
    criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
    criteriaCustObj.propName = 'MR_CUST_MODEL_CODE';
    criteriaCustObj.value = CommonConstant.CUST_MODEL_EMP;
    listCriteriaObj.push(criteriaCustObj);
    this.professionLookUpObj.addCritInput = listCriteriaObj;

    this.economicSectorSlikLookUpObj = new InputLookupObj();
    this.economicSectorSlikLookUpObj.urlJson = "./assets/lookup/lookupRefSectorEconomySlikX.json";
    this.economicSectorSlikLookUpObj.pagingJson = "./assets/lookup/lookupRefSectorEconomySlikX.json";
    this.economicSectorSlikLookUpObj.genericJson = "./assets/lookup/lookupRefSectorEconomySlikX.json";

    this.companyLookupObj = new InputLookupObj();
    this.companyLookupObj.urlJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.pagingJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.genericJson = "./assets/uclookup/Customer/lookupCompany.json";
    this.companyLookupObj.isRequired = false;


    //Lookup Commodity
    this.inputLookupCommodityObj = new InputLookupObj();
    this.inputLookupCommodityObj.urlJson = "./assets/impl/uclookup/lookupCommodity.json";
    this.inputLookupCommodityObj.pagingJson = "./assets/impl/uclookup/lookupCommodity.json";
    this.inputLookupCommodityObj.genericJson = "./assets/impl/uclookup/lookupCommodity.json";
    this.inputLookupCommodityObj.isRequired = true;


    this.companyLookupObj.addCritInput = new Array();
    this.ArrAddCritCoy = new Array<CriteriaObj>();
    let critCoyObj = new CriteriaObj();
    critCoyObj.DataType = "text";
    critCoyObj.propName = 'REF_MASTER_TYPE_CODE';
    critCoyObj.restriction = AdInsConstant.RestrictionEq;
    critCoyObj.value = "WELLKNOWN_COY";
    this.ArrAddCritCoy.push(critCoyObj);
    let critCoyObj1 = new CriteriaObj();
    critCoyObj1.DataType = "text";
    critCoyObj1.propName = 'IS_ACTIVE';
    critCoyObj1.restriction = AdInsConstant.RestrictionEq;
    critCoyObj1.value = "1";
    this.ArrAddCritCoy.push(critCoyObj1);
    this.companyLookupObj.addCritInput = this.ArrAddCritCoy;
    this.companyLookupObj.isReady = true;

    this.jobPosition = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    this.jobPosition.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeJobPosition;
    this.http.post(URLConstant.GetListActiveRefMaster, this.jobPosition).toPromise().then(
      (response) => {
        this.listJobPosition = response[CommonConstant.ReturnObj];
        this.JobDataEmpForm.patchValue({ JobPosition: response[CommonConstant.ReturnObj][0]['Key'] });
      }
    );

    this.jobStatus = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    this.jobStatus.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeJobStat;
    this.http.post(URLConstant.GetListActiveRefMaster, this.jobStatus).toPromise().then(
      (response) => {
        this.listJobStatus = response[CommonConstant.ReturnObj];
        this.JobDataEmpForm.patchValue({ JobStatus: response[CommonConstant.ReturnObj][0]['Key'] });
      }
    );

    this.companyScale = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    this.companyScale.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCoyScale;
    this.http.post(URLConstant.GetListActiveRefMaster, this.companyScale).toPromise().then(
      (response) => {
        this.listCompanyScale = response[CommonConstant.ReturnObj];
        this.JobDataEmpForm.patchValue({ CompanyScale: response[CommonConstant.ReturnObj][0]['Key'] });
      }
    );

    this.objCust = new CustObj();
    this.objCust.CustId = this.IdCust;
    this.http.post(URLConstant.GetCustByCustId, { Id: this.IdCust }).toPromise().then(
      (response) => {
        this.custObj = response;
      }
    );

    await this.http.post(URLConstantX.GetCustPersonalJobDataByCustId, { Id: this.IdCust }).toPromise().then(
      (response: any) => {
        this.returnCustJobDataObj = response['responseCustPersonalJobDataObj'];
        this.tempRefSectorEconomySlik = response['RefSectorEconomySlikXId'];

        if (this.returnCustJobDataObj.CustPersonalJobDataId != 0) {
          this.JobDataEmpForm.patchValue({
            NoOfEmploy: this.returnCustJobDataObj.NoOfEmploy,
            JobPosition: this.returnCustJobDataObj.MrJobPositionCode,
            JobTitleName: this.returnCustJobDataObj.JobTitleName,
            JobStatus: this.returnCustJobDataObj.MrJobStatCode,
            IndustryName: this.returnCustJobDataObj.CoyName,
            InternalEmployee: this.returnCustJobDataObj.IsMfEmp,
            IsWellknownCoy: this.returnCustJobDataObj.IsWellknownCoy,
            MrWellknownCoyCode: this.returnCustJobDataObj.MrWellknownCoyCode,
            CompanyScale: this.returnCustJobDataObj.MrCoyScaleCode,
            EmpEstablishmentDate: this.returnCustJobDataObj.EmploymentEstablishmentDt != null ? formatDate(this.returnCustJobDataObj.EmploymentEstablishmentDt, 'yyyy-MM-dd', 'en-US') : "",
            OtherBusinessName: this.returnCustJobDataObj.OthBizName,
            OtherBusinessType: this.returnCustJobDataObj.OthBizType,
            OtherBusinessIndustry: this.returnCustJobDataObj.OthBizIndustryTypeCode,
            OtherJobPosition: this.returnCustJobDataObj.OthBizJobPosition,
            EstablishmentDate: this.returnCustJobDataObj.OthBizEstablishmentDt != null ? formatDate(this.returnCustJobDataObj.OthBizEstablishmentDt, 'yyyy-MM-dd', 'en-US') : "",
            PreviIndustryName: this.returnCustJobDataObj.PrevCoyName,
            PreviEmploymentDate: this.returnCustJobDataObj.PrevEmploymentDt != null ? formatDate(this.returnCustJobDataObj.PrevEmploymentDt, 'yyyy-MM-dd', 'en-US') : "",
          });
          this.IsWellknownCoy = this.returnCustJobDataObj.IsWellknownCoy;
          this.companyLookupObj.nameSelect = this.returnCustJobDataObj.CoyName;
          this.companyLookupObj.jsonSelect = { Descr: this.returnCustJobDataObj.CoyName };

          if (!this.IsReset) {
            if (this.returnCustJobDataObj.RefProfessionId != null) {
              this.http.post(URLConstant.GetRefProfessionById, { Id: this.returnCustJobDataObj.RefProfessionId }).toPromise().then(
                (response) => {
                  this.returnRefProfessionObj = response;
                  this.professionLookUpObj.nameSelect = this.returnRefProfessionObj.ProfessionName;
                  this.professionLookUpObj.jsonSelect = this.returnRefProfessionObj;
                  this.tempProfession = this.returnRefProfessionObj.RefProfessionId;
                }
              );
            }
          }

          if (this.returnCustJobDataObj.RefIndustryTypeId != null && this.tempRefSectorEconomySlik != null &&
            this.returnCustJobDataObj.RefIndustryTypeId != 0 && this.tempRefSectorEconomySlik != 0) {
            this.http.post(URLConstantX.GetRefSectorEconomySlikXById, { Id: this.tempRefSectorEconomySlik }).toPromise().then(
              (response) => {
                this.returnSectorEconomySlikObj = response;
                this.economicSectorSlikLookUpObj.nameSelect = this.returnSectorEconomySlikObj.SectorEconomySlikName;
                this.economicSectorSlikLookUpObj.jsonSelect = this.returnSectorEconomySlikObj;
                this.tempRefIndustryType = this.returnSectorEconomySlikObj.RefIndustryTypeId;
              }
            );
          }

          let reqObj: GenericObj = new GenericObj();
          reqObj.Id = this.IdCust;
          reqObj.Code = CommonConstant.CustAddrTypeJob;
          this.http.post(URLConstant.GetCustAddrByMrCustAddrType, reqObj).toPromise().then(
            (response) => {
              this.getJobAddr = response;
              this.JobDataEmpForm.patchValue({
                NotesJob: this.getJobAddr.Notes
              });

              this.addressObj = new CustAddrObj();
              this.addressObj.CustAddrId = this.getJobAddr.CustAddrId;
              this.addressObj.Addr = this.getJobAddr.Addr;
              this.addressObj.AreaCode3 = this.getJobAddr.AreaCode3;
              this.addressObj.AreaCode4 = this.getJobAddr.AreaCode4;
              this.addressObj.AreaCode1 = this.getJobAddr.AreaCode1;
              this.addressObj.AreaCode2 = this.getJobAddr.AreaCode2;
              this.addressObj.City = this.getJobAddr.City;
              this.addressObj.PhnArea1 = this.getJobAddr.PhnArea1;
              this.addressObj.Phn1 = this.getJobAddr.Phn1;
              this.addressObj.PhnExt1 = this.getJobAddr.PhnExt1;
              this.addressObj.PhnArea2 = this.getJobAddr.PhnArea2;
              this.addressObj.Phn2 = this.getJobAddr.Phn2;
              this.addressObj.PhnExt2 = this.getJobAddr.PhnExt2;
              this.addressObj.PhnArea3 = this.getJobAddr.PhnArea3;
              this.addressObj.Phn3 = this.getJobAddr.Phn3;
              this.addressObj.PhnExt3 = this.getJobAddr.PhnExt3;
              this.addressObj.FaxArea = this.getJobAddr.FaxArea;
              this.addressObj.Fax = this.getJobAddr.Fax;
              this.addressObj.MrHouseOwnershipCode = this.getJobAddr.MrBuildingOwnershipCode;
              this.addressObj.RowVersion = this.getJobAddr.RowVersion;

              this.inputJobAddressObj = new InputFieldObj();
              this.inputJobAddressObj.inputLookupObj = new InputLookupObj();
              this.inputJobAddressObj.inputLookupObj.nameSelect = this.getJobAddr.Zipcode;
              this.inputJobAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.getJobAddr.Zipcode };
              this.inputAddressObj.inputField = this.inputJobAddressObj;
              this.inputAddressObj.default = this.addressObj;
            }
          );

          reqObj.Code = CommonConstant.CustAddrTypeOthBiz;
          this.http.post(URLConstant.GetCustAddrByMrCustAddrType, reqObj).toPromise().then(
            (response) => {
              this.getOthBizAddr = response;
              this.JobDataEmpForm.patchValue({
                NotesOther: this.getOthBizAddr.Notes
              });

              this.otherAddrObj = new CustAddrObj();
              this.otherAddrObj.Addr = this.getOthBizAddr.Addr;
              this.otherAddrObj.AreaCode3 = this.getOthBizAddr.AreaCode3;
              this.otherAddrObj.AreaCode4 = this.getOthBizAddr.AreaCode4;
              this.otherAddrObj.AreaCode1 = this.getOthBizAddr.AreaCode1;
              this.otherAddrObj.AreaCode2 = this.getOthBizAddr.AreaCode2;
              this.otherAddrObj.City = this.getOthBizAddr.City;
              this.otherAddrObj.PhnArea1 = this.getOthBizAddr.PhnArea1;
              this.otherAddrObj.Phn1 = this.getOthBizAddr.Phn1;
              this.otherAddrObj.PhnExt1 = this.getOthBizAddr.PhnExt1;
              this.otherAddrObj.PhnArea2 = this.getOthBizAddr.PhnArea2;
              this.otherAddrObj.Phn2 = this.getOthBizAddr.Phn2;
              this.otherAddrObj.PhnExt2 = this.getOthBizAddr.PhnExt2;
              this.otherAddrObj.PhnArea3 = this.getOthBizAddr.PhnArea3;
              this.otherAddrObj.Phn3 = this.getOthBizAddr.Phn3;
              this.otherAddrObj.PhnExt3 = this.getOthBizAddr.PhnExt3;
              this.otherAddrObj.FaxArea = this.getOthBizAddr.FaxArea;
              this.otherAddrObj.Fax = this.getOthBizAddr.Fax;
              this.otherAddrObj.MrHouseOwnershipCode = this.getOthBizAddr.MrBuildingOwnershipCode;

              this.inputOtherAddressObj = new InputFieldObj();
              this.inputOtherAddressObj.inputLookupObj = new InputLookupObj();
              this.inputOtherAddressObj.inputLookupObj.isRequired = false;
              this.inputOtherAddressObj.inputLookupObj.nameSelect = this.getOthBizAddr.Zipcode;
              this.inputOtherAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.getOthBizAddr.Zipcode };
              this.inputOtherAddressObj.inputLookupObj.isReadonly = false;
              this.inputOthBizAddressObj.default = this.otherAddrObj;
              this.inputOthBizAddressObj.inputField = this.inputOtherAddressObj;
            }
          );

          reqObj.Code = CommonConstant.CustAddrTypePreJob;
          this.http.post(URLConstant.GetCustAddrByMrCustAddrType, reqObj).toPromise().then(
            (response) => {
              this.getPreJobAddr = response;
              this.JobDataEmpForm.patchValue({
                NotesPreJob: this.getPreJobAddr.Notes
              });

              this.preJobAddrObj = new CustAddrObj();
              this.preJobAddrObj.Addr = this.getPreJobAddr.Addr;
              this.preJobAddrObj.AreaCode3 = this.getPreJobAddr.AreaCode3;
              this.preJobAddrObj.AreaCode4 = this.getPreJobAddr.AreaCode4;
              this.preJobAddrObj.AreaCode1 = this.getPreJobAddr.AreaCode1;
              this.preJobAddrObj.AreaCode2 = this.getPreJobAddr.AreaCode2;
              this.preJobAddrObj.City = this.getPreJobAddr.City;
              this.preJobAddrObj.PhnArea1 = this.getPreJobAddr.PhnArea1;
              this.preJobAddrObj.Phn1 = this.getPreJobAddr.Phn1;
              this.preJobAddrObj.PhnExt1 = this.getPreJobAddr.PhnExt1;
              this.preJobAddrObj.PhnArea2 = this.getPreJobAddr.PhnArea2;
              this.preJobAddrObj.Phn2 = this.getPreJobAddr.Phn2;
              this.preJobAddrObj.PhnExt2 = this.getPreJobAddr.PhnExt2;
              this.preJobAddrObj.PhnArea3 = this.getPreJobAddr.PhnArea3;
              this.preJobAddrObj.Phn3 = this.getPreJobAddr.Phn3;
              this.preJobAddrObj.PhnExt3 = this.getPreJobAddr.PhnExt3;
              this.preJobAddrObj.FaxArea = this.getPreJobAddr.FaxArea;
              this.preJobAddrObj.Fax = this.getPreJobAddr.Fax;
              this.preJobAddrObj.MrHouseOwnershipCode = this.getPreJobAddr.MrBuildingOwnershipCode;

              this.inputPreJobAddressObj = new InputFieldObj();
              this.inputPreJobAddressObj.inputLookupObj = new InputLookupObj();
              this.inputPreJobAddressObj.inputLookupObj.isRequired = false;
              this.inputPreJobAddressObj.inputLookupObj.nameSelect = this.getPreJobAddr.Zipcode;
              this.inputPreJobAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.getPreJobAddr.Zipcode };
              this.inputPreJobAddressObj.inputLookupObj.isReadonly = false;

              this.inputPreviousAddressObj.inputField = this.inputPreJobAddressObj;
              this.inputPreviousAddressObj.default = this.preJobAddrObj;
            }
          );

          if (this.returnCustJobDataObj.JobAddrId != 0 && this.returnCustJobDataObj.JobAddrId != null) {
            this.jobAddrId = this.returnCustJobDataObj.JobAddrId;
          }
          if (this.returnCustJobDataObj.OthBizAddrId != 0 && this.returnCustJobDataObj.OthBizAddrId != null) {
            this.othBizAddrId = this.returnCustJobDataObj.OthBizAddrId;
          }
          if (this.returnCustJobDataObj.PrevJobAddrId != 0 && this.returnCustJobDataObj.PrevJobAddrId != null) {
            this.preJobAddrId = this.returnCustJobDataObj.PrevJobAddrId;
          }
          this.rowVersion = this.returnCustJobDataObj.RowVersion;
          this.jobDataId = this.returnCustJobDataObj.CustPersonalJobDataId;
          this.typePage = "edit";
        }
      }
    );
    await this.getCustXData();
    this.isWellknownCoyChecked(this.JobDataEmpForm.controls.IsWellknownCoy.value);
    this.isReady = true;
  }

  async getCustXData() {
    await this.http.post(URLConstantX.GetCustXDataByCustId, { Id: this.IdCust }).toPromise().then(
      (response) => {
        if (response["CustXId"] != 0) {
          this.JobDataEmpForm.patchValue({
            CommodityCode: response["MrCommodityCode"]
          });
          this.inputLookupCommodityObj.nameSelect = response["CommodityName"];
          this.inputLookupCommodityObj.jsonSelect = { Descr: response["CommodityName"] };
        }
      }
    );
  }

  async getAddrTypeOwnershipRequired(){
    this.listAddrRequiredOwnership = await this.addressService.GetListAddrTypeOwnershipMandatory();
  }

  setOwnership(MrCustAddrTypeCode: string) : boolean {
    if(this.listAddrRequiredOwnership.find(addrType => addrType == MrCustAddrTypeCode)){
      return true;
    }
    return false;
  }

  setJobAddr() {
    this.jobAddressObj = new CustAddrObj;
    if (this.typePage == "edit") {
      this.jobAddressObj.CustAddrId = this.getJobAddr.CustAddrId;
      this.jobAddressObj.RowVersion = this.getJobAddr.RowVersion;
    }
    this.jobAddressObj.CustId = this.IdCust;
    this.jobAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeJob;
    this.jobAddressObj.Addr = this.JobDataEmpForm.controls["jobAddress"]["controls"].Addr.value;
    this.jobAddressObj.FullAddr = this.JobDataEmpForm.controls["jobAddress"]["controls"].Addr.value + " RT: " + this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode4.value + " RW: " + this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode3.value + " " + this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode2.value + ", " + this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode1.value + " " + this.JobDataEmpForm.controls["jobAddressZipcode"]["controls"].value.value;
    this.jobAddressObj.AreaCode3 = this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode3.value;
    this.jobAddressObj.AreaCode4 = this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode4.value;
    this.jobAddressObj.Zipcode = this.JobDataEmpForm.controls["jobAddressZipcode"]["controls"].value.value;
    this.jobAddressObj.AreaCode1 = this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode1.value;
    this.jobAddressObj.AreaCode2 = this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode2.value;
    this.jobAddressObj.City = this.JobDataEmpForm.controls["jobAddress"]["controls"].City.value;
    this.jobAddressObj.PhnArea1 = this.JobDataEmpForm.controls["jobAddress"]["controls"].PhnArea1.value;
    this.jobAddressObj.Phn1 = this.JobDataEmpForm.controls["jobAddress"]["controls"].Phn1.value;
    this.jobAddressObj.PhnExt1 = this.JobDataEmpForm.controls["jobAddress"]["controls"].PhnExt1.value;
    this.jobAddressObj.PhnArea2 = this.JobDataEmpForm.controls["jobAddress"]["controls"].PhnArea2.value;
    this.jobAddressObj.Phn2 = this.JobDataEmpForm.controls["jobAddress"]["controls"].Phn2.value;
    this.jobAddressObj.PhnExt2 = this.JobDataEmpForm.controls["jobAddress"]["controls"].PhnExt2.value;
    this.jobAddressObj.PhnArea3 = this.JobDataEmpForm.controls["jobAddress"]["controls"].PhnArea3.value;
    this.jobAddressObj.Phn3 = this.JobDataEmpForm.controls["jobAddress"]["controls"].Phn3.value;
    this.jobAddressObj.PhnExt3 = this.JobDataEmpForm.controls["jobAddress"]["controls"].PhnExt3.value;
    this.jobAddressObj.FaxArea = this.JobDataEmpForm.controls["jobAddress"]["controls"].FaxArea.value;
    this.jobAddressObj.Fax = this.JobDataEmpForm.controls["jobAddress"]["controls"].Fax.value;
    this.jobAddressObj.MrBuildingOwnershipCode = this.JobDataEmpForm.controls["jobAddress"]["controls"].MrHouseOwnershipCode.value;
    this.jobAddressObj.Notes = this.JobDataEmpForm.controls["NotesJob"].value;
  }

  setPreJobAddr() {
    this.preJobAddressObj = new CustAddrObj;
    if (!this.JobDataEmpForm.controls["prejobAddress"]["controls"].Addr.value) {
      this.preJobAddressObj = null;
      return;
    }
    this.preJobAddressObj.CustId = this.IdCust;
    this.preJobAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypePreJob;
    this.preJobAddressObj.Addr = this.JobDataEmpForm.controls["prejobAddress"]["controls"].Addr.value;
    this.preJobAddressObj.FullAddr = this.JobDataEmpForm.controls["prejobAddress"]["controls"].Addr.value + " RT: " + this.JobDataEmpForm.controls["prejobAddress"]["controls"].AreaCode4.value + " RW: " + this.JobDataEmpForm.controls["prejobAddress"]["controls"].AreaCode3.value + " " + this.JobDataEmpForm.controls["prejobAddress"]["controls"].AreaCode2.value + ", " + this.JobDataEmpForm.controls["prejobAddress"]["controls"].AreaCode1.value + " " + this.JobDataEmpForm.controls["prejobAddressZipcode"]["controls"].value.value;
    this.preJobAddressObj.AreaCode3 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].AreaCode3.value;
    this.preJobAddressObj.AreaCode4 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].AreaCode4.value;
    this.preJobAddressObj.Zipcode = this.JobDataEmpForm.controls["prejobAddressZipcode"]["controls"].value.value;
    this.preJobAddressObj.AreaCode1 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].AreaCode1.value;
    this.preJobAddressObj.AreaCode2 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].AreaCode2.value;
    this.preJobAddressObj.City = this.JobDataEmpForm.controls["prejobAddress"]["controls"].City.value;
    this.preJobAddressObj.PhnArea1 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].PhnArea1.value;
    this.preJobAddressObj.Phn1 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].Phn1.value;
    this.preJobAddressObj.PhnExt1 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].PhnExt1.value;
    this.preJobAddressObj.PhnArea2 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].PhnArea2.value;
    this.preJobAddressObj.Phn2 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].Phn2.value;
    this.preJobAddressObj.PhnExt2 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].PhnExt2.value;
    this.preJobAddressObj.PhnArea3 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].PhnArea3.value;
    this.preJobAddressObj.Phn3 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].Phn3.value;
    this.preJobAddressObj.PhnExt3 = this.JobDataEmpForm.controls["prejobAddress"]["controls"].PhnExt3.value;
    this.preJobAddressObj.FaxArea = this.JobDataEmpForm.controls["prejobAddress"]["controls"].FaxArea.value;
    this.preJobAddressObj.Fax = this.JobDataEmpForm.controls["prejobAddress"]["controls"].Fax.value;
    this.preJobAddressObj.MrBuildingOwnershipCode = this.JobDataEmpForm.controls["prejobAddress"]["controls"].MrHouseOwnershipCode.value;
    this.preJobAddressObj.Notes = this.JobDataEmpForm.controls["NotesPreJob"].value;
  }

  setOthBizAddr() {
    this.otherAddressObj = new CustAddrObj;
    if (!this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].Addr.value) {
      this.otherAddressObj = null;
      return;
    }
    this.otherAddressObj.CustId = this.IdCust;
    this.otherAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeOthBiz;
    this.otherAddressObj.Addr = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].Addr.value;
    this.otherAddressObj.FullAddr = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].Addr.value + " RT: " + this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].AreaCode4.value + " RW: " + this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].AreaCode3.value + " " + this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].AreaCode2.value + ", " + this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].AreaCode1.value + " " + this.JobDataEmpForm.controls["otherBusinessAddressZipcode"]["controls"].value.value;
    this.otherAddressObj.AreaCode3 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].AreaCode3.value;
    this.otherAddressObj.AreaCode4 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].AreaCode4.value;
    this.otherAddressObj.Zipcode = this.JobDataEmpForm.controls["otherBusinessAddressZipcode"]["controls"].value.value;
    this.otherAddressObj.AreaCode1 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].AreaCode1.value;
    this.otherAddressObj.AreaCode2 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].AreaCode2.value;
    this.otherAddressObj.City = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].City.value;
    this.otherAddressObj.PhnArea1 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].PhnArea1.value;
    this.otherAddressObj.Phn1 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].Phn1.value;
    this.otherAddressObj.PhnExt1 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].PhnExt1.value;
    this.otherAddressObj.PhnArea2 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].PhnArea2.value;
    this.otherAddressObj.Phn2 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].Phn2.value;
    this.otherAddressObj.PhnExt2 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].PhnExt2.value;
    this.otherAddressObj.PhnArea3 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].PhnArea3.value;
    this.otherAddressObj.Phn3 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].Phn3.value;
    this.otherAddressObj.PhnExt3 = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].PhnExt3.value;
    this.otherAddressObj.FaxArea = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].FaxArea.value;
    this.otherAddressObj.Fax = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].Fax.value;
    this.otherAddressObj.MrBuildingOwnershipCode = this.JobDataEmpForm.controls["otherBusinessAddress"]["controls"].MrHouseOwnershipCode.value;
    this.otherAddressObj.Notes = this.JobDataEmpForm.controls["NotesOther"].value;
  }

  setCustJobData() {
    this.custPersonalJobDataObj = new CustPersonalJobDataObj();
    this.custPersonalJobDataObj.CustId = this.IdCust;
    this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
    this.custPersonalJobDataObj.MrJobPositionCode = this.JobDataEmpForm.controls["JobPosition"].value;
    this.custPersonalJobDataObj.JobTitleName = this.JobDataEmpForm.controls["JobTitleName"].value;
    this.custPersonalJobDataObj.MrJobStatCode = this.JobDataEmpForm.controls["JobStatus"].value;
    this.custPersonalJobDataObj.CoyName = this.JobDataEmpForm.controls["IndustryName"].value;
    this.custPersonalJobDataObj.IsMfEmp = this.JobDataEmpForm.controls["InternalEmployee"].value;
    this.custPersonalJobDataObj.IsWellknownCoy = this.JobDataEmpForm.controls["IsWellknownCoy"].value;
    this.custPersonalJobDataObj.MrWellknownCoyCode = this.JobDataEmpForm.controls["MrWellknownCoyCode"].value;
    this.custPersonalJobDataObj.RefIndustryTypeId = this.tempRefIndustryType;
    this.custPersonalJobDataObj.NoOfEmploy = this.JobDataEmpForm.controls.NoOfEmploy.value;
    this.custPersonalJobDataObj.MrCoyScaleCode = this.JobDataEmpForm.controls["CompanyScale"].value;
    this.custPersonalJobDataObj.EmploymentEstablishmentDt = this.JobDataEmpForm.controls["EmpEstablishmentDate"].value;
    this.custPersonalJobDataObj.OthBizName = this.JobDataEmpForm.controls["OtherBusinessName"].value;
    this.custPersonalJobDataObj.OthBizType = this.JobDataEmpForm.controls["OtherBusinessType"].value;
    this.custPersonalJobDataObj.OthBizIndustryTypeCode = this.JobDataEmpForm.controls["OtherBusinessIndustry"].value;
    this.custPersonalJobDataObj.OthBizJobPosition = this.JobDataEmpForm.controls["OtherJobPosition"].value;
    this.custPersonalJobDataObj.OthBizEstablishmentDt = this.JobDataEmpForm.controls["EstablishmentDate"].value;
    this.custPersonalJobDataObj.PrevCoyName = this.JobDataEmpForm.controls["PreviIndustryName"].value;
    this.custPersonalJobDataObj.PrevEmploymentDt = this.JobDataEmpForm.controls["PreviEmploymentDate"].value;
  }

  async SaveForm(IsParent: boolean = false): Promise<boolean> {
    if (this.JobDataEmpForm.invalid) {
      NewCustSetData.markFormGroupTouched(this.JobDataEmpForm);
      return false;
    }
    if (this.typePage == "edit") {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.setCustJobData();
      this.custPersonalJobDataObj.OthBizAddrId = this.returnCustJobDataObj.OthBizAddrId;
      this.custPersonalJobDataObj.JobAddrId = this.returnCustJobDataObj.JobAddrId;
      this.custPersonalJobDataObj.CustPersonalJobDataId = this.returnCustJobDataObj.CustPersonalJobDataId;
      this.custPersonalJobDataObj.PrevJobAddrId = this.returnCustJobDataObj.PrevJobAddrId;
      this.custPersonalJobDataObj.RowVersion = this.rowVersion;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.setJobAddr();
      this.setOthBizAddr();
      this.setPreJobAddr();
      this.reqCustPersonalJobDataObj.JobAddr = this.jobAddressObj;
      this.reqCustPersonalJobDataObj.OthBizAddr = this.otherAddressObj;
      this.reqCustPersonalJobDataObj.PreJobAddr = this.preJobAddressObj;
      this.reqCustPersonalJobDataObj.CustPersonalJobData.MrCustModelCode = CommonConstant.CUST_MODEL_EMP;

      if(this.custPersonalJobDataObj.OthBizEstablishmentDt.toString() > this.MaxDtValidate){
        this.toastr.warningMessage(String.Format(ExceptionConstant.OTHER_BIZ_EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
        return false;
      }

      if(this.custPersonalJobDataObj.EmploymentEstablishmentDt.toString() > this.MaxDtValidate){
        this.toastr.warningMessage(String.Format(ExceptionConstant.EMP_EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
        return false;
      }

      let custXObj = {
        CustId: this.IdCust,
        MrCommodityCode: this.JobDataEmpForm.controls.CommodityCode.value,
      };

      let CustPersonalJobDataObjX = {
        CustId: this.IdCust,
        RefSectorEconomySlikXId: this.tempRefSectorEconomySlik
      }

      let reqObj = {
        CustPersonalJobDataObj: this.reqCustPersonalJobDataObj,
        CustPersonalJobDataObjX: CustPersonalJobDataObjX,
        CustXObj: custXObj
      }

      await this.http.post(URLConstantX.EditCustPersonalJobData, reqObj).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["message"]);
          if (!IsParent) this.outputTab.emit({ stepMode: "next" });
        }
      );
    }
    else {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.setCustJobData();
      this.setJobAddr();
      this.setOthBizAddr();
      this.setPreJobAddr();
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.JobAddr = this.jobAddressObj;
      this.reqCustPersonalJobDataObj.OthBizAddr = this.otherAddressObj;
      this.reqCustPersonalJobDataObj.PreJobAddr = this.preJobAddressObj;
      this.reqCustPersonalJobDataObj.CustPersonalJobData.MrCustModelCode = CommonConstant.CUST_MODEL_EMP;

      if(this.custPersonalJobDataObj.OthBizEstablishmentDt.toString() > this.MaxDtValidate){
        this.toastr.warningMessage(String.Format(ExceptionConstant.OTHER_BIZ_EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
        return false;
      }

      if(this.custPersonalJobDataObj.EmploymentEstablishmentDt.toString() > this.MaxDtValidate){
        this.toastr.warningMessage(String.Format(ExceptionConstant.EMP_EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
        return false;
      }

      let custXObj = {
        CustId: this.IdCust,
        MrCommodityCode: this.JobDataEmpForm.controls.CommodityCode.value,
      };

      let CustPersonalJobDataObjX = {
        CustId: this.IdCust,
        RefSectorEconomySlikXId: this.tempRefSectorEconomySlik
      }

      let reqObj = {
        CustPersonalJobDataObj: this.reqCustPersonalJobDataObj,
        CustPersonalJobDataObjX: CustPersonalJobDataObjX,
        CustXObj: custXObj
      }

      await this.http.post(URLConstantX.AddCustPersonalJobData, reqObj).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["message"]);
          if (!IsParent) this.outputTab.emit({ stepMode: "next" });
        }
      );
    }
    return true;
  }

  isWellknownCoyChecked(checked: boolean) {
    this.IsWellknownCoy = checked;
    if(checked){
      this.companyLookupObj.isRequired = true;
    }
    else{
      this.companyLookupObj.isRequired = false;
    }
  }

  getCoy(event: any) {
    this.JobDataEmpForm.patchValue({
      MrWellknownCoyCode: event.MasterCode,
      IndustryName: event.Descr
    });
  }

  onFocusOutEstDate(event){
    if(event.target.value > this.MaxDtValidate){
      this.toastr.warningMessage(String.Format(ExceptionConstant.OTHER_BIZ_EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
      return;
    }
  }

  setLookupCommodityData(ev) {
    this.JobDataEmpForm.patchValue({
      CommodityCode: ev.MasterCode
    });
  }

}
