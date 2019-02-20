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

@Component({
  selector: 'app-verf-detail',
  templateUrl: './verf-detail.component.html',
  styleUrls: ['./verf-detail.component.scss'],
  providers: [NGXToastrService]
})
export class VerfDetailComponent implements OnInit {

  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  VerifBy: any;
  Status = '';
  leaveManagementObj: LeaveManagementObj;

  constructor(
    private service: NGXToastrService,
    private http: Http,
    private spinner: NgxSpinnerService,
    private location: Location,
    private adInsService: AdInsServiceService) { }

  ngOnInit() {
    this.FillForm();
    this.VerifBy = this.leaveManagementObj.VerifBy;
  }

  Back(): void {
    this.location.back();
  }

  Save(LeaveVerifForm: NgForm): void {

  }

  FillForm(): void{
  this.spinner.show();
  var currentUserContext = JSON.parse(localStorage.getItem("UserContext"));
  this.leaveManagementObj = new LeaveManagementObj();
  this.leaveManagementObj.EmpName = 'Employee A';
  this.leaveManagementObj.JobPosition = 'Position A';
  this.leaveManagementObj.StartDt = '20/02/2019';
  this.leaveManagementObj.EndDt = '25/02/2019';
  this.leaveManagementObj.Reason = 'Vacation to Uranus';
  this.leaveManagementObj.VerifBy = currentUserContext.UserName;
  this.spinner.hide();
  }

}
