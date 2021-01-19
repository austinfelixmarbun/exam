import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { PaymentAllocGrpObj } from 'app/shared/model/common-setting/PaymentAllocGrpObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-payment-alloc-group-detail',
  templateUrl: './payment-alloc-group-detail.component.html',
  styleUrls: ['./payment-alloc-group-detail.component.scss']
})
export class PaymentAllocGroupDetailComponent implements OnInit {
  RefPaymentAllocGrpId: string = ""
  RefPaymentAllocId: string = ""
  mode: string = "add";
  title: string = "Payment Allocation Group Information";
  Code: string = "";
  Name: string = "-";
  inputLookUpPaymentAllocObj: InputLookupObj = new InputLookupObj();
  ListPayAllocGrp: Array<KeyValueObj> = new Array<KeyValueObj>();
  PaymentAllocGrpObj: PaymentAllocGrpObj = new PaymentAllocGrpObj()

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.mode = params['mode'];
      }
      if (params['RefPaymentAllocGrpId'] != null) {
        this.RefPaymentAllocGrpId = params['RefPaymentAllocGrpId'];
      }
    });
  }

  PaymentAllocGrpForm = this.fb.group({
    MrPayAllocGrpCode: ['', Validators.required],
    RefPaymentAllocId: ['', Validators.required],
    IsActive: [false]
  });

  ngOnInit() {
    // LookUp Payment Alloc
    this.inputLookUpPaymentAllocObj = new InputLookupObj();
    this.inputLookUpPaymentAllocObj.urlJson = "./assets/uclookup/payment-alloc/lookup-payment-alloc.json";
    this.inputLookUpPaymentAllocObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookUpPaymentAllocObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookUpPaymentAllocObj.pagingJson = "./assets/uclookup/payment-alloc/lookup-payment-alloc.json";
    this.inputLookUpPaymentAllocObj.genericJson = "./assets/uclookup/payment-alloc/lookup-payment-alloc.json";
    this.inputLookUpPaymentAllocObj.isRequired = true

    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, { refMasterTypeCode: 'PAY_ALLOC_GRP_CODE' }).subscribe(
      (response) => {
        this.ListPayAllocGrp = response["ReturnObject"]
      },
      (error) => {
        console.log(error)
      }
    );

    if (this.mode === 'edit') {
      this.PaymentAllocGrpObj.RefPaymentAllocGrpId = +this.RefPaymentAllocGrpId
      this.http.post(URLConstant.GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate, this.PaymentAllocGrpObj).subscribe(
        (response) => {
          this.PaymentAllocGrpForm.patchValue({
            MrPayAllocGrpCode: response['MrPayAllocGrpCode'],
            RefPaymentAllocId: response['RefPaymentAllocId'],
            IsActive: response['IsActive']
          });

          var reqPayAllocObj = { RefPaymentAllocId: response['RefPaymentAllocId'] }
          this.http.post(environment.FoundationR3Url + '/RefPaymentAlloc/GetRefPaymentAllocById', reqPayAllocObj).subscribe(
            (response) => {
              this.inputLookUpPaymentAllocObj.idSelect = response["RefPaymentAllocId"]
              this.inputLookUpPaymentAllocObj.nameSelect = response["PaymentAllocCode"]
              this.Name = response['PaymentAllocName']
            }
          );
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
        }
      );
    }
  }

  getLookupPaymentAllocResponse(e) {
    this.PaymentAllocGrpForm.patchValue({
      RefPaymentAllocId: e.RefPaymentAllocId
    });

    this.Name = e.PaymentAllocName
  }

  SaveForm() {
    this.PaymentAllocGrpObj.RefPaymentAllocId = this.PaymentAllocGrpForm.controls["RefPaymentAllocId"].value;
    this.PaymentAllocGrpObj.MrPayAllocGrpCode = this.PaymentAllocGrpForm.controls["MrPayAllocGrpCode"].value;
    this.PaymentAllocGrpObj.IsActive = this.PaymentAllocGrpForm.controls["IsActive"].value;

    if (this.mode == 'add') {
      this.http.post(URLConstant.AddRefPaymentAllocGrp, this.PaymentAllocGrpObj).subscribe(
        //SAVE
        (response) => {
          this.router.navigate(['/CommonSetting/paymentallocgrp/paging']);
          this.toastr.successMessage(response["Message"]);
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
        }
      );
    }
    else {
      this.http.post(URLConstant.EditRefPaymentAllocGrp, this.PaymentAllocGrpObj).subscribe(
        //EDIT
        (response) => {
          this.router.navigate(['/CommonSetting/paymentallocgrp/paging']);
          this.toastr.successMessage(response["Message"]);
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
        }
      );
    }
  }
}