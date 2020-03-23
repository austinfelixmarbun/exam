import { Component, OnInit, ViewChild } from '@angular/core';
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
 
@Component({
  selector: 'app-job-data-professional',
  templateUrl: './job-data-professional.component.html',
  styleUrls: ['./job-data-professional.component.scss'],
  providers: [NGXToastrService]
})
export class JobDataProfessionalComponent implements OnInit {
  CustName  : any;
  Gender : any;
  GenderDesc:any;
  MrIdTypeCode : any;
  MrIdTypeCodeDesc : any;
  CustModel : any;
  CustModelDesc
  BirthPlace : any;
  BirthDt : any;
  IdNo : any;
  TaxIdNo : any;
  IdExpiredDt : any;
  MotherMaidenName : any;
  resultData: any;
  addUrl : any; 
  IdCust : any;
  IdCustPersonal : any;
  custObj : any;
  getListActiveRefMaster: any;
  getCustById: any;
  jobType: any;
  listJobType: any;
  establishmentDt: any;
  listEstablishmentDt: any;
  inputFieldAddressObj: InputFieldObj;
  jobAddressObj: CustAddrObj;
  tempProfession: any;
  tempRefIndustryType: any;
  professionLookUpObj: any;
  industryLookUpObj: any;
  custPersonalJobDataObj: any;
  addJobData: any;
  addCustAddr : any;
 JobDataProForm = this.fb.group({
    JobDataType: [''],
    ProfessionName: [''],
    ProfessionalNo: [''],
    JobTitleName: [''],
    IndustryTypeName: [''],
    EstablishmentDate: [''],
    EstablishmentDateYear: [''],
    Notes:[''],
    LuasBangunan: [''],
    LuasTanah: [''],
    KapasitasListrik: [''],
    LocationClass: [''],
    PriceEstimates: [''],
    StayLength: ['']
  });

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.getCustById = AdInsConstant.GetCustByCustId;
    this.getListActiveRefMaster = AdInsConstant.GetListActiveRefMaster;
    this.addJobData = AdInsConstant.AddCustPersonalJobData;
    this.addCustAddr = AdInsConstant.AddCustAddr;


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
    this.inputFieldAddressObj = new InputFieldObj();
    this.inputFieldAddressObj.inputLookupObj = new InputLookupObj();

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
    
    this.custObj = new CustObj();
    this.custObj.CustId = this.IdCust;
    this.http.post(this.getCustById, this.custObj).subscribe(
      (response) => {
          this.custObj = response;
      });
    
    this.establishmentDt = new RefMasterObj();
    this.establishmentDt.RefMasterTypeCode = "MONTH";
    this.http.post(this.getListActiveRefMaster, this.establishmentDt).subscribe(
    (response) => {
        this.listEstablishmentDt = response['ReturnObject'];
        console.log("aaaa");
        console.log(this.listEstablishmentDt);
        this.JobDataProForm.patchValue({ EstablishmentDate: response['ReturnObject'][0]['Key'] });
    });
  }

  setJobAddr(){
    this.jobAddressObj.CustId = this.IdCust;
    this.jobAddressObj.MrCustAddrTypeCode = 'JOB';
    this.jobAddressObj.Addr = this.JobDataProForm.controls["custAddress"]["controls"].Addr.value;
    this.jobAddressObj.FullAddr = this.JobDataProForm.controls["custAddress"]["controls"].Addr.value;
    this.jobAddressObj.AreaCode3 = this.JobDataProForm.controls["custAddress"]["controls"].AreaCode3.value;
    this.jobAddressObj.AreaCode4 = this.JobDataProForm.controls["custAddress"]["controls"].AreaCode4.value;
    this.jobAddressObj.Zipcode = this.JobDataProForm.controls["custAddressZipcode"]["controls"].value.value;
    this.jobAddressObj.AreaCode1 = this.JobDataProForm.controls["custAddress"]["controls"].AreaCode1.value;
    this.jobAddressObj.AreaCode2 = this.JobDataProForm.controls["custAddress"]["controls"].AreaCode2.value;
    this.jobAddressObj.City = this.JobDataProForm.controls["custAddress"]["controls"].City.value;
    this.jobAddressObj.PhnArea1 = this.JobDataProForm.controls["custAddress"]["controls"].PhnArea1.value;
    this.jobAddressObj.Phn1 = this.JobDataProForm.controls["custAddress"]["controls"].Phn1.value;
    this.jobAddressObj.PhnExt1 = this.JobDataProForm.controls["custAddress"]["controls"].PhnExt1.value;
    this.jobAddressObj.PhnArea2 = this.JobDataProForm.controls["custAddress"]["controls"].PhnArea2.value;
    this.jobAddressObj.Phn2 = this.JobDataProForm.controls["custAddress"]["controls"].Phn2.value;
    this.jobAddressObj.PhnExt2 = this.JobDataProForm.controls["custAddress"]["controls"].PhnExt2.value;
    this.jobAddressObj.PhnArea3 = this.JobDataProForm.controls["custAddress"]["controls"].PhnArea3.value;
    this.jobAddressObj.Phn3 = this.JobDataProForm.controls["custAddress"]["controls"].Phn3.value;
    this.jobAddressObj.PhnExt3 = this.JobDataProForm.controls["custAddress"]["controls"].PhnExt3.value;
    this.jobAddressObj.FaxArea = this.JobDataProForm.controls["custAddress"]["controls"].FaxArea.value;
    this.jobAddressObj.Fax = this.JobDataProForm.controls["custAddress"]["controls"].Fax.value;
    this.jobAddressObj.MrBuildingOwnershipCode = this.JobDataProForm.controls["custAddress"]["controls"].MrHouseOwnershipCode.value;
    this.jobAddressObj.Notes = this.JobDataProForm.controls["Notes"].value;
  }

  SaveForm(){
    this.custPersonalJobDataObj = new CustPersonalJobDataObj();
    this.custPersonalJobDataObj.CustId = this.IdCust;
    this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
    this.custPersonalJobDataObj.JobTitleName = this.JobDataProForm.controls["JobTitleName"].value;

    this.http.post(this.addJobData, this.custPersonalJobDataObj).subscribe(
      (response) => {
        console.log(response);
        this.toastr.successMessage(response["message"]);
        this.router.navigate(
          ["/Customer/CustomerPersonal/Address"], 
          { queryParams: { "IdCust": this.IdCust }}
          );
        console.log(response)
      },
      (error) => {
        console.log(error);
      }
    );

    this.jobAddressObj = new CustAddrObj();
    this.setJobAddr();
    this.http.post(this.addCustAddr, this.jobAddressObj).subscribe(
        (response) => {
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(
            ["/Customer/CustomerPersonal/Address"], 
            { queryParams: { "IdCust": this.IdCust }}
            );
          console.log(response)
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
