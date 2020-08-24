import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html'
})
export class CustomerViewComponent implements OnInit {
  custModel: any;
  custResultData: any;

  viewCustMainInfoHeaderObj: UcViewGenericObj = new UcViewGenericObj();
  viewCustCoyMainInfoHeader: UcViewGenericObj = new UcViewGenericObj();

  CustId: number;


  navLinks: any[];
  activeLinkIndex = -1;

  custType: string;
  viewCustJobData: string;
  getCustByCustIdUrl: string;
  viewCustJobDataAddress: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.getCustByCustIdUrl = URLConstant.GetCustByCustId;
  }
  changeRoute(url) {
    this.router.navigateByUrl('', { skipLocationChange: true });
    setTimeout(() => this.router.navigate(url));
  }
  ngOnInit() {
    this.viewCustMainInfoHeaderObj.viewInput = "./assets/ucviewgeneric/viewCustMainInfoHeader.json";
    this.viewCustMainInfoHeaderObj.viewEnvironment = environment.FoundationR3Url;

    this.viewCustCoyMainInfoHeader.viewInput = "./assets/ucviewgeneric/viewCustCoyMainInfoHeader.json";
    this.viewCustCoyMainInfoHeader.viewEnvironment = environment.FoundationR3Url;
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
    });
    var custObj = {
      CustId: this.CustId
    }
    this.http.post(this.getCustByCustIdUrl, custObj).subscribe(
      (response) => {
        this.custResultData = response;
        this.custModel = this.custResultData['MrCustModelCode'];
        this.custType = this.custResultData['MrCustTypeCode'];
      }
    );

  }

  mencuba(ev) {
    if (this.custType == CommonConstant.CustomerPersonal) {
      if (ev == 0) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/PersonalDetail'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 1) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/Address'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 2) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/PersonalContactPerson'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 3) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/CustomerGroup'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 4) {
        if (this.custModel == "PROF")
          this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
            this.router.navigate(['/View/Customer/PersonalJobData'], { queryParams: { "CustId": this.CustId } });
          });
        else if (this.custModel == "NONPROF")
          this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
            this.router.navigate(['/View/Customer/PersonalJobDataNonProf'], { queryParams: { "CustId": this.CustId } });
          });
        else if (this.custModel == "EMP")
          this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
            this.router.navigate(['/View/Customer/PersonalJobDataEmp'], { queryParams: { "CustId": this.CustId } });
          });
        else if (this.custModel == "SME")
          this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
            this.router.navigate(['/View/Customer/CustomerViewPersonalJobDataSmeComponent'], { queryParams: { "CustId": this.CustId } });
          });
      }
      else if (ev == 5) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/PersonalFinancialData'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 6) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/CoyOther'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 7) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/PersonalAppListing'], { queryParams: { "CustId": this.CustId } });
        });
      }
    }
    else if (this.custType == CommonConstant.CustomerCompany) {
      if (ev == 0) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/CoyDetail'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 1) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/Address'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 2) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/CoyManagement'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 3) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/CustomerGroup'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 4) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/CoyContact'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 5) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/CoyLegal'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 6) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/CoyManagement'], { queryParams: { "CustId": this.CustId } });
        });
      }
      else if (ev == 7) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/View/Customer/CoyOther'], { queryParams: { "CustId": this.CustId } });
        });
      }
    }
  }
}
