import { LeaveManagementObj } from './../../shared/model/LeaveManagementObj.Model';
import { AdInsServiceService } from './../../ad-ins-service.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  providers: [NGXToastrService]
})
export class RequestComponent implements OnInit {

  foundationUrl: string = environment.foundationUrl;
  leaveManagementObj: LeaveManagementObj;
  apiUrl: any;
  jobPosition: any;
  startDt: any;

  constructor(
    private toastrService: NGXToastrService,
    private http: Http,
    private spinner: NgxSpinnerService,
    private location: Location,
    private adInsService: AdInsServiceService) {

    }

  ngOnInit() {
    var currentUserContext = JSON.parse(localStorage.getItem("UserContext"));
    this.startDt = currentUserContext.BusinessDate;
    this. jobPosition = '';
  }

  Save(ReqLeaveForm: NgForm): void {
    this.spinner.show();

    this.apiUrl = 'https://172.19.11.114:8243/POC_TEST/v1/LeaveManagement/AddLeaveMngmt';
    //GENERATE OBJECT
    this.leaveManagementObj = new LeaveManagementObj();
    this.leaveManagementObj.empName = ReqLeaveForm.value.empName;
    this.leaveManagementObj.jobPosition = ReqLeaveForm.value.jobPosition;
    this.leaveManagementObj.startDt = ReqLeaveForm.value.startDt;
    this.leaveManagementObj.endDt = ReqLeaveForm.value.endDt;
    this.leaveManagementObj.reason = ReqLeaveForm.value.reason;
    this.leaveManagementObj.verifBy = '';
   this.leaveManagementObj.status = 'REQ';
    //SAVE
    this.adInsService.postData(this.apiUrl, this.leaveManagementObj).subscribe(
      (response) => {
        console.log('Success Save');
        console.log(response);
        this.toastrService.typeSave('Request Successed');
        location.reload();
        this.spinner.hide();

      },
      (error) => {
        console.log('Error Save');
        console.log(error);
        this.toastrService.errorMessage(error);
        this.spinner.hide();
      }
    );
  }

}
