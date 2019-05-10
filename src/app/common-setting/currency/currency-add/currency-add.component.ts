import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrObj } from 'app/shared/model/CurrObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { formatDate } from '@angular/common';
import { ExchangeRateObj } from 'app/shared/model/exchangeRateObj.Model';

@Component({
  selector: 'app-currency-add',
  templateUrl: './currency-add.component.html',
  styleUrls: ['./currency-add.component.scss'],
  providers: [NGXToastrService]
})
export class CurrencyAddComponent implements OnInit {

  exRate: string = "false";
  pageType: string = "add";
  refCurrId: any;
  currCode: any;
  currName: any;
  currDt: any;
  roundedAmt: any;
  minRefundAmt: any;
  regRptCode: any;
  exchangeRateId: any;
  exchangeRateAmt: any = 0;
  currObj: CurrObj;
  exRateObj: ExchangeRateObj;
  COFSchm: any;
  isActive: boolean = false;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  exRateUrl: any;
  addRateUrl: any;
  editRateUrl: any;
  settingUrl: string = environment.settingUrl;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    this.apiUrl = this.settingUrl + AdInsConstant.GetRefCurr;
    this.addUrl = this.settingUrl + AdInsConstant.AddRefCurr;
    this.editUrl = this.settingUrl + AdInsConstant.EditRefCurr;
    this.exRateUrl = this.settingUrl + AdInsConstant.GetExchangeRate;
    this.addRateUrl = this.settingUrl + AdInsConstant.AddExchangeRate;
    this.editRateUrl = this.settingUrl + AdInsConstant.EditExchangeRate;

    this.currDt = formatDate(localStorage.getItem("BusinessDate"), 'yyyy-MM-dd', 'en-US')

    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["refCurrId"] != null) {
        this.refCurrId = params["refCurrId"];
      }
      if (params["exRate"] != null) {
        this.exRate = params["exRate"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.currObj = new CurrObj();
      this.currObj.refCurrId = this.refCurrId;
      this.http.post(this.apiUrl, this.currObj).subscribe(
        response => {
          this.resultData = response["returnObject"];
          console.log(this.resultData);
          this.refCurrId = response["returnObject"]["refCurrId"];
          this.currCode = response["returnObject"]["currCode"];
          this.currName = response['returnObject']['currName'];
          this.roundedAmt = response['returnObject']['roundedAmt'];
          this.minRefundAmt = response['returnObject']['minRefundAmt'];
          this.regRptCode = response['returnObject']['regRptCode'];
          if (this.resultData.isActive == "1") {
            this.isActive = true;
          } else {
            this.isActive = false;
          }

        },
        error => {
          console.log(error);
        }
      );
    }

    if (this.exRate == 'true') {
      this.currObj = new CurrObj();
      this.currObj.refCurrId = this.refCurrId;
      this.http.post(this.apiUrl, this.currObj).subscribe(
        response => {
          this.resultData = response["returnObject"];
          console.log(this.resultData);
          this.refCurrId = response["returnObject"]["refCurrId"];
          this.currCode = response["returnObject"]["currCode"];
          this.currName = response['returnObject']['currName'];
          this.roundedAmt = response['returnObject']['roundedAmt'];
          this.minRefundAmt = response['returnObject']['minRefundAmt'];
          this.regRptCode = response['returnObject']['regRptCode'];
          if (this.resultData.isActive == "1") {
            this.isActive = true;
          } else {
            this.isActive = false;
          }

          var currRateObj = {
            RefCurrId: this.refCurrId
          };
          this.http.post(this.exRateUrl, currRateObj).subscribe(
            response => {
              if (response["returnObject"] != null) {
                this.exchangeRateId = response["returnObject"]["exchangeRateId"];
                this.exchangeRateAmt = response["returnObject"]["exchangeRateAmt"];
              }
              if (this.exchangeRateAmt == 0) {
                this.pageType = 'addExchange';
              } else {
                this.pageType = 'editExchange';
              }
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  SaveCurrForm(ReqCurrForm: NgForm) {
    console.log(ReqCurrForm);
    this.currObj = new CurrObj();
    this.currObj = ReqCurrForm.value;
    if (this.isActive === false) {
      this.currObj.isActive = "0";
    } else {
      this.currObj.isActive = "1";
    }
    
    if (this.pageType == "add") {
      this.http.post(this.addUrl, this.currObj).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/currency"]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.currObj.refCurrId = this.refCurrId;
      this.http.post(this.editUrl, this.currObj).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/currency"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  SaveRateForm(ReqRateForm: NgForm) {
    this.exRateObj = new ExchangeRateObj();
    this.exRateObj.refCurrId = this.refCurrId;
    this.exRateObj.currDt = this.currDt;
    this.exRateObj.exchangeRateAmt = ReqRateForm.value.exchangeRateAmt;

    if (this.pageType == "addExchange") {
      this.http.post(this.addRateUrl, this.exRateObj).subscribe(
        response => {
          console.log("addExchange");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/currency"]);
        },
        error => {
          console.log(error);
        }
      );
    } else if (this.pageType == "editExchange") {
      this.exRateObj.exChangeRateId = this.exchangeRateId;
      this.http.post(this.editRateUrl, this.exRateObj).subscribe(
        response => {
          console.log("editExchange");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/currency"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  toggleActive(e) {
    this.isActive = e.target.checked;
  }
  
}
