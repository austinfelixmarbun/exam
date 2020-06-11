import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfQuestionAnswerObj } from 'app/shared/model/VerfQuestionAnswerObj.Model';

@Component({
  selector: 'app-verification-question-answer-add-edit',
  templateUrl: './verification-question-answer-add-edit.component.html',
  styleUrls: ['./verification-question-answer-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class VerificationQuestionAnswerAddEditComponent implements OnInit {
  verfQuestionAnswerObj: VerfQuestionAnswerObj;
  VerfQuestionAnswerId: any;
  pageType: any;
  result: any;
  title: string;
  mode: string = "add";
  apiUrl: any;
  isActive: boolean = true;
  foundationUrl: string = environment.FoundationR3Url;
  editUrl: any;
  itemVerfQuestionAnswer: any;
  verfQuestionAnswer: any;
  answerTypeValue: any = "DDL";

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfQuestionAnswerId = params["VerfQuestionAnswerId"];
      this.mode = params["mode"];
      if (this.mode != "edit")
        this.mode = "Add";
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
    this.http.post(AdInsConstant.GetActiveRefVerfAnswerTypes, refAnswerObj).subscribe(
      (response) => {
        this.itemVerfQuestionAnswer = response["ReturnObject"];
        this.QuestionAnswerForm.patchValue({
          RefVerfAnswerTypeId: this.itemVerfQuestionAnswer[0].RefVerfAnswerTypeId
        });
      })


    if (this.mode == "edit") {
      var verfAnswerObj = { VerfQuestionAnswerId: this.VerfQuestionAnswerId }
      this.http.post(AdInsConstant.GetVerfQuestionAnswerForUpdateById, verfAnswerObj).subscribe(
        (response) => {
          this.verfQuestionAnswer = response["ReturnObject"];

          refAnswerObj = { RefVerfAnswerTypeId: this.verfQuestionAnswer.RefVerfAnswerTypeId }
          this.http.post(AdInsConstant.GetRefVerfAnswerTypeById, refAnswerObj).subscribe(
            (respond) => {
              this.answerTypeValue = respond["VerfAnswerTypeCode"];
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
        }
      );
    }
  }

  AnswerTypeChanged(selectedvalue)
  {
    var refAnswerObj = { RefVerfAnswerTypeId: selectedvalue };
    if(selectedvalue!="DDL")
    {
      this.QuestionAnswerForm.controls.VerfAnswer.clearValidators();
      
    }
    else
    {
      this.QuestionAnswerForm.controls.VerfAnswer.setValidators([Validators.required]);
    }
    this.QuestionAnswerForm.controls.VerfAnswer.updateValueAndValidity();
    
    
    this.http.post(AdInsConstant.GetRefVerfAnswerTypeById, refAnswerObj).subscribe(
      (respond) => {
        this.answerTypeValue = respond["VerfAnswerTypeCode"];
      }
    )
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
      this.http.post(AdInsConstant.EditVerfQuestionAnswer, this.verfQuestionAnswerObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/Verification/QuestionAnswerPaging');
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      this.verfQuestionAnswerObj.VerfQuestionAnswerId = "0";
      this.http.post(AdInsConstant.AddVerfQuestionAnswer, this.verfQuestionAnswerObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/Verification/QuestionAnswerPaging');
        },
        (error) => {
          console.log(error);
        });
    }
  }
}
