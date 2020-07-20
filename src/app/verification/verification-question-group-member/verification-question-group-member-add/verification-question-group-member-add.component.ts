import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfQuestionGrpHObj } from 'app/shared/model/VerfQuestionGrpHObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { VerfQuestionGrpDObj } from 'app/shared/model/VerfQuestionGrpDObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-verification-question-group-member-add',
  templateUrl: './verification-question-group-member-add.component.html',
  providers: [NGXToastrService]
})
export class VerificationQuestionGroupMemberAddComponent implements OnInit {
  viewObj: any;
  listSelectedId: Array<number> = new Array<number>();
  verfQuestionGrpHObj: VerfQuestionGrpHObj;
  verfQuestionGrpDObj: VerfQuestionGrpDObj;
  VerfQuestionGrpHId: number;
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfQuestionGrpHId = params["VerfQuestionGrpHId"];
    })
  }

  QuestionGroupForm = this.fb.group({
  })

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVerifQuestGrpMbr.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.tempPagingObj.urlJson = "./assets/ucpaging/ucTempPaging/verifQuestionGrpMbrTempPaging.json";
    this.tempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.tempPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.tempPagingObj.pagingJson = "./assets/ucpaging/ucTempPaging/verifQuestionGrpMbrTempPaging.json";
    this.tempPagingObj.ddlEnvironments =
      [
        {
          name: "VQA.REF_VERF_ANSWER_TYPE_ID",
          environment: environment.FoundationR3Url
        }
      ];

    this.GetListVerfQuestionGrpDByVerfQuestionGrpHId();
  }

  GetListVerfQuestionGrpDByVerfQuestionGrpHId() {
    this.http.post(URLConstant.GetActiveVerfQuestionGrpDForUpdateByGrpHId, { VerfQuestionGrpHId: this.VerfQuestionGrpHId }).subscribe(
      (response) => {
        var arrMemberList = new Array();

        for (let index = 0; index < response[CommonConstant.ReturnObj].length; index++) {
          arrMemberList.push(response[CommonConstant.ReturnObj][index].VerfQuestionAnswerId)
        }

        if (arrMemberList.length != 0) {
          const addCritListVerfQuestionAnswerId = new CriteriaObj();
          addCritListVerfQuestionAnswerId.DataType = "numeric";
          addCritListVerfQuestionAnswerId.propName = "VERF_QUESTION_ANSWER_ID";
          addCritListVerfQuestionAnswerId.restriction = AdInsConstant.RestrictionNotIn;
          addCritListVerfQuestionAnswerId.listValue = arrMemberList;
          this.tempPagingObj.addCritInput.push(addCritListVerfQuestionAnswerId);
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

  SaveQuestionGroupMember() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage('Please Add At Least One Data');
      return;
    }

    this.verfQuestionGrpDObj = new VerfQuestionGrpDObj();
    this.verfQuestionGrpDObj.VerfQuestionGrpHId = this.VerfQuestionGrpHId;
    this.verfQuestionGrpDObj.VerfQuestionGrpDId = "0";
    this.verfQuestionGrpDObj.ListVerfQuestionAnswerId = this.listSelectedId;

    this.http.post(URLConstant.AddListVerfQuestionGrpD, this.verfQuestionGrpDObj).subscribe(
      response => {
        this.toastr.successMessage(response['message']);
        this.router.navigate(["/Verification/QuestionGroupMemberPaging"], { queryParams: { "VerfQuestionGrpHId": this.VerfQuestionGrpHId } });
      },
      error => {
        console.log(error);
      }
    );
  }
}
