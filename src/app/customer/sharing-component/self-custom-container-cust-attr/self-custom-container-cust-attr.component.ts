import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-self-custom-container-cust-attr',
  templateUrl: './self-custom-container-cust-attr.component.html'
})
export class SelfCustomContainerCustAttrComponent implements OnInit {

  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  @Input() CustId: number = 0;
  @Input() parentForm: FormGroup;
  @Input() AttrGroupCustPersonalOther: string = CommonConstant.AttrGroupCustPersonalOther;
  @Input() listAttrCodes: Array<string> = [CommonConstant.AttrCodeDeptAml, CommonConstant.AttrCodeAuthAml];

  constructor() { }

  ngOnInit(): void {
    alert("x")
    console.log(this.CustId)
    console.log(this.parentForm)
    console.log(this.AttrGroupCustPersonalOther)
    console.log(this.listAttrCodes)
  }

}
