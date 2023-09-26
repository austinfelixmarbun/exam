import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-self-custom-new-cust-header',
  templateUrl: './self-custom-new-cust-header.component.html'

})

export class SelfCustomNewCustHeaderComponent implements OnInit {

  pageName: string;

  from:string;

  @Input() CustId: number = 0;
  @Input() CustType: string = CommonConstant.CustomerPersonal;

  constructor(private UrlConstantNew: UrlConstantNew, private http: HttpClient, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {

      if (params["MrCustTypeCode"] == CommonConstant.CustTypePersonal && (params["From"] == CommonConstant.CustFromCustFamily || params["CustDataMode"] == CommonConstant.CustMainDataModeFamily)) {

        this.pageName = "CustomerFamilyMainDataRegistrationV2"
        return;
      }

      if (params["From"] == CommonConstant.CustFromCustShareholder) {

        this.pageName = "Customershareholderdetail"
        return;
      }

      if (params["From"] != CommonConstant.CustFromCustFamily && params["From"] != CommonConstant.CustFromCustShareholder) {

        this.pageName = "CustomerMainDataRegistrationV2"
        return;
      }
    });
  }

  ngOnInit(): void {
  }
}
