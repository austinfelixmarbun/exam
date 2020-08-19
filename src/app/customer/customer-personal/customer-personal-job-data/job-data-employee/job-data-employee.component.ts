import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CustPersonalJobDataObj } from 'app/shared/model/CustPersonalJobDataObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { RequestCustPersonalJobDataObj } from 'app/shared/model/RequestCustPersonalJobDataObj.Model';
import { formatDate } from '@angular/common';
import { RefProfessionObj } from 'app/shared/model/RefProfessionObj.Model';
import { RefIndustryTypeObj } from 'app/shared/model/RefIndustryTypeObj.Model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';

@Component({
  selector: 'app-job-data-employee',
  templateUrl: './job-data-employee.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class JobDataEmployeeComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  jobAddrId: any;
  othBizAddrId: any;
  preJobAddrId: any;
  jobDataId: any;
  rowVersion: any;
  typePage: string;
  IdCust: number;
  IdCustPersonal: number;
  custObj: any;
  objCust: CustObj;
  getListActiveRefMaster: string;
  getCustById: string;
  jobAddressObj: CustAddrObj;
  otherAddressObj: CustAddrObj;
  preJobAddressObj: CustAddrObj;
  inputJobAddressObj: InputFieldObj;
  inputOtherAddressObj: InputFieldObj;
  inputPreJobAddressObj: InputFieldObj;
  jobStatus: RefMasterObj;
  listJobStatus: any;
  jobPosition: RefMasterObj;
  listJobPosition: any;
  companyScale: RefMasterObj;
  listCompanyScale: any;
  tempProfession: any;
  tempRefIndustryType: any;
  professionLookUpObj: InputLookupObj;
  industryLookUpObj: InputLookupObj;
  custPersonalJobDataObj: CustPersonalJobDataObj;
  custJobDataObj: CustPersonalJobDataObj;
  returnCustJobDataObj: any;
  addJobData: string;
  editJobData: string;
  getJobDataByCustId: string;
  getCustAddr: string;
  getRefProfession: string;
  getRefIndustryType: string;
  refProfessionObj: RefProfessionObj;
  returnRefProfessionObj: any;
  reqCustPersonalJobDataObj: RequestCustPersonalJobDataObj;
  refIndustryTypeObj: RefIndustryTypeObj;
  returnIndustryTypeObj: any;
  custJobAddrObj: CustAddrObj;
  custOthBizAddrObj: CustAddrObj;
  getJobAddr: any;
  getOthBizAddr: any;
  getPreJobAddr: any;
  addressObj: CustAddrObj;
  otherAddrObj: CustAddrObj;
  preJobAddrObj: CustAddrObj;
  JobDataEmpForm = this.fb.group({
    JobDataType: [''],
    ProfessionName: [''],
    JobPosition: [''],
    JobTitleName: [''],
    JobStatus: [''],
    IndustryName: [''],
    InternalEmployee: [false],
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
    NotesPreJob: ['']
  });
  businessDtMin: Date;
  inputAddressObj: InputAddressObj;
  inputPreviousAddressObj: InputAddressObj;
  inputOthBizAddressObj: InputAddressObj;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.getCustById = URLConstant.GetCustByCustId;
    this.getListActiveRefMaster = URLConstant.GetListActiveRefMaster;
    this.addJobData = URLConstant.AddCustPersonalJobData;
    this.editJobData = URLConstant.EditCustPersonalJobData;
    this.getJobDataByCustId = URLConstant.GetCustPersonalJobDataByCustId;
    this.getCustAddr = URLConstant.GetCustAddr;
    this.getRefProfession = URLConstant.GetRefProfessionById;
    this.getRefIndustryType = URLConstant.GetRefIndustryTypeById;

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

  getLookUpIndustry(event) {
    this.tempRefIndustryType = event.RefIndustryTypeId;
  }

  ngOnInit() {
    console.log('test')
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Job Address";
    this.inputAddressObj.showOwnership = true;

    this.inputPreviousAddressObj = new InputAddressObj();
    this.inputPreviousAddressObj.showSubsection = false;
    this.inputPreviousAddressObj.title = "Previous Job Address";
    this.inputPreviousAddressObj.showOwnership = true;
    this.inputPreviousAddressObj.isRequired = false;

    this.inputOthBizAddressObj = new InputAddressObj();
    this.inputOthBizAddressObj.showSubsection = false;
    this.inputOthBizAddressObj.isRequired = false;
    this.inputOthBizAddressObj.title = "Other Business Address";
    this.inputOthBizAddressObj.showOwnership = true;

    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.inputJobAddressObj = new InputFieldObj();
    this.inputJobAddressObj.inputLookupObj = new InputLookupObj();

    this.inputOtherAddressObj = new InputFieldObj();
    this.inputOtherAddressObj.inputLookupObj = new InputLookupObj();
    this.inputOtherAddressObj.inputLookupObj.isRequired = false;
    
    this.inputPreJobAddressObj =  new InputFieldObj();
    this.inputPreJobAddressObj.inputLookupObj = new InputLookupObj();
    this.inputPreJobAddressObj.inputLookupObj.isRequired = false;

    this.professionLookUpObj = new InputLookupObj();
    this.professionLookUpObj.isRequired = false;
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.professionLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";

    this.industryLookUpObj = new InputLookupObj();
    this.industryLookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.industryLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.industryLookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    this.industryLookUpObj.isRequired = false;

    this.jobPosition = new RefMasterObj();
    this.jobPosition.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeJobPosition;
    this.http.post(this.getListActiveRefMaster, this.jobPosition).subscribe(
      (response) => {
        this.listJobPosition = response[CommonConstant.ReturnObj];
        this.JobDataEmpForm.patchValue({ JobPosition: response[CommonConstant.ReturnObj][0]['Key'] });
      });

    this.jobStatus = new RefMasterObj();
    this.jobStatus.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeJobStat;
    this.http.post(this.getListActiveRefMaster, this.jobStatus).subscribe(
      (response) => {
        this.listJobStatus = response[CommonConstant.ReturnObj];
        this.JobDataEmpForm.patchValue({ JobStatus: response[CommonConstant.ReturnObj][0]['Key'] });
      });

    this.companyScale = new RefMasterObj();
    this.companyScale.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCoyScale;
    this.http.post(this.getListActiveRefMaster, this.companyScale).subscribe(
      (response) => {
        this.listCompanyScale = response[CommonConstant.ReturnObj];
        this.JobDataEmpForm.patchValue({ CompanyScale: response[CommonConstant.ReturnObj][0]['Key'] });
      });

    this.objCust = new CustObj();
    this.objCust.CustId = this.IdCust;
    this.http.post(this.getCustById, this.custObj).subscribe(
      (response) => {
        this.custObj = response;
      });

    this.custJobDataObj = new CustPersonalJobDataObj();
    this.custJobDataObj.CustId = this.IdCust;
    this.http.post(this.getJobDataByCustId, this.custJobDataObj).subscribe(
      (response: any) => {
        this.returnCustJobDataObj = response;

        if (this.returnCustJobDataObj.CustPersonalJobDataId != 0) {
          this.JobDataEmpForm.patchValue({
            JobPosition: this.returnCustJobDataObj.MrJobPositionCode,
            JobTitleName: this.returnCustJobDataObj.JobTitleName,
            JobStatus: this.returnCustJobDataObj.MrJobStatCode,
            IndustryName: this.returnCustJobDataObj.CoyName,
            InternalEmployee: this.returnCustJobDataObj.IsMfEmp,
            CompanyScale: this.returnCustJobDataObj.MrCoyScaleCode,
            EmpEstablishmentDate: formatDate(this.returnCustJobDataObj.EmploymentEstablishmentDt, 'yyyy-MM-dd', 'en-US'),
            OtherBusinessName: this.returnCustJobDataObj.OthBizName,
            OtherBusinessType: this.returnCustJobDataObj.OthBizType,
            OtherBusinessIndustry: this.returnCustJobDataObj.OthBizIndustryTypeCode,
            OtherJobPosition: this.returnCustJobDataObj.OthBizJobPosition,
            EstablishmentDate: formatDate(this.returnCustJobDataObj.OthBizEstablishmentDt, 'yyyy-MM-dd', 'en-US'),
            PreviIndustryName: this.returnCustJobDataObj.PrevCoyName,
            PreviEmploymentDate: formatDate(this.returnCustJobDataObj.PrevEmploymentDt, 'yyyy-MM-dd', 'en-US'),
          });

          if (this.returnCustJobDataObj.RefProfessionId != null) {
            this.refProfessionObj = new RefProfessionObj();
            this.refProfessionObj.RefProfessionId = this.returnCustJobDataObj.RefProfessionId;
            this.http.post(this.getRefProfession, this.refProfessionObj).subscribe(
              (response) => {
                this.returnRefProfessionObj = response;
                this.professionLookUpObj.nameSelect = this.returnRefProfessionObj.ProfessionName;
                this.professionLookUpObj.jsonSelect = this.returnRefProfessionObj;
                this.tempProfession = this.returnRefProfessionObj.RefProfessionId;
              });
          }

          if (this.returnCustJobDataObj.RefIndustryTypeId != null) {
            this.refIndustryTypeObj = new RefIndustryTypeObj();
            this.refIndustryTypeObj.RefIndustryTypeId = this.returnCustJobDataObj.RefIndustryTypeId;
            this.http.post(this.getRefIndustryType, this.refIndustryTypeObj).subscribe(
              (response) => {
                this.returnIndustryTypeObj = response;

                this.industryLookUpObj.nameSelect = this.returnIndustryTypeObj.IndustryTypeName;
                this.industryLookUpObj.jsonSelect = this.returnIndustryTypeObj;
                this.tempRefIndustryType = this.returnIndustryTypeObj.RefIndustryTypeId;
              });
          }

          if (this.returnCustJobDataObj.JobAddrId != null) {
            this.custJobAddrObj = new CustAddrObj();
            this.custJobAddrObj.CustAddrId = this.returnCustJobDataObj.JobAddrId;
            this.http.post(this.getCustAddr, this.custJobAddrObj).subscribe(
              (response) => {
                this.getJobAddr = response;
                this.JobDataEmpForm.patchValue({
                  NotesJob: this.getJobAddr.Notes
                });

                this.addressObj = new CustAddrObj();
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

                this.inputJobAddressObj = new InputFieldObj();
                this.inputJobAddressObj.inputLookupObj = new InputLookupObj();              
                this.inputJobAddressObj.inputLookupObj.nameSelect = this.getJobAddr.Zipcode;
                this.inputJobAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.getJobAddr.Zipcode };
                this.inputAddressObj.inputField = this.inputJobAddressObj; 
                this.inputAddressObj.default = this.addressObj; 

              });
          }

          if (this.returnCustJobDataObj.OthBizAddrId != null) {
            this.custOthBizAddrObj = new CustAddrObj();
            this.custOthBizAddrObj.CustAddrId = this.returnCustJobDataObj.OthBizAddrId;
            this.http.post(this.getCustAddr, this.custOthBizAddrObj).subscribe(
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
                this.inputOthBizAddressObj.default = this.otherAddrObj;
                this.inputOthBizAddressObj.inputField = this.inputOtherAddressObj;
              });
          }
          if (this.returnCustJobDataObj.PrevJobAddrId != null) {
            this.preJobAddrObj = new CustAddrObj();
            this.preJobAddrObj.CustAddrId = this.returnCustJobDataObj.PrevJobAddrId;
            this.http.post(this.getCustAddr, this.preJobAddrObj).subscribe(
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

                this.inputPreviousAddressObj.inputField = this.inputPreJobAddressObj; 
                this.inputPreviousAddressObj.default = this.preJobAddrObj; 
              });
          }
          this.othBizAddrId = this.returnCustJobDataObj.OthBizAddrId;
          this.jobAddrId = this.returnCustJobDataObj.JobAddrId;
          this.jobDataId = this.returnCustJobDataObj.CustPersonalJobDataId;
          this.preJobAddrId = this.returnCustJobDataObj.PrevJobAddrId;
          this.rowVersion = this.returnCustJobDataObj.RowVersion;
          this.typePage = "edit";
        }
      });
  }

  setJobAddr() {
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
    this.preJobAddressObj.CustId = this.IdCust;
    this.preJobAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypePreJob;
    this.preJobAddressObj.Addr = this.JobDataEmpForm.controls["prejobAddress"]["controls"].Addr.value;
    this.preJobAddressObj.FullAddr = this.JobDataEmpForm.controls["prejobAddress"]["controls"].Addr.value + " RT: " + this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode4.value + " RW: " + this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode3.value + " " + this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode2.value + ", " + this.JobDataEmpForm.controls["jobAddress"]["controls"].AreaCode1.value + " " + this.JobDataEmpForm.controls["jobAddressZipcode"]["controls"].value.value;
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
    this.custPersonalJobDataObj.CustId = this.IdCust;
    this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
    this.custPersonalJobDataObj.MrJobPositionCode = this.JobDataEmpForm.controls["JobPosition"].value;
    this.custPersonalJobDataObj.JobTitleName = this.JobDataEmpForm.controls["JobTitleName"].value;
    this.custPersonalJobDataObj.MrJobStatCode = this.JobDataEmpForm.controls["JobStatus"].value;
    this.custPersonalJobDataObj.CoyName = this.JobDataEmpForm.controls["IndustryName"].value;
    this.custPersonalJobDataObj.IsMfEmp = this.JobDataEmpForm.controls["InternalEmployee"].value;
    this.custPersonalJobDataObj.RefIndustryTypeId = this.tempRefIndustryType;
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

  // back(){
  //   this.outputTab.emit({ stepMode: "previous"});
  // }

  SaveForm() {
    if (this.typePage == "edit") {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj();
      this.jobAddressObj = new CustAddrObj;
      this.otherAddressObj = new CustAddrObj;
      this.setCustJobData();
      this.setJobAddr();
      this.setOthBizAddr();
      this.custPersonalJobDataObj.OthBizAddrId = this.othBizAddrId
      this.custPersonalJobDataObj.JobAddrId = this.jobAddrId;
      this.custPersonalJobDataObj.CustPersonalJobDataId = this.jobDataId;
      this.custPersonalJobDataObj.PrevJobAddrId = this.preJobAddrId;
      this.custPersonalJobDataObj.RowVersion = this.rowVersion;
      this.jobAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeJob; 
      this.otherAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeOthBiz;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.jobAddressObj = new CustAddrObj;
      this.setJobAddr();
      this.otherAddressObj = new CustAddrObj;
      this.setOthBizAddr();
      this.preJobAddressObj = new CustAddrObj;
      this.setPreJobAddr();
      this.reqCustPersonalJobDataObj.JobAddr = this.jobAddressObj;
      this.reqCustPersonalJobDataObj.OthBizAddr = this.otherAddressObj;
      this.reqCustPersonalJobDataObj.PreJobAddr = this.preJobAddressObj;

      this.http.post(this.editJobData, this.reqCustPersonalJobDataObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          this.outputTab.emit({ stepMode: "next" });
        }
      );
    } else {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj();
      this.setCustJobData();
      this.jobAddressObj = new CustAddrObj;
      this.setJobAddr();
      this.otherAddressObj = new CustAddrObj;
      this.setOthBizAddr();
      this.preJobAddressObj = new CustAddrObj;
      this.setPreJobAddr();
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.JobAddr = this.jobAddressObj;
      this.reqCustPersonalJobDataObj.OthBizAddr = this.otherAddressObj;
      this.reqCustPersonalJobDataObj.PreJobAddr = this.preJobAddressObj;

      this.http.post(this.addJobData, this.reqCustPersonalJobDataObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          this.outputTab.emit({ stepMode: "next" });
        }
      );
    }
  }
}
