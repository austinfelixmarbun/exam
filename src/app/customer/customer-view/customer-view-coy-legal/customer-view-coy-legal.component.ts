import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsService } from 'app/shared/services/adIns.service';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-view-coy-legal',
  templateUrl: './customer-view-coy-legal.component.html',
  styleUrls: ['./customer-view-coy-legal.component.scss']
})

export class CustomerViewCoyLegalComponent implements OnInit {
  arrCrit: any;
  ddlItem: any;
  inputObj: any;
  responseResultLegal: any;
  responseResultCustAddr: any;
  responseResultCustAddrHist: any;

  CustId: number;
  GetCustCompanyLegalDocForCustViewByCustIdUrl: string;

  CustForm = this.fb.group({
    DdlAddress: ['']
  });


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService,
    private fb: FormBuilder
  ) {
    this.GetCustCompanyLegalDocForCustViewByCustIdUrl= AdInsConstant.GetCustCompanyLegalDocForCustViewByCustId
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    var custObj = { "CustId": this.CustId };
    this.http.post(this.GetCustCompanyLegalDocForCustViewByCustIdUrl, custObj).subscribe(
      response => {
        if (response['ReturnObject'].length > 0) {
          this.responseResultLegal = response['ReturnObject'];
        }
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }
}