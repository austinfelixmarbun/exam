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
  selector: 'app-product-ho-review',
  templateUrl: './product-ho-review.component.html',
  providers: [NGXToastrService]
})
export class ProductHoReviewComponent implements OnInit {

  ProdId: number;
  WfTaskListId: number;
  ProdHId: number; 
  FormObj = this.fb.group({
    ApprovedById: ['', Validators.required],
    Notes: ['', Validators.required]
  });
  constructor(private toastr: NGXToastrService, private http: HttpClient, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private cookieService: CookieService) {
    this.route.queryParams.subscribe(params => {
      if (params["ProdId"] != null) {
        this.ProdId = params["ProdId"];
      }
      if (params["WfTaskListId"] != null) {
        this.WfTaskListId = params["WfTaskListId"];
      }
      if (params["ProdHId"] != null) {
        this.ProdHId = params["ProdHId"];
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
      ProdHId: this.ProdHId,
      ProdId: this.ProdId,
      ApprovedById: this.FormObj.controls.ApprovedById.value,
      Notes: this.FormObj.controls.Notes.value,
      WfTaskListId: this.WfTaskListId,
    } 
    this.http.post(URLConstant.ReviewProduct, data).subscribe(
      (response) => {
        this.toastr.successMessage("Success");
        AdInsHelper.RedirectUrl(this.router,["/Product/HOReview"],{ });
      });
  }
  async ClaimTask(WfTaskListId) {
    var currentUserContext = JSON.parse(this.cookieService.get(CommonConstant.USER_ACCESS));
    var wfClaimObj = { pWFTaskListID: WfTaskListId, pUserID: currentUserContext[CommonConstant.USER_NAME], isLoading: false };
    this.http.post(URLConstant.ClaimTask, wfClaimObj).subscribe(() => { });
  }

}
