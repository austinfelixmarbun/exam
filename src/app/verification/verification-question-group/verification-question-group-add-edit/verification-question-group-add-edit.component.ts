import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfQuestionGrpHObj } from 'app/shared/model/VerfQuestionGrpHObj.Model';

@Component({
  selector: 'app-verification-question-group-add-edit',
  templateUrl: './verification-question-group-add-edit.component.html',
  styleUrls: ['./verification-question-group-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class VerificationQuestionGroupAddEditComponent implements OnInit {
  verfQuestionGrpHObj: VerfQuestionGrpHObj;
  VerfQuestionGrpHId: any;
  pageType: any;
  result: any;
  title: string;
  mode: string = "add";
  apiUrl: any;
  isActive: boolean = true;
  foundationUrl: string = environment.FoundationR3Url;
  verfQuestionGroup: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfQuestionGrpHId = params["VerfQuestionGrpHId"];
      this.mode = params["mode"];
      if (this.mode != "edit")
        this.mode = "Add";
    })
  }

  QuestionGroupForm = this.fb.group({
    VerfQuestionGrpCode: ['', Validators.required],
    VerfQuestionGrpName: ['', Validators.required],
    IsActive: [false],
    RowVersion: ['']
  })

  ngOnInit() {
    if (this.mode == "edit") {
      var verfGroupObj = { VerfQuestionGrpHId: this.VerfQuestionGrpHId }
      this.http.post(AdInsConstant.GetQuestionGrpHForUpdateById, verfGroupObj).subscribe(
        (response) => {
          this.verfQuestionGroup = response["ReturnObject"];
          this.QuestionGroupForm.patchValue({
            VerfQuestionGrpHId: this.verfQuestionGroup.VerfQuestionGrpHId,
            VerfQuestionGrpCode: this.verfQuestionGroup.VerfQuestionGrpCode,
            VerfQuestionGrpName: this.verfQuestionGroup.VerfQuestionGrpName,
            IsActive: this.verfQuestionGroup.IsActive,
            RowVersion: this.verfQuestionGroup.RowVersion
          });
        }
      );
    }
  }

  SaveForm() {
    this.verfQuestionGrpHObj = new VerfQuestionGrpHObj();
    this.verfQuestionGrpHObj = this.QuestionGroupForm.value;
    this.verfQuestionGrpHObj.VerfQuestionGrpCode = this.verfQuestionGrpHObj.VerfQuestionGrpCode;
    this.verfQuestionGrpHObj.VerfQuestionGrpName = this.verfQuestionGrpHObj.VerfQuestionGrpName;
    this.verfQuestionGrpHObj.IsActive = this.verfQuestionGrpHObj.IsActive;
    if (this.mode == "edit") {
      this.verfQuestionGrpHObj.RowVersion = this.verfQuestionGrpHObj.RowVersion;
      this.http.post(AdInsConstant.EditVerfQuestionGrpH, this.verfQuestionGrpHObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/Verification/QuestionGroupPaging');
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      this.verfQuestionGrpHObj.VerfQuestionGrpHId = "0";
      this.http.post(AdInsConstant.AddVerfQuestionGrpH, this.verfQuestionGrpHObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/Verification/QuestionGroupPaging');
        },
        (error) => {
          console.log(error);
        });
    }
  }
}
