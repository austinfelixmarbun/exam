import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { CookieService } from 'ngx-cookie';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { VerfQuestionAnswerCustomObj } from 'app/shared/model/verf-question-answer/verf-question-answer-custom.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { VerifResulHDetailObj } from 'app/shared/model/verf-result-h/verf-result-h-detail-obj.model';
import { VerfResultDObj } from 'app/shared/model/verf-result-d/VerfResultD.model';
import { ReqUpdateSrvyTaskAndAddVerfResultHDObj } from 'app/shared/model/request/srvy-task/req-update-srvy-task-and-add-verf-result-h-d-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ReqGetVerfResultHObj } from 'app/shared/model/request/verf-result-h/req-verf-result-h-obj.model';
import { ResVerfResultHByTrxRefNoAndMrAddrTypeCodeObj } from 'app/shared/model/response/verf-result-h/res-verf-result-h-by-trx-ref-no-and-mr-addr-type-code-obj.model';
import { Subscription } from 'rxjs';
import { UcTemplateService } from '@adins/uctemplate';

@Component({
  selector: 'app-self-custom-container-survey-task-result-detail',
  templateUrl: './self-custom-container-survey-task-result-detail.component.html'
})
export class SelfCustomContainerSurveyTaskResultDetailComponent implements OnInit, OnDestroy {

  @Input() dicts: Record<string, any>;
  @Output() next: EventEmitter<any> = new EventEmitter<any>();

  subscriber: Subscription;

  ReqGetVerfResultHObj: ReqGetVerfResultHObj = new ReqGetVerfResultHObj();
  ResVerfResultHObj: ResVerfResultHByTrxRefNoAndMrAddrTypeCodeObj = new ResVerfResultHByTrxRefNoAndMrAddrTypeCodeObj();
  ResVerfResultDObj: any;
  ReqSrvyTaskAndAddVerfResultHDObj: ReqUpdateSrvyTaskAndAddVerfResultHDObj = new ReqUpdateSrvyTaskAndAddVerfResultHDObj();
  QuestionObj: VerfQuestionAnswerCustomObj;
  VerfResultHD: VerifResulHDetailObj;

  VerfSchemeHId: number = 0;
  isQuestionLoaded: boolean = true;
  isStatScs: boolean = false;
  PageType: string = "Add";
  ListVerfAnswer = [];

