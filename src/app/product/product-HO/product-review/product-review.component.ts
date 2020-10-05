import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html'
})
export class ProductReviewComponent implements OnInit {

  FormObj = this.fb.group({
    arr: this.fb.array([]),
    AppvAmt: [''],
    CreditScoring: [''],
    Reason: ['', Validators.required],
    ReasonDesc: [""],
    Approver: ['', Validators.required],
    ApproverDesc: [""],
    Notes: ['', Validators.required]
  });
  constructor(private http: HttpClient, private fb: FormBuilder) {

   }
  apvBaseUrl = environment.ApprovalURL;
  ngOnInit() {
  }

}
