import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdInsService } from 'app/shared/services/adIns.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HolidayObj } from 'app/shared/model/HolidayObj.Model';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-holiday-add',
  templateUrl: './holiday-add.component.html',
  styleUrls: ['./holiday-add.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService]
})
export class HolidayAddComponent implements OnInit {


    HolidaySchemeHForm = this.fb.group({
        HolidaySchmCode : ['', Validators.required],
        HolidaySchmName : ['', Validators.required],
        IsActive : [false]
    })

    title : string = "Holiday Scheme-Add";
    param: string;
    businessUnitCode: string;
    businessUnitName: string;
    description: string;
    activestatus: string;
    result: any;
    mode: string = "add";
    apiUrl: any;
    pageType: string;
    settingUrl: string = environment.FoundationR3Url;
    urlEnviPaging: string = environment.foundationUrl;
    holidayObj: HolidayObj;
    holidaySchmHId:any;
    editUrl: any;
    key: any;
    criteria: CriteriaObj[] = [];

    constructor(private toastr: NGXToastrService, private router: Router, private route: ActivatedRoute, private http: HttpClient,
        private adInsService: AdInsService, private fb: FormBuilder) {
          this.route.queryParams.subscribe(params => {
            this.param = params["holidaySchmHId"];
            this.mode = params["mode"];
            if (this.mode == "edit") {
                var tempCrit = new CriteriaObj();
                tempCrit.restriction = "Eq";
                tempCrit.value = this.param;
                this.criteria.push(tempCrit);
            }
        });
    }

    ngOnInit() {
      console.log("edit");
        if (this.mode == "edit") {
            this.title = "Holiday Scheme-Edit";
            this.apiUrl = this.settingUrl + AdInsConstant.GetHolidaySchmHById;
            this.HolidaySchemeHForm.controls.HolidaySchmCode.disable();
            var holidayObj = new HolidayObj();
            holidayObj.HolidaySchmHId = this.param;
            console.log(this.param);
            this.http.post(this.apiUrl, holidayObj).subscribe(
                (response) => {
                    this.result = response;
                        this.HolidaySchemeHForm.patchValue({
                       HolidaySchmCode : this.result.HolidaySchmCode,
                       HolidaySchmName : this.result.HolidaySchmName,
                       IsActive : this.result.IsActive
                   })
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    SaveForm(){
        if (this.mode == "edit") {
            this.editUrl = this.settingUrl + AdInsConstant.EditHolidaySchmH;
            this.holidayObj = new HolidayObj();
            this.holidayObj = this.HolidaySchemeHForm.value;
            this.holidayObj.HolidaySchmHId = this.param;
            this.holidayObj.HolidaySchmCode = this.result.HolidaySchmCode;
            this.holidayObj.RowVersion = this.result.RowVersion;
            console.log("isi holidayObj");
            console.log(this.holidayObj);
            this.http.post(this.editUrl, this.holidayObj).subscribe(
                (response) => {
                    this.router.navigateByUrl('/commonSetting/holiday');
                    this.toastr.successMessage(response['message']);
                },
                (error) => {
                    console.log(error);
                });
        }
        else {
            this.editUrl = this.settingUrl + AdInsConstant.AddHolidaySchmH;
            this.holidayObj = new HolidayObj();
            this.holidayObj = this.HolidaySchemeHForm.value;
            this.holidayObj.HolidaySchmHId = "0";
            this.holidayObj.RowVersion = "";

            this.http.post(this.editUrl, this.holidayObj).subscribe((response) => {
                this.toastr.successMessage(response['message']);
                this.router.navigateByUrl('/commonSetting/holiday', { skipLocationChange: true }).then(() =>
                    this.router.navigate(['/commonSetting/holiday']));
            },
                (error) => {
                    console.log(error);
                });
        }
    }

}
