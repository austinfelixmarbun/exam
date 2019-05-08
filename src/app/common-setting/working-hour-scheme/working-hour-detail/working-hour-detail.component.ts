import { Component, OnInit } from '@angular/core';
import { WorkingHourObj } from 'app/shared/model/workingHourObj.Model';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-working-hour-detail',
  templateUrl: './working-hour-detail.component.html',
  styleUrls: ['./working-hour-detail.component.scss'],
  providers: [NGXToastrService]
})
export class WorkingHourDetailComponent implements OnInit {

  pageType: string = "add";
  workingHourSchmHId: any;
  workingHourSchmCode: any;
  workingHourSchmName: any;
  isActive: boolean = false;
  workingHourObj: WorkingHourObj;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  foundationUrl: string = environment.foundationUrl;

  listOfDay: any = [
    {
      label: 'Sunday',
      day: 'Sunday',
      whTime: '',
      whabTime: '',
      whTimeTo: '',
      whabTimeTo: ''
    },
    {
      label: 'Monday',
      day: 'Monday',
      whTime: '',
      whabTime: '',
      whTimeTo: '',
      whabTimeTo: ''
    },
    {
      label: 'Tuesday',
      day: 'Tuesday',
      whTime: '',
      whabTime: '',
      whTimeTo: '',
      whabTimeTo: ''
    },
    {
      label: 'Wednesday',
      day: 'Wednesday',
      whTime: '',
      whabTime: '',
      whTimeTo: '',
      whabTimeTo: ''
    },
    {
      label: 'Thursday',
      day: 'Thursday',
      whTime: '',
      whabTime: '',
      whTimeTo: '',
      whabTimeTo: ''
    },
    {
      label: 'Friday',
      day: 'Friday',
      whTime: '',
      whabTime: '',
      whTimeTo: '',
      whabTimeTo: ''
    },
    {
      label: 'Saturday',
      day: 'Saturday',
      whTime: '',
      whabTime: '',
      whTimeTo: '',
      whabTimeTo: ''
    }
  ]

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefCurr;
    console.log(this.listOfDay);
    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["workingHourSchmHId"] != null) {
        this.workingHourSchmHId = params["workingHourSchmHId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.workingHourObj = new WorkingHourObj();
      this.workingHourObj.workingHourSchmHId = this.workingHourSchmHId;
      this.http.post(this.apiUrl, this.workingHourObj).subscribe(
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
    }
  }

  SaveWorkingHourForm(ReqWorkingHourForm: NgForm) {
    console.log(ReqWorkingHourForm.value);
    console.log(this.listOfDay);
    this.workingHourObj = new WorkingHourObj();
    this.workingHourObj = ReqWorkingHourForm.value;
    if (this.isActive === false) {
      this.workingHourObj.isActive = "0";
    } else {
      this.workingHourObj.isActive = "1";
    }
    
    if (this.pageType == "add") {
      this.http.post(this.addUrl, this.workingHourObj).subscribe(
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
      this.workingHourObj.workingHourSchmHId = this.workingHourSchmHId;
      this.http.post(this.editUrl, this.workingHourObj).subscribe(
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
