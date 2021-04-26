import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrObj } from 'app/shared/model/CurrObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-currency-add',
  templateUrl: './currency-add.component.html',
  providers: [NGXToastrService]
})
export class CurrencyAddComponent implements OnInit {

  pageType: string = "add";
  refCurrId: any;
  currObj: CurrObj;
  resultData: any;
  RefCurrForm = this.fb.group({
    CurrCode: ['', [Validators.required, Validators.maxLength(5)]],
    CurrName: ['', [Validators.required, Validators.maxLength(100)]],
    RegRptCode: ['', [Validators.required, Validators.maxLength(100)]],
    UCNumber: [''],
    UCNumber2: [''],
    IsActive: [true]
  });

  UcNumber: any;
  UcNumber2: any;
  UcNumber3: any;

  readonly CancelLink: string = NavigationConstant.CS_CURRENCY_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
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
      this.RefCurrForm.controls["CurrCode"].disable();
      this.currObj = new CurrObj();
      this.currObj.RefCurrId = this.refCurrId;
      this.http.post(URLConstant.GetRefCurrById, {Id: this.refCurrId}).subscribe(
        response => {
          this.resultData = response;
          this.RefCurrForm.patchValue({
            CurrCode: this.resultData.CurrCode,
            CurrName: this.resultData.CurrName,
            RegRptCode: this.resultData.RegRptCode,
            IsActive: this.resultData.IsActive
          });

        }
      );
    }

  }

  CommaFormatted(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.UcNumber) {
      this.UcNumber = this.UcNumber.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  numberCheck(args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.currObj = new CurrObj();
      this.currObj.CurrCode = this.RefCurrForm.controls["CurrCode"].value
      this.currObj.CurrName = this.RefCurrForm.controls["CurrName"].value;
      this.currObj.RegRptCode = this.RefCurrForm.controls["RegRptCode"].value;
      this.currObj.IsActive = this.RefCurrForm.controls["IsActive"].value;
      this.http.post(URLConstant.AddRefCurr, this.currObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_CURRENCY_PAGING],{});
        }
      );
    } else {
      this.currObj = this.resultData;
      this.currObj.RefCurrId = this.refCurrId;
      this.currObj.CurrName = this.RefCurrForm.controls["CurrName"].value;
      this.currObj.RegRptCode = this.RefCurrForm.controls["RegRptCode"].value;
      this.currObj.IsActive = this.RefCurrForm.controls["IsActive"].value;
      this.http.post(URLConstant.EditRefCurr, this.currObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_CURRENCY_PAGING],{});
        }
      );
    }
  }

}
