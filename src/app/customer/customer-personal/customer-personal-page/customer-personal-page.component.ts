import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { HttpClient } from '@angular/common/http';
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

    var custObj = { CustId: this.IdCust };
    this.http.post(AdInsConstant.GetCustPersonalbyCustId, custObj).subscribe(
      (response: any) => {
        this.CustPersonalId = response['CustPersonalId'];
      }
    );

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
    console.log(this.stepper);
    this.EnterTab("Detail");
    this.CustStepIndex = 1;
    this.stepper.to(this.CustStepIndex);
  }

  EnterTab(type) {
    if (type == "Detail") {
      this.CustStepIndex = 1;
    }

    if (type == "Address") {
      this.CustStepIndex = 2;
    }

    if (type == "Contact") {
      this.CustStepIndex = 3;
    }
    if (type == "Group") {
      this.CustStepIndex = 4;
    }
    if (type == "Job") {
      this.CustStepIndex = 5;
    }
    if (type == "Financial") {
      this.CustStepIndex = 6;
    }

    if (type == "Other") {
      this.CustStepIndex = 7;
    }
    this.stepper.to(this.CustStepIndex);
  }

  getValue(ev: any) {
    console.log("GetValue: " + JSON.stringify(ev));
    if (ev.stepMode != undefined) {
      if (ev.stepMode == "next"){
        this.stepper.next();
        this.CustStepIndex++;
      }
      else{
        this.stepper.previous();
        this.CustStepIndex--;
      }
    }
  }
}