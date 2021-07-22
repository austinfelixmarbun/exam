import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-job-addr-section',
  templateUrl: './job-addr-section.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class JobAddrSectionComponent implements OnInit {

  @Input() CustId: number = 0;
  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  
  readonly CustAddrTypeJob: string = CommonConstant.CustAddrTypeJob;
  readonly CustAddrTypeOthBiz: string = CommonConstant.CustAddrTypeOthBiz;
  readonly CustAddrTypePreJob: string = CommonConstant.CustAddrTypePreJob;
  
  constructor() { }

  ngOnInit() {
  }

}
