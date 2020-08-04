import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HolidayDObj } from 'app/shared/model/HolidayDObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HolidayDByYearObj } from 'app/shared/model/HolidayDByYearObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-holiday-detail-add',
  templateUrl: './holiday-detail-add.component.html',
  providers: [NGXToastrService]
})
export class HolidayDetailAddComponent implements OnInit {

  HolidaySchmHId: string;
  title: string = "Holiday Detail";
  holidayDetailObj: HolidayDObj;
  holidayDetailByYearObj: HolidayDByYearObj;
  check: boolean = false;
  mode: any = "";
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  HolidayListForm = this.fb.group({
    IsPublicHoliday: [false, Validators.required],
    Date: [''],
    Descr: [''],
    Sunday: [false],
    Monday: [false],
    Tuesday: [false],
    Wednesday: [false],
    Thursday: [false],
    Friday: [false],
    Saturday: [false],
    UntilYear: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
  })

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

    this.route.queryParams.subscribe(params => {
      this.HolidaySchmHId = params["HolidaySchmHId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewHolidayDetail.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
  }
  
  SaveForm() {
    if (this.HolidayListForm.controls.IsPublicHoliday.value) {
      this.holidayDetailObj = new HolidayDObj;
      this.holidayDetailObj.IsPublicHoliday = this.HolidayListForm.controls.IsPublicHoliday.value;
      this.holidayDetailObj.HolidaySchmHId = this.HolidaySchmHId;
      this.holidayDetailObj.RowVersion = "";
      this.holidayDetailObj.HolidayDt = this.HolidayListForm.controls.Date.value;
      this.holidayDetailObj.Descr = this.HolidayListForm.controls.Descr.value;

      this.http.post(URLConstant.AddHolidaySchmD, this.holidayDetailObj).subscribe((response) => {
        this.router.navigate(['/CommonSetting/Holiday/Detail/'], { queryParams: { HolidaySchmHId: this.HolidaySchmHId } });
        this.toastr.successMessage(response['message']);
      });
    }
    else {
      this.holidayDetailByYearObj = new HolidayDByYearObj;
      this.holidayDetailByYearObj.IsPublicHoliday = this.HolidayListForm.controls.IsPublicHoliday.value;
      this.holidayDetailByYearObj.HolidaySchmHId = this.HolidaySchmHId;
      this.holidayDetailByYearObj.RowVersion = "";
      this.holidayDetailByYearObj.UntilYear = this.HolidayListForm.controls.UntilYear.value;

      if (this.HolidayListForm.controls.Sunday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Sunday");
      }
      if (this.HolidayListForm.controls.Monday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Monday");
      }
      if (this.HolidayListForm.controls.Tuesday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Tuesday");
      }
      if (this.HolidayListForm.controls.Wednesday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Wednesday");
      }
      if (this.HolidayListForm.controls.Thursday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Thursday");
      }
      if (this.HolidayListForm.controls.Friday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Friday");
      }
      if (this.HolidayListForm.controls.Saturday.value) {
        this.holidayDetailByYearObj.DictOfDays.push("Saturday");
      }
      this.http.post(URLConstant.AddHolidaySchmDUntilYear, this.holidayDetailByYearObj).subscribe((response) => {
        this.router.navigate(['/CommonSetting/Holiday/Detail/'], { queryParams: { HolidaySchmHId: this.HolidaySchmHId } });
        this.toastr.successMessage(response['message']);
      });
    }
  }

  updateValueAndValidityForm() {
    this.HolidayListForm.controls.Date.updateValueAndValidity();
    this.HolidayListForm.controls.Descr.updateValueAndValidity();
    this.HolidayListForm.controls.UntilYear.updateValueAndValidity();
  }

  Checkbox() {
    if (!this.HolidayListForm.controls.IsPublicHoliday.value) {
      this.HolidayListForm.controls.UntilYear.clearValidators();
      this.HolidayListForm.controls.Date.setValidators(Validators.required);
      this.HolidayListForm.controls.Descr.setValidators(Validators.required);
      this.updateValueAndValidityForm();
      this.check = true;
    }
    else {
      this.HolidayListForm.controls.UntilYear.setValidators([Validators.required, Validators.pattern("^[0-9]+$")]);
      this.HolidayListForm.controls.Date.clearValidators();
      this.HolidayListForm.controls.Descr.clearValidators();
      this.updateValueAndValidityForm();
      this.check = false;
    }

  }
  BackNavigate() {
    this.router.navigate(['/CommonSetting/Holiday/Detail/'], { queryParams: { HolidaySchmHId: this.HolidaySchmHId } });
  }
}
