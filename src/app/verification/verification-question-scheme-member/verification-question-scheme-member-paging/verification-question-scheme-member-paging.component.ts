import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VerfSchemeHObj } from 'app/shared/model/VerfSchemeHObj.Model';
import { ToastrService } from 'ngx-toastr';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-verification-question-scheme-member-paging',
  templateUrl: './verification-question-scheme-member-paging.component.html'
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

  readonly AddLink: string = NavigationConstant.VERIF_QA_SCHM_MBR_ADD;
  readonly CancelLink: string = NavigationConstant.VERIF_QA_SCHM_PAGING;
  constructor(private router: Router, private route: ActivatedRoute,
    private http: HttpClient, public toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfSchemeHId = params["VerfSchemeHId"];
    })
  }

  ngOnInit() {
    this.http.post(URLConstant.GetVerfSchemeHById, {Id : this.VerfSchemeHId}).subscribe(
      (response) => {
        this.verfQuestionScheme = response;
        this.VerfSchemeCode = this.verfQuestionScheme.VerfSchemeCode;
        this.VerfSchemeName = this.verfQuestionScheme.VerfSchemeName;
      }
    );
    this.GetListVerfSchmD();
  }

  GetListVerfSchmD() {
    this.http.post(URLConstant.GetVerfSchemeDataByVerfSchemeHId, {Id : this.VerfSchemeHId}).subscribe(
      (response) => {
        this.listQuestionGroupD = response[CommonConstant.ReturnObj];
      }
    );
  }

  Edit(item) {
    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VERIF_QA_SCHM_MBR_EDIT],{ "VerfSchemeHId": this.VerfSchemeHId, "VerfSchemeDId": item.VerfSchemeDId, "VerfQuestionGrpHId": item.VerfQuestionGrpHId });
  }

  DeleteData(VerfSchemeDId) {
    if (confirm("Are you sure to delete this record?")) {
      var VerfSchemeDObj = {
        Id: VerfSchemeDId
      };
      this.http.post(URLConstant.DeleteVerfSchemeD, VerfSchemeDObj).subscribe(
        (response) => {
          this.toastr.success(response['message'], 'Success!');
          this.GetListVerfSchmD();
        });
    }
  }

}
