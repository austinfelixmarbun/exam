
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefOfficeAreaObj } from 'app/shared/model/RefOfficeAreaObj.model';

@Component({
  selector: 'app-office-area-add-edit',
  templateUrl: './office-area-add-edit.component.html',
  providers: [NGXToastrService]
})
export class OfficeAreaAddEditComponent implements OnInit {

  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  parents: string;
  refOfficeAreaObj: RefOfficeAreaObj;
  type: string = 'Add';
  areaName: any;
  areaCode: any;
  isActive: boolean=true;
  refOfficeAreaId: any;
  resultData: any;

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
      if (params['refOfficeAreaId'] != null) {
        this.refOfficeAreaId = params['refOfficeAreaId'];
      }
    });
  }


  ngOnInit() {
    if (this.type == 'edit') {
      this.apiUrl = this.foundationUrl + AdInsConstant.GetRefArea;
      this.refOfficeAreaObj = new RefOfficeAreaObj()
      this.refOfficeAreaObj.refOfficeAreaId = +this.refOfficeAreaId
      this.httpClient.post(this.apiUrl, this.refOfficeAreaObj).subscribe(
        (response) => {
          console.log('Success Get');
          this.refOfficeAreaObj = response['returnObject'];
          this.areaCode = response['returnObject']['areaCode']
          this.areaName = response['returnObject']['areaName']
          if (this.refOfficeAreaObj.isActive == '1') {
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

  Back(): void {
    this.location.back();
  }

  Save(OffAreaForm: NgForm): void {
    this.spinner.show();
    var getDuplicateUrl = this.foundationUrl + AdInsConstant.CheckDuplAreaCode;
    var getRoleUrlGateway = 'http://01-05-0064-0618/FOUNDATION_R3/RefRole/GetRefRole'
    var officeAreaObj: RefOfficeAreaObj;
    officeAreaObj = new RefOfficeAreaObj()
    officeAreaObj.areaCode = OffAreaForm.value.areaCode;

    //MODE-ADD
    if (this.type != 'edit') {

      //CHECK-DUPLICATE-CODE
      this.httpClient.post(getDuplicateUrl, officeAreaObj).subscribe(
        (response) => {
          if (response['returnObject']['isDuplicate'] == true) {
            this.service.typeErrorCustom('Code Has Been Used');
          }
          else {
            this.apiUrl = this.foundationUrl + AdInsConstant.AddRefOfficeArea;
            this.refOfficeAreaObj = new RefOfficeAreaObj();
            this.refOfficeAreaObj.areaCode = OffAreaForm.value.areaCode;
            this.refOfficeAreaObj.areaName = OffAreaForm.value.areaName;
            if (OffAreaForm.value.isActive) { this.refOfficeAreaObj.isActive = '1' } else { this.refOfficeAreaObj.isActive = '0' };
            //SAVE
            this.httpClient.post(this.apiUrl, this.refOfficeAreaObj).subscribe(
              (response) => {
                this.service.typeSave(response['message']);
                this.router.navigateByUrl('/office/officeArea', { skipLocationChange: true }).then(() =>
                this.router.navigate(['/office/officeArea/detail']));
                this.spinner.hide();
              },
              (error) => {
                this.service.typeErrorCustom(error);
                this.spinner.hide();
              }
            );
          }
        },
        (error) => {
          this.service.typeErrorCustom(error);
        }
      );
    }
    //MODE-EDIT
    else {
      this.apiUrl = this.foundationUrl + AdInsConstant.EditRefOfficeArea;
      this.refOfficeAreaObj.refOfficeAreaId = this.refOfficeAreaId;
      this.refOfficeAreaObj.areaCode = OffAreaForm.value.areaCode;
      this.refOfficeAreaObj.areaName = OffAreaForm.value.areaName;
      if (OffAreaForm.value.isActive) { this.refOfficeAreaObj.isActive = '1' } else { this.refOfficeAreaObj.isActive = '0' };
      //SAVE
      this.httpClient.post(this.apiUrl, this.refOfficeAreaObj).subscribe(
        (response) => {
          this.service.typeSave(response['message']);
          this.location.back();
          this.spinner.hide();
        },
        (error) => {
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
  }

  FillFormEdit() {
  }
}
