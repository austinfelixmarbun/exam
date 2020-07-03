import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HolidayDObj } from 'app/shared/model/HolidayDObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-holiday-detail-edit',
  templateUrl: './holiday-detail-edit.component.html',
  providers : [NGXToastrService]
})
export class HolidayDetailEditComponent implements OnInit {


  HolidaySchmDId: any;
  HolidaySchmHId: any;
  HolidayListForm = this.fb.group({
    IsPublicHoliday: [false, Validators.required],
    Date: ['',Validators.required],
    Descr: ['', Validators.required]
  })

  viewObj: any;
  title: string;
  result: any;


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.HolidaySchmDId = params["HolidaySchmDId"];
      this.HolidaySchmHId = params["HolidaySchmHId"];
    })
  }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewHolidayDetail.json";

    this.title = "Holiday Scheme-Edit";
    var HolidayObj = new HolidayDObj;
    HolidayObj.HolidaySchmDId = this.HolidaySchmDId;
    this.http.post(AdInsConstant.GetHolidaySchmDById, HolidayObj).subscribe(
        (response) => {
            this.result = response;
               this.HolidayListForm.patchValue({
               IsPublicHoliday : this.result.IsPublicHoliday,
               Date :  formatDate(this.result.HolidayDt,  'yyyy-MM-dd', 'en-US'),
               Descr : this.result.Descr
           })
        },
        (error) => {
            console.log(error);
        }
    );
  }

  SaveForm(){
    var HolidayObj = new HolidayDObj;
    HolidayObj.Descr = this.HolidayListForm.controls.Descr.value;
    HolidayObj.IsPublicHoliday = this.HolidayListForm.controls.IsPublicHoliday.value;
    HolidayObj.HolidayDt = this.HolidayListForm.controls.Date.value;
    HolidayObj.HolidaySchmHId = this.result.HolidaySchmHId;
    HolidayObj.HolidaySchmDId = this.result.HolidaySchmDId;
    HolidayObj.RowVersion = this.result.RowVersion;

    this.http.post(AdInsConstant.EditHolidaySchmD, HolidayObj).subscribe(
        (response) => {
          this.router.navigate(['/CommonSetting/Holiday/Detail/'], { queryParams: { HolidaySchmHId: this.HolidaySchmHId } });
            this.toastr.successMessage(response['message']);
        },
        (error) => {
            console.log(error);
        });
  }

  BackNavigate() {
    this.router.navigate(['/CommonSetting/Holiday/Detail/'], { queryParams: { HolidaySchmHId: this.HolidaySchmHId } });
  }
}
