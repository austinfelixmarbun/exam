import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfQuestionGrpDObj } from 'app/shared/model/VerfQuestionGrpDObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-verification-question-group-member-edit',
  templateUrl: './verification-question-group-member-edit.component.html',
  providers: [NGXToastrService]
})
export class VerificationQuestionGroupMemberEditComponent implements OnInit {
  verfQuestionGrpDObj: VerfQuestionGrpDObj;
  VerfQuestionGrpHId: any;
  VerfQuestionGrpDId: any;
  pageType: any;
  result: any;
  title: string;
  mode: string = "add";
  apiUrl: any;
  isActive: boolean = true;
  foundationUrl: string = environment.FoundationR3Url;
  verfQuestionGroup: any;
  answerTypeValue: any = "DDL";

  VerfQuestionCode: any;
  VerfQuestionGrpName: any;
  VerfAnswerTypeDescr: any;
  VerfQuestionText: any;
  VerfAnswer: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfQuestionGrpDId = params["VerfQuestionGrpDId"];
      this.VerfQuestionGrpHId = params["VerfQuestionGrpHId"];
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
    var verfGroupObj = { VerfQuestionGrpDId: this.VerfQuestionGrpDId }
    this.http.post(URLConstant.GetVerfQuestionGrpDForUpdateById, verfGroupObj).subscribe(
      (response) => {
        this.verfQuestionGroup = response[CommonConstant.ReturnObj];
        this.QuestionGroupForm.patchValue({
          VerfQuestionGrpDId: this.verfQuestionGroup.VerfQuestionGrpDId,
          VerfQuestionGrpHId: this.verfQuestionGroup.VerfQuestionGrpHId,
          VerfQuestionAnswerId: this.verfQuestionGroup.VerfQuestionAnswerId,
          SeqNo: this.verfQuestionGroup.SeqNo,
          IsActive: this.verfQuestionGroup.IsActive,
          RowVersion: this.verfQuestionGroup.RowVersion
        });
        this.answerTypeValue = this.verfQuestionGroup.VerfAnswerTypeCode;
        this.VerfQuestionCode = this.verfQuestionGroup.VerfQuestionCode;
        this.VerfQuestionGrpName = this.verfQuestionGroup.VerfQuestionGrpName;
        this.VerfAnswerTypeDescr = this.verfQuestionGroup.VerfAnswerTypeDescr;
        this.VerfQuestionText = this.verfQuestionGroup.VerfQuestionText;
        this.VerfAnswer = this.verfQuestionGroup.VerfAnswer;
      }
    );
  }

  SaveForm() {
    this.verfQuestionGrpDObj = new VerfQuestionGrpDObj();
    this.verfQuestionGrpDObj = this.QuestionGroupForm.value;
    this.verfQuestionGrpDObj.IsActive = this.verfQuestionGrpDObj.IsActive;
      this.verfQuestionGrpDObj.RowVersion = this.verfQuestionGrpDObj.RowVersion;
      console.log(this.verfQuestionGrpDObj);
      this.http.post(URLConstant.EditVerfQuestionGrpD, this.verfQuestionGrpDObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/Verification/QuestionGroupMemberPaging?VerfQuestionGrpHId=' + this.VerfQuestionGrpHId);
        },
        (error) => {
          console.log(error);
        });
    
  }

}