  SrvyTaskForm = this.fb.group({
    QuestionObjs: new FormArray([])
  });

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService, 
    private UrlConstantNew: UrlConstantNew,
    private ucTemplateSvc: UcTemplateService) { }

  async ngOnInit() {
    console.log(this.dicts)
    await this.getQuestion();
    await this.getData();

    if (this.dicts.formRaw != undefined && this.dicts.formRaw.MrVerfResultHStatCode != undefined)
    {
      this.isStatScs = this.dicts.formRaw.MrVerfResultHStatCode == "SCS"? true : false;
    }
    console.log("===========isStatScs", this.isStatScs)

    this.subscriber = this.ucTemplateSvc.callback.subscribe((ev) => {
      // this.callbackSubscribe(ev)
      console.log("===========MrVerfResultHStatCode")
      if (ev != undefined && !ev.hasOwnProperty("pageId")) {
        if (ev === "MrVerfResultHStatCode") {
          const _MrVerfResultHStatCode = this.dicts.formRaw.MrVerfResultHStatCode;
          if (_MrVerfResultHStatCode) {
            this.isStatScs = _MrVerfResultHStatCode == "SCS"? true : false;
            console.log("===========isStatScs", this.isStatScs)
          }
        }
      }
    });
  }

  waitFor(conditions) {
    const vote = resolve => {
      if (conditions()) resolve();
      else setTimeout(_ => vote(resolve), 250);
    }

    return new Promise(vote);
  }

  async callbackSubscribe(ev)
  {
    console.log("===========MrVerfResultHStatCode")
    if (ev != undefined && !ev.hasOwnProperty("pageId")) {
      if (ev === "MrVerfResultHStatCode") {
        await this.waitFor(_ => this.dicts.formRaw != undefined);
        await this.waitFor(_ => this.dicts.formRaw.MrVerfResultHStatCode != undefined);
        const _MrVerfResultHStatCode = this.dicts.formRaw.MrVerfResultHStatCode;
        if (_MrVerfResultHStatCode) {
          this.isStatScs = _MrVerfResultHStatCode == "SCS"? true : false;
          console.log("===========isStatScs", this.isStatScs)
        }
      }
    }
  }
  

  ngOnDestroy(): void {
    if(this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

  async getQuestion(){
    let ReqGenericObj = new GenericObj();
    ReqGenericObj.Id = this.dicts.SrvyFormSchmId;

    await this.http.post(this.UrlConstantNew.GetSrvyFormSchmBySrvyFormSchmId, ReqGenericObj).toPromise().then(
      (response) => {
        if(response["VerfSchemeHId"] != null){
        this.VerfSchemeHId = response["VerfSchemeHId"];
      

      ReqGenericObj = new GenericObj();
      ReqGenericObj.Id = this.VerfSchemeHId; 
      this.http.post(this.UrlConstantNew.GetVerfQuestionAnswerListByVerfSchemeHId, ReqGenericObj).toPromise().then(
      (response) => {
        if(response["ReturnObject"]!=null){
          this.QuestionObj = response[CommonConstant.ReturnObj];
          this.GenerateFormVerfQuestion();
        }else{
          this.isQuestionLoaded = false;
        }
      });
      }
    });
  }

  dictAnswer: { [id: string]: string } = {};
  dictNotes: { [id: string]: string } = {};
  async getData(){
    this.ReqGetVerfResultHObj.TrxRefNo = this.dicts.SrvyTaskNo;
    this.ReqGetVerfResultHObj.MrAddrTypeCode = this.dicts.MrSrvyObjTypeCode;
    await this.http.post(this.UrlConstantNew.GetVerfResultHDsByTrxRefNoAndMrAddrTypeCode, this.ReqGetVerfResultHObj).toPromise().then(
      (response) => {
        if(response["VerfResultH"] != null){
          this.ResVerfResultHObj = response["VerfResultH"];
          this.ResVerfResultDObj = response["VerfResultD"];

          for(let a=0;a<this.ResVerfResultDObj.length;a++){
            const element = this.ResVerfResultDObj[a];
            this.dictAnswer[element.VerfQuestionText] = element.Answer;
            this.dictNotes[element.VerfQuestionText] = element.Notes;
          }

          for (let i = 0; i < this.SrvyTaskForm.controls["QuestionObjs"]["controls"].length; i++) {
            for (let j = 0; j < this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"].length; j++) {
              var checkName = this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["VerfQuestionText"].value;
              
              this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"].patchValue({
                Answer: this.dictAnswer[checkName],
                Notes: this.dictNotes[checkName]
              })
            }
          }

          this.PageType = "Edit";
        }
      }
    );
  }

  GenerateFormVerfQuestion() {
    var grpListObj = this.QuestionObj.VerfQuestionAnswerListObj;

    for (let i = 0; i < grpListObj.length; i++) {
      var QuestionGrp = this.fb.group({
        VerfQuestionGrpCode: grpListObj[i].VerfQuestionGrpCode,
        VerfQuestionGrpName: grpListObj[i].VerfQuestionGrpName,
        VerfQuestionAnswerList: this.fb.array([])
      }) as FormGroup;
      (this.SrvyTaskForm.controls["QuestionObjs"] as FormArray).push(QuestionGrp);
      var ResultGrp = this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"] as FormArray;
      var QuestionList = grpListObj[i].verfQuestionAnswerList;

      this.ListVerfAnswer.push([]);
      if (QuestionList.length != 0) {
        for (let j = 0; j < QuestionList.length; j++) {
          var QuestionResultGrp = this.fb.group({
            QuestionGrp: this.fb.group({
              VerfQuestionAnswerId: QuestionList[j].VerfQuestionAnswerId,
              RefVerfAnswerTypeId: QuestionList[j].RefVerfAnswerTypeId,
              VerfQuestionCode: QuestionList[j].VerfQuestionCode,
              VerfQuestionText: QuestionList[j].VerfQuestionText,
              VerfAnswer: QuestionList[j].VerfAnswer,
              IsActive: QuestionList[j].IsActive,
              VerfSchemeHId: QuestionList[j].VerfSchemeHId,
              VerfQuestionGrpCode: QuestionList[j].VerfQuestionGrpCode,
              VerfQuestionGrpName: QuestionList[j].VerfQuestionGrpName,
              VerfAnswerTypeCode: QuestionList[j].VerfAnswerTypeCode,
              VerfAnswerTypeDescr: QuestionList[j].VerfAnswerTypeDescr
            }),
            ResultGrp: this.fb.group({
              VerfResultDId: 0,
              VerfResultHId: 0,
              VerfQuestionAnswerId: QuestionList[j].VerfQuestionAnswerId,
              VerfQuestionText: QuestionList[j].VerfQuestionText,
              Answer: "",
              Notes: "",
              SeqNo: j + 1,
              Score: 0,
              VerfQuestionGroupCode: grpListObj[i].VerfQuestionGrpCode
            })
          }) as FormGroup;
          if (QuestionList[j].VerfAnswerTypeCode == CommonConstant.VerfAnswerTypeCodeDdl) {
            if (QuestionList[j].VerfAnswer != "") {
              var ddlList = QuestionList[j].VerfAnswer.split(";");
              this.ListVerfAnswer[i].push(ddlList);
              QuestionResultGrp.controls.ResultGrp.patchValue({
                Answer: this.ListVerfAnswer[i][j][0]
              })
            } else {
              this.ListVerfAnswer[i].push("");
            }
            QuestionResultGrp.controls.ResultGrp["controls"].Answer.setValidators([Validators.required])
          } else if (QuestionList[j].VerfAnswerTypeCode == CommonConstant.VerfAnswerTypeCodeUcInputNumber) {
            QuestionResultGrp.controls.ResultGrp["controls"].Answer.setValidators([Validators.required]);
            this.ListVerfAnswer[i].push("");
          } else {
            QuestionResultGrp.controls.ResultGrp["controls"].Answer.setValidators([Validators.required])
            this.ListVerfAnswer[i].push("");
          }
          ResultGrp.push(QuestionResultGrp);
        }
        this.ChangeResult();
      }
    }
  }

  ChangeResult() {
    if (this.dicts.formRaw == undefined || this.dicts.formRaw.MrVerfResultHStatCode == undefined) return;
    if (this.dicts.formRaw.MrVerfResultHStatCode == CommonConstant.VerfResultStatSuccess) {
      for (let i = 0; i < this.SrvyTaskForm.controls["QuestionObjs"]["controls"].length; i++) {
        for (let j = 0; j < this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"].length; j++) {
          this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].setValidators([Validators.required]);
          this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].updateValueAndValidity();
        }
      }
    }
    else {
      for (let i = 0; i < this.SrvyTaskForm.controls["QuestionObjs"]["controls"].length; i++) {
        for (let j = 0; j < this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"].length; j++) {
          this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].clearValidators();
          this.SrvyTaskForm.controls["QuestionObjs"]["controls"][i]["controls"]["VerfQuestionAnswerList"]["controls"][j]["controls"]["ResultGrp"]["controls"]["Answer"].updateValueAndValidity();
        }
      }
    }
  }

  setSurveyVerifData() {

    var businessDt = new Date(AdInsHelper.GetCookie(this.cookieService, CommonConstant.BUSINESS_DATE_RAW));
    var todaydate = new Date();
    businessDt.setHours(todaydate.getHours(), todaydate.getMinutes(), todaydate.getSeconds());
    var usertimezone = businessDt.getTimezoneOffset() * 60000;
    businessDt = new Date(businessDt.getTime() - usertimezone);

    this.VerfResultHD = new VerifResulHDetailObj();
    this.VerfResultHD.VerfResultDListObj = new Array<VerfResultDObj>();
    this.VerfResultHD.VerfResultHObj.VerfResultId = this.dicts.VerfResultId;
    this.VerfResultHD.VerfResultHObj.VerfSchemeHId = this.VerfSchemeHId;
    this.VerfResultHD.VerfResultHObj.MrVerfObjectCode = this.dicts.Type;
    this.VerfResultHD.VerfResultHObj.MrVerfSubjectRelationCode = this.dicts.Type;
    this.VerfResultHD.VerfResultHObj.MrVerfSubjectRelationName = this.dicts.CustName;
    this.VerfResultHD.VerfResultHObj.VerfDt = businessDt;
    this.VerfResultHD.VerfResultHObj.MrVerfResultHStatCode = this.dicts.formRaw.MrVerfResultHStatCode;
    this.VerfResultHD.VerfResultHObj.Phn = this.dicts.CustPhone;
    this.VerfResultHD.VerfResultHObj.PhnType = CommonConstant.VerfResultPhnTypeMobile;
    this.VerfResultHD.VerfResultHObj.Notes = this.dicts.formRaw.Notes;
    this.VerfResultHD.VerfResultHObj.Addr = this.dicts.Addr;
    this.VerfResultHD.VerfResultHObj.MrAddrTypeCode = this.dicts.MrSrvyObjTypeCode;
    this.VerfResultHD.VerfResultHObj.TrxRefNo = this.dicts.SrvyTaskNo;
    this.VerfResultHD.VerfResultHObj.RowVersion = this.dicts.RowVersionSrvyTask;

    if (this.dicts.formRaw.MrVerfResultHStatCode == CommonConstant.VerfResultStatSuccess) {
      for (let i = 0; i < this.SrvyTaskForm.controls["QuestionObjs"].value.length; i++) {
        var currGrp = this.SrvyTaskForm.controls["QuestionObjs"].value[i].VerfQuestionAnswerList;
        for (let j = 0; j < currGrp.length; j++) {
          var currAnswer = currGrp[j].ResultGrp;
          var question = new VerfResultDObj();
          question.VerfQuestionAnswerId = currAnswer.VerfQuestionAnswerId;
          question.VerfQuestionText = currAnswer.VerfQuestionText;
          question.Answer = currAnswer.Answer;
          question.Notes = currAnswer.Notes;
          question.SeqNo = currAnswer.SeqNo;
          question.VerfQuestionGroupCode = currAnswer.VerfQuestionGroupCode;
          this.VerfResultHD.VerfResultDListObj.push(question);
        }
      }
    }
  }

  Save(){
    if (this.isQuestionLoaded == false) {
      this.toastr.warningMessage("Can't process further because questions are not loaded");
    }
    else {
      if(this.PageType == "Add"){
        this.setSurveyVerifData();
        this.ReqSrvyTaskAndAddVerfResultHDObj.SrvyTaskId = this.dicts.SrvyTaskId;
        this.ReqSrvyTaskAndAddVerfResultHDObj.VerfResultHD = this.VerfResultHD;
        this.http.post(this.UrlConstantNew.UpdateSrvyTaskAndAddVerfResultH, this.ReqSrvyTaskAndAddVerfResultHDObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);

            if(response["StatusCode"] == '200'){
              const actions = [
                {
                  'result': {
                    'type': 'function',
                    'target': 'self',
                    'alias': '',
                    'methodName': 'NextStep',
                    'params': []
                  },
                  'conditions': []
                }
              ];
          
              this.next.emit({Actions: actions});
            }
          });

      }else if(this.PageType == "Edit"){
        this.setSurveyVerifData();
        this.ReqSrvyTaskAndAddVerfResultHDObj.SrvyTaskId = this.dicts.SrvyTaskId;
        this.ReqSrvyTaskAndAddVerfResultHDObj.VerfResultHD = this.VerfResultHD;
        this.ReqSrvyTaskAndAddVerfResultHDObj.VerfResultHD.VerfResultHId = this.ResVerfResultHObj.VerfResultHId;
        this.http.post(this.UrlConstantNew.UpdateSrvyTaskAndEditVerfResultH, this.ReqSrvyTaskAndAddVerfResultHDObj, AdInsConstant.SpinnerOptions).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);

            if(response["StatusCode"] == '200'){
              const actions = [
                {
                  'result': {
                    'type': 'function',
                    'target': 'self',
                    'alias': '',
                    'methodName': 'NextStep',
                    'params': []
                  },
                  'conditions': []
                }
              ];
          
              this.next.emit({Actions: actions});
            }
          });
      }
    }
  }

  Cancel() {
    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.SELF_CUSTOM_SURVEY_TASK_RESULT_PAGING],{});
  }

}
