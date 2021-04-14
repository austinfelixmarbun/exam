import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { ActivatedRoute, Router } from '@angular/router';

import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { SrvyTaskObj } from 'app/shared/model/SrvyTaskObj.Model';
import { UcViewGenericObj, WhereValueObj } from 'app/shared/model/UcViewGenericObj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';
import { zip } from 'rxjs';

@Component({
  selector: 'app-survey-task-assignment-detail',
  templateUrl: './survey-task-assignment-detail.component.html'
  
})
export class SurveyTaskAssignmentDetailComponent implements OnInit {

  @ViewChildren('dyna') UclookupgenericComponents: QueryList<UclookupgenericComponent>;

  readonly CancelLink: string = NavigationConstant.SURVEY_TASK_ASSIGNMENT_PAGING;

  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  lookupSurveyorObj: InputLookupObj = new InputLookupObj();
  surveyOrderId: number;
  parentForm: FormGroup;
  refUserId: number;
  surveyFormSchmId: number;
  srvyTaskObj: SrvyTaskObj;
  reqListSrvyTaskObj: Array<SrvyTaskObj>;
  refOfficeId: any;


  //Dropdowns
  dropdownSurveyType: any;
  dropdownSurveyFormSchm: any;

  //Lookup
  lookupObj: any;
  InputLookupSurveyorObj: any;
  InputLookupSurveyorObjs: Array<InputLookupObj> = new Array<InputLookupObj>();
  surveyorNumber: { [key: string]: any; } = {};

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private cookieService: CookieService) {
    this.route.queryParams.subscribe(params => {
      if (params['SurveyOrderId'] != null) {
        this.surveyOrderId = params['SurveyOrderId'];

      }
    });
  }

  SurveyTaskForm = this.fb.group({
    ListSurveyTask: this.fb.array([])
  });

  getLookupSurveyor(i, event) {

    this.SurveyTaskForm.controls["ListSurveyTask"]["controls"][i].patchValue({
      Surveyor: event.SurveyorId
    })

  }

  ngOnInit() {

    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyOrder.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.getDropdown();
    this.getSurveyTaskListData();



  }

  async getSurveyTaskListData() {

    await this.httpClient.post(URLConstant.GetListSrvyTaskBySrvyOrderIdForUpdate, { Id: this.surveyOrderId }).toPromise().then(
      (response) => {

        if (response['ReturnObject'].length > 0) {
          this.SurveyTaskForm.controls['ListSurveyTask'] = this.fb.array([]);
          for (let i = 0; i < response['ReturnObject'].length; i++) {
            this.httpClient.post(URLConstant.GetSrvyFormSchmBySrvyFormSchmId, { Id: response['ReturnObject'][i].SrvyFormSchmId }).subscribe(
              (res) => {
                var surveyTask = {
                  SurveyTaskId: response['ReturnObject'][i].SrvyTaskId,
                  SurveyTaskNo: response['ReturnObject'][i].SrvyTaskNo,
                  SurveyeeModel: response['ReturnObject'][i].MrCustModelCode,
                  SurveyObject: response['ReturnObject'][i].MrSrvyObjTypeCode,
                  SurveyeeName: response['ReturnObject'][i].CustName,
                  Address: response['ReturnObject'][i].Addr,
                  SurveyTaskStatus: response['ReturnObject'][i].MrSurveyTaskStatCode,
                  SurveyType: response['ReturnObject'][i].MrSurveyTypeCode,
                  Surveyor: response['ReturnObject'][i].SurveyorId,
                  SurveyForm: res['SrvyFormSchmId'],
                  National: "Yes",
                  RefNo: response['ReturnObject'][i].RefNo,
                  Zipcode: response['ReturnObject'][i].Zipcode,
                  CustNo: response['ReturnObject'][i].CustNo,
                  SurveyorName: response['ReturnObject'][i].SurveyorName

                }

                this.addSurveyTaskToList(surveyTask);
              }
            )



          }

        }
      }
    )
  }

  getDropdown() {
    this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: "SURVEY_TYPE" }).subscribe(
      (response) => {
        this.dropdownSurveyType = response['ReturnObject'];

      }
    );

    this.httpClient.post(URLConstant.GetListKeyValueSrvyFormSchm, null).subscribe(
      (response) => {
        this.dropdownSurveyFormSchm = response['ReturnObject'];

      }
    )

  }



  onNationalSelect(i, event) {
    let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    let refOfficeId = currentUserContext['OfficeId'];
    console.log(currentUserContext);
    this.SurveyTaskForm.controls.ListSurveyTask['controls'][i].patchValue({
      National: event['target'].value
    })

    var temp = this.UclookupgenericComponents.toArray();
    
    if (event['target'].value == "No") {
      var assetCrit = new Array();
      var critAssetObj = new CriteriaObj();
      critAssetObj.DataType = 'number';
      critAssetObj.restriction = AdInsConstant.RestrictionEq;
      critAssetObj.propName = 'RO.REF_OFFICE_ID';
      critAssetObj.value = refOfficeId;
      assetCrit.push(critAssetObj);

      temp[i].lookupInput.addCritInput = assetCrit;
      temp[i].setAddCritInput();
      
    }else{     
      var assetCrit = new Array();
      temp[i].lookupInput.addCritInput = assetCrit;
      temp[i].setAddCritInput();
      console.log(this.InputLookupSurveyorObj);
    }

    temp[i].lookupInput['isRequired'] = !temp[i].lookupInput['isRequired'];
    temp[i].initiateForm();

  }

  checkForm() {
    console.log(this.SurveyTaskForm.controls['ListSurveyTask']['controls']);
    console.log(this.SurveyTaskForm);
  }

  addSurveyTaskToList(x) {
    var surveyTaskObj = this.SurveyTaskForm.controls["ListSurveyTask"] as FormArray;
    var length = this.SurveyTaskForm.controls["ListSurveyTask"]["controls"].length;
    console.log(this.SurveyTaskForm.controls["ListSurveyTask"]["controls"].length);
    var max = 0;
    if (length > 0) {
      max = this.SurveyTaskForm["controls"]["ListSurveyTask"]["controls"][length - 1]["controls"]["No"].value;
    }
    if (x != undefined) {
      surveyTaskObj.push(this.addGroupAsset(x, max + 1));

      var InputLookupSurveyorObj = this.initLookupSurveyor(x);
      this.InputLookupSurveyorObjs.push(InputLookupSurveyorObj);

      this.surveyorNumber[max + 1] = InputLookupSurveyorObj;

    }
  }

  initLookupSurveyor(x) {
    let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.refOfficeId = currentUserContext['OfficeId'];
    this.InputLookupSurveyorObj = new InputLookupObj();
    this.InputLookupSurveyorObj.urlJson = "./assets/lookup/lookupSurveyorForSurveyTask.json";
    this.InputLookupSurveyorObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.InputLookupSurveyorObj.urlEnviPaging = environment.FoundationR3Url;
    this.InputLookupSurveyorObj.pagingJson = "./assets/lookup/lookupSurveyorForSurveyTask.json";
    this.InputLookupSurveyorObj.genericJson = "./assets/lookup/lookupSurveyorForSurveyTask.json";
    this.InputLookupSurveyorObj.isRequired = true;

    var assetCrit = new Array();
    var critAssetObj = new CriteriaObj();
    critAssetObj.DataType = 'number';
    critAssetObj.restriction = AdInsConstant.RestrictionEq;
    critAssetObj.propName = 'RO.REF_OFFICE_ID';
    critAssetObj.value = this.refOfficeId;
    assetCrit.push(critAssetObj);
    this.InputLookupSurveyorObj.addCritInput = null;

    this.InputLookupSurveyorObj.nameSelect = x.SurveyorName;
    this.InputLookupSurveyorObj.jsonSelect = x;
    


    console.log(this.InputLookupSurveyorObj);

    return this.InputLookupSurveyorObj;

  }



  addGroupAsset(surveyTaskObj, i) {
    return this.fb.group({
      No: [i],
      SurveyTaskId: [surveyTaskObj.SurveyTaskId],
      SurveyTaskNo: [surveyTaskObj.SurveyTaskNo],
      SurveyeeModel: [surveyTaskObj.SurveyeeModel],
      SurveyObject: [surveyTaskObj.SurveyObject],
      SurveyeeName: [surveyTaskObj.SurveyeeName],
      Address: [surveyTaskObj.Address],
      SurveyTaskStatus: [surveyTaskObj.SurveyTaskStatus],
      SurveyType: [surveyTaskObj.SurveyType],
      Surveyor: [surveyTaskObj.Surveyor],
      SurveyForm: [surveyTaskObj.SurveyForm],
      National: [surveyTaskObj.National],
      RefNo: [surveyTaskObj.RefNo],
      Zipcode: [surveyTaskObj.Zipcode],
      CustNo: [surveyTaskObj.CustNo],
      SurveyorName: [surveyTaskObj.SurveyorName]

    })
  }

  CancelSurveyTask(surveyTaskId) {
    this.httpClient.post(URLConstant.CancelSurveyTaskBySurveyTaskId, { Id: surveyTaskId }).subscribe(
      (response) => {
        this.toastr.successMessage("Survey Task has been cancelled!");
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.SURVEY_TASK_ASSIGNMENT_DETAIL], { SurveyOrderId: this.surveyOrderId });
      }
    )
  }

  SaveForm() {

    this.reqListSrvyTaskObj = new Array<SrvyTaskObj>();

    for (let i = 0; i < this.SurveyTaskForm.controls['ListSurveyTask']['controls'].length; i++) {
      this.srvyTaskObj = new SrvyTaskObj();

      this.srvyTaskObj.SrvyTaskId = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyTaskId;
      this.srvyTaskObj.SrvyTaskNo = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyTaskNo;
      this.srvyTaskObj.MrCustModelCode = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyeeModel;
      this.srvyTaskObj.MrSrvyObjTypeCode = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyObject;
      this.srvyTaskObj.CustName = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyeeName;
      this.srvyTaskObj.Addr = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.Address;
      this.srvyTaskObj.MrSurveyTaskStatCode = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyTaskStatus;
      this.srvyTaskObj.MrSurveyTypeCode = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyType;
      this.srvyTaskObj.SurveyorId = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.Surveyor;
      this.srvyTaskObj.SrvyFormSchmId = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.SurveyForm;
      this.srvyTaskObj.RefNo = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.RefNo;
      this.srvyTaskObj.Zipcode = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.Zipcode;
      this.srvyTaskObj.CustNo = this.SurveyTaskForm.controls['ListSurveyTask']['controls'][i].value.CustNo;

      this.reqListSrvyTaskObj.push(this.srvyTaskObj);





    }

    this.httpClient.post(URLConstant.EditSrvyTask, { reqListSrvyTaskObjs: this.reqListSrvyTaskObj }).subscribe(
      (response) => {
        this.toastr.successMessage(response['message']);
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.SURVEY_TASK_ASSIGNMENT_PAGING], {});
      }
    )
  }

}
