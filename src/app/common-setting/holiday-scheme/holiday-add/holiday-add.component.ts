import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdInsService } from 'app/shared/services/adIns.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm } from '@angular/forms';
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

    param: string;
    businessUnitCode: string;
    businessUnitName: string;
    description: string;
    activestatus: string;
    result: any;
    mode: string = "add";
    apiUrl: any;
    pageType: string;
    isActive: boolean = true;
    settingUrl: string = environment.settingUrl;
    urlEnviPaging: string = environment.foundationUrl;
    holidayObj: HolidayObj;
    holidaySchmHId:any;
    editUrl: any;
    key: any;
    criteria: CriteriaObj[] = [];

    constructor(private toastr: NGXToastrService, private router: Router, private route: ActivatedRoute, private http: HttpClient,
        private adInsService: AdInsService) {
          this.route.queryParams.subscribe(params => {
            if (params["param"] != null) {
              this.pageType = params["param"];
              this.mode = params["param"];
            }
            if (params["holidaySchmHId"] != null) {
              this.holidaySchmHId = params["holidaySchmHId"];
            }
            this.result = new HolidayObj();
        });
    }

    ngOnInit() {
      console.log("edit");
        if (this.mode == "edit") {
            this.apiUrl = this.urlEnviPaging + AdInsConstant.GetHolidaySchmH;
            var holidayObj = new HolidayObj();
            holidayObj.holidaySchmHId = this.holidaySchmHId;
            this.http.post(this.apiUrl, holidayObj).subscribe(
                (response) => {
                    this.result = response['returnObject'];
                    // this.holidayObj.holidaySchmCode = this.result.holidaySchmCode;
                    // this.holidayObj.holidaySchmName = this.result.holidaySchmName;
                    // this.holidayObj.holidaySchmHId = this.result.holidaySchmHId;
                    if (this.result.isActive == "1") {
                        this.isActive = true;
                    }
                    else {
                        this.isActive = false;
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    toggleVisibility(e) {
        this.isActive = e.target.checked;
    }

    formValidate(form: any) {
        this.adInsService.scrollIfFormHasErrors(form);
    }

    SaveForm(HolidaySchemeHReqForm: NgForm): void {
        if (this.mode == "edit") {
          console.log("edit");
            this.editUrl = this.urlEnviPaging + AdInsConstant.EditHolidaySchmHOnly;
            this.holidayObj = new HolidayObj();
            this.holidayObj = HolidaySchemeHReqForm.value;
            this.holidayObj.holidaySchmHId = this.holidaySchmHId;
            if (this.isActive == false) {
                this.holidayObj.isActive = "0";
            }
            else {
                this.holidayObj.isActive = "1";
            }
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
            this.editUrl = this.urlEnviPaging + AdInsConstant.AddHolidaySchmH;
            this.holidayObj = new HolidayObj();
            this.holidayObj = HolidaySchemeHReqForm.value;
            if (this.isActive == false) {
                this.holidayObj.isActive = "0";
            }
            else {
                this.holidayObj.isActive = "1";
            }
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
