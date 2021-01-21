import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { RefPaymentAllocObj } from 'app/shared/model/common-setting/RefPaymentAllocObj.Model';

@Component({
  selector: 'app-payment-alloc-detail',
  templateUrl: './payment-alloc-detail.component.html'
})
export class PaymentAllocDetailComponent implements OnInit {
  mode: string = "add";
  title: string = "Payment Allocation";
  RefPaymentAllocId: number = 0;
  RefPaymentAllocObj: RefPaymentAllocObj = new RefPaymentAllocObj();

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
      this.RefPaymentAllocObj.RefPaymentAllocId = this.RefPaymentAllocId;
      this.http.post<RefPaymentAllocObj>(URLConstant.GetRefPaymentAllocByID, this.RefPaymentAllocObj).subscribe(
        (response) => {
          this.RefPaymentAllocObj = response;
          this.PaymentAllocForm.patchValue({
            PaymentAllocCode: response.PaymentAllocCode,
            PaymentAllocName: response.PaymentAllocName,
            IsSystem: response.IsSystem,
            IsActive: response.IsActive
          })
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  SaveForm() {
    this.RefPaymentAllocObj.PaymentAllocCode = this.PaymentAllocForm.value.PaymentAllocCode;
    this.RefPaymentAllocObj.PaymentAllocName = this.PaymentAllocForm.value.PaymentAllocName;
    this.RefPaymentAllocObj.IsActive = this.PaymentAllocForm.value.IsActive;
    this.RefPaymentAllocObj.IsSystem = this.PaymentAllocForm.value.IsSystem;

    if (this.mode === "add") {
      this.RefPaymentAllocObj.RowVersion = "";
      this.http.post(URLConstant.SubmitRefPaymentAlloc, this.RefPaymentAllocObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.router.navigateByUrl("/CommonSetting/paymentalloc/paging");
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
          this.router.navigateByUrl("/CommonSetting/paymentalloc/paging");
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}