import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfQuestionGrpHObj } from 'app/shared/model/VerfQuestionGrpHObj.Model';
import { VerfSchemeHObj } from 'app/shared/model/VerfSchemeHObj.Model';

@Component({
  selector: 'app-verification-question-scheme-member-paging',
  templateUrl: './verification-question-scheme-member-paging.component.html',
  styleUrls: ['./verification-question-scheme-member-paging.component.scss'],
  providers: [NGXToastrService]
})
export class VerificationQuestionSchemeMemberPagingComponent implements OnInit {
  verfSchemeHObj: VerfSchemeHObj;
  VerfSchemeHId: any;
  VerfSchemeCode: any;
  VerfSchemeName: any;
  pageType: any;
  result: any;
  title: string;
  mode: string = "add";
  apiUrl: any;
  isActive: boolean = true;
  foundationUrl: string = environment.FoundationR3Url;
  verfQuestionScheme: any;
  listQuestionGroupD: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfSchemeHId = params["VerfSchemeHId"];
      this.mode = params["mode"];
      if (this.mode != "edit")
        this.mode = "Add";
    })
  }

  QuestionSchemeForm = this.fb.group({
    VerfSchemeCode: ['', Validators.required],
    VerfSchemeName: ['', Validators.required],
    RowVersion: ['']
  })

  QuestionGroupListForm = this.fb.group({
  })

  ngOnInit() {
    var verfSchemeObj = { VerfSchemeHId: this.VerfSchemeHId }
    this.http.post(AdInsConstant.GetVerfSchemeHById, verfSchemeObj).subscribe(
      (response) => {
        console.log(response);
        this.verfQuestionScheme = response;
          this.VerfSchemeCode = this.verfQuestionScheme.VerfSchemeCode,
          this.VerfSchemeName = this.verfQuestionScheme.VerfSchemeName
      }
    );
    this.http.post(AdInsConstant.GetVerfSchemeDataByVerfSchemeHId, verfSchemeObj).subscribe(
      (response) => {
        this.listQuestionGroupD = response["ReturnObject"];
      }
    );
  }

  Edit(item)
  {
    this.router.navigateByUrl('/Verification/QuestionSchemeMember/Edit?VerfSchemeHId=' + this.VerfSchemeHId + '&VerfSchemeDId=' + item.VerfSchemeDId + '&VerfQuestionGrpHId=' + item.VerfQuestionGrpHId);
  }

}
