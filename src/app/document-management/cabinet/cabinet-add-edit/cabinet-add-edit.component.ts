import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CabinetObj } from 'app/shared/model/document-management/CabinetObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-cabinet-add-edit',
  templateUrl: './cabinet-add-edit.component.html',
  styleUrls: ['./cabinet-add-edit.component.scss']
})
export class CabinetAddEditComponent implements OnInit {
  title:string = "ADD CABINET";
  CabinetCode: string;
  Cabinet: CabinetObj = new CabinetObj();
  user:any;

  CabinetForm = this.fb.group({
    CabinetCode: ['', [Validators.required, Validators.maxLength(50)]],
    CabinetName: ['', [Validators.required, Validators.maxLength(100)]],
    CabinetInfo: ['', [Validators.required, Validators.maxLength(4000)]],
    IsActive: [true]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService) {
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['CabinetCode'] !== null){
          this.CabinetCode = params['CabinetCode']
        }
      }
    );
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("UserAccess"));
    if(this.CabinetCode !== undefined){
      this.title = "EDIT CABINET"
      this.CabinetForm.controls.CabinetCode.disable();
      this.Cabinet.CabinetCode = this.CabinetCode;
      this.http.post<CabinetObj>(environment.FoundationR3Url + "/DocManagement/GetCabinetByCode", this.Cabinet).subscribe(
        (response) => {
          this.Cabinet = response;
          this.CabinetForm.controls['CabinetCode'].patchValue(response.CabinetCode);
          this.CabinetForm.controls['CabinetName'].patchValue(response.CabinetName);
          this.CabinetForm.controls['CabinetInfo'].patchValue(response.CabinetInfo);
          this.CabinetForm.controls['IsActive'].patchValue(response.IsActive);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  SaveForm(){
    this.Cabinet.CabinetCode = this.CabinetForm.controls['CabinetCode'].value;
    this.Cabinet.CabinetName = this.CabinetForm.controls['CabinetName'].value;
    this.Cabinet.CabinetInfo = this.CabinetForm.controls['CabinetInfo'].value;
    this.Cabinet.IsActive = this.CabinetForm.controls['IsActive'].value;

    if(this.CabinetCode !== undefined) {
      this.http.post<CabinetObj>(environment.FoundationR3Url + "/DocManagement/EditCabinet", this.Cabinet).subscribe(
        (response) => {
          this.toastr.successMessage("Success!");
          this.router.navigateByUrl("/DocumentManagement/Cabinet/Paging");
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.Cabinet.RefOfficeId = this.user.OfficeId;
      this.http.post<CabinetObj>(environment.FoundationR3Url + "/DocManagement/AddCabinet", this.Cabinet).subscribe(
        (response) => {
          this.toastr.successMessage("Success!");
          this.router.navigateByUrl("/DocumentManagement/Cabinet/Paging");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}