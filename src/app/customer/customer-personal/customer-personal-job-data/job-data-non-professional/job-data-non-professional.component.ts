import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CustPersonalJobDataObj } from 'app/shared/model/CustPersonalJobDataObj.Model';
import { RequestCustPersonalJobDataObj } from 'app/shared/model/RequestCustPersonalJobDataObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { RefProfessionObj } from 'app/shared/model/RefProfessionObj.Model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-job-data-non-professional',
  templateUrl: './job-data-non-professional.component.html',
  styleUrls: []
})
export class JobDataNonProfessionalComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  jobDataId: any;
  typePage: string;
  rowVersion: string
  IdCust : number;
  IdCustPersonal : number;
  custObj : any;
  objCust : CustObj;
  tempProfession: any;
  professionLookUpObj: InputLookupObj;
  custPersonalJobDataObj: CustPersonalJobDataObj;
  custJobDataObj: CustPersonalJobDataObj;
  returnCustJobDataObj: any;
  reqCustPersonalJobDataObj: RequestCustPersonalJobDataObj;
  refProfessionObj: RefProfessionObj;
  returnRefProfessionObj: any;
  JobDataNonProForm = this.fb.group({
    JobDataType: [''],
    ProfessionName: [''],
    JobTitleName: ['']
  });

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

  ngOnInit() {
    this.professionLookUpObj = new InputLookupObj();
    this.professionLookUpObj.isRequired = false;
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";
    
    this.objCust = new CustObj();
    this.objCust.CustId = this.IdCust;
    this.http.post(URLConstant.GetCustByCustId, {Id : this.IdCust}).subscribe(
      (response) => {
          this.custObj = response;
      });

    this.custJobDataObj = new CustPersonalJobDataObj();
    this.custJobDataObj.CustId = this.IdCust;
    this.http.post(URLConstant.GetCustPersonalJobDataByCustId, {Id : this.IdCust}).subscribe(
      (response: any) => {
          this.returnCustJobDataObj = response;
          
          if(this.returnCustJobDataObj.CustPersonalJobDataId != 0) {
            this.JobDataNonProForm.patchValue({ 
              JobTitleName: this.returnCustJobDataObj.JobTitleName,
            });

            this.refProfessionObj = new RefProfessionObj();
            this.refProfessionObj.RefProfessionId = this.returnCustJobDataObj.RefProfessionId;
            this.http.post(URLConstant.GetRefProfessionById, {Id : this.returnCustJobDataObj.RefProfessionId}).subscribe(
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

  // back(){
  //   this.outputTab.emit({ stepMode: "previous"});
  // }

  SaveForm(){
    if(this.typePage == "edit"){
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.custPersonalJobDataObj.CustPersonalJobDataId = this.jobDataId;
      this.custPersonalJobDataObj.CustId = this.IdCust;
      this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
      this.custPersonalJobDataObj.JobTitleName = this.JobDataNonProForm.controls["JobTitleName"].value;
      this.custPersonalJobDataObj.RowVersion = this.rowVersion;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.CustPersonalJobData.MrCustModelCode = CommonConstant.CUST_MODEL_NONPROF;

      this.http.post(URLConstant.EditCustPersonalJobData, this.reqCustPersonalJobDataObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          this.outputTab.emit({ stepMode: "next"});
        }
      );
    } else {
      this.reqCustPersonalJobDataObj = new RequestCustPersonalJobDataObj;
      this.custPersonalJobDataObj = new CustPersonalJobDataObj;
      this.custPersonalJobDataObj.CustId = this.IdCust;
      this.custPersonalJobDataObj.RefProfessionId = this.tempProfession;
      this.custPersonalJobDataObj.JobTitleName = this.JobDataNonProForm.controls["JobTitleName"].value;
      this.reqCustPersonalJobDataObj.CustPersonalJobData = this.custPersonalJobDataObj;
      this.reqCustPersonalJobDataObj.CustPersonalJobData.MrCustModelCode = CommonConstant.CUST_MODEL_NONPROF;

      this.http.post(URLConstant.AddCustPersonalJobData, this.reqCustPersonalJobDataObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          // this.router.navigate(
          //   ["/Customer/CustomerPersonal/Address"], 
          //   { queryParams: { "IdCust": this.IdCust }}
          //   );
          this.outputTab.emit({ stepMode: "next"});
        }
      );
    }
  }
}
