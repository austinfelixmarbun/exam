import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CabinetWithListRackObj } from 'app/shared/model/document-management/CabinetWithListRackObj.Model';
import { RackObj } from 'app/shared/model/document-management/RackObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-rack-add-edit',
  templateUrl: './rack-add-edit.component.html'
})
export class RackAddEditComponent implements OnInit {
  RackCode: string;
  Mode: string;
  CabinetCode: string;
  title: string = "ADD RACK";
  rack: RackObj = new RackObj();
  cabinetWithRackObj: CabinetWithListRackObj = new CabinetWithListRackObj();

  RackForm = this.fb.group({
    RackCode: ['', [Validators.required, Validators.maxLength(50)]],
    RackName: ['', [Validators.required, Validators.maxLength(100)]],
    RackInformation: [''],
    IsActive: [true]
  });
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService) { 
    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['RackCode'] !== null){
          this.RackCode = params['RackCode']
        }
        if(params['Mode'] !== null){
          this.Mode = params['Mode']
        }
        if(params['CabinetCode'] !== null){
          this.CabinetCode = params['CabinetCode']
        }
      }
    );
  }

  ngOnInit() {
    if(this.Mode !== null || this.Mode !== undefined){
      if(this.Mode === 'Edit'){
        this.title = "EDIT RACK";
        this.RackForm.controls.RackCode.disable();
        this.rack.RackCode = this.RackCode;
        this.http.post<CabinetWithListRackObj>(environment.FoundationR3Url + "/DocManagement/GetCabinetAndRackByRackCode", this.rack).subscribe(
          (response) => {
            this.cabinetWithRackObj = response;
            this.RackForm.controls['RackCode'].patchValue(response.ListRack[0].RackCode);
            this.RackForm.controls['RackName'].patchValue(response.ListRack[0].RackName);
            this.RackForm.controls['RackInformation'].patchValue(response.ListRack[0].RackInfo);
            this.RackForm.controls['IsActive'].patchValue(response.ListRack[0].IsActive);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
    else{
      this.router.navigateByUrl("/DocumentManagement/Cabinet/Paging");
    }
  }

  SaveForm(){
    this.rack.RackCode = this.RackForm.controls['RackCode'].value;
    this.rack.RackName = this.RackForm.controls['RackName'].value;
    this.rack.RackInfo = this.RackForm.controls['RackInformation'].value;
    this.rack.IsActive = this.RackForm.controls['IsActive'].value;
    
    if(this.Mode === 'Edit'){
      this.rack.CabinetId = this.cabinetWithRackObj.CabinetId;
      this.rack.CurrentRackCode = this.RackCode;
      this.http.post(environment.FoundationR3Url + "/DocManagement/EditRack", this.rack).subscribe(
        (response) => {
          this.toastr.successMessage("Success.");
          this.router.navigate(["/DocumentManagement/Rack/Paging"], { queryParams: { CabinetCode: this.CabinetCode } });
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.rack.CabinetCode = this.CabinetCode;
      this.http.post(environment.FoundationR3Url + "/DocManagement/AddRack", this.rack).subscribe(
        (response) => {
          this.toastr.successMessage("Success.");
          this.router.navigate(["/DocumentManagement/Rack/Paging"], { queryParams: { CabinetCode: this.CabinetCode } });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  backClick(){
    this.router.navigate(["/DocumentManagement/Rack/Paging"], { queryParams: { CabinetCode: this.CabinetCode } });
  }
}