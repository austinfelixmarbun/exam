import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import Stepper from 'bs-stepper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-customer-company-page',
  templateUrl: './customer-company-page.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerCompanyPageComponent implements OnInit {
  private stepper: Stepper;

  IdCust: number;
  CustCompanyId: number;
  CustStepIndex: number;

  isGroup: boolean;
  isLegal: boolean;
  isOther: boolean;
  isDetail: boolean;
  isAddress: boolean;
  isContact: boolean;
  isFinancial: boolean;
  isManagement: boolean;

  Page: string;
  From: string;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {

    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      if (params["Page"] != null) {
        this.Page = params["Page"];
      }
      if (params["From"] != null) {
        this.From = params["From"];
      }
    });
  }
  
  back() {
    if (this.From) {
      this.router.navigate(["/Customer/"+this.From+"/Paging"]);
    } else {
      this.router.navigate(["/Customer/Paging"]);
    }
  }

  ngOnInit() {
    if (this.IdCust == null) {
      this.router.navigate(["/Customer/Paging"]);
    }
    else {
      var custObj = { CustId: this.IdCust };
      this.http.post(URLConstant.GetCustCompanyByCustId, custObj).subscribe(
        (response: any) => {
          this.CustCompanyId = response['CustCompanyId'];
        } 
      );

      this.stepper = new Stepper(document.querySelector('#stepper1'), {
        linear: false,
        animation: true
      })
      this.EnterTab("Detail");
      this.CustStepIndex = 1;
      this.stepper.to(this.CustStepIndex);
    }
  }

  EnterTab(type) {
    if (type == "Detail") {
      this.CustStepIndex = 1;
    }
    if (type == "Address") {
      this.CustStepIndex = 2;
    }
    if (type == "Management") {
      this.CustStepIndex = 3;
    }
    if (type == "Group") {
      this.CustStepIndex = 4;
    }
    if (type == "Contact") {
      this.CustStepIndex = 5;
    }
    if (type == "Financial") {
      this.CustStepIndex = 6;
    }
    if (type == "Legal") {
      this.CustStepIndex = 7;
    }
    if (type == "CustAttr") {
      this.CustStepIndex = 8;
    }

    this.stepper.to(this.CustStepIndex);
  }
  
  getValue(ev: any) {
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
