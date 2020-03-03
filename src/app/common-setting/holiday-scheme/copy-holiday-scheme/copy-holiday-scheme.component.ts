import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdInsService } from 'app/shared/services/adIns.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HolidayObj } from 'app/shared/model/HolidayObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-copy-holiday-scheme',
  templateUrl: './copy-holiday-scheme.component.html',
  styleUrls: ['./copy-holiday-scheme.component.scss'],
  providers: [NGXToastrService, DecimalPipe]
})
export class CopyHolidaySchemeComponent implements OnInit {

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
    holidayDestObj : HolidayObj;
    holidayDestCombine : any;
    holidaySchmHId:any;
    editUrl: any;
    inputLookupObj:any;
    key: any;
    criteria: CriteriaObj[] = [];
    

    constructor(private toastr: NGXToastrService, private router: Router, private route: ActivatedRoute, private http: HttpClient,
        private adInsService: AdInsService) {
          //** app-lookupgeneric **//
          this.inputLookupObj = new InputLookupObj();
          this.inputLookupObj.urlJson = "./assets/lookup/lookupHolidaySchmH.json";
          this.inputLookupObj.urlQryPaging = AdInsConstant.GetHolidayPaging;
          this.inputLookupObj.urlEnviPaging = environment.foundationUrl;
          this.inputLookupObj.pagingJson = "./assets/form-setting/holidayPaging.json";
          this.inputLookupObj.genericJson = "./assets/form-setting/holidayGeneric.json";
          //** app-lookupgeneric **//
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
            holidayObj.HolidaySchmHId = this.holidaySchmHId;
            this.http.post(this.apiUrl, holidayObj).subscribe(
                (response) => {
                    this.result = response['returnObject'];
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
            this.holidayObj.HolidaySchmHId = this.holidaySchmHId;
            if (this.isActive == false) {
                this.holidayObj.IsActive = "0";
            }
            else {
                this.holidayObj.IsActive = "1";
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
            this.editUrl = this.urlEnviPaging + AdInsConstant.CopyHolidaySchm;
            this.holidayObj = new HolidayObj();
            this.holidayDestObj = new HolidayObj();
            this.holidayObj = HolidaySchemeHReqForm.value;
            if (this.isActive == false) {
                this.holidayObj.IsActive = "0";
            }
            else {
                this.holidayObj.IsActive = "1";
            }
            this.holidayObj.HolidaySchmHId = this.inputLookupObj.jsonSelect.holidaySchmHId;
            this.holidayDestObj.HolidaySchmHId = this.inputLookupObj.jsonSelect.holidaySchmHId;
            this.holidayDestObj.HolidaySchmCode = this.inputLookupObj.jsonSelect.holidaySchmCode;
            this.holidayDestObj.HolidaySchmName = this.inputLookupObj.jsonSelect.holidaySchmName;
            this.holidayDestObj.IsActive = this.inputLookupObj.jsonSelect.isActive;
            var holidayDest = {"holidaySchme2":this.holidayObj,"holidaySchme1":this.holidayDestObj};
            console.log(holidayDest);
            this.http.post(this.editUrl, holidayDest).subscribe((response) => {
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
