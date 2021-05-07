import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-customer-view-personal-family',
  templateUrl: './customer-view-personal-family.component.html'
})
export class CustomerViewPersonalFamilyComponent implements OnInit {
  CustFamilyList: Object[];
  CustId: number;

  constructor(private http: HttpClient,     private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.CustFamilyList = new Array<Object>();
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    this.http.post(URLConstant.GetMainCustAndListCustPersonalFamilyByCustId, { CustId: this.CustId }).toPromise().then(
      (response) => {
        this.CustFamilyList = response["CustPersonalFamilyList"];
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
