import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { WorkingHourSchmHObj } from 'app/shared/model/WorkingHourSchmHObj.Model';
import { WorkingHourSchmDObj } from 'app/shared/model/WorkingHourSchmDObj.Model';
import { ListWorkingHourSchmDObj } from 'app/shared/model/ListWorkingHourSchmDObj.Model';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';


import { String, StringBuilder } from 'typescript-string-operations';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-working-hour-d-detail',
  templateUrl: './working-hour-d-detail.component.html',
  providers: [NGXToastrService]
})

export class WorkingHourDDetailComponent implements OnInit {
  workingHourSchmHId: any;
  isActive: boolean = true;
  workingHourSchmHObj: WorkingHourSchmHObj;
  workingHourSchmDObj: WorkingHourSchmDObj;
  listWorkingHourSchmDObj: ListWorkingHourSchmDObj;
  isEdit: boolean = false;
  getSchmHUrl: any;
  getSchmDUrl: any;
  addUrl: any;
  editUrl: any;
  items: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  listOfDay: any = [
    {
      label: 'Sunday',
      workingHourSchmDay: 'Sunday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Monday',
      workingHourSchmDay: 'Monday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Tuesday',
      workingHourSchmDay: 'Tuesday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Wednesday',
      workingHourSchmDay: 'Wednesday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Thursday',
      workingHourSchmDay: 'Thursday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Friday',
      workingHourSchmDay: 'Friday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    },
    {
      label: 'Saturday',
      workingHourSchmDay: 'Saturday',
      workingHourFrom1: '',
      workingHourTo1: '',
      workingHourFrom2: '',
      workingHourTo2: ''
    }
  ]


  WorkingHourSchmDForm = this.fb.group({
    items: this.fb.array([this.fb.group({
      Label: [''],
      WorkingHourSchmDay: [''],
      WorkingHourFrom1: [''],
      WorkingHourTo1: [''],
      WorkingHourFrom2: [''],
      WorkingHourTo2: ['']
    })])
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

    this.getSchmHUrl = URLConstant.GetWorkingHourSchmHById;
    this.getSchmDUrl = URLConstant.GetListWorkingHourSchmDByWorkingHourHId;
    this.addUrl = URLConstant.AddListWorkingHourSchmD;
    this.editUrl = URLConstant.EditWorkingHourSchmH;

    this.route.queryParams.subscribe(params => {
      if (params["workingHourSchmHId"] != null) {
        this.workingHourSchmHId = params["workingHourSchmHId"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewWorkingHourScheme.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.workingHourSchmHObj = new WorkingHourSchmHObj();
    this.workingHourSchmHObj.WorkingHourSchmHId = this.workingHourSchmHId;
    this.items = this.WorkingHourSchmDForm.get('items') as FormArray;
    this.http.post(this.getSchmDUrl, this.workingHourSchmHObj).subscribe(
      response => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.isEdit = true;
          for (var i = 0; i < response[CommonConstant.ReturnObj].length; i++) {
            var eachDayDetail = this.fb.group({
              Label: response[CommonConstant.ReturnObj][i].WorkingHourSchmDay,
              WorkingHourSchmDay: response[CommonConstant.ReturnObj][i].WorkingHourSchmDay,
              WorkingHourFrom1: response[CommonConstant.ReturnObj][i].WorkingHourFrom1,
              WorkingHourTo1: response[CommonConstant.ReturnObj][i].WorkingHourTo1,
              WorkingHourFrom2: response[CommonConstant.ReturnObj][i].WorkingHourFrom2,
              WorkingHourTo2: response[CommonConstant.ReturnObj][i].WorkingHourTo2
            }) as FormGroup;
            this.items.push(eachDayDetail);
          }
        } else {
          for (var i = 0; i < this.listOfDay.length; i++) {
            var eachDayDetail = this.fb.group({
              Label: this.listOfDay[i].workingHourSchmDay,
              WorkingHourSchmDay: this.listOfDay[i].workingHourSchmDay,
              WorkingHourFrom1: this.listOfDay[i].workingHourFrom1,
              WorkingHourTo1: this.listOfDay[i].workingHourTo1,
              WorkingHourFrom2: this.listOfDay[i].workingHourFrom2,
              WorkingHourTo2: this.listOfDay[i].workingHourTo2
            }) as FormGroup;
            this.items.push(eachDayDetail);
          }
        }
        this.items.removeAt(0);
      }
    );
  }

  SaveForm() {
    for (var i = 0; i < 7; i++) {
      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value > this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value) {
        // this.toastr.errorMessage( "Working Hour From 1 Greater Than Working Hour To 1");
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_CHECKING, CommonConstant.FROM, 1, CommonConstant.GTE, CommonConstant.TO, 2))
        return false;
      }
      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value > this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo2"].value) {
        // this.toastr.errorMessage("Working Hour From 2 Greater Than Working Hour To 2");
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_CHECKING, CommonConstant.FROM, 2, CommonConstant.GTE, CommonConstant.TO, 2))
        return false;
      }

      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value) {
        // this.toastr.errorMessage("Working Hour From 2 Less Than Working Hour From 1");
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_CHECKING, CommonConstant.FROM, 2, CommonConstant.LT, CommonConstant.FROM, 1))
        return false;
      }

      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo2"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value) {
        // this.toastr.errorMessage("Working Hour To 2 Less Than Working Hour To 1");
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_CHECKING, CommonConstant.TO, 2, CommonConstant.LT, CommonConstant.TO, 1))
        return false;
      }
      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value > this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value && this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value) {
        // this.toastr.errorMessage("Working Hour From 2 In Between Working Hour 1");
        this.toastr.errorMessage(String.Format(ExceptionConstant.WORKING_HOUR_CHECKING, CommonConstant.FROM, 2, CommonConstant.BETWEEN, '', 1))
        return false;
      }
      if (this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value) {
        continue;
      }
    }

    this.listWorkingHourSchmDObj = new ListWorkingHourSchmDObj();
    this.listWorkingHourSchmDObj.WorkingHourSchmDObj = new Array();
    for (var i = 0; i < 7; i++) {
      this.workingHourSchmDObj = new WorkingHourSchmDObj();
      this.workingHourSchmDObj.WorkingHourSchmHId = this.workingHourSchmHId;
      this.workingHourSchmDObj.WorkingHourSchmDay = this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourSchmDay"].value;
      this.workingHourSchmDObj.WorkingHourFrom1 = this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value;
      this.workingHourSchmDObj.WorkingHourTo1 = this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value;
      this.workingHourSchmDObj.WorkingHourFrom2 = this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value;
      this.workingHourSchmDObj.WorkingHourTo2 = this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo2"].value;
      this.listWorkingHourSchmDObj.WorkingHourSchmDObj.push(this.workingHourSchmDObj);
    }
    if (this.isEdit) {
      this.addUrl = URLConstant.EditListWorkingHourSchmD;
    }
    this.http.post(this.addUrl, this.listWorkingHourSchmDObj).subscribe(
      response => {
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/CommonSetting/WorkingHour"]);
      }
    );
  }
}
