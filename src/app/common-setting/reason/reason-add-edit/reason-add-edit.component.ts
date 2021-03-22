import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { RefReasonObj } from 'app/shared/model/RefReasonObj.Model';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-reason-add-edit',
  templateUrl: './reason-add-edit.component.html',
  providers: [NGXToastrService]
})
export class ReasonAddEditComponent implements OnInit {

  pageType: string = "add";
  refReasonId: number;
  resultData: RefReasonObj;
  allRefReasonType: Array<KeyValueObj>;
  refReasonTypeCode: string;
  RefReasonForm = this.fb.group({
    ReasonCode: ['', [Validators.required, Validators.maxLength(50)]],
    ReasonDescr: ['', [Validators.required, Validators.maxLength(100)]],
    RefReasonTypeCode: ['', [Validators.required, Validators.maxLength(50)]],
    IsActive: [true]
  });

  readonly CancelLink: string = NavigationConstant.CS_REASON_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params["mode"] != null) {
        this.pageType = params["mode"];
      }
      if (params["refReasonId"] != null) {
        this.refReasonId = params["refReasonId"];
      }
    });
  }

  ngOnInit() {
    this.http.post(URLConstant.GetValueReasonType, null).subscribe(
      (response) => {
        this.allRefReasonType = response[CommonConstant.ReturnObj];
        if (this.allRefReasonType.length > 0) {
          this.RefReasonForm.patchValue({ RefReasonTypeCode: response[CommonConstant.ReturnObj][0]['Key'] });
        }
      });

    if (this.pageType == "edit") {
      this.RefReasonForm.controls["ReasonCode"].disable();
      var refReasonObj = new RefReasonObj();
      refReasonObj.RefReasonId = this.refReasonId;
      this.http.post<RefReasonObj>(URLConstant.GetRefReasonById, refReasonObj).subscribe(
        response => {
          this.resultData = response;
          this.RefReasonForm.patchValue({
            ReasonCode: this.resultData.ReasonCode,
            ReasonDescr: this.resultData.ReasonDescr,
            RefReasonTypeCode: this.resultData.RefReasonTypeCode,
            IsActive: this.resultData.IsActive
          });
        }
      );
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      var refReasonObj = new RefReasonObj();
      refReasonObj.ReasonCode = this.RefReasonForm.controls["ReasonCode"].value;
      refReasonObj.ReasonDescr = this.RefReasonForm.controls["ReasonDescr"].value;
      refReasonObj.RefReasonTypeCode = this.RefReasonForm.controls["RefReasonTypeCode"].value;
      refReasonObj.IsActive = this.RefReasonForm.controls["IsActive"].value;
      refReasonObj.IsSystem = false;

      this.http.post(URLConstant.AddRefReason, refReasonObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_REASON_PAGING],{});
        }
      );
    } else {
      var refReasonObj = this.resultData;
      refReasonObj.ReasonDescr = this.RefReasonForm.controls["ReasonDescr"].value;
      refReasonObj.RefReasonTypeCode = this.RefReasonForm.controls["RefReasonTypeCode"].value;
      refReasonObj.IsActive = this.RefReasonForm.controls["IsActive"].value;
      this.http.post(URLConstant.EditRefReason, refReasonObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_REASON_PAGING],{});
        }
      );
    }
  }
}
