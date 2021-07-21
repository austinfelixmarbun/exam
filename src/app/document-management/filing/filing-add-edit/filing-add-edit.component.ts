import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RackWithListFilingObj } from 'app/shared/model/document-management/RackWithListFilingObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FilingObj } from 'app/shared/model/document-management/FilingObj.Model';
import { CabinetWithListRackObj } from 'app/shared/model/document-management/CabinetWithListRackObj.Model';
import { environment } from 'environments/environment';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { RackObj } from 'app/shared/model/document-management/RackObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';

@Component({
  selector: 'app-filing-add-edit',
  templateUrl: './filing-add-edit.component.html'
})
export class FilingAddEditComponent implements OnInit {
  Cabinet: CabinetWithListRackObj = new CabinetWithListRackObj();
  FilingCode: string;
  Mode: string;
  title: string = "ADD FILING";
  filing: FilingObj = new FilingObj();
  rackWithListFilling: RackWithListFilingObj = new RackWithListFilingObj();
  Rack: RackObj = new RackObj();
  RackCode: string;

  FillingForm = this.fb.group({
    FilingCode: ['', [Validators.required, Validators.maxLength(50)]],
    FilingName: ['', [Validators.required, Validators.maxLength(100)]],
    FilingInformation: ['', Validators.maxLength(4000)],
    IsActive: [true]
  });
  
  constructor(private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['RackCode'] !== null && params['CabinetCode'] !== null){
          this.rackWithListFilling.RackCode = params['RackCode'],
          this.Cabinet.CabinetCode = params['CabinetCode'],
          this.RackCode = params['RackCode']
        }
        if(params['RackCode'] !== null && params['CabinetCode'] !== null && params['FilingCode'] !== null){
          this.rackWithListFilling.RackCode = params['RackCode'],
          this.Cabinet.CabinetCode = params['CabinetCode'],
          this.FilingCode = params['FilingCode']
        }
        // if(params['FilingCode'] !== null){
        //   this.FilingCode = params['FilingCode']
        // }
        // if(params['RackCode'] !== null){
        //   this.RackCode = params['RackCode']
        // }
        if(params['Mode'] !== null){
          this.Mode = params['Mode'];
        }
        // if(params['CabinetCode'] !== null){
        //   this.CabinetCode = params['CabinetCode']
        // }
      }
    );
  }

  ngOnInit() {
    let GetRackByCode: GenericObj = new GenericObj();
    GetRackByCode.Code = this.RackCode;
    this.http.post<RackObj>(URLConstant.GetRackByCode, GetRackByCode).subscribe(
      (response) => {
        this.Rack = response;
      },
      (error) => {
        console.log(error);
      }
    );

    let GetRackAndListFilingByRackCode: GenericObj = new GenericObj();
    GetRackAndListFilingByRackCode.Code = this.RackCode;
    this.http.post<RackWithListFilingObj>(URLConstant.GetRackAndListFilingByRackCode, GetRackAndListFilingByRackCode).subscribe(
      (response) => {
        this.rackWithListFilling = response;
      },
      (error) => {
        console.log(error);
      }
    );

    let GetCabinetAndListRackByCabinetCode: GenericObj = new GenericObj();
    GetCabinetAndListRackByCabinetCode.Code = this.Cabinet.CabinetCode;
    this.http.post<CabinetWithListRackObj>(URLConstant.GetCabinetAndListRackByCabinetCode, GetCabinetAndListRackByCabinetCode).subscribe(
      (response) => {
        this.Cabinet = response;
      },
      (error) => {
        console.log(error);
      }
    );

    if(this.Mode !== null || this.Mode !== undefined){
      if(this.Mode === 'Edit'){
        this.title = "EDIT FILING";
        this.FillingForm.controls.FilingCode.disable();
        this.filing.FilingCode = this.FilingCode;
        let GetRackAndListFilingByFilingCode: GenericObj = new GenericObj();
        GetRackAndListFilingByFilingCode.Code = this.FilingCode;
        this.http.post<RackWithListFilingObj>(URLConstant.GetRackAndListFilingByFilingCode, GetRackAndListFilingByFilingCode).subscribe(
          (response) => {
            this.rackWithListFilling = response;
            this.FillingForm.controls['FilingCode'].patchValue(response.ListFiling[0].FilingCode);
            this.FillingForm.controls['FilingName'].patchValue(response.ListFiling[0].FilingName);
            this.FillingForm.controls['FilingInformation'].patchValue(response.ListFiling[0].FilingInfo);
            this.FillingForm.controls['IsActive'].patchValue(response.ListFiling[0].IsActive);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
    else{
      this.router.navigateByUrl(NavigationConstant.DOC_MNGMNT_RACK_PAGING);
    }
  }

  SaveForm(){
    this.filing.FilingCode = this.FillingForm.controls['FilingCode'].value;
    this.filing.FilingName = this.FillingForm.controls['FilingName'].value;
    this.filing.FilingInfo = this.FillingForm.controls['FilingInformation'].value;
    this.filing.IsActive = this.FillingForm.controls['IsActive'].value;

    if(this.Mode === 'Edit'){
      this.filing.RackId = this.rackWithListFilling.RackId;
      this.filing.CurrentFilingCode = this.FilingCode;
      this.http.post(URLConstant.EditFiling, this.filing).subscribe(
        (response) => {
          this.toastr.successMessage("Success.");
          this.router.navigate([NavigationConstant.DOC_MNGMNT_FILING_PAGING], { queryParams: { CabinetCode: this.Cabinet.CabinetCode, RackCode: this.rackWithListFilling.RackCode } });
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.filing.RackCode = this.rackWithListFilling.RackCode;
      this.filing.RackId = this.Rack.RackId;
      console.log(this.filing.RackId);
      this.http.post(URLConstant.AddFiling, this.filing).subscribe(
        (response) => {
          this.toastr.successMessage("Success.");
          this.router.navigate([NavigationConstant.DOC_MNGMNT_FILING_PAGING], { queryParams: { CabinetCode: this.Cabinet.CabinetCode, RackCode: this.rackWithListFilling.RackCode } });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  backClick(){
    this.router.navigate([NavigationConstant.DOC_MNGMNT_FILING_PAGING], { queryParams: { CabinetCode: this.Cabinet.CabinetCode, RackCode: this.rackWithListFilling.RackCode} });
  }
}