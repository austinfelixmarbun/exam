import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';
import { CustPersonalJobDataObj } from 'app/shared/model/CustPersonalJobDataObj.Model';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-job-addr-section',
  templateUrl: './job-addr-section.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class JobAddrSectionComponent implements OnInit {

  @Input() CustPersonalJobDataObj: CustPersonalJobDataObj = new CustPersonalJobDataObj();
  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  
  readonly CustAddrTypeJob: string = CommonConstant.CustAddrTypeJob;
  readonly CustAddrTypeOthBiz: string = CommonConstant.CustAddrTypeOthBiz;
  readonly CustAddrTypePreJob: string = CommonConstant.CustAddrTypePreJob;
  
  constructor(private http: HttpClient, private fb: FormBuilder, private cookieService: CookieService) { }

  ngOnInit() {
    this.BindJobAdd(this.JobAddr);
    this.BindJobAdd(this.PrevJobAddr);
    this.BindJobAdd(this.OthBizAddr);
  }

  businessDtMin: Date;
  AddControlFormJobAddr(){
    this.parentForm.addControl("JobAddrId", this.fb.control(''));
    this.parentForm.addControl("PrevCoyName", this.fb.control(''));
    this.parentForm.addControl("PrevEmploymentDt", this.fb.control(''));
    this.parentForm.addControl("PrevJobAddrId", this.fb.control(''));
    this.parentForm.addControl("OthBizName", this.fb.control(''));
    this.parentForm.addControl("OthBizType", this.fb.control(''));
    this.parentForm.addControl("OthBizIndustryTypeCode", this.fb.control(''));
    this.parentForm.addControl("OthBizJobPosition", this.fb.control(''));
    this.parentForm.addControl("OthBizEstablishmentDt", this.fb.control(''));
    this.parentForm.addControl("OthBizAddrId", this.fb.control(''));
    
    // JobAddrId: [0],
    // PrevCoyName: [''],
    // PrevEmploymentDt: [''],
    // PrevJobAddrId: [0],
    // OthBizName: [''],
    // OthBizType: [''],
    // OthBizIndustryTypeCode: [''],
    // OthBizJobPosition: [''],
    // OthBizEstablishmentDt: [''],
    // OthBizAddrId: [0],
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
  }

  dictJobAddr: {[Id: string]: InputAddressObj} ={};
  readonly JobAddr: string = CommonConstant.CustAddrTypeJob;
  readonly PrevJobAddr: string = CommonConstant.CustAddrTypePreJob;
  readonly OthBizAddr: string = CommonConstant.CustAddrTypeOthBiz;
  BindJobAdd(addrType: string){    
    this.dictJobAddr[addrType] = new InputAddressObj();
    let title: string = "";
    switch(addrType){
      case this.JobAddr:
        title = "Job Address";
        break;
      case this.OthBizAddr:
        title = "Other Business Address";
        this.dictJobAddr[addrType].isRequired=false;
        break;
      case this.PrevJobAddr:
        title = "Previous Job Address";
        this.dictJobAddr[addrType].isRequired=false;
        break;
    }
    this.dictJobAddr[addrType].showSubsection = false;
    this.dictJobAddr[addrType].title = title;
  }

  TurnValidator(){
    let tempCustModel: string = this.parentForm.get("MrCustModelCode").value;
    switch (tempCustModel) {
      case CommonConstant.CUST_MODEL_NONPROF:
        break;
      default:
        break;
    }
  }
}
