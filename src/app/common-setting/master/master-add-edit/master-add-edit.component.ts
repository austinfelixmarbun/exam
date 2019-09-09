
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
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
  selector: 'app-master-add-edit',
  templateUrl: './master-add-edit.component.html',
  providers: [NGXToastrService]
})
export class MasterAddEditComponent implements OnInit {

  settingUrl: string = environment.settingUrl;
  apiUrl: any;
  refMasterObj: RefMasterObj;
  refMasterTypeObj: any;
  type: string = 'add';
  masterCodeModel: any;
  descrModel: any;
  refMasterTypeCodeModule: any;
  isActive: boolean=true;
  refMasterId: any;
  resultData: any;
  sandiBI: any;
  seqNo: any;

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
      if (params['refMasterId'] != null) {
        this.refMasterId = params['refMasterId'];
      }
      console.log(this.type)
      console.log(this.refMasterId)
    });
  }


  ngOnInit() {
    console.log('masuk');
    this.refMasterObj = new RefMasterObj()
    this.GetListMasterType();
    if (this.type == 'edit') {
      this.apiUrl = this.settingUrl + AdInsConstant.GetRefMaster;
      this.refMasterObj = new RefMasterObj()
      this.refMasterObj.refMasterId = +this.refMasterId
      this.httpClient.post(this.apiUrl, this.refMasterObj).subscribe(
        (response) => {
          console.log('Success Get');
          this.refMasterObj = response['returnObject'];
          console.log(this.refMasterObj);
          this.masterCodeModel = response['returnObject']['masterCode'];
          this.descrModel = response['returnObject']['descr'];
          this.sandiBI = response['returnObject']['reserveField1'];
          this.seqNo = response['returnObject']['seqNo'];
          if (this.refMasterObj.isActive == '1') { this.isActive = true; } else { this.isActive = false; }
          if (this.refMasterObj.refMasterTypeCode == null) { this.refMasterTypeCodeModule = '' } else { this.refMasterTypeCodeModule = this.refMasterObj.refMasterTypeCode };
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

  Save(MasterAddEditForm: NgForm): void {
    this.spinner.show();
    var returnObj: Array<any> = [];
    var getRefMasterUrl = this.settingUrl + AdInsConstant.GetRefMasterListByTypeCode;
    var masterObj: RefMasterObj;
    masterObj = new RefMasterObj()
    masterObj.refMasterTypeCode = MasterAddEditForm.value.refMasterTypeCodeModule;
    masterObj.masterCode = MasterAddEditForm.value.masterCodeModel;

    //MODE-ADD
    if (this.type != 'edit') {

      //CHECK-DUPLICATE-CODE
      this.httpClient.post(getRefMasterUrl, masterObj).subscribe(
        (response) => {
          console.log("Success Check Duplicate");
          returnObj = response['returnObject'];
          console.log(returnObj);
          if (returnObj.length > 0) {
            this.service.typeErrorCustom('Code Has Been Used');
          }
          else {
            this.apiUrl = this.settingUrl + AdInsConstant.AddRefMaster;

            this.refMasterObj = new RefMasterObj();
            this.refMasterObj.refMasterTypeCode = MasterAddEditForm.value.refMasterTypeCodeModule;
            this.refMasterObj.masterCode = MasterAddEditForm.value.masterCodeModel;
            this.refMasterObj.descr = MasterAddEditForm.value.descrModel;
            this.refMasterObj.reserveField1 = MasterAddEditForm.value.sandiBI;
            this.refMasterObj.seqNo = MasterAddEditForm.value.seqNo;
            this.refMasterObj.isSystem = '3';
            this.refMasterObj.isDeleteable = '1';
            if (MasterAddEditForm.value.isActive) { this.refMasterObj.isActive = '1' } else { this.refMasterObj.isActive = '0' };

            //SAVE
            this.httpClient.post(this.apiUrl, this.refMasterObj).subscribe(
              (response) => {
                console.log("Success Save");
                //location.reload();
                this.service.typeSave(response['message']);
                this.router.navigateByUrl('commonSetting/master', { skipLocationChange: true }).then(() =>
                this.router.navigate(['/commonSetting/master/detail']));
                // this.router.navigate(['/commonSetting/master/detail']);

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
      this.apiUrl = this.settingUrl + AdInsConstant.EditRefMaster;

      this.refMasterObj.refMasterId = this.refMasterId;
      this.refMasterObj.refMasterTypeCode = MasterAddEditForm.value.refMasterTypeCodeModule;
      this.refMasterObj.masterCode = MasterAddEditForm.value.masterCodeModel;
      this.refMasterObj.descr = MasterAddEditForm.value.descrModel;
      this.refMasterObj.reserveField1 = MasterAddEditForm.value.sandiBI;
      this.refMasterObj.seqNo = MasterAddEditForm.value.seqNo
      if (MasterAddEditForm.value.isActive) { this.refMasterObj.isActive = '1' } else { this.refMasterObj.isActive = '0' };

      //SAVE
      this.httpClient.post(this.apiUrl, this.refMasterObj).subscribe(
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
    this.apiUrl = this.settingUrl + AdInsConstant.GetRefMasterTypeKeyValueUserSetting;
    var masterObj = new RefMasterObj();
    this.httpClient.post(this.apiUrl, masterObj).subscribe(
      (response) => {
        this.refMasterTypeObj = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
