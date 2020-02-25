import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrObj } from 'app/shared/model/CurrObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-currency-add',
  templateUrl: './currency-add.component.html',
  styleUrls: ['./currency-add.component.scss'],
  providers: [NGXToastrService]
})
export class CurrencyAddComponent implements OnInit {

  pageType: string = "add";
  refCurrId: any;
  currObj: CurrObj;
  resultData: any;
  getUrl: any;
  addUrl: any;
  editUrl: any;

  RefCurrForm = this.fb.group({
    CurrCode: ['', [Validators.required, Validators.maxLength(50)]],
    CurrName: ['', [Validators.required, Validators.maxLength(100)]],
    RoundedAmt: ['', Validators.required],
    MinRefundAmt: ['', Validators.required],
    RegRptCode: [''],
    IsActive: [true]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.getUrl = AdInsConstant.GetRefCurrById;
    this.addUrl = AdInsConstant.AddRefCurr;
    this.editUrl = AdInsConstant.EditRefCurr;


    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["refCurrId"] != null) {
        this.refCurrId = params["refCurrId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.currObj = new CurrObj();
      this.currObj.RefCurrId = this.refCurrId;
      this.http.post(this.getUrl, this.currObj).subscribe(
        response => {
          this.resultData = response;
          this.refCurrId = this.resultData.RefCurrId;
          this.RefCurrForm.patchValue({
            CurrCode: this.resultData.CurrCode,
            CurrName: this.resultData.CurrName,
            RoundedAmt: this.resultData.RoundedAmt,
            MinRefundAmt: this.resultData.MinRefundAmt,
            RegRptCode: this.resultData.RegRptCode,
            IsActive: this.resultData.IsActive
          });

        },
        error => {
          console.log(error);
        }
      );
    }

  }

  SaveForm() {
    this.currObj = new CurrObj();
    this.currObj = this.RefCurrForm.value;    
    if (this.pageType == "add") {
      this.http.post(this.addUrl, this.currObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/currency/paging"]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.currObj.RefCurrId = this.refCurrId;
      this.currObj.RowVersion = this.resultData.RowVersion;
      this.http.post(this.editUrl, this.currObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/currency/paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
}
