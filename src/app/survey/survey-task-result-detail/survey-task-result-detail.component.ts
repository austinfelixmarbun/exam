import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { KeyValueObj } from 'app/shared/model/KeyValue/KeyValueObj.Model';
import { ReqUpdateSrvyTaskAndAddVerfResultHDObj } from 'app/shared/model/Request/SrvyTask/ReqUpdateSrvyTaskAndAddVerfResultHDObj.model';
import { ReqGetVerfResultObj } from 'app/shared/model/Request/VerfResult/ReqGetVerfResultObj.model';
import { ResSrvyTaskObj } from 'app/shared/model/Response/SrvyTask/ResSrvyTask.model';
import { ScoringResultHObj } from 'app/shared/model/ScoringResultHObj.model';
import { VerfQuestionAnswerCustomObj } from 'app/shared/model/VerfQuestionAnswer/VerfQuestionAnswerCustom.model';
import { VerfResultDObj } from 'app/shared/model/VerfResultD/VerfResultD.model';
import { VerifResulHDetailObj } from 'app/shared/model/VerfResultH/VerfResultHDetailObj.model';
import { VerfResultHObj } from 'app/shared/model/VerfResultHObj.Model';
import { VerfResultObj } from 'app/shared/model/VerfResultObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-survey-task-result-detail',
  templateUrl: './survey-task-result-detail.component.html'
})
export class SurveyTaskResultDetailComponent implements OnInit {
  @Input() SrvyTaskId:number;
  @Input() SrvyOrderId: number;
  @Input() SurveyorName: string;
  @Input() Type: string;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  ResultObj: Array<KeyValueObj>;
  ResSrvyTaskObj: ResSrvyTaskObj = new ResSrvyTaskObj();
  ReqGenericObj: GenericObj = new GenericObj();
  QuestionObj: VerfQuestionAnswerCustomObj;
  VerfResultHD: VerifResulHDetailObj;
  ReqSrvyTaskAndAddVerfResultHDObj: ReqUpdateSrvyTaskAndAddVerfResultHDObj = new ReqUpdateSrvyTaskAndAddVerfResultHDObj();
  addVerifResultObj: VerfResultObj;

  SrvyTaskForm = this.fb.group({
    MrVerfResultHStatCode: ['', [Validators.required, Validators.maxLength(50)]],
    Notes: ['', [Validators.required, Validators.maxLength(4000)]],
    QuestionObjs: new FormArray([])
  });


