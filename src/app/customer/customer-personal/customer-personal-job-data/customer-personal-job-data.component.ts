import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
 
@Component({
  selector: 'app-customer-personal-job-data',
  templateUrl: './customer-personal-job-data.component.html',
  styleUrls: ['./customer-personal-job-data.component.scss'],
  providers: [NGXToastrService]
})
export class CustomerPersonalJobDataComponent implements OnInit {
 
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
  CustJobDataForm = this.fb.group({
    JobDataType: [''],
  });

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.getCustById = AdInsConstant.GetCustByCustId;
    this.getListActiveRefMaster = AdInsConstant.GetListActiveRefMaster;


    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
         this.IdCust = params["IdCust"];
       }
      //  if (params["IdCustPersonal"] != null) {
      //   this.IdCustPersonal = params["IdCustPersonal"];
      // }
      // if (params["CustModel"] != null) {
      //   this.CustModel = params["CustModel"];
      // }
     });
  }

  ngOnInit() { 
    this.custObj = new CustObj();
    this.custObj.CustId = this.IdCust;
    this.http.post(this.getCustById, this.custObj).subscribe(
      (response) => {
          this.custObj = response;
          this.CustModel = this.custObj.MrCustModelCode;
      },
      (error) => {
        console.log(error);
      });

    this.jobType = new RefMasterObj();
    this.jobType.RefMasterTypeCode = "CUST_MODEL";
    this.http.post(this.getListActiveRefMaster, this.jobType).subscribe(
      (response) => {
          this.listJobType = response['ReturnObject'];
          this.CustJobDataForm.patchValue({ JobDataType: this.CustModel });
      });
  }
}
