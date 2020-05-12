import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { HttpClient } from '@angular/common/http';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-customer-personal-page',
  templateUrl: './customer-personal-page.component.html',
  styleUrls: ['./customer-personal-page.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerPersonalPageComponent implements OnInit {
 
  IdCust: string; 
  isDetail: boolean;
  isAddress: boolean;
  isContact: boolean;
  isGroup: boolean;
  isJob: boolean;
  isFinancial: boolean;
  isOther: boolean;
  CustPersonalId: number;
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
      this.isContact = false;
      this.isGroup = false;
      this.isJob = false;
      this.isFinancial = false;
      this.isOther = false;
    }

    if (type == "Address") {
      this.isDetail = false;
      this.isAddress = true;
      this.isContact = false;
      this.isGroup = false;
      this.isJob = false;
      this.isFinancial = false;
      this.isOther = false;
    }

    if (type == "Contact") {
      this.isDetail = false;
      this.isAddress = false;
      this.isContact = true;
      this.isGroup = false;
      this.isJob = false;
      this.isFinancial = false;
      this.isOther = false;
    }
    if (type == "Group") {
      this.isDetail = false;
      this.isAddress = false;
      this.isContact = false;
      this.isGroup = true;
      this.isJob = false;
      this.isFinancial = false;
      this.isOther = false;
    }
    if (type == "Job") {
      this.isDetail = false;
      this.isAddress = false;
      this.isContact = false;
      this.isGroup = false;
      this.isJob = true;
      this.isFinancial = false;
      this.isOther = false;
    }
    if (type == "Financial") {
      this.isDetail = false;
      this.isAddress = false;
      this.isContact = false;
      this.isGroup = false;
      this.isJob = false;
      this.isFinancial = true;
      this.isOther = false;
    }

    if (type == "Other") {
      this.isDetail = false;
      this.isAddress = false;
      this.isContact = false;
      this.isGroup = false;
      this.isJob = false;
      this.isFinancial = false;
      this.isOther = true;
    }
  }

  terimaValue(ev: any) {
    console.log(ev);
    this.CustPersonalId = ev.CustPersonalId;
  }

}