import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfSchemeDObj } from 'app/shared/model/VerfSchemeDObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-verification-question-scheme-member-add',
  templateUrl: './verification-question-scheme-member-add.component.html',
  providers: [NGXToastrService]
})
export class VerificationQuestionSchemeMemberAddComponent implements OnInit {
  viewObj: any;
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  verfSchemeDObj: VerfSchemeDObj;
  VerfSchemeHId: number;


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfSchemeHId = params["VerfSchemeHId"];
    })
  }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewVerifQuestSchmMbr.json";

    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/verifQuestionSchmMbrTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/verifQuestionSchmMbrTempPaging.json";

    this.GetListVerfQuestionGrpHByVerfSchemeDId();
  }

  GetListVerfQuestionGrpHByVerfSchemeDId() {
    var verfGroupObj = { VerfSchemeHId: this.VerfSchemeHId }
    this.http.post(URLConstant.GetVerfSchemeDsByVerfSchemeHId, verfGroupObj).subscribe(
      (response) => {
        var arrMemberList = new Array();
        console.log(arrMemberList);
        for (let index = 0; index < response[CommonConstant.ReturnObj].length; index++) {
          arrMemberList.push(response[CommonConstant.ReturnObj][index].VerfQuestionGrpHId)
        }

        if (arrMemberList.length != 0) {
          const addCritListVerfQuestionGrpHId = new CriteriaObj();
          addCritListVerfQuestionGrpHId.DataType = "numeric";
          addCritListVerfQuestionGrpHId.propName = "VERF_QUESTION_GRP_H_ID";
          addCritListVerfQuestionGrpHId.restriction = AdInsConstant.RestrictionNotIn;
          addCritListVerfQuestionGrpHId.listValue = arrMemberList;
          this.tempPagingObj.addCritInput.push(addCritListVerfQuestionGrpHId);
        }
        this.tempPagingObj.isReady = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }

  SaveQuestionSchemeMember(verfSchemeDObj: any) {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage('Please Add At Least One Data');
      return;
    }

    this.verfSchemeDObj = new VerfSchemeDObj();
    this.verfSchemeDObj.VerfSchemeHId = this.VerfSchemeHId;
    this.verfSchemeDObj.VerfSchemeDId = "0";
    this.verfSchemeDObj.ListVerfQuestionGrpHId = this.listSelectedId;

    this.http.post(URLConstant.AddListVerfSchemeD, this.verfSchemeDObj).subscribe(
      response => {
        this.toastr.successMessage(response['message']);
        this.router.navigate(["/Verification/QuestionSchemeMemberPaging"], { queryParams: { "VerfSchemeHId": this.VerfSchemeHId } });
      },
      error => {
        console.log(error);
      }
    );
  }
}
