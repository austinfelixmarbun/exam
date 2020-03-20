import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfSchemeDObj } from 'app/shared/model/VerfSchemeDObj.Model';

@Component({
  selector: 'app-verification-question-scheme-member-edit',
  templateUrl: './verification-question-scheme-member-edit.component.html',
  styleUrls: ['./verification-question-scheme-member-edit.component.scss'],
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
    SeqNo: [''],
    IsActive: [false],
    RowVersion: ['']
  })

  ngOnInit() {
    var verfGroupObj = { VerfQuestionGrpHId: this.VerfQuestionGrpHId }
    this.http.post(AdInsConstant.GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById, verfGroupObj).subscribe(
      (response) => {
        console.log(response);
        this.verfQuestionGroup = response["ReturnObject"];
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
    console.log(this.verfSchemeDObj);
    this.http.post(AdInsConstant.EditVerfSchemeD, this.verfSchemeDObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        this.router.navigateByUrl('/Verification/QuestionSchemeMemberPaging?VerfSchemeHId=' + this.VerfSchemeHId);
      },
      (error) => {
        console.log(error);
      });
  }
}