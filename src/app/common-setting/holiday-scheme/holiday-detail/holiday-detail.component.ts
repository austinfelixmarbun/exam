import { Component, OnInit } from '@angular/core';
import { HolidayObj } from 'app/shared/model/HolidayObj.Model';
import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html',
  styleUrls: ['./holiday-detail.component.scss'],
  providers: [NGXToastrService]
})
export class HolidayDetailComponent implements OnInit {

  pageType: string = "add";
  holidaySchmHId: any;
  holidaySchmCode: any;
  holidaySchmName: any;
  isActive: boolean = false;
  holidayObj: HolidayObj;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  foundationUrl: string = environment.foundationUrl;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    
    this.apiUrl = this.foundationUrl + AdInsConstant.GetHolidaySchmH;
    this.addUrl = this.foundationUrl + AdInsConstant.AddHolidaySchmH;
    this.editUrl = this.foundationUrl + AdInsConstant.EditHolidaySchmHOnly;
    
    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["holidaySchmHId"] != null) {
        this.holidaySchmHId = params["holidaySchmHId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.holidayObj = new HolidayObj();
      this.holidayObj.holidaySchmHId = this.holidaySchmHId;
      this.http.post(this.apiUrl, this.holidayObj).subscribe(
        response => {
          this.resultData = response["returnObject"];
          this.holidaySchmCode = response["returnObject"]["holidaySchmCode"];
          this.holidaySchmName = response['returnObject']['holidaySchmName'];
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

  SaveHolidayForm(ReqHolidayForm: NgForm) {
    console.log(ReqHolidayForm.value);
    this.holidayObj = new HolidayObj();
    this.holidayObj = ReqHolidayForm.value;
    if (this.isActive === false) {
      this.holidayObj.isActive = "0";
    } else {
      this.holidayObj.isActive = "1";
    }
    
    if (this.pageType == "add") {
      this.http.post(this.addUrl, this.holidayObj).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/holiday"]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.holidayObj.holidaySchmHId = this.holidaySchmHId;
      this.http.post(this.editUrl, this.holidayObj).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/holiday"]);
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
