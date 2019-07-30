import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm } from '@angular/forms';
import { WorkingHourSchmHObj } from 'app/shared/model/WorkingHourSchmHObj.Model';
import { WorkingHourSchmDObj } from 'app/shared/model/WorkingHourSchmDObj.Model';

@Component({
  selector: 'app-working-hour-detail',
  templateUrl: './working-hour-detail.component.html',
  styleUrls: ['./working-hour-detail.component.scss'],
  providers: [NGXToastrService]
})

export class WorkingHourDetailComponent implements OnInit {
  
  pageType: any = "add";
  workingHourSchmHId: any;
  workingHourSchmCode: any;
  workingHourSchmName: any;
  isActive: boolean = true;
  workingHourSchmHObj: WorkingHourSchmHObj;
  workingHourSchmDObj: any;
  resultData: any;
  apiUrl: any;
  api2Url: any;
  addUrl: any;
  editUrl: any;
  foundationUrl: any = environment.foundationUrl;

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

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    
    this.apiUrl = this.foundationUrl + AdInsConstant.GetWorkingHourSchmH;
    this.api2Url = this.foundationUrl + AdInsConstant.GetWorkingHourSchmD;
    this.addUrl = this.foundationUrl + AdInsConstant.AddWorkingHourSchmH;
    this.editUrl = this.foundationUrl + AdInsConstant.EditWorkingHourSchmH;
    
    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }else{
        this.pageType = "add";
      }
      if (params["workingHourSchmHId"] != null) {
        this.workingHourSchmHId = params["workingHourSchmHId"];
      }else{
        this.workingHourSchmHId = 0;
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.workingHourSchmHObj = new WorkingHourSchmHObj();
      this.workingHourSchmHObj.workingHourSchmHId = this.workingHourSchmHId;
      this.http.post(this.apiUrl, this.workingHourSchmHObj).subscribe(
        response => {
          this.resultData = response["returnObject"];
          this.workingHourSchmCode = response["returnObject"]["workingHourSchmCode"];
          this.workingHourSchmName = response['returnObject']['workingHourSchmName'];
          if (this.resultData.isActive == "1") {
            this.isActive = true;
          } else {
            this.isActive = false;
          }
        },
        error => {
          console.log(error);
        }
      );
      this.http.post(this.api2Url, this.workingHourSchmHObj).subscribe(
        response => {
          console.log(response["returnObject"]);
          this.listOfDay = new Array();
          for (var i = 0; i < response["returnObject"].length; i++) {
            var eachDayDetail = {
              label: response["returnObject"][i].workingHourSchmDay,
              workingHourSchmDay: response["returnObject"][i].workingHourSchmDay,
              workingHourFrom1:response["returnObject"][i].workingHourFrom1,
              workingHourTo1: response["returnObject"][i].workingHourTo1,
              workingHourFrom2: response["returnObject"][i].workingHourFrom2,
              workingHourTo2: response["returnObject"][i].workingHourTo2
            }
            this.listOfDay.push(eachDayDetail);
          }
          console.log(this.listOfDay);
          console.log(eachDayDetail);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
 
  SaveWorkingHourForm(ReqWorkingHourForm: NgForm) {
    console.log(ReqWorkingHourForm);
    console.log(ReqWorkingHourForm.value);
    console.log(this.listOfDay);
    this.workingHourSchmHObj = new WorkingHourSchmHObj();
    this.workingHourSchmHObj.workingHourSchmCode = ReqWorkingHourForm.value.workingHourSchmCode;
    this.workingHourSchmHObj.workingHourSchmName = ReqWorkingHourForm.value.workingHourSchmName;
    if (this.isActive === false) {
      this.workingHourSchmHObj.isActive = "0";
    } else {
      this.workingHourSchmHObj.isActive = "1";
    }
    
    var arrWHSchmD = new Array();
    for (var i = 0; i < this.listOfDay.length; i++) {
        var listworkingHourSchmD = new WorkingHourSchmDObj();
        listworkingHourSchmD.workingHourSchmHId = this.workingHourSchmHId;
        listworkingHourSchmD.workingHourSchmDay = this.listOfDay[i].workingHourSchmDay;
        listworkingHourSchmD.workingHourFrom1 = this.listOfDay[i].workingHourFrom1;
        listworkingHourSchmD.workingHourTo1 = this.listOfDay[i].workingHourTo1;
        listworkingHourSchmD.workingHourFrom2 = this.listOfDay[i].workingHourFrom2;
        listworkingHourSchmD.workingHourTo2 = this.listOfDay[i].workingHourTo2;
        arrWHSchmD.push(listworkingHourSchmD);
    }

    if (this.pageType == "add") {
      var WorkingHourSchm = {
        WorkingHourSchmH: this.workingHourSchmHObj,
        WorkingHourSchmD: arrWHSchmD
      };
      console.log(WorkingHourSchm);
      this.http.post(this.addUrl, WorkingHourSchm).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/workingHour"]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.workingHourSchmHObj.workingHourSchmHId = this.workingHourSchmHId;
      var WorkingHourSchm = {
        WorkingHourSchmH: this.workingHourSchmHObj,
        WorkingHourSchmD: arrWHSchmD
      };
      console.log(WorkingHourSchm);
      this.http.post(this.editUrl, WorkingHourSchm).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/workingHour"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
  toggleActive(e) {
    this.isActive = e.target.checked;
  }
}
