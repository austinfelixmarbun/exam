
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


@Component({
  selector: 'app-master-add-edit',
  templateUrl: './master-add-edit.component.html',
  providers: [NGXToastrService]
})
export class MasterAddEditComponent implements OnInit {

  settingUrl: string = environment.FoundationR3Url;
  refMasterTypeObj: any;
  type: string = 'add';
  refMasterId: any;
  resultData: any;

  RefMasterForm = this.fb.group({
    RefMasterTypeCode: ['', [Validators.required]],
    MasterCode: ['', [Validators.required, Validators.maxLength(50)]],
    SeqNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    Descr: ['', [Validators.required]],
    IsActive: [true],
    RowVersion: [''],
    IsDeletable: [true],
    IsSystem: [false]
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private service: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.type = params['param'];
      }
      if (params['refMasterId'] != null) {
        this.refMasterId = params['refMasterId'];
      }
    });
  }


  ngOnInit() {
    console.log('masuk');
    this.GetListMasterType();
    if (this.type == 'edit') {
      var refMasterObj = new RefMasterObj();
      refMasterObj.RefMasterId = this.refMasterId;
      var getRefMasterUrl = this.settingUrl + AdInsConstant.GetRefMasterByRefMasterId;
      this.httpClient.post(getRefMasterUrl, refMasterObj).subscribe(
        (response) => {
          console.log('Success Get');
          this.resultData = response;
          this.RefMasterForm.patchValue({
            RefMasterTypeCode: this.resultData.RefMasterTypeCode,
            MasterCode: this.resultData.MasterCode,
            SeqNo: this.resultData.SeqNo,
            Descr: this.resultData.Descr,
            IsActive: this.resultData.IsActive,
            RowVersion: this.resultData.RowVersion,
            IsDeletable: this.resultData.IsDeletable,
            IsSystem: this.resultData.IsSystem
          });
        },
        (error) => {
          console.log('Error Get');
          console.log(error);
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  Save() {
    this.spinner.show();
    var addRefMasterUrl = this.settingUrl + AdInsConstant.AddRefMaster;
    var refMasterObj = new RefMasterObj();
    refMasterObj = this.RefMasterForm.value;

    //MODE-ADD
    if (this.type != 'edit') {
      this.httpClient.post(addRefMasterUrl, refMasterObj).subscribe(
        //SAVE
        (response) => {
          console.log("Success Save");
          this.service.typeSave(response['message']);
          this.router.navigateByUrl('commonSetting/master', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/commonSetting/master/detail']));
        },
        (error) => {
          console.log("Error Save : ");
          this.service.typeErrorCustom(error);
        }
      );
    }
    //MODE-EDIT
    else {
      //SAVE
      this.httpClient.post(addRefMasterUrl, refMasterObj).subscribe(
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

  GetListMasterType() {
    var url = this.settingUrl + AdInsConstant.GetListActiveRefMasterType;
    this.httpClient.post(url, null).subscribe(
      (response) => {
        this.refMasterTypeObj = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
