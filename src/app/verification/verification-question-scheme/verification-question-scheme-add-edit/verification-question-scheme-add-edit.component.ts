import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfSchemeHObj } from 'app/shared/model/VerfSchemeHObj.Model';

@Component({
  selector: 'app-verification-question-scheme-add-edit',
  templateUrl: './verification-question-scheme-add-edit.component.html',
  styleUrls: ['./verification-question-scheme-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class VerificationQuestionSchemeAddEditComponent implements OnInit {
  verfSchemeHObj: VerfSchemeHObj;
  VerfSchemeHId: any;
  pageType: any;
  result: any;
  title: string;
  mode: string = "add";
  apiUrl: any;
  isActive: boolean = true;
  foundationUrl: string = environment.FoundationR3Url;
  verfQuestionScheme: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfSchemeHId = params["VerfSchemeHId"];
      this.mode = params["mode"];
      if (this.mode != "edit")
        this.mode = "Add";
    })
  }

  QuestionSchemeForm = this.fb.group({
    VerfSchemeHId: [''],
    VerfSchemeCode: ['', Validators.required],
    VerfSchemeName: ['', Validators.required],
    IsActive : [true],
    RowVersion: ['']
  })

  ngOnInit() {
    if (this.mode == "edit") {
      var verfGroupObj = { VerfSchemeHId: this.VerfSchemeHId }
      this.http.post(AdInsConstant.GetVerfSchemeHForUpdateById, verfGroupObj).subscribe(
        (response) => {
          this.verfQuestionScheme = response;
          console.log(this.verfQuestionScheme);
          this.QuestionSchemeForm.patchValue({
            VerfSchemeHId: this.verfQuestionScheme.VerfSchemeHId,
            VerfSchemeCode: this.verfQuestionScheme.VerfSchemeCode,
            VerfSchemeName: this.verfQuestionScheme.VerfSchemeName,
            IsActive : this.verfQuestionScheme.IsActive,
            RowVersion: this.verfQuestionScheme.RowVersion
          });
        }
      );
    }
  }

  SaveForm() {
    this.verfSchemeHObj = new VerfSchemeHObj();
    this.verfSchemeHObj = this.QuestionSchemeForm.value;
    if (this.mode == "edit") {
      this.verfSchemeHObj.RowVersion = this.verfSchemeHObj.RowVersion;
      this.http.post(AdInsConstant.EditVerfSchemeH, this.verfSchemeHObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(['/Verification/QuestionScheme/Paging']);
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      this.verfSchemeHObj.VerfSchemeHId = "0";
      this.http.post(AdInsConstant.AddVerfSchemeH, this.verfSchemeHObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(['/Verification/QuestionScheme/Paging']);
        },
        (error) => {
          console.log(error);
        });
    }
  }

}
