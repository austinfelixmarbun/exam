import { GeneralSettingObj } from 'app/shared/model/GeneralSettingObj.Model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-general-setting-add-edit',
  templateUrl: './general-setting-add-edit.component.html',
  providers: [NGXToastrService]
})
export class GeneralSettingAddEditComponent implements OnInit {

  settingUrl: string = environment.settingUrl;
  gsObj: GeneralSettingObj;
  apiUrl: any;
  type: string = 'add';
  generalSettingId: any;
  resultData: any;

  gsCode: string;
  gsName: string;
  gsValue: string;
  gsDescr: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private service: NGXToastrService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.type = params['mode'];
      }
      if (params['generalSettingId'] != null) {
        this.generalSettingId = params['generalSettingId'];
      }
    });
  }


  ngOnInit() {
    if (this.type == 'edit') {
      this.apiUrl = this.settingUrl + AdInsConstant.GetGeneralSettingById;
      this.gsObj = new GeneralSettingObj()
      this.gsObj.generalSettingId = +this.generalSettingId
      this.httpClient.post(this.apiUrl, this.gsObj).subscribe(
        (response) => {
          console.log(response['returnObject']);
          this.gsObj = response['returnObject'];
          this.gsCode = response['returnObject']['gsCode'];
          this.gsName = response['returnObject']['gsName'];
          this.gsValue = response['returnObject']['gsValue'];
          this.gsDescr = response['returnObject']['gsDescr'];
          },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  Save(GSForm: NgForm): void {
    this.spinner.show();
    var returnObj: any;
    var getValueUrl = this.settingUrl + AdInsConstant.GetGeneralSettingValue;
    var gsCheckObj: GeneralSettingObj;
    gsCheckObj = new GeneralSettingObj()
    gsCheckObj.gsCode = GSForm.value.gsCode;
    //MODE-ADD
    if (this.type != 'edit') {
      //CHECK-DUPLICATE-CODE
      this.httpClient.post(getValueUrl, gsCheckObj).subscribe(
        (response) => {
          console.log("Success Check Duplicate");
          returnObj = response['returnObject'];
          console.log(returnObj);
          if (returnObj != null) {
            this.service.typeErrorCustom('Code Has Been Used');
          }
          else {
            this.apiUrl = this.settingUrl + AdInsConstant.AddGeneralSetting;

            this.gsObj = new GeneralSettingObj();
            this.gsObj.gsCode =  GSForm.value.gsCode;
            this.gsObj.gsName = GSForm.value.gsName;
            this.gsObj.gsValue = GSForm.value.gsValue;
            this.gsObj.gsDescr =  GSForm.value.gsDescr;
            //SAVE
            this.httpClient.post(this.apiUrl, this.gsObj).subscribe(
              (response) => {
                console.log("Success Save");
                this.service.typeSave(response['message']);
                this.router.navigateByUrl('commonSetting/generalSetting', { skipLocationChange: true }).then(() =>
                  this.router.navigate(['/commonSetting/generalSetting/detail']));
              },
              (error) => {
                console.log("Error Save");
                this.service.typeErrorCustom(error);
              }
            );
          }
        },
        (error) => {
          console.log("Error Check Duplicate");
          this.service.typeErrorCustom(error);
        }
      );
    }
    //MODE-EDIT
    else {
      this.apiUrl = this.settingUrl + AdInsConstant.EditGeneralSetting;

      this.gsObj.gsCode =  GSForm.value.gsCode;
      this.gsObj.gsName = GSForm.value.gsName;
      this.gsObj.gsValue = GSForm.value.gsValue;
      this.gsObj.gsDescr =  GSForm.value.gsDescr;
      //SAVE
      this.httpClient.post(this.apiUrl, this.gsObj).subscribe(
        (response) => {
          console.log("Success Edit");
          this.service.typeSave(response['message']);
          this.location.back();
          this.spinner.hide();
        },
        (error) => {
          console.log("Error Edit");
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
  }
}
