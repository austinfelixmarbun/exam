import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { HolidayDObj } from 'app/shared/model/HolidayDObj.Model';

@Component({
  selector: 'app-holiday-detail-add',
  templateUrl: './holiday-detail-add.component.html',
  styleUrls: ['./holiday-detail-add.component.scss'],
  providers: [NGXToastrService]
})
export class HolidayDetailAddComponent implements OnInit {

  holidaySchmHId: any;
  holidayDObj: HolidayDObj;
  foundationUrl: string = environment.foundationUrl;
  addUrl: any;
  pageType:string;
  addYearUrl: any;
  isPublicHoliday: any = '1';
  listOfDay: any = [
    {
      day: 'Sunday',
      isActive: false
    },
    {
      day: 'Monday',
      isActive: false
    },
    {
      day: 'Tuesday',
      isActive: false
    },
    {
      day: 'Wednesday',
      isActive: false
    },
    {
      day: 'Thursday',
      isActive: false
    },
    {
      day: 'Friday',
      isActive: false
    },
    {
      day: 'Saturday',
      isActive: false
    },
  ]

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    
    this.addUrl = this.foundationUrl + AdInsConstant.AddHolidaySchmD;
    this.addYearUrl = this.foundationUrl + AdInsConstant.AddHolidaySchmDUntilYear;
    
    this.route.queryParams.subscribe(params => {
      if (params["holidaySchmHId"] != null) {
        this.holidaySchmHId = params["holidaySchmHId"];
      }
    });
  }

  ngOnInit() {
  }

  SaveHolidayDetForm(ReqHolidayDetForm: NgForm) {
    console.log(ReqHolidayDetForm.value);
    console.log(this.listOfDay);
    if (ReqHolidayDetForm.value.isPublicHoliday == 1) {
      this.holidayDObj = new HolidayDObj();
      this.holidayDObj = ReqHolidayDetForm.value;
      this.holidayDObj.holidaySchmHId = this.holidaySchmHId;
      this.http.post(this.addUrl, this.holidayDObj).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl("/commonSetting/holiday/add?param=edit&holidaySchmHId=" + this.holidaySchmHId);
        },
        error => {
          console.log(error);
        }
      );
    }else {
      var arrDictDays = new Array();
      for (var i = 0; i < this.listOfDay.length; i++) {
        if (this.listOfDay[i].isActive == true) {
          arrDictDays.push(this.listOfDay[i].day)
        }
      }
      var holidayDTillYear = {
        HolidaySchmDModel: 
          {
            HolidaySchmHId: this.holidaySchmHId,
            IsPublicHoliday: ReqHolidayDetForm.value.isPublicHoliday
          }
        ,
        UntilYear: parseInt(ReqHolidayDetForm.value.untilYear),
        DictOfDays: arrDictDays
      }
      console.log(holidayDTillYear);
      this.http.post(this.addYearUrl, holidayDTillYear).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl("/commonSetting/holiday/add?param=edit&holidaySchmHId=" + this.holidaySchmHId);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
