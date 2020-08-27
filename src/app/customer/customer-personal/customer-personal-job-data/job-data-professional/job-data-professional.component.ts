import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
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
  selector: 'app-job-data-professional',
  templateUrl: './job-data-professional.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class JobDataProfessionalComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  jobDataId: any;
  jobAddrId: any;
  preJobAddrId: any;
  rowVersion: any;
  typePage: string;
  IdCust: number;
  IdCustPersonal: number;
  inputFieldAddressObj: InputFieldObj;
  tempProfession: any;
  tempRefIndustryType: any;
  professionLookUpObj: InputLookupObj;
  industryLookUpObj: InputLookupObj;
  custPersonalJobDataObj: CustPersonalJobDataObj;
  custJobDataObj: CustPersonalJobDataObj;
  returnCustJobDataObj: any;  
  inputPreJobAddressObj: InputFieldObj;
  jobAddressObj: CustAddrObj;
  preJobAddressObj: CustAddrObj;
  addressObj: CustAddrObj;
  othBizAddrObj: CustAddrObj;
  reqCustPersonalJobDataObj: RequestCustPersonalJobDataObj;
  refProfessionObj: RefProfessionObj;
  returnRefProfessionObj: any;
  refIndustryTypeObj: RefIndustryTypeObj;
  returnIndustryTypeObj: any;
  custAddrObj: CustAddrObj;
  preJobAddrObj: CustAddrObj;
  getCustomerAddr: any;
  getPreJobAddr: any;
  JobDataProForm = this.fb.group({
    JobDataType: [''],
    ProfessionName: [''],
    ProfessionalNo: [''],
    JobTitleName: [''],
    IndustryTypeName: [''],
    EstablishmentDate: ['', Validators.required],
    Notes: [''],
    LuasBangunan: [''],
    LuasTanah: [''],
    KapasitasListrik: [''],
    LocationClass: [''],
    PriceEstimates: [''],
    StayLength: [''],
    PreviIndustryName: [''],
    PreviEmploymentDate: [''],
    NotesPreJob: ['']
  });
  businessDtMin: Date;
  inputAddressObj: any;
  inputPreviousAddressObj: InputAddressObj;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
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
    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.inputFieldAddressObj = new InputFieldObj();
    this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();
    this.inputPreJobAddressObj =  new InputFieldObj();
    this.inputPreJobAddressObj.inputLookupObj = new InputLookupObj();
    this.inputPreJobAddressObj.inputLookupObj.isRequired = false;

    this.professionLookUpObj = new InputLookupObj();
    this.professionLookUpObj.isRequired = true;
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
    this.industryLookUpObj.isRequired = true;

    this.custJobDataObj = new CustPersonalJobDataObj();
    this.custJobDataObj.CustId = this.IdCust;
    this.http.post(URLConstant.GetCustPersonalJobDataByCustId, this.custJobDataObj).subscribe(
      (response: any) => {
        this.returnCustJobDataObj = response;

        if (this.returnCustJobDataObj.CustPersonalJobDataId != 0) {
          this.JobDataProForm.patchValue({
            ProfessionalNo: this.returnCustJobDataObj.ProfessionalNo,
            JobTitleName: this.returnCustJobDataObj.JobTitleName,
            EstablishmentDate: formatDate(this.returnCustJobDataObj.EmploymentEstablishmentDt, 'yyyy-MM-dd', 'en-US'),
            PreviIndustryName: this.returnCustJobDataObj.PrevCoyName,
            PreviEmploymentDate: formatDate(this.returnCustJobDataObj.PrevEmploymentDt, 'yyyy-MM-dd', 'en-US'),
          });

          this.refProfessionObj = new RefProfessionObj();
          this.refProfessionObj.RefProfessionId = this.returnCustJobDataObj.RefProfessionId;
          this.http.post(URLConstant.GetRefProfessionById, this.refProfessionObj).subscribe(
            (response) => {
              this.returnRefProfessionObj = response;
              this.professionLookUpObj.nameSelect = this.returnRefProfessionObj.ProfessionName;
              this.professionLookUpObj.jsonSelect = this.returnRefProfessionObj;
              this.tempProfession = this.returnRefProfessionObj.RefProfessionId;
            });

          this.refIndustryTypeObj = new RefIndustryTypeObj();
          this.refIndustryTypeObj.RefIndustryTypeId = this.returnCustJobDataObj.RefIndustryTypeId;
          this.http.post(URLConstant.GetRefIndustryTypeById, this.refIndustryTypeObj).subscribe(
            (response) => {
              this.returnIndustryTypeObj = response;

              this.industryLookUpObj.nameSelect = this.returnIndustryTypeObj.IndustryTypeName;
              this.industryLookUpObj.jsonSelect = this.returnIndustryTypeObj;
              this.tempRefIndustryType = this.returnIndustryTypeObj.RefIndustryTypeId;
            });

          if (this.returnCustJobDataObj.JobAddrId != null) {
            this.custAddrObj = new CustAddrObj();
            this.custAddrObj.CustAddrId = this.returnCustJobDataObj.JobAddrId;
            this.http.post(URLConstant.GetCustAddr, this.custAddrObj).subscribe(
              (response) => {
                this.getCustomerAddr = response;
                this.JobDataProForm.patchValue({
                  Notes: this.getCustomerAddr.Notes
                });

                this.addressObj = new CustAddrObj();
                this.addressObj.Addr = this.getCustomerAddr.Addr;
                this.addressObj.AreaCode3 = this.getCustomerAddr.AreaCode3;
                this.addressObj.AreaCode4 = this.getCustomerAddr.AreaCode4;
                this.addressObj.AreaCode1 = this.getCustomerAddr.AreaCode1;
                this.addressObj.AreaCode2 = this.getCustomerAddr.AreaCode2;
                this.addressObj.City = this.getCustomerAddr.City;
                this.addressObj.PhnArea1 = this.getCustomerAddr.PhnArea1;
                this.addressObj.Phn1 = this.getCustomerAddr.Phn1;
                this.addressObj.PhnExt1 = this.getCustomerAddr.PhnExt1;
                this.addressObj.PhnArea2 = this.getCustomerAddr.PhnArea2;
                this.addressObj.Phn2 = this.getCustomerAddr.Phn2;
                this.addressObj.PhnExt2 = this.getCustomerAddr.PhnExt2;
                this.addressObj.PhnArea3 = this.getCustomerAddr.PhnArea3;
                this.addressObj.Phn3 = this.getCustomerAddr.Phn3;
                this.addressObj.PhnExt3 = this.getCustomerAddr.PhnExt3;
                this.addressObj.FaxArea = this.getCustomerAddr.FaxArea;
                this.addressObj.Fax = this.getCustomerAddr.Fax;
                this.addressObj.MrHouseOwnershipCode = this.getCustomerAddr.MrBuildingOwnershipCode;

                this.inputFieldAddressObj = new InputFieldObj();
                this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();
                this.inputFieldAddressObj.inputLookupObj.nameSelect = this.getCustomerAddr.Zipcode;
                this.inputFieldAddressObj.inputLookupObj.jsonSelect = { Zipcode: this.getCustomerAddr.Zipcode };
                this.inputAddressObj.default = this.addressObj;
                this.inputAddressObj.inputField = this.inputFieldAddressObj;
              });
          }
          if (this.returnCustJobDataObj.PrevJobAddrId != null) {
            this.preJobAddrObj = new CustAddrObj();
            this.preJobAddrObj.CustAddrId = this.returnCustJobDataObj.PrevJobAddrId;
            this.http.post(URLConstant.GetCustAddr, this.preJobAddrObj).subscribe(
              (response) => {
                this.getPreJobAddr = response;
                this.JobDataProForm.patchValue({
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

                this.inputPreviousAddressObj.default = this.preJobAddrObj;
                this.inputPreviousAddressObj.inputField = this.inputPreJobAddressObj;

              });
          }
          this.preJobAddrId = this.returnCustJobDataObj.PrevJobAddrId;
          this.jobAddrId = this.returnCustJobDataObj.JobAddrId;
          this.jobDataId = this.returnCustJobDataObj.CustPersonalJobDataId;
          this.rowVersion = this.returnCustJobDataObj.RowVersion;
          this.typePage = "edit";
        }
      });
      this.inputAddressObj = new InputAddressObj();
      this.inputAddressObj.showSubsection = false;
      this.inputAddressObj.title = "Job Address";
      this.inputAddressObj.showOwnership = true;
      
      this.inputPreviousAddressObj = new InputAddressObj();
      this.inputPreviousAddressObj.showSubsection = false;
      this.inputPreviousAddressObj.isRequired = false;
      this.inputPreviousAddressObj.title = "Previous Job Address";
      this.inputPreviousAddressObj.showOwnership = true;
  }

  setJobAddr() {
    this.jobAddressObj.CustId = this.IdCust;
    this.jobAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeJob;
    this.jobAddressObj.Addr = this.JobDataProForm.controls["jobAddress"]["controls"].Addr.value;
    this.jobAddressObj.FullAddr = this.JobDataProForm.controls["jobAddress"]["controls"].Addr.value + " RT: " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode4.value + " RW: " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode3.value + " " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode2.value + ", " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode1.value + " " + this.JobDataProForm.controls["jobAddressZipcode"]["controls"].value.value;
    this.jobAddressObj.AreaCode3 = this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode3.value;
    this.jobAddressObj.AreaCode4 = this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode4.value;
    this.jobAddressObj.Zipcode = this.JobDataProForm.controls["jobAddressZipcode"]["controls"].value.value;
    this.jobAddressObj.AreaCode1 = this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode1.value;
    this.jobAddressObj.AreaCode2 = this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode2.value;
    this.jobAddressObj.City = this.JobDataProForm.controls["jobAddress"]["controls"].City.value;
    this.jobAddressObj.PhnArea1 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnArea1.value;
    this.jobAddressObj.Phn1 = this.JobDataProForm.controls["jobAddress"]["controls"].Phn1.value;
    this.jobAddressObj.PhnExt1 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnExt1.value;
    this.jobAddressObj.PhnArea2 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnArea2.value;
    this.jobAddressObj.Phn2 = this.JobDataProForm.controls["jobAddress"]["controls"].Phn2.value;
    this.jobAddressObj.PhnExt2 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnExt2.value;
    this.jobAddressObj.PhnArea3 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnArea3.value;
    this.jobAddressObj.Phn3 = this.JobDataProForm.controls["jobAddress"]["controls"].Phn3.value;
    this.jobAddressObj.PhnExt3 = this.JobDataProForm.controls["jobAddress"]["controls"].PhnExt3.value;
    this.jobAddressObj.FaxArea = this.JobDataProForm.controls["jobAddress"]["controls"].FaxArea.value;
    this.jobAddressObj.Fax = this.JobDataProForm.controls["jobAddress"]["controls"].Fax.value;
    this.jobAddressObj.MrBuildingOwnershipCode = this.JobDataProForm.controls["jobAddress"]["controls"].MrHouseOwnershipCode.value;
    this.jobAddressObj.Notes = this.JobDataProForm.controls["Notes"].value;
  }

  setCustJobData() {
    this.custPersonalJobDataObj.CustId = this.IdCust;
    this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
    this.custPersonalJobDataObj.ProfessionalNo = this.JobDataProForm.controls["ProfessionalNo"].value;
    this.custPersonalJobDataObj.JobTitleName = this.JobDataProForm.controls["JobTitleName"].value;
    this.custPersonalJobDataObj.RefIndustryTypeId = this.tempRefIndustryType;
    this.custPersonalJobDataObj.EmploymentEstablishmentDt = this.JobDataProForm.controls["EstablishmentDate"].value;
    this.custPersonalJobDataObj.PrevCoyName = this.JobDataProForm.controls["PreviIndustryName"].value;
    this.custPersonalJobDataObj.PrevEmploymentDt = this.JobDataProForm.controls["PreviEmploymentDate"].value;
  }

  setPreJobAddr() {
    this.preJobAddressObj.CustId = this.IdCust;
    this.preJobAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypePreJob;
    this.preJobAddressObj.Addr = this.JobDataProForm.controls["prejobAddress"]["controls"].Addr.value;
    this.preJobAddressObj.FullAddr = this.JobDataProForm.controls["prejobAddress"]["controls"].Addr.value + " RT: " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode4.value + " RW: " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode3.value + " " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode2.value + ", " + this.JobDataProForm.controls["jobAddress"]["controls"].AreaCode1.value + " " + this.JobDataProForm.controls["jobAddressZipcode"]["controls"].value.value;
    this.preJobAddressObj.AreaCode3 = this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode3.value;
    this.preJobAddressObj.AreaCode4 = this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode4.value;
    this.preJobAddressObj.Zipcode = this.JobDataProForm.controls["prejobAddressZipcode"]["controls"].value.value;
    this.preJobAddressObj.AreaCode1 = this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode1.value;
    this.preJobAddressObj.AreaCode2 = this.JobDataProForm.controls["prejobAddress"]["controls"].AreaCode2.value;
    this.preJobAddressObj.City = this.JobDataProForm.controls["prejobAddress"]["controls"].City.value;
    this.preJobAddressObj.PhnArea1 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnArea1.value;
    this.preJobAddressObj.Phn1 = this.JobDataProForm.controls["prejobAddress"]["controls"].Phn1.value;
    this.preJobAddressObj.PhnExt1 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnExt1.value;
    this.preJobAddressObj.PhnArea2 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnArea2.value;
    this.preJobAddressObj.Phn2 = this.JobDataProForm.controls["prejobAddress"]["controls"].Phn2.value;
    this.preJobAddressObj.PhnExt2 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnExt2.value;
    this.preJobAddressObj.PhnArea3 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnArea3.value;
    this.preJobAddressObj.Phn3 = this.JobDataProForm.controls["prejobAddress"]["controls"].Phn3.value;
    this.preJobAddressObj.PhnExt3 = this.JobDataProForm.controls["prejobAddress"]["controls"].PhnExt3.value;
    this.preJobAddressObj.FaxArea = this.JobDataProForm.controls["prejobAddress"]["controls"].FaxArea.value;
    this.preJobAddressObj.Fax = this.JobDataProForm.controls["prejobAddress"]["controls"].Fax.value;
    this.preJobAddressObj.MrBuildingOwnershipCode = this.JobDataProForm.controls["prejobAddress"]["controls"].MrHouseOwnershipCode.value;
    this.preJobAddressObj.Notes = this.JobDataProForm.controls["NotesPreJob"].value;
  }

  SaveForm() {
    if (this.typePage == "edit") {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.jobAddressObj = new CustAddrObj;
      this.othBizAddrObj = new CustAddrObj;
      this.setCustJobData();
      this.custPersonalJobDataObj.JobAddrId = this.jobAddrId;
      this.custPersonalJobDataObj.PrevJobAddrId = this.preJobAddrId;
      this.custPersonalJobDataObj.CustPersonalJobDataId = this.jobDataId;
      this.custPersonalJobDataObj.RowVersion = this.rowVersion;
      this.jobAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeJob;
      this.othBizAddrObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeOthBiz;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.jobAddressObj = new CustAddrObj;
      this.setJobAddr();
      this.preJobAddressObj = new CustAddrObj;
      this.setPreJobAddr();
      this.reqCustPersonalJobDataObj.JobAddr = this.jobAddressObj;
      this.reqCustPersonalJobDataObj.PreJobAddr = this.preJobAddressObj;
      this.reqCustPersonalJobDataObj.OthBizAddr = this.othBizAddrObj;

      this.http.post(URLConstant.EditCustPersonalJobData, this.reqCustPersonalJobDataObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.outputTab.emit({ stepMode: "next" });
        }
      );
    } else {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.setCustJobData();
      this.jobAddressObj = new CustAddrObj;
      this.setJobAddr();
      this.othBizAddrObj = new CustAddrObj;
      this.othBizAddrObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeOthBiz;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.JobAddr = this.jobAddressObj;
      this.reqCustPersonalJobDataObj.OthBizAddr = this.othBizAddrObj;
      this.preJobAddressObj = new CustAddrObj;
      this.setPreJobAddr();
      this.reqCustPersonalJobDataObj.PreJobAddr = this.preJobAddressObj;

      this.http.post(URLConstant.AddCustPersonalJobData, this.reqCustPersonalJobDataObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.outputTab.emit({ stepMode: "next" });
        }
      );
    }
  }
}
