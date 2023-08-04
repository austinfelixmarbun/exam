import { Component, Input, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-self-custom-container-third-party-form',
  templateUrl: './self-custom-container-third-party-form.component.html',
  styleUrls: ['./self-custom-container-third-party-form.component.css']
})
export class SelfCustomContainerThirdPartyFormComponent implements OnInit {

  IsCustLoaded: boolean = true;
  @Input() CustId: number = 0;
  @Input() MrCustTypeCode: string = CommonConstant.MR_CUST_TYPE_CODE_PERSONAL;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;

  constructor() { }

  ngOnInit(): void {
    // if (this.CustId == 0)
    // {
    //   this.IsCustLoaded = true
    // }
    alert(this.MrCustTypeCode)
  }

  SetThirdPartyTrxNo(ev: any)
  {

  }

  SetCustFileFormObjs(ev: any)
  {

  }

}
