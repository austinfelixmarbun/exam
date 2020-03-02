import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { HttpClient } from '@angular/common/http';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';

@Component({
  selector: 'app-dummy3',
  templateUrl: './dummy3.component.html',
  styleUrls: ['./dummy3.component.scss']
})
export class Dummy3Component implements OnInit {

  param: string;
  mode: string = "add";
  key: any;
  criteria: CriteriaObj[] = [];
  bankObj: RefBankObj;
  result: any;

  RefBankForm = this.fb.group({
    BankCode: ['', Validators.required],
    BankName: ['', Validators.required],
    RegRptCode: [''],
    IsActive: [true]
  });

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.param = params["refBankId"];
      this.mode = params["mode"];
      this.key = params["key"];
      if (this.mode == "edit") {
        var tempCrit = new CriteriaObj();
        tempCrit.propName = this.key;
        tempCrit.restriction = "Eq";
        tempCrit.value = this.param;
        this.criteria.push(tempCrit);
      }
    })
  }

  ngOnInit() {
    console.log("add/edit bank");
    if (this.mode == "edit") {
      this.RefBankForm.controls.BankCode.disable();

      var BankObj = new RefBankObj();
      BankObj.refBankId = this.param;
      this.http.post("http://r3app-server.ad-ins.com/FOUNDATION_R3/RefBank/GetRefBankByRefBankIdAsync", BankObj).subscribe(
        (response) => {
          console.log(response);
          // this.result = response['returnObject'];
          // if (this.result.isActive == "1") {
          //     this.isActive = true;
          // }
          // else {
          //     this.isActive = false;
          // }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  SaveForm() {
    this.bankObj = new RefBankObj();
    this.bankObj = this.RefBankForm.value;
    console.log(this.bankObj);
    if (this.mode == "edit") {
      this.bankObj.bankCode = this.result.BankCode;
      this.bankObj.refBankId = this.param;
      this.http.post("http://r3app-server.ad-ins.com/FOUNDATION_R3/RefBank/EditRefBankAsync", this.bankObj).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      this.bankObj.refBankId = "0";
      this.bankObj["RowVersion"] = "";
      this.http.post("http://r3app-server.ad-ins.com/FOUNDATION_R3/RefBank/AddRefbankAsync", this.bankObj).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        });
    }
  }
  
  nextClicked() {
    // this.wizard.goToNextStep();
  }
}
