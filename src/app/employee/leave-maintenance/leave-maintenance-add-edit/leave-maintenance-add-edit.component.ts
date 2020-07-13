import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEmpLeaveMngmntObj } from 'app/shared/model/RefEmpLeaveMngmntObj.Model';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { formatDate, DatePipe } from '@angular/common';
import { environment } from 'environments/environment';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { LookupemployeeComponent } from '@adins/lookupemployee';
import { RefEmpObj } from '../../../shared/model/RefEmpObj.Model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

@Component({
  selector: 'app-leave-maintenance-add-edit',
  templateUrl: './leave-maintenance-add-edit.component.html',
  styleUrls: ['./leave-maintenance-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class LeaveMaintenanceAddEditComponent implements OnInit {
  pageType: string = "add";
  refEmpLeaveMngmntId: any;
  relmObj: RefEmpLeaveMngmntObj;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  getRefEmpUrl: any;
  inputPagingObj: any;
  inputEmpLookupObj;
  refEmp: RefEmpObj;
  resultEmpData: any;
  empName: any;

  RefEmpLeaveMngmntForm = this.fb.group({
    StartDt: ['', Validators.required],
    EndDt: ['', Validators.required]
  });
  businessDt: Date;


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.apiUrl = AdInsConstant.GetRefEmpLeaveMngmntById;
    this.addUrl = AdInsConstant.AddRefEmpLeaveMngmnt;
    this.editUrl = AdInsConstant.EditRefEmpLeaveMngmnt;
    this.getRefEmpUrl = AdInsConstant.GetRefEmployeeById;

    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["refEmpLeaveMngmntId"] != null) {
        this.refEmpLeaveMngmntId = params["refEmpLeaveMngmntId"];
      }
    });
  }

  ngOnInit() {
    var context = JSON.parse(localStorage.getItem("UserAccess"));
    this.businessDt = new Date(context["BusinessDt"]);  
    
    this.inputEmpLookupObj = new InputLookupObj();
    this.inputEmpLookupObj.urlJson = "./assets/lookup/lookupEmp.json";
    this.inputEmpLookupObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputEmpLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputEmpLookupObj.pagingJson = "./assets/lookup/lookupEmp.json";
    this.inputEmpLookupObj.genericJson = "./assets/lookup/lookupEmp.json";

    if (this.pageType == "edit") {
      this.relmObj = new RefEmpLeaveMngmntObj();
      this.relmObj.RefEmpLeaveMngmntId = this.refEmpLeaveMngmntId;
      this.http.post(this.apiUrl, this.relmObj).subscribe(
        response => {
          this.resultData = response;
          console.log("Response: ");
          console.log(response);
          this.refEmpLeaveMngmntId = this.resultData.RefEmpLeaveMngmntId;
          this.inputEmpLookupObj.idSelect = this.resultData.RefEmpId;
          this.RefEmpLeaveMngmntForm.patchValue({
            StartDt: formatDate(this.resultData.StartDt, 'yyyy-MM-dd', 'en-US'),
            EndDt: formatDate(this.resultData.EndDt, 'yyyy-MM-dd', 'en-US'),
            RefEmpId: this.resultData.RefEmpId,
            IsPassed: this.resultData.IsPassed
          });
          this.refEmp = new RefEmpObj();
          this.refEmp.RefEmpId = this.resultData.RefEmpId;
          this.http.post(this.getRefEmpUrl, this.refEmp).subscribe(
            (response) => {
              this.resultEmpData = response;
              this.empName = this.resultEmpData.EmpName;
              this.inputEmpLookupObj.jsonSelect = this.resultEmpData;
              this.inputEmpLookupObj.nameSelect = this.resultEmpData.EmpName;
            },
            (error) => {
              console.log(error);
            });
        },

        error => {
          console.log(error);
        });
    }
  }
  
  SaveForm() {
    var businessDtRaw = new Date(localStorage.getItem("BusinessDateRaw"));
    var StartDt = new Date(this.RefEmpLeaveMngmntForm.controls["StartDt"].value);
    if (StartDt < businessDtRaw) {
      this.toastr.warningMessage(ExceptionConstant.START_DATE_MUST_EQUAL_OR_MORE_THAN+"Business Date");
    }
    else if (this.RefEmpLeaveMngmntForm.controls["EndDt"].value < this.RefEmpLeaveMngmntForm.controls["StartDt"].value) {
      this.toastr.warningMessage(ExceptionConstant.END_DATE_MUST_EQUAL_OR_MORE_THAN + "Start Date");
    }
    else {
      this.relmObj = new RefEmpLeaveMngmntObj();
      this.relmObj = this.RefEmpLeaveMngmntForm.value;
      var Business_Date = localStorage.getItem('BusinessDate');
      var datePipe = new DatePipe("en-US");
      var value = datePipe.transform(Business_Date, "yyyy-MM-dd");
      var businessDt = new Date(value);
      var relmObj_date = new Date(this.relmObj.EndDt);
      if (relmObj_date <= businessDt) {
        this.relmObj.IsPassed = true
      }
      else {
        this.relmObj.IsPassed = false
      }
      this.relmObj.RefEmpId = this.inputEmpLookupObj.jsonSelect.refEmpId;
      if (this.pageType == "add") {
        this.relmObj.RowVersion = "";
        this.http.post(this.addUrl, this.relmObj).subscribe(
          response => {
            this.toastr.successMessage(response["message"]);
            this.router.navigate(["Employee/Leave/Paging"]);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.relmObj.RefEmpLeaveMngmntId = this.refEmpLeaveMngmntId;
        this.relmObj.RowVersion = this.resultData.RowVersion;
        this.http.post(this.editUrl, this.relmObj).subscribe(
          response => {
            this.toastr.successMessage(response["message"]);
            this.router.navigate(["Employee/Leave/Paging"]);
          },
          error => {
            console.log(error);
          }
        );
      }
    }

  }
}
