import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { RefPaymentAllocObj } from 'app/shared/model/common-setting/RefPaymentAllocObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-payment-alloc-detail',
  templateUrl: './payment-alloc-detail.component.html'
})
export class PaymentAllocDetailComponent implements OnInit {
  mode: string = "add";
  title: string = "Payment Allocation";
  RefPaymentAllocId: number = 0;
  RefPaymentAllocObj: RefPaymentAllocObj = new RefPaymentAllocObj();

  readonly BackLink: string = NavigationConstant.CS_PAYMENT_ALLOC_PAGING;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params["RefPaymentAllocId"] != null) {
        this.RefPaymentAllocId = params["RefPaymentAllocId"];
      }
      if (params["mode"] != null) {
        this.mode = params["mode"];
      }
    });
  }

  PaymentAllocForm = this.fb.group({
    PaymentAllocCode: ['', [Validators.required, , Validators.maxLength(50)]],
    PaymentAllocName: ['', [Validators.required, , Validators.maxLength(100)]],
    IsSystem: [false],
    IsActive: [false]
  });

  ngOnInit() {
    if (this.mode === "edit") {
      this.PaymentAllocForm.controls['PaymentAllocCode'].disable();
      this.RefPaymentAllocObj.RefPaymentAllocId = this.RefPaymentAllocId;
      this.http.post<RefPaymentAllocObj>(URLConstant.GetRefPaymentAllocByID, this.RefPaymentAllocObj).subscribe(
        (response) => {
          this.RefPaymentAllocObj = response;
          this.PaymentAllocForm.patchValue({
            PaymentAllocCode: response.PaymentAllocCode,
            PaymentAllocName: response.PaymentAllocName,
            IsSystem: false,
            IsActive: response.IsActive
          })
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else this.PaymentAllocForm.controls['PaymentAllocCode'].enable();
  }

  SaveForm() {
    this.RefPaymentAllocObj.PaymentAllocCode = this.PaymentAllocForm.controls['PaymentAllocCode'].value;
    this.RefPaymentAllocObj.PaymentAllocName = this.PaymentAllocForm.value.PaymentAllocName;
    this.RefPaymentAllocObj.IsActive = this.PaymentAllocForm.value.IsActive;
    this.RefPaymentAllocObj.IsSystem = this.PaymentAllocForm.value.IsSystem;

    if (this.mode === "add") {
      this.RefPaymentAllocObj.RowVersion = "";
      this.http.post(URLConstant.SubmitRefPaymentAlloc, this.RefPaymentAllocObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.router.navigateByUrl(NavigationConstant.CS_PAYMENT_ALLOC_PAGING);
        },
        error => {
          console.log(error);
        }
      )
    }
    else if (this.mode === "edit") {
      this.http.post(URLConstant.SubmitRefPaymentAlloc, this.RefPaymentAllocObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.router.navigateByUrl(NavigationConstant.CS_PAYMENT_ALLOC_PAGING);
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}