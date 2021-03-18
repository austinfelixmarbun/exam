
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';


@Component({
  selector: 'app-master-add-edit',
  templateUrl: './master-add-edit.component.html',
  providers: [NGXToastrService]
})
export class MasterAddEditComponent implements OnInit {

  settingUrl: string = environment.FoundationR3Url;
  refMasterObj: RefMasterObj = new RefMasterObj();
  refMasterTypeObj: any;
  type: string = 'add';
  RefMasterId: any;
  resultData: any;
  dropdownListObj: UcDropdownListObj = new UcDropdownListObj();

  RefMasterForm = this.fb.group({
    RefMasterId: [0, [Validators.required]],
    RefMasterTypeCode: ['', [Validators.required]],
    MasterCode: ['', [Validators.required, Validators.maxLength(50)]],
    SeqNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    Descr: ['', [Validators.required]],
    IsActive: [true],
    RowVersion: [''],
    IsDeletable: [true],
    IsSystem: [false]
  });

  readonly CancelLink: string = NavigationConstant.CS_MASTER;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.type = params['mode'];
      }
      if (params['RefMasterId'] != null) {
        this.RefMasterId = params['RefMasterId'];
      }
    });
  }


  ngOnInit() {
    this.dropdownListObj.enviromentUrl = environment.FoundationR3Url;
    this.dropdownListObj.apiPath = URLConstant.GetListActiveRefMasterType;
    this.dropdownListObj.requestObj = {};
    this.GetListMasterType();
    if (this.type == 'edit') {
      this.refMasterObj.RefMasterId = this.RefMasterId;
      var getRefMasterUrl = this.settingUrl + URLConstant.GetRefMasterByRefMasterId;
      this.httpClient.post(getRefMasterUrl, this.refMasterObj).subscribe(
        (response) => {
          this.resultData = response;
          this.RefMasterForm.patchValue({
            RefMasterId: this.resultData.RefMasterId,
            RefMasterTypeCode: this.resultData.RefMasterTypeCode,
            MasterCode: this.resultData.MasterCode,
            SeqNo: this.resultData.SeqNo,
            Descr: this.resultData.Descr,
            IsActive: this.resultData.IsActive,
            RowVersion: this.resultData.RowVersion,
            IsDeletable: this.resultData.IsDeletable,
            IsSystem: this.resultData.IsSystem
          });
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  Save() {
    this.spinner.show();
    this.refMasterObj = this.RefMasterForm.value;

    //MODE-ADD
    if (this.type != 'edit') {
      var addRefMasterUrl = this.settingUrl + URLConstant.AddRefMaster;
      this.httpClient.post(addRefMasterUrl, this.refMasterObj).subscribe(
        //SAVE
        (response) => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CS_MASTER], {});
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
        }
      );
    }
    //MODE-EDIT
    else {
      var addRefMasterUrl = this.settingUrl + URLConstant.EditRefMaster;
      //SAVE
      this.httpClient.post(addRefMasterUrl, this.refMasterObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          //this.location.back();
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CS_MASTER], {});
          this.spinner.hide();
        },
        (error) => {
          this.toastr.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
  }

  GetListMasterType() {
    var url = this.settingUrl + URLConstant.GetListActiveRefMasterType;
    this.httpClient.post(url, null).subscribe(
      (response) => {
        this.refMasterTypeObj = response;
      }
    );
  }
}
