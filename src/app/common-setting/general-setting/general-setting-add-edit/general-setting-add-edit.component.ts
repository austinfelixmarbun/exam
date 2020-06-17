import { GeneralSettingObj } from 'app/shared/model/GeneralSettingObj.Model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
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

  gsObj: GeneralSettingObj;
  type: string = 'add';
  generalSettingId: any;
  resultData: any;

  GeneralSettingForm = this.fb.group({
    GsCode: [{disabled: true, value: ''}],
    GsName: ['', [Validators.required, Validators.maxLength(100)]],
    GsValue: ['', [Validators.required, Validators.maxLength(3000)]],
    GsDescr: ['', Validators.maxLength(4000)]
    });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['generalSettingId'] != null) {
        this.generalSettingId = params['generalSettingId'];
      }
    });
  }


  ngOnInit() {
    this.gsObj = new GeneralSettingObj();
    this.gsObj.GeneralSettingId = this.generalSettingId
    this.httpClient.post(AdInsConstant.GetGeneralSettingById, this.gsObj).subscribe(
      (response) => {
        this.resultData = response;
        console.log(this.resultData);
        this.GeneralSettingForm.patchValue({
          GsCode: this.resultData.GsCode,
          GsName: this.resultData.GsName,
          GsValue: this.resultData.GsValue,
          GsDescr: this.resultData.GsDescr
          }); 
        },
      (error) => {
        console.log(error);
      }
    ); 
  }

  SaveForm(): void {
    this.gsObj = this.resultData;
    this.gsObj.GeneralSettingId = this.generalSettingId;
    this.gsObj.GsName = this.GeneralSettingForm.controls["GsName"].value;
    this.gsObj.GsValue = this.GeneralSettingForm.controls["GsValue"].value;
    this.gsObj.GsDescr = this.GeneralSettingForm.controls["GsDescr"].value;
    this.httpClient.post(AdInsConstant.EditGeneralSetting, this.gsObj).subscribe(
      response => {
        this.service.successMessage(response["Message"]);
        this.router.navigate(["/CommonSetting/GeneralSetting"]);
      },
      error => {
        console.log(error);
      }
    );
  }
}
