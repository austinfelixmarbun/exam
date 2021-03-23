import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GeneralSettingObj } from 'app/shared/model/GeneralSettingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-general-setting-admin-detail',
  templateUrl: './general-setting-admin-detail.component.html',
  styles: []
})
export class GeneralSettingAdminDetailComponent implements OnInit {
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

  readonly CancelLink: string = NavigationConstant.CS_GEN_SETTING_ADMIN;

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
    this.gsObj.GeneralSettingId = this.generalSettingId;
    this.httpClient.post(URLConstant.GetGeneralSettingById, this.gsObj).subscribe(
      (response) => {
        this.resultData = response;
        this.GeneralSettingForm.patchValue({
          GsCode: this.resultData.GsCode,
          GsName: this.resultData.GsName,
          GsValue: this.resultData.GsValue,
          GsDescr: this.resultData.GsDescr
          }); 
        }
    ); 
  }

  SaveForm(): void {
    this.gsObj = this.resultData;
    this.gsObj.GeneralSettingId = this.generalSettingId;
    this.gsObj.GsName = this.GeneralSettingForm.controls["GsName"].value;
    this.gsObj.GsValue = this.GeneralSettingForm.controls["GsValue"].value;
    this.gsObj.GsDescr = this.GeneralSettingForm.controls["GsDescr"].value;
    this.httpClient.post(URLConstant.EditGeneralSetting, this.gsObj).subscribe(
      response => {
        this.service.successMessage(response["Message"]);
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_GEN_SETTING_ADMIN],{});
      }
    );
  }

}
