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
import { RequestCustPersonalJobDataObj } from 'app/shared/model/RequestCustPersonalJobDataObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { formatDate } from '@angular/common';
import { WizardComponent } from 'angular-archwizard';
import { RefProfessionObj } from 'app/shared/model/RefProfessionObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';

@Component({
  selector: 'app-job-data-non-professional',
  templateUrl: './job-data-non-professional.component.html',
  styleUrls: ['./job-data-non-professional.component.scss'],
  providers: [NGXToastrService]
})
export class JobDataNonProfessionalComponent implements OnInit {
  jobDataId: any;
  typePage: string;
  rowVersion: string
  IdCust : any;
  IdCustPersonal : any;
  custObj : any;
  getListActiveRefMaster: any;
  getCustById: any;
  getJobDataByCustId: any;
  getRefProfession: any;
  tempProfession: any;
  professionLookUpObj: any;
  custPersonalJobDataObj: any;
  custJobDataObj: any;
  returnCustJobDataObj: any;
  jobAddrObj: any;
  othBizAddrObj: any;
  addJobData: any;
  editJobData: any;
  reqCustPersonalJobDataObj: any;
  refProfessionObj: any;
  returnRefProfessionObj: any;
  JobDataNonProForm = this.fb.group({
    JobDataType: [''],
    ProfessionName: [''],
    JobTitleName: ['']
  });

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) { 
    this.getCustById = AdInsConstant.GetCustByCustId;
    this.getListActiveRefMaster = AdInsConstant.GetListActiveRefMaster;
    this.addJobData = AdInsConstant.AddCustPersonalJobData;
    this.editJobData = AdInsConstant.EditCustPersonalJobData;
    this.getJobDataByCustId = AdInsConstant.GetCustPersonalJobDataByCustId;
    this.getRefProfession = AdInsConstant.GetRefProfessionById;

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

  ngOnInit() {
    this.professionLookUpObj = new InputLookupObj();
    this.professionLookUpObj.isRequired = false;
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.professionLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";
    
    this.custObj = new CustObj();
    this.custObj.CustId = this.IdCust;
    this.http.post(this.getCustById, this.custObj).subscribe(
      (response) => {
          this.custObj = response;
      });

    this.custJobDataObj = new CustPersonalJobDataObj();
    this.custJobDataObj.CustId = this.IdCust;
    this.http.post(this.getJobDataByCustId, this.custJobDataObj).subscribe(
      (response: any) => {
          this.returnCustJobDataObj = response;
          console.log("ccc")
          console.log(this.returnCustJobDataObj)
          if(this.returnCustJobDataObj != undefined) {
            this.JobDataNonProForm.patchValue({ 
              JobTitleName: this.returnCustJobDataObj.JobTitleName,
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


            this.jobDataId = this.returnCustJobDataObj.CustPersonalJobDataId;
            this.rowVersion = this.returnCustJobDataObj.RowVersion;
            this.typePage = "edit";
          }
      });
  }

  SaveForm(){
    if(this.typePage == "edit"){
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.jobAddrObj = new CustAddrObj;
      this.othBizAddrObj = new CustAddrObj;
      this.custPersonalJobDataObj.CustPersonalJobDataId = this.jobDataId;
      this.custPersonalJobDataObj.CustId = this.IdCust;
      this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
      this.custPersonalJobDataObj.JobTitleName = this.JobDataNonProForm.controls["JobTitleName"].value;
      this.custPersonalJobDataObj.RowVersion = this.rowVersion;
      this.jobAddrObj.MrCustAddrTypeCode = "JOB";
      this.othBizAddrObj.MrCustAddrTypeCode = "OTH_BIZ";
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.JobAddr = this.jobAddrObj;
      this.reqCustPersonalJobDataObj.OthBizAddr = this.othBizAddrObj;

      this.http.post(this.editJobData, this.reqCustPersonalJobDataObj).subscribe(
        (response) => {
          console.log(response);
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          // console.log(response)
          this.wizard.goToNextStep();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.jobAddrObj = new CustAddrObj;
      this.othBizAddrObj = new CustAddrObj;
      this.custPersonalJobDataObj.CustId = this.IdCust;
      this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
      this.custPersonalJobDataObj.JobTitleName = this.JobDataNonProForm.controls["JobTitleName"].value;
      this.jobAddrObj.MrCustAddrTypeCode = "JOB";
      this.othBizAddrObj.MrCustAddrTypeCode = "OTH_BIZ";
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.JobAddr = this.jobAddrObj;
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
          this.wizard.goToNextStep();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
