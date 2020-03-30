import { Component, OnInit } from '@angular/core';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-customer-company-page',
  templateUrl: './customer-company-page.component.html',
  styleUrls: ['./customer-company-page.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerCompanyPageComponent implements OnInit {
  IdCust: any; 
  isDetail: any;
  isAddress: any;
  isContact: any;
  isGroup: any;
  isManagement: any;
  isLegal: any;
  isFinancial: any;
  isOther: any;
  CustCompanyId: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
     
    this.route.queryParams.subscribe(params => { 
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
  }
  ngOnInit() {
  }

  EnterTab(type) {
    if (type == "Detail") {
      this.isDetail = true;
      this.isAddress = false;
      this.isManagement = false;
      this.isGroup = false;
      this.isContact = false;
      this.isFinancial = false;
      this.isLegal = false;
      this.isOther = false;
    }
    if (type == "Address") {
      this.isDetail = false;
      this.isAddress = true;
      this.isManagement = false;
      this.isGroup = false;
      this.isContact = false;
      this.isFinancial = false;
      this.isLegal = false;
      this.isOther = false;
    }
    if (type == "Management") {
      this.isDetail = false;
      this.isAddress = false;
      this.isManagement = true;
      this.isGroup = false;
      this.isContact = false;
      this.isFinancial = false;
      this.isLegal = false;
      this.isOther = false;
    }
    if (type == "Group") {
      this.isDetail = false;
      this.isAddress = false;
      this.isManagement = false;
      this.isGroup = true;
      this.isContact = false;
      this.isFinancial = false;
      this.isLegal = false;
      this.isOther = false;
    }
    if (type == "Contact") {
      this.isDetail = false;
      this.isAddress = false;
      this.isManagement = false;
      this.isGroup = false;
      this.isContact = true;
      this.isFinancial = false;
      this.isLegal = false;
      this.isOther = false;
    }
    if (type == "Financial") {
      this.isDetail = false;
      this.isAddress = false;
      this.isManagement = false;
      this.isGroup = false;
      this.isContact = false;
      this.isFinancial = true;
      this.isLegal = false;
      this.isOther = false;
    }

    if (type == "Legal") {
      this.isDetail = false;
      this.isAddress = false;
      this.isManagement = false;
      this.isGroup = false;
      this.isContact = false;
      this.isFinancial = false;
      this.isLegal = true;
      this.isOther = false;
    }
    if (type == "Other") {
      this.isDetail = false;
      this.isAddress = false;
      this.isManagement = false;
      this.isGroup = false;
      this.isContact = false;
      this.isFinancial = false;
      this.isLegal = false;
      this.isOther = true;
    }
  }
  terimaValue(ev: any) {
    console.log(ev);
    this.CustCompanyId = ev.CustCompanyId;
  }
}
