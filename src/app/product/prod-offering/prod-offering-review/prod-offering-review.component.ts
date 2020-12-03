import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-prod-offering-review',
  templateUrl: './prod-offering-review.component.html'
})
export class ProdOfferingReviewComponent implements OnInit {
 
  ProdOfferingHId: number;
  WfTaskListId: number;
  ProdOfferingId: number; 
  FormObj = this.fb.group({
    ApprovedById: ['', Validators.required],
    Notes: ['', Validators.required]
  });
  constructor(private toastr: NGXToastrService, private http: HttpClient, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private cookieService: CookieService) {
    this.route.queryParams.subscribe(params => {
      if (params["ProdOfferingHId"] != null) {
        this.ProdOfferingHId = params["ProdOfferingHId"];
      }
      if (params["WfTaskListId"] != null) {
        this.WfTaskListId = params["WfTaskListId"];
      }
      if (params["ProdOfferingId"] != null) {
        this.ProdOfferingId = params["ProdOfferingId"];
      }
    });
  }
  apvBaseUrl = environment.ApprovalURL;
  ngOnInit() { 
    this.ClaimTask(this.WfTaskListId);
  }

  onChangeApprover(ev) {
    this.FormObj.patchValue({
      ApprovedById: ev.target.selectedOptions[0].value
    });
  }

  SaveForm() {
    var data = {
      ProdOfferingId: this.ProdOfferingId,
      ProdOfferingHId: this.ProdOfferingHId,
      ApprovedById: this.FormObj.controls.ApprovedById.value,
      Notes: this.FormObj.controls.Notes.value,
      WfTaskListId: this.WfTaskListId,
    } 
    this.http.post(URLConstant.ReviewProdOffering, data).subscribe(
      (response) => {
        this.toastr.successMessage("Success");
        AdInsHelper.RedirectUrl(this.router,["/Product/OfferingReview"],{ });
      });
  }
  async ClaimTask(WfTaskListId) {
    var currentUserContext = JSON.parse(this.cookieService.get(CommonConstant.USER_ACCESS));
    var wfClaimObj = { pWFTaskListID: WfTaskListId, pUserID: currentUserContext[CommonConstant.USER_NAME], isLoading: false };
    this.http.post(URLConstant.ClaimTask, wfClaimObj).subscribe(() => { });
  }
}
