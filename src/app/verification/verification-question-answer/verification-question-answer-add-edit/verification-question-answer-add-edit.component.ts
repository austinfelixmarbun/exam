import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfQuestionAnswerObj } from 'app/shared/model/VerfQuestionAnswerObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-verification-question-answer-add-edit',
  templateUrl: './verification-question-answer-add-edit.component.html',
  providers: [NGXToastrService]
})
export class VerificationQuestionAnswerAddEditComponent implements OnInit {
  verfQuestionAnswerObj: VerfQuestionAnswerObj;
  VerfQuestionAnswerId: number;
  mode: string = "add";
  isActive: boolean = true;
  foundationUrl: string = environment.FoundationR3Url;
  itemVerfQuestionAnswer: any;
  verfQuestionAnswer: any;
  answerTypeCode: string = "DDL";
  isHidden: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfQuestionAnswerId = params["VerfQuestionAnswerId"];
      this.mode = params["mode"];
      if (this.mode == "edit")
        this.mode = "edit";
    })
  }

  QuestionAnswerForm = this.fb.group({
    VerfQuestionCode: ['', Validators.required],
    VerfQuestionText: ['', Validators.required],
    RefVerfAnswerTypeId: ['', Validators.required],
    VerfAnswer: ['', Validators.required],
    IsActive: [true],
    RowVersion: ['']
  })

  ngOnInit() {
    var refAnswerObj = {}
    this.http.post(URLConstant.GetActiveRefVerfAnswerTypes, refAnswerObj).subscribe(
      (response) => {
        this.itemVerfQuestionAnswer = response[CommonConstant.ReturnObj];
        if (this.itemVerfQuestionAnswer.length > 0) {
          let VerfAnswerData = this.itemVerfQuestionAnswer.find(x => x.VerfAnswerTypeCode == "DDL");
          this.QuestionAnswerForm.patchValue({
            RefVerfAnswerTypeId: VerfAnswerData.RefVerfAnswerTypeId
          });
          if(this.mode != "edit"){
            this.AnswerTypeChanged(VerfAnswerData.RefVerfAnswerTypeId);
          }
        }

        if (this.mode == "edit") {
          var verfAnswerObj = { VerfQuestionAnswerId: this.VerfQuestionAnswerId }
          this.http.post(URLConstant.GetVerfQuestionAnswerForUpdateById, verfAnswerObj).subscribe(
            (response) => {
              this.verfQuestionAnswer = response[CommonConstant.ReturnObj];

              refAnswerObj = { RefVerfAnswerTypeId: this.verfQuestionAnswer.RefVerfAnswerTypeId }
              this.http.post(URLConstant.GetRefVerfAnswerTypeById, refAnswerObj).subscribe(
                (respond) => {
                  this.answerTypeCode = respond["VerfAnswerTypeCode"];
                }
              )

              this.QuestionAnswerForm.patchValue({
                VerfQuestionCode: this.verfQuestionAnswer.VerfQuestionCode,
                VerfQuestionText: this.verfQuestionAnswer.VerfQuestionText,
                VerfAnswer: this.verfQuestionAnswer.VerfAnswer,
                RefVerfAnswerTypeId: this.verfQuestionAnswer.RefVerfAnswerTypeId,
                IsActive: this.verfQuestionAnswer.IsActive,
                RowVersion: this.verfQuestionAnswer.RowVersion
              });

              this.AnswerTypeChanged(this.verfQuestionAnswer.RefVerfAnswerTypeId);
            }
          );
        }
      })
  }

  AnswerTypeChanged(RefVerfAnswerTypeId) {
    var object = this.itemVerfQuestionAnswer.find(x => x.RefVerfAnswerTypeId == RefVerfAnswerTypeId);
    if (object.VerfAnswerTypeCode != "DDL") {
      this.QuestionAnswerForm.controls.VerfAnswer.clearValidators();
      this.isHidden = true;
    }
    else {
      this.QuestionAnswerForm.controls.VerfAnswer.setValidators([Validators.required]);
      this.isHidden = false;
    }
    this.QuestionAnswerForm.controls.VerfAnswer.updateValueAndValidity();
  }

  SaveForm() {
    this.verfQuestionAnswerObj = new VerfQuestionAnswerObj();
    this.verfQuestionAnswerObj = this.QuestionAnswerForm.value;
    this.verfQuestionAnswerObj.VerfQuestionCode = this.verfQuestionAnswerObj.VerfQuestionCode;
    this.verfQuestionAnswerObj.VerfQuestionText = this.verfQuestionAnswerObj.VerfQuestionText;
    this.verfQuestionAnswerObj.RefVerfAnswerTypeId = this.verfQuestionAnswerObj.RefVerfAnswerTypeId;
    this.verfQuestionAnswerObj.IsActive = this.verfQuestionAnswerObj.IsActive;

    if (this.mode == "edit") {
      this.verfQuestionAnswerObj.VerfQuestionAnswerId = this.VerfQuestionAnswerId;
      this.verfQuestionAnswerObj.RowVersion = this.verfQuestionAnswerObj.RowVersion;
      this.http.post(URLConstant.EditVerfQuestionAnswer, this.verfQuestionAnswerObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.router,["/Verification/QuestionAnswer/Paging"],{});
        });
    }
    else {
      this.verfQuestionAnswerObj.VerfQuestionAnswerId = "0";
      this.http.post(URLConstant.AddVerfQuestionAnswer, this.verfQuestionAnswerObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.router,["/Verification/QuestionAnswer/Paging"],{});
        });
    }
  }
}
