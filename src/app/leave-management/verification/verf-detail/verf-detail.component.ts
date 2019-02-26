import { LeaveManagementObj } from './../../../shared/model/LeaveManagementObj.Model';
import { AdInsServiceService } from './../../../ad-ins-service.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verf-detail',
  templateUrl: './verf-detail.component.html',
  styleUrls: ['./verf-detail.component.scss'],
  providers: [NGXToastrService]
})
export class VerfDetailComponent implements OnInit {

  param: string;
  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  verifBy: any;
  status = '';
  leaveManagementObj: LeaveManagementObj;

  constructor(
    private toastrService: NGXToastrService,
    private http: Http,
    private spinner: NgxSpinnerService,
    private location: Location,
    private adInsService: AdInsServiceService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.param = params['leaveMngmtId'];
    })
  }

  ngOnInit() {
    this.FillForm();
  }

  Back(): void {
    this.location.back();
  }

  Save(LeaveVerifForm: NgForm): void {
    this.spinner.show();
    this.apiUrl = 'https://172.19.11.114:8243/POC_TEST/v1/LeaveManagement/EditLeaveMngmt';
    this.leaveManagementObj.verifBy = LeaveVerifForm.value.verifBy;
    this.leaveManagementObj.status = LeaveVerifForm.value.status;

    this.adInsService.postData(this.apiUrl, this.leaveManagementObj).subscribe(
      (response) => {
        console.log("Success Verify");
        console.log(response);
        this.toastrService.typeSave('Verification Successed');
        this.location.back();
        this.spinner.hide();
      },
      (error) => {
        console.log("Error Verify");
        console.log(error);
        this.toastrService.typeErrorCustom(error);
        this.spinner.hide();

      }
    );


  }

  FillForm(): void {
    this.spinner.show();
    this.apiUrl = 'http://R2AppServer/POC/LeaveManagement/GetLeaveMngmt';
    var currentUserContext = JSON.parse(localStorage.getItem("UserContext"));
    this.leaveManagementObj = new LeaveManagementObj();
    this.leaveManagementObj.leaveMngmtId = +this.param;

    this.adInsService.postData(this.apiUrl, this.leaveManagementObj).subscribe(
      (response) => {
        console.log("Success Get Object");
        console.log(response);
        this.leaveManagementObj = response.returnObject;
        this.verifBy = currentUserContext.UserName;
        this.spinner.hide();
      },
      (error) => {
        console.log("Error Get Object");
        console.log(error);
        this.spinner.hide();
      }
    );
  }

}
