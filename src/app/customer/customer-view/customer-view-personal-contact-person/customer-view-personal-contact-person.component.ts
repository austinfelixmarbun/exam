import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { environment } from 'environments/environment.sit';

@Component({
  selector: 'app-customer-view-personal-contact-person',
  templateUrl: './customer-view-personal-contact-person.component.html',
  styleUrls: ['./customer-view-personal-contact-person.component.scss']
})
export class CustomerViewPersonalContactPersonComponent implements OnInit {
  CustId: number;
  GetListCustPersonalContactPersonForCustViewByCustIdUrl = AdInsConstant.GetListCustPersonalContactPersonForCustViewByCustId;
  responseObj: any;
  resCustObj: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    var custAddrObj = { "CustId": this.CustId };
    this.http.post(this.GetListCustPersonalContactPersonForCustViewByCustIdUrl, custAddrObj).subscribe(
      response => {
        this.responseObj = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }

  openView(ContactPersonCustNo)
  {
    // GetCustByCustNo
    var custObj = new CustObj;
    custObj.CustNo = ContactPersonCustNo
    this.http.post(AdInsConstant.GetCustByCustNo, custObj).subscribe(
      response => {
        this.resCustObj = response;
        window.open( environment.FoundationR3Web + "/Customer/CustomerView/Page?CustId=" + this.resCustObj.CustId, "_blank");
        // window.open("/Customer/CustomerView/Page?CustId=" + this.resCustObj.CustId, "_blank");
      },
      error => {
        console.log(error);
      }
    );
  }
}
