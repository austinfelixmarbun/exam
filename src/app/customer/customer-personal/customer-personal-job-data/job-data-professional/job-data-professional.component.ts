import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
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
  rowVersion: any;
  typePage: string;
  IdCust : number;
  IdCustPersonal : number; 
  getListActiveRefMaster: string;
  getCustById: string;
  inputFieldAddressObj: InputFieldObj;
  tempProfession: any;
  tempRefIndustryType: any;
  professionLookUpObj: InputLookupObj;
  industryLookUpObj: InputLookupObj;
  custPersonalJobDataObj: CustPersonalJobDataObj;
  custJobDataObj: CustPersonalJobDataObj;
  returnCustJobDataObj: any;
  jobAddressObj: CustAddrObj;
  addressObj: CustAddrObj;
  othBizAddrObj: CustAddrObj;
  addJobData: string;
  editJobData: string;
  getJobDataByCustId: string;
  getCustAddr: string;
  getRefProfession: string;
  getRefIndustryType: string;
  reqCustPersonalJobDataObj: RequestCustPersonalJobDataObj;
  refProfessionObj: RefProfessionObj;
  returnRefProfessionObj: any;
  refIndustryTypeObj: RefIndustryTypeObj;
  returnIndustryTypeObj: any;
  custAddrObj: CustAddrObj;
  getCustomerAddr: any;
  JobDataProForm = this.fb.group({
    JobDataType: [''],
    ProfessionName: [''],
    ProfessionalNo: [''],
    JobTitleName: [''],
    IndustryTypeName: [''],
    EstablishmentDate: ['', Validators.required],
    Notes:[''],
    LuasBangunan: [''],
    LuasTanah: [''],
    KapasitasListrik: [''],
    LocationClass: [''],
    PriceEstimates: [''],
    StayLength: ['']
  });
  businessDtMin: Date;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.getCustById = AdInsConstant.GetCustByCustId;
    this.getListActiveRefMaster = AdInsConstant.GetListActiveRefMaster;
    this.addJobData = AdInsConstant.AddCustPersonalJobData;
    this.editJobData = AdInsConstant.EditCustPersonalJobData;
    this.getJobDataByCustId = AdInsConstant.GetCustPersonalJobDataByCustId;
    this.getCustAddr = AdInsConstant.GetCustAddr;
    this.getRefProfession = AdInsConstant.GetRefProfessionById;
    this.getRefIndustryType = AdInsConstant.GetRefIndustryTypeById;

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
    this.tempRefIndustryType  = event.RefIndustryTypeId;
  }

  ngOnInit() {
    var context = JSON.parse(localStorage.getItem("UserAccess"));
    this.businessDtMin = new Date(context["BusinessDt"]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.inputFieldAddressObj = new InputFieldObj();
    this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();

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
    this.http.post(this.getJobDataByCustId, this.custJobDataObj).subscribe(
      (response: any) => {
          this.returnCustJobDataObj = response;

          if(this.returnCustJobDataObj.CustPersonalJobDataId != 0) {
            this.JobDataProForm.patchValue({ 
              ProfessionalNo: this.returnCustJobDataObj.ProfessionalNo,
              JobTitleName: this.returnCustJobDataObj.JobTitleName,
              EstablishmentDate: formatDate(this.returnCustJobDataObj.EmploymentEstablishmentDt,  'yyyy-MM-dd', 'en-US'),
            });

            this.refProfessionObj = new RefProfessionObj();
            this.refProfessionObj.RefProfessionId = this.returnCustJobDataObj.RefProfessionId;
            this.http.post(this.getRefProfession, this.refProfessionObj).subscribe(
              (response) => {
                  this.returnRefProfessionObj = response;
                  this.professionLookUpObj.nameSelect = this.returnRefProfessionObj.ProfessionName;
                  this.professionLookUpObj.jsonSelect = this.returnRefProfessionObj;
                  this.tempProfession = this.returnRefProfessionObj.RefProfessionId;
              });

            this.refIndustryTypeObj = new RefIndustryTypeObj();
            this.refIndustryTypeObj.RefIndustryTypeId = this.returnCustJobDataObj.RefIndustryTypeId;
            this.http.post(this.getRefIndustryType, this.refIndustryTypeObj).subscribe(
              (response) => {
                  this.returnIndustryTypeObj = response;

                  this.industryLookUpObj.nameSelect = this.returnIndustryTypeObj.IndustryTypeName;
                  this.industryLookUpObj.jsonSelect = this.returnIndustryTypeObj;
                  this.tempRefIndustryType = this.returnIndustryTypeObj.RefIndustryTypeId;
              });
            
            if(this.returnCustJobDataObj.JobAddrId != null) {
              this.custAddrObj = new CustAddrObj();
              this.custAddrObj.CustAddrId = this.returnCustJobDataObj.JobAddrId;
              this.http.post(this.getCustAddr, this.custAddrObj).subscribe(
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
                    this.inputFieldAddressObj.inputLookupObj.jsonSelect = {Zipcode: this.getCustomerAddr.Zipcode};
                    
                });
            }
            
            this.jobAddrId = this.returnCustJobDataObj.JobAddrId;
            this.jobDataId = this.returnCustJobDataObj.CustPersonalJobDataId;
            this.rowVersion = this.returnCustJobDataObj.RowVersion;
            this.typePage = "edit";
          }
      });
  }

  setJobAddr(){
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

  setCustJobData(){
    this.custPersonalJobDataObj.CustId = this.IdCust;
    this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
    this.custPersonalJobDataObj.ProfessionalNo = this.JobDataProForm.controls["ProfessionalNo"].value;
    this.custPersonalJobDataObj.JobTitleName = this.JobDataProForm.controls["JobTitleName"].value;
    this.custPersonalJobDataObj.RefIndustryTypeId = this.tempRefIndustryType;
    this.custPersonalJobDataObj.EmploymentEstablishmentDt = this.JobDataProForm.controls["EstablishmentDate"].value;
  }

  // back(){
  //   this.outputTab.emit({ stepMode: "previous"});
  // }

  SaveForm(){
    if(this.typePage == "edit") {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.jobAddressObj = new CustAddrObj;
      this.othBizAddrObj = new CustAddrObj;
      this.setCustJobData();
      this.custPersonalJobDataObj.JobAddrId = this.jobAddrId;
      this.custPersonalJobDataObj.CustPersonalJobDataId = this.jobDataId;
      this.custPersonalJobDataObj.RowVersion = this.rowVersion;
      this.jobAddressObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeJob;
      this.othBizAddrObj.MrCustAddrTypeCode = CommonConstant.CustAddrTypeOthBiz;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.JobAddr = this.jobAddressObj;
      this.reqCustPersonalJobDataObj.OthBizAddr = this.othBizAddrObj;

      console.log("ccc");
      console.log(this.reqCustPersonalJobDataObj)

      this.http.post(this.editJobData, this.reqCustPersonalJobDataObj).subscribe(
        (response) => {
          console.log(response);
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          // console.log(response)
          this.outputTab.emit({ stepMode: "next"});
        },
        (error) => {
          console.log(error);
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

      this.http.post(this.addJobData, this.reqCustPersonalJobDataObj).subscribe(
        (response) => {
          console.log(response);
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          // console.log(response)
          this.outputTab.emit({ stepMode: "next"});
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
