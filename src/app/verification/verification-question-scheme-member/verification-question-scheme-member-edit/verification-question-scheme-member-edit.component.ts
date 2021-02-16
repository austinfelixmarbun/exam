import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfSchemeDObj } from 'app/shared/model/VerfSchemeDObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-verification-question-scheme-member-edit',
  templateUrl: './verification-question-scheme-member-edit.component.html',
  providers: [NGXToastrService]
})
export class VerificationQuestionSchemeMemberEditComponent implements OnInit {
  verfSchemeDObj: VerfSchemeDObj;
  VerfSchemeHId: any;
  VerfSchemeDId: any;
  VerfQuestionGrpHId: any;
  SeqNo: any;
  pageType: any;
  result: any;
  title: string;
  mode: string = "add";
  apiUrl: any;
  isActive: boolean = true;
  foundationUrl: string = environment.FoundationR3Url;
  verfQuestionGroup: any;

  VerfQuestionGrpCode: any;
  VerfQuestionGrpName: any;

  readonly CancelLink: string = NavigationConstant.VERIF_QA_SCHM_MBR_PAGING;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfSchemeHId = params["VerfSchemeHId"];
      this.VerfSchemeDId = params["VerfSchemeDId"];
      this.VerfQuestionGrpHId = params["VerfQuestionGrpHId"];
      this.SeqNo = params["SeqNo"];
      this.mode = params["mode"];
      if (this.mode != "edit")
        this.mode = "Add";
    })
  }

  QuestionGroupForm = this.fb.group({
    VerfQuestionGrpDId: [''],
    VerfQuestionGrpHId: [''],
    VerfQuestionAnswerId: [''],
    SeqNo: ['',Validators.required],
    IsActive: [false],
    RowVersion: ['']
  })

  ngOnInit() {
    var verfGroupObj = { VerfSchemeDId: this.VerfSchemeDId }
    this.http.post(URLConstant.GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById, verfGroupObj).subscribe(
      (response) => {
        this.verfQuestionGroup = response[CommonConstant.ReturnObj];
        this.QuestionGroupForm.patchValue({
          VerfQuestionGrpDId: this.verfQuestionGroup.VerfQuestionGrpDId,
          VerfQuestionGrpHId: this.verfQuestionGroup.VerfQuestionGrpHId,
          VerfQuestionAnswerId: this.verfQuestionGroup.VerfQuestionAnswerId,
          SeqNo: this.verfQuestionGroup.SeqNo,
          RowVersion: this.verfQuestionGroup.RowVersion
        });
        this.VerfQuestionGrpCode = this.verfQuestionGroup.VerfQuestionGrpCode;
        this.VerfQuestionGrpName = this.verfQuestionGroup.VerfQuestionGrpName;
      }
    );
  }

  SaveForm() {
    this.verfSchemeDObj = new VerfSchemeDObj();
    this.verfSchemeDObj = this.QuestionGroupForm.value;
    this.verfSchemeDObj.VerfSchemeHId = this.VerfSchemeHId;
    this.verfSchemeDObj.VerfSchemeDId = this.VerfSchemeDId;
    this.http.post(URLConstant.EditVerfSchemeD, this.verfSchemeDObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VERIF_QA_SCHM_MBR_PAGING],{ "VerfSchemeHId": this.VerfSchemeHId });
      });
  }
}