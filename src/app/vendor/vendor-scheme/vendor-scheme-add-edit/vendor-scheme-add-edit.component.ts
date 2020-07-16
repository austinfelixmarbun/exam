import { Component, OnInit } from '@angular/core';
import { VendorSchemeObj } from 'app/shared/model/VendorSchemeObj.Model';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-vendor-scheme-add-edit',
  templateUrl: './vendor-scheme-add-edit.component.html',
  providers: [NGXToastrService]
})
export class VendorSchemeAddEditComponent implements OnInit {
  vendorSchemeObj: VendorSchemeObj;
  VendorSchmId: any;
  pageType:any;
  result: any;
  title:string;
  mode: string = "add";
  apiUrl: any;
  isActive: boolean = true;
  foundationUrl: string = environment.FoundationR3Url;
  editUrl: any;
  itemCategoryType: any;
  item
    MrVendorCategoryCode: string;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
      this.route.queryParams.subscribe(params => {
          this.VendorSchmId = params["VendorSchmId"];
          this.MrVendorCategoryCode =  params["MrVendorCategoryCode"];
          this.mode = params["mode"];
      })
  }

  VendorSchmForm = this.fb.group({
    VendorSchmCode:  ['', Validators.required],
    VendorSchmName:  ['', Validators.required],
    VendorSchmDesc: [''],
    MrVendorCategoryCode: [{ value: '', disabled: true }],
    IsActive:  [false],
    RowVersion: ['']    
  })



  ngOnInit() {
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, {RefMasterTypeCode: "VENDOR_CATEGORY"}).subscribe(
      (response) => {
        this.itemCategoryType = response[CommonConstant.ReturnObj];
        if(this.itemCategoryType.length > 0){
          this.VendorSchmForm.patchValue({
            MrVendorCategoryCode: this.MrVendorCategoryCode
          });
        }
      } 
    );
    
      if (this.mode == "edit") {
          this.vendorSchemeObj = new VendorSchemeObj();
          this.vendorSchemeObj.VendorSchmId = this.VendorSchmId;
          this.VendorSchmForm.controls.MrVendorCategoryCode.disable();
          this.VendorSchmForm.controls.VendorSchmCode.disable();
          this.http.post(URLConstant.GetVendorSchmByVendorSchmId, this.vendorSchemeObj).subscribe(
              (response) => {
                  this.result = response;
                  this.MrVendorCategoryCode = this.result.MrVendorCategoryCode;
                  this.VendorSchmForm.patchValue({
                      VendorSchmCode: this.result.VendorSchmCode,
                      VendorSchmName: this.result.VendorSchmName,
                      VendorSchmDesc: this.result.VendorSchmDesc,
                      MrVendorCategoryCode: this.result.MrVendorCategoryCode,
                      IsActive: this.result.IsActive,
                      RowVersion: this.result.RowVersion,
                  });
              },
              (error) => {
                  console.log(error);
              }
          );
      }
  }

  SaveForm(){
      this.vendorSchemeObj = new VendorSchemeObj();

      this.vendorSchemeObj = this.VendorSchmForm.value;
      this.vendorSchemeObj.MrVendorCategoryCode = this.MrVendorCategoryCode;
      if (this.mode == "edit") {
          this.vendorSchemeObj.MrVendorCategoryCode = this.result.MrVendorCategoryCode;
          this.vendorSchemeObj.VendorSchmCode = this.result.VendorSchmCode;
          this.vendorSchemeObj.VendorSchmId = this.VendorSchmId;
          
          this.http.post(URLConstant.EditVendorSchm, this.vendorSchemeObj).subscribe(
              (response) => {
                  this.toastr.successMessage(response["message"]);
                  this.router.navigateByUrl('/Vendor/VendorScheme/Paging');
              },
              (error) => {
                  console.log(error);
              });
      }
      else {
          this.vendorSchemeObj.VendorSchmId = "0";
          this.http.post(URLConstant.AddVendorSchm, this.vendorSchemeObj).subscribe(
              (response) => {
                  this.toastr.successMessage(response["message"]);
                  this.router.navigateByUrl('/Vendor/VendorScheme/Paging');
              },
              (error) => {
                  console.log(error);
              });
      }
  }
}
