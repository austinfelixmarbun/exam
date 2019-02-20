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
  apiUrl: any;

  JobPosition = '';
  leaveManagementObj: LeaveManagementObj;

  constructor(
    private service: NGXToastrService,
    private http: Http,
    private spinner: NgxSpinnerService,
    private location: Location,
    private adInsService: AdInsServiceService) { }

  ngOnInit() {
  }

  Save(ReqLeaveForm: NgForm): void {
    this.spinner.show();
    this.spinner.hide();
  }

}
