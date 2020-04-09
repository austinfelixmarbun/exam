import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfSchemeHObj } from 'app/shared/model/VerfSchemeHObj.Model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verification-question-scheme-member-paging',
  templateUrl: './verification-question-scheme-member-paging.component.html',
  styleUrls: ['./verification-question-scheme-member-paging.component.scss']
})
export class VerificationQuestionSchemeMemberPagingComponent implements OnInit {
  verfSchemeHObj: VerfSchemeHObj;
  VerfSchemeHId: number;
  VerfSchemeCode: string;
  VerfSchemeName: string;
  isActive: boolean = true;
  foundationUrl: string = environment.FoundationR3Url;
  verfQuestionScheme: any;
  listQuestionGroupD: any;
  verfSchemeObj: any;

  constructor(private router: Router, private route: ActivatedRoute,
    private http: HttpClient, public toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfSchemeHId = params["VerfSchemeHId"];
    })
  }

  ngOnInit() {
    this.verfSchemeObj = { VerfSchemeHId: this.VerfSchemeHId }
    this.http.post(AdInsConstant.GetVerfSchemeHById, this.verfSchemeObj).subscribe(
      (response) => {
        this.verfQuestionScheme = response;
        this.VerfSchemeCode = this.verfQuestionScheme.VerfSchemeCode;
        this.VerfSchemeName = this.verfQuestionScheme.VerfSchemeName;
      }
    );
    this.GetListVerfSchmD();
  }

  GetListVerfSchmD() {
    this.http.post(AdInsConstant.GetVerfSchemeDataByVerfSchemeHId, this.verfSchemeObj).subscribe(
      (response) => {
        this.listQuestionGroupD = response["ReturnObject"];
      }
    );
  }

  Edit(item) {
    this.router.navigateByUrl('/Verification/QuestionSchemeMember/Edit?VerfSchemeHId=' + this.VerfSchemeHId + '&VerfSchemeDId=' + item.VerfSchemeDId + '&VerfQuestionGrpHId=' + item.VerfQuestionGrpHId);
  }

  DeleteData(VerfSchemeDId) {
    if (confirm("Are you sure to delete this record?")) {
      var VerfSchemeDObj = {
        VerfSchemeDId: VerfSchemeDId
      };
      this.http.post(AdInsConstant.DeleteVerfSchemeD, VerfSchemeDObj).subscribe(
        (response) => {
          this.toastr.success(response['message'], 'Success!');
          this.GetListVerfSchmD();
        },
        (error) => {
          console.log(error);
        });
    }
  }

}
