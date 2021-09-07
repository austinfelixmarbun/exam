import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';
import { ThirdPartyTsObj } from 'app/shared/model/ThirdPartyRslt/ThirdPartyTsObj.model';

@Component({
  selector: 'app-customer-view-trusting-social',
  templateUrl: './customer-view-trusting-social.component.html'
})
export class CustomerViewTrustingSocialComponent implements OnInit {

  @Input() ThirdPartyTrxNo: string = null;
  CustId: number;
  ThirdPartyTsObjs: Array<ThirdPartyTsObj> = new Array<ThirdPartyTsObj>();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
  }

  ngOnInit() {
    if(this.ThirdPartyTrxNo != null){
      this.getThirdPartyTsObj(this.ThirdPartyTrxNo);
    }  

    if(this.ThirdPartyTrxNo == null && this.CustId != null){
      this.getCustAndThirdPartyTsObj();
    } 
  }

  getCustAndThirdPartyTsObj(){
    var custObj = new CustObj();
    custObj.CustId = this.CustId;

    this.http.post(URLConstant.GetCustByCustId, { Id: this.CustId }).subscribe(
      responseCust => {
        this.getThirdPartyTsObj(responseCust["ThirdPartyTrxNo"]);
      });
  }

  getThirdPartyTsObj(thirdPartyTrxNo){
    this.http.post(URLConstant.GetListThirdPartyTrustingSocialByTrxNo, { TrxNo: thirdPartyTrxNo }).subscribe(
      responseThirdParty => {
        this.ThirdPartyTsObjs = responseThirdParty["ReturnObject"];
      });
  }
}