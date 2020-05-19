import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { HttpClient } from '@angular/common/http';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-customer-personal-page',
  templateUrl: './customer-personal-page.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerPersonalPageComponent implements OnInit {
  private stepper: Stepper;

  IdCust: number;
  CustPersonalId: number;
  CustStepIndex: number;
 
  isJob: boolean;
  isGroup: boolean;
  isOther: boolean;
  isDetail: boolean;
  isAddress: boolean;
  isContact: boolean;
  isFinancial: boolean;

  Page: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { 
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      if (params["Page"] != null) {
        this.Page = params["Page"];
      }
    });
  }

  CustStep = {
    "Detail": 1,
    "Address": 2,
    "Contact": 3,
    "Group": 4,
    "Job": 5,
    "Financial": 6,
    "Other": 7
  }

  back() {
    if (this.Page != null) {
      this.router.navigate(["/Customer/EditMainData/Paging"]);
    } else {
      this.router.navigate(["/Customer/Paging"]);
    }
  }

  ngOnInit() { 
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
    console.log(this.stepper);
    this.EnterTab("Detail");
    this.CustStepIndex = 1;
    this.stepper.to(1);
  }

  EnterTab(type) {
    if (type == "Detail") {
      // this.isDetail = true;
      // this.isAddress = false;
      // this.isContact = false;
      // this.isGroup = false;
      // this.isJob = false;
      // this.isFinancial = false;
      // this.isOther = false;
      this.CustStepIndex = 1;
    }

    if (type == "Address") {
      // this.isDetail = false;
      // this.isAddress = true;
      // this.isContact = false;
      // this.isGroup = false;
      // this.isJob = false;
      // this.isFinancial = false;
      // this.isOther = false;
      this.CustStepIndex = 2;
    }

    if (type == "Contact") {
      // this.isDetail = false;
      // this.isAddress = false;
      // this.isContact = true;
      // this.isGroup = false;
      // this.isJob = false;
      // this.isFinancial = false;
      // this.isOther = false;
      this.CustStepIndex = 3;
    }
    if (type == "Group") {
      // this.isDetail = false;
      // this.isAddress = false;
      // this.isContact = false;
      // this.isGroup = true;
      // this.isJob = false;
      // this.isFinancial = false;
      // this.isOther = false;
      this.CustStepIndex = 4;
    }
    if (type == "Job") {
      // this.isDetail = false;
      // this.isAddress = false;
      // this.isContact = false;
      // this.isGroup = false;
      // this.isJob = true;
      // this.isFinancial = false;
      // this.isOther = false;
      this.CustStepIndex = 5;
    }
    if (type == "Financial") {
      // this.isDetail = false;
      // this.isAddress = false;
      // this.isContact = false;
      // this.isGroup = false;
      // this.isJob = false;
      // this.isFinancial = true;
      // this.isOther = false;
      this.CustStepIndex = 6;
    }

    if (type == "Other") {
      // this.isDetail = false;
      // this.isAddress = false;
      // this.isContact = false;
      // this.isGroup = false;
      // this.isJob = false;
      // this.isFinancial = false;
      // this.isOther = true;
      this.CustStepIndex = 7;
    }
    this.stepper.to(this.CustStepIndex);
  }

  terimaValue(ev: any) {
    console.log(ev);
    // this.EnterTab(ev.NextTab);

    if (ev.CustPersonalId != undefined)
      this.CustPersonalId = ev.CustPersonalId;

    if (ev.stepMode != undefined)
    {
      console.log("testingg");
      if (ev.stepMode == "next")
        this.stepper.next();
      else
        this.stepper.previous();
    }
  }
}