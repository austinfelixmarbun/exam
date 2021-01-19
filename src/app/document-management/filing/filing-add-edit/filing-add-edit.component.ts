import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RackWithListFilingObj } from 'app/shared/model/document-management/RackWithListFilingObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FilingObj } from 'app/shared/model/document-management/FilingObj.Model';
import { CabinetWithListRackObj } from 'app/shared/model/document-management/CabinetWithListRackObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-filing-add-edit',
  templateUrl: './filing-add-edit.component.html',
  styleUrls: ['./filing-add-edit.component.scss']
})
export class FilingAddEditComponent implements OnInit {
  Cabinet: CabinetWithListRackObj = new CabinetWithListRackObj();
  FilingCode: string;
  Mode: string;
  title: string = "ADD FILING";
  filing: FilingObj = new FilingObj();
  rackWithListFilling: RackWithListFilingObj = new RackWithListFilingObj();

  FillingForm = this.fb.group({
    FilingCode: ['', [Validators.required, Validators.maxLength(50)]],
    FilingName: ['', [Validators.required, Validators.maxLength(100)]],
    FilingInformation: [''],
    IsActive: [true]
  });
  
  constructor(private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['RackCode'] !== null && params['CabinetCode'] !== null){
          this.rackWithListFilling.RackCode = params['RackCode'],
          this.Cabinet.CabinetCode = params['CabinetCode']
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
    this.http.post<RackWithListFilingObj>(environment.FoundationR3Url + "/DocManagement/GetRackAndListFilingByRackCode", this.rackWithListFilling).subscribe(
      (response) => {
        this.rackWithListFilling = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this.http.post<CabinetWithListRackObj>(environment.FoundationR3Url + "/DocManagement/GetCabinetAndListRackByCabinetCode", this.Cabinet).subscribe(
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
        this.http.post<RackWithListFilingObj>(environment.FoundationR3Url + "/DocManagement/GetRackAndListFilingByFilingCode", this.filing).subscribe(
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
      this.router.navigateByUrl("/DocumentManagement/Rack/Paging");
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
      this.http.post(environment.FoundationR3Url + "/DocManagement/EditFiling", this.filing).subscribe(
        (response) => {
          this.toastr.successMessage("Success.");
          this.router.navigate(["/DocumentManagement/Filing/Paging"], { queryParams: { CabinetCode: this.Cabinet.CabinetCode, RackCode: this.rackWithListFilling.RackCode } });
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.filing.RackCode = this.rackWithListFilling.RackCode;
      this.http.post(environment.FoundationR3Url + "/DocManagement/AddFiling", this.filing).subscribe(
        (response) => {
          this.toastr.successMessage("Success.");
          this.router.navigate(["/DocumentManagement/Filing/Paging"], { queryParams: { CabinetCode: this.Cabinet.CabinetCode, RackCode: this.rackWithListFilling.RackCode } });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  backClick(){
    this.router.navigate(["/DocumentManagement/Filing/Paging"], { queryParams: { CabinetCode: this.Cabinet.CabinetCode, RackCode: this.rackWithListFilling.RackCode} });
  }
}