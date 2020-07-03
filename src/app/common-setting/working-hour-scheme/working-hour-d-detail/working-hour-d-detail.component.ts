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



@Component({
  selector: 'app-working-hour-d-detail',
  templateUrl: './working-hour-d-detail.component.html',
  providers: [NGXToastrService]
})

export class WorkingHourDDetailComponent implements OnInit {
  viewObj: any;
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
    }) ])
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    
    this.getSchmHUrl = AdInsConstant.GetWorkingHourSchmHById;
    this.getSchmDUrl = AdInsConstant.GetListWorkingHourSchmDByWorkingHourHId;
    this.addUrl = AdInsConstant.AddListWorkingHourSchmD;
    this.editUrl = AdInsConstant.EditWorkingHourSchmH;

    this.route.queryParams.subscribe(params => {
      if (params["workingHourSchmHId"] != null) {
        this.workingHourSchmHId = params["workingHourSchmHId"];
      }
    });
  }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewWorkingHourScheme.json";
    this.workingHourSchmHObj = new WorkingHourSchmHObj();
    this.workingHourSchmHObj.WorkingHourSchmHId = this.workingHourSchmHId;
    this.items = this.WorkingHourSchmDForm.get('items') as FormArray;
    this.http.post(this.getSchmDUrl, this.workingHourSchmHObj).subscribe(
        response => {
          if(response["ReturnObject"].length > 0){
            this.isEdit = true;
            for (var i = 0; i < response["ReturnObject"].length; i++) {
              var eachDayDetail = this.fb.group({
                Label: response["ReturnObject"][i].WorkingHourSchmDay,
                WorkingHourSchmDay: response["ReturnObject"][i].WorkingHourSchmDay,
                WorkingHourFrom1:response["ReturnObject"][i].WorkingHourFrom1,
                WorkingHourTo1: response["ReturnObject"][i].WorkingHourTo1,
                WorkingHourFrom2: response["ReturnObject"][i].WorkingHourFrom2,
                WorkingHourTo2: response["ReturnObject"][i].WorkingHourTo2
              }) as FormGroup;
              this.items.push(eachDayDetail);
            }
          }else{
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
          console.log(this.WorkingHourSchmDForm);
        },
        error => {
          console.log(error);
        }
      );
  }
 
  SaveForm() {
    
    for (var i = 0; i < 7; i++) {

    if(this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value > this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value){
      this.toastr.errorMessage("Working Hour From 1 Greater Than Working Hour To 1");
      return false;
    }
    if(this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value > this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo2"].value){
      this.toastr.errorMessage("Working Hour From 2 Greater Than Working Hour To 2");
      return false;
    }

    if(this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value){
      this.toastr.errorMessage("Working Hour From 2 Less Than Working Hour From 1");
      return false;
    }

    if(this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo2"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value){
      this.toastr.errorMessage("Working Hour To 2 Less Than Working Hour To 1");
      return false;
    }
    if(this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value > this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value && this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourTo1"].value){
      this.toastr.errorMessage("Working Hour From 2 In Between Working Hour 1");
      return false;
    }
    if(this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom1"].value < this.WorkingHourSchmDForm.controls["items"]["controls"][i]["controls"]["WorkingHourFrom2"].value){
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
    if(this.isEdit){
      this.addUrl = AdInsConstant.EditListWorkingHourSchmD;
    }
    this.http.post(this.addUrl, this.listWorkingHourSchmDObj).subscribe(
      response => {
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/CommonSetting/WorkingHour"]);
      },
      error => {
        console.log(error);
      }
    );
    
  }
}
