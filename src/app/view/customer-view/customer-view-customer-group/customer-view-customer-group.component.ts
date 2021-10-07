import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';

@Component({
  selector: 'app-customer-view-customer-group',
  templateUrl: './customer-view-customer-group.component.html'
})
export class CustomerViewCustomerGroupComponent implements OnInit {
  CustId: number;
  responseObj: any;
  custViewUrl: string;
  responseMemberCustGrpObj: any;
  IsReady: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.custViewUrl = environment.FoundationR3Web + "/View/Customer/PersonalDetail?CustId=";
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    
    let reqById: GenericObj = new GenericObj();
    reqById.Id = this.CustId;
    this.http.post(URLConstant.GetListCustGrpForCustViewById, reqById).subscribe(
      response => {
        this.responseObj = response['ParentCustGrp'];
        this.responseMemberCustGrpObj = response['ChildCustGrp'];
        this.IsReady = true;
      }
    );
  }
}
