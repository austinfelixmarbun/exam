import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-vendor-ho-add-edit',
  templateUrl: './vendor-ho-add-edit.component.html',
  styleUrls: ['./vendor-ho-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class VendorHoAddEditComponent implements OnInit {
  itemCategoryType: any;
  itemType: any;
  itemIdType: any;
  check: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 

  }
  
  VendorForm = this.fb.group({
    MrVendorCategoryCode:['', Validators.required],
    VendorCode: ['', Validators.required],
    VendorName: ['', Validators.required],
    MrVendorTypeCode: ['', Validators.required],
    RegistrationNo: ['', Validators.required],
    LicenseNo: ['', Validators.required],
    MrIdTypeCode: ['', Validators.required],
    IdNo: ['', Validators.required],
    MobilePhnNo1: [''],
    MobilePhnNo2: [''],
    Email: ['', Validators.required], //Validators.pattern("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$")
    VendorRating: [''],
    EstablishmentDt: ['', Validators.required],
    PartnershipDt: ['', Validators.required],
    IsActive:  ['1'],
    RowVersion: ['']    
  })

  ngOnInit() {
    var refMasterCategoryObj = {
      RefMasterTypeCode: "VENDOR_CATEGORY",
      ReserveField1: "HO"
    }
    this.http.post("http://r3app-server/FOUNDATION_R3/RefMaster/GetListActiveRefMaster", refMasterCategoryObj).subscribe(
      (response) => {
        this.itemCategoryType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrVendorCategoryCode: this.itemCategoryType[0].MasterCode
        });
      } 
    );

    var refMasterTypeObj = {
      RefMasterTypeCode: "VENDOR_TYPE",
    }
    this.http.post("http://r3app-server/FOUNDATION_R3/RefMaster/GetListActiveRefMaster", refMasterTypeObj).subscribe(
      (response) => {
        this.itemType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrVendorTypeCode: this.itemType[0].MasterCode
        });
      } 
    );

    var refMasterIdObj = {
      RefMasterTypeCode: "ID_TYPE_VENDOR",
    }
    this.http.post("http://r3app-server/FOUNDATION_R3/RefMaster/GetListActiveRefMaster", refMasterIdObj).subscribe(
      (response) => {
        this.itemIdType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrIdTypeCode: this.itemIdType[0].MasterCode
        });
      } 
    );
  }

  updateValueAndValidityForm(){
    this.VendorForm.controls.MrIdTypeCode.updateValueAndValidity();
    this.VendorForm.controls.IdNo.updateValueAndValidity();
    this.VendorForm.controls.RegistrationNo.updateValueAndValidity();
    this.VendorForm.controls.LicenseNo.updateValueAndValidity();
  }

  checkHOType(){
    if(this.VendorForm.controls.MrVendorTypeCode.value != 'P'){
      this.VendorForm.controls.MrIdTypeCode.clearValidators();
      this.VendorForm.controls.IdNo.clearValidators();
      this.VendorForm.controls.RegistrationNo.setValidators(Validators.required);
      this.VendorForm.controls.LicenseNo.setValidators(Validators.required);
      this.updateValueAndValidityForm();
    }else{
      this.VendorForm.controls.RegistrationNo.clearValidators();
      this.VendorForm.controls.LicenseNo.clearValidators();
      this.VendorForm.controls.MrIdTypeCode.setValidators(Validators.required);
      this.VendorForm.controls.IdNo.setValidators(Validators.required);
      this.updateValueAndValidityForm();
    }
  }
}