  ListVerfAnswer = [];
  SrvyOrderNo: string = "";
  // SrvyTaskNo: string = "";
  // SrvyFormSchmId: number = 0;
  VerfSchemeHId: number = 0;
  VerfResultId: number = 0;
  // SubjectName: string = "";
  // SubjectPhone: string = "";
  LobCode: string = "";
  CustName: string ="";
  // CustAddr: string = "";
  TrxRefNo: string = "";
  IsDataReady: boolean = false;
  isQuestionLoaded: boolean = true;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService) {
    this.route.queryParams.subscribe(params => {
    });
  }

  async ngOnInit(): Promise<void> {
    this.bindResultObj();
    await this.getSrvyOrder();
    await this.getSrvyOrderData();
    await this.GetVerfResultData();
    await this.getSrvyTask();
    await this.getQuestion();
  }

  async GetVerfResultData() {
    let verfResObj: ReqGetVerfResultObj = { TrxRefNo: this.SrvyOrderNo, MrVerfTrxTypeCode: CommonConstant.VerfTrxTypeCodeSurvey, };
    await this.http.post(URLConstant.GetVerfResultByTrxRefNoAndVerfTrxTypeCode, verfResObj).toPromise().then(
      (response) => {
        this.VerfResultId = response["VerfResultId"];
      }
    );
    if (this.VerfResultId == 0) {
      var Business_Date = new Date(AdInsHelper.GetCookie(this.cookieService, CommonConstant.BUSINESS_DATE));
      var datePipe = new DatePipe("en-US");
      var value = datePipe.transform(Business_Date, "yyyy-MM-dd");
      var businessDt = new Date(value);

      this.addVerifResultObj = new VerfResultObj();

      this.addVerifResultObj.TrxRefNo = this.SrvyOrderNo;
      this.addVerifResultObj.VerfDt = businessDt;
      this.addVerifResultObj.EmpNo = "-";
      this.addVerifResultObj.MrVerfResultStatCode = CommonConstant.VerfResultStatCodeNew;
      this.addVerifResultObj.MrVerfTrxTypeCode = CommonConstant.VerfTrxTypeCodeSurvey;
      this.addVerifResultObj.LobCode = this.LobCode;
      this.addVerifResultObj.LobName = this.LobCode;
      this.addVerifResultObj.Notes = "-";

      await this.http.post(URLConstant.AddVerfResult, this.addVerifResultObj).toPromise().then(
        (response) => {
          this.VerfResultId = response["Id"];
        }
      );
    }
  }  

  async getSrvyOrderData(){
    this.ReqGenericObj.Id = this.SrvyOrderId;
    await this.http.post(URLConstant.GetSrvyOrderDataBySrvyOrderId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.LobCode = response["LobCode"];
      });
  }

  async getSrvyOrder(){
    this.ReqGenericObj.Id = this.SrvyOrderId;
    await this.http.post(URLConstant.GetSrvyOrderBySrvyOrderId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.TrxRefNo = response["TrxRefNo"];
        this.CustName = response["CustName"];
        this.SrvyOrderNo = response["SrvyOrderNo"];
      });
  }

  async getSrvyTask(){
    this.ReqGenericObj.Id = this.SrvyTaskId;
    await this.http.post(URLConstant.GetSrvyTaskBySrvyTaskId, this.ReqGenericObj).toPromise().then(
      (response:ResSrvyTaskObj) => {
        this.ResSrvyTaskObj = response;
      });

      this.IsDataReady = true;
  }

  async getQuestion(){
    this.ReqGenericObj = new GenericObj();
    this.ReqGenericObj.Id = this.ResSrvyTaskObj.SrvyFormSchmId;

    await this.http.post(URLConstant.GetSrvyFormSchmBySrvyFormSchmId, this.ReqGenericObj).toPromise().then(
      (response) => {
        if(response["VerfSchemeHId"] != null){
        this.VerfSchemeHId = response["VerfSchemeHId"];
      

      this.ReqGenericObj = new GenericObj();
      this.ReqGenericObj.Id = this.VerfSchemeHId; 
      this.http.post(URLConstant.GetVerfQuestionAnswerListByVerfSchemeHId, this.ReqGenericObj).toPromise().then(
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

  bindResultObj() {
    this.http.post(URLConstant.GetListActiveRefStatusByStatusGrpCode, { Code: CommonConstant.StatusGrpVerfResultStat }).subscribe(
      (response) => {
        this.ResultObj = response[CommonConstant.ReturnObj];
        if (this.ResultObj.length > 0) {
          this.SrvyTaskForm.patchValue({
            MrVerfResultHStatCode: this.ResultObj[0].Key
          });

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
    if (this.SrvyTaskForm.controls["MrVerfResultHStatCode"].value == CommonConstant.VerfResultStatSuccess) {
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
    this.VerfResultHD.VerfResultHObj.VerfResultId = this.VerfResultId;
    this.VerfResultHD.VerfResultHObj.VerfSchemeHId = this.VerfSchemeHId;
    this.VerfResultHD.VerfResultHObj.MrVerfObjectCode = this.Type;
    this.VerfResultHD.VerfResultHObj.MrVerfSubjectRelationCode = this.Type;
    this.VerfResultHD.VerfResultHObj.MrVerfSubjectRelationName = this.ResSrvyTaskObj.CustName;
    this.VerfResultHD.VerfResultHObj.VerfDt = businessDt;
    this.VerfResultHD.VerfResultHObj.MrVerfResultHStatCode = this.SrvyTaskForm.controls["MrVerfResultHStatCode"].value;
    this.VerfResultHD.VerfResultHObj.Phn = this.ResSrvyTaskObj.CustPhone;
    this.VerfResultHD.VerfResultHObj.PhnType = CommonConstant.VerfResultPhnTypeMobile;
    this.VerfResultHD.VerfResultHObj.Notes = this.SrvyTaskForm.controls["Notes"].value;
    this.VerfResultHD.VerfResultHObj.Addr = this.ResSrvyTaskObj.Addr;
    this.VerfResultHD.VerfResultHObj.MrAddrTypeCode = this.ResSrvyTaskObj.MrSrvyObjTypeCode;
    this.VerfResultHD.VerfResultHObj.TrxRefNo = this.ResSrvyTaskObj.SrvyTaskNo;
    this.VerfResultHD.VerfResultHObj.RowVersion = this.ResSrvyTaskObj.RowVersion;

    if (this.SrvyTaskForm.controls["MrVerfResultHStatCode"].value == CommonConstant.VerfResultStatSuccess) {
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
      this.setSurveyVerifData();
      this.ReqSrvyTaskAndAddVerfResultHDObj.SrvyTaskId = this.SrvyTaskId;
      this.ReqSrvyTaskAndAddVerfResultHDObj.VerfResultHD = this.VerfResultHD;
      this.http.post(URLConstant.UpdateSrvyTaskAndAddVerfResultH, this.ReqSrvyTaskAndAddVerfResultHDObj).subscribe(
        async (response) => {
          this.toastr.successMessage(response["message"]);

          if(response["StatusCode"] == '200'){
            this.outputTab.emit({ stepMode: "next" });
          }
        });
    }
  }

  Cancel() {
    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.SURVEY_TASK_RESULT_PAGING],{});
  }
}
