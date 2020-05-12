import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
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
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustomerPersonalJobDataComponent implements OnInit {
  // @Output() outputTab: EventEmitter<object> = new EventEmitter();
  
  custObj : any;
  IdCust : number;

  CustModel : string;
  getCustById: string;
  getListActiveRefMaster: string;
  
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
  }
}
