import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { UcInputRFAObj } from 'app/shared/model/UcInputRFAObj.Model';

@Component({
  selector: 'app-product-ho-review',
  templateUrl: './product-ho-review.component.html',
  providers: [NGXToastrService]
})
export class ProductHoReviewComponent implements OnInit {
  InputObj: UcInputRFAObj;
  ProdId: number;
  WfTaskListId: number;
  ProdHId: number; 
  FormObj = this.fb.group({
    ApprovedById: ['', Validators.required],
    Notes: ['', Validators.required]
  });
  IsReady:Boolean=false;

  constructor(private toastr: NGXToastrService, private http: HttpClient, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
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
    this.initInputApprovalObj();
    this.ClaimTask(this.WfTaskListId);

  }

  onChangeApprover(ev) {
    this.FormObj.patchValue({
      ApprovedById: ev.target.selectedOptions[0].value
    });
  }

  initInputApprovalObj(){
    this.InputObj = new UcInputRFAObj();
    this.InputObj.ApvTypecodes = ["PRD_APV_TYPE"];
    this.InputObj.EnvUrl = environment.FoundationR3Url;
    this.InputObj.PathUrlGetSchemeBySchemeCode = URLConstant.GetSchemesBySchemeCode;
    this.InputObj.PathUrlGetCategoryByCategoryCode = URLConstant.GetRefSingleCategoryByCategoryCode;
    this.InputObj.PathUrlGetAdtQuestion = URLConstant.GetRefAdtQuestion;
    this.InputObj.PathUrlGetPossibleMemberAndAttributeExType = URLConstant.GetPossibleMemberAndAttributeExType;
    this.InputObj.PathUrlGetApprovalReturnHistory = URLConstant.GetApprovalReturnHistory;
    this.InputObj.PathUrlCreateNewRFA = URLConstant.CreateNewRFA;
    this.InputObj.PathUrlCreateJumpRFA = URLConstant.CreateJumpRFA;
    this.InputObj.CategoryCode = CommonConstant.CAT_CODE_PRD_HO_APV;
    this.InputObj.SchemeCode = CommonConstant.SCHM_CODE_APV_HO_ACT_SCHM;

    var data = {
      ProdId: this.ProdId
    } 
    this.http.post(URLConstant.GetProductById, data).subscribe(
      (response) => {
        this.InputObj.TrxNo = response["ProdCode"];
        this.IsReady = true;
      });
  }

  SaveForm(event) {
    var data = {
      ProdHId: this.ProdHId,
      ProdId: this.ProdId,
      // ApprovedById: this.FormObj.controls.ApprovedById.value,
      // Notes: this.FormObj.controls.Notes.value, 
      WfTaskListId: this.WfTaskListId,
    }
    console.log(data);
    this.http.post(URLConstant.NewReviewProduct, data).subscribe(
      (response) => {
        this.toastr.successMessage("Success");
        AdInsHelper.RedirectUrl(this.router,["/Product/HOReview"],{ });
      });
  }
  async ClaimTask(WfTaskListId) {
    var currentUserContext = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    var wfClaimObj = { pWFTaskListID: WfTaskListId, pUserID: currentUserContext[CommonConstant.USER_NAME], isLoading: false };
    this.http.post(URLConstant.ClaimTask, wfClaimObj).subscribe(() => { });
  }

}
