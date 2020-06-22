import { Component, OnInit } from '@angular/core';
import { VendorSchemeObj } from 'app/shared/model/VendorSchemeObj.Model';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-vendor-scheme-add-edit',
  templateUrl: './vendor-scheme-add-edit.component.html',
  styleUrls: ['./vendor-scheme-add-edit.component.scss'],
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
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
      this.route.queryParams.subscribe(params => {
          this.VendorSchmId = params["VendorSchmId"];
          this.mode = params["mode"];
      })
  }

  VendorSchmForm = this.fb.group({
    VendorSchmCode:  ['', Validators.required],
    VendorSchmName:  ['', Validators.required],
    VendorSchmDesc: [''],
    MrVendorCategoryCode: ['', Validators.required], 
    IsActive:  [false],
    RowVersion: ['']    
  })



  ngOnInit() {
    var refMasterCategoryObj = {
      RefMasterTypeCode: "VENDOR_CATEGORY",
    }

    //TEMUIAN STEVEN INI AMBIL DARI CONSTANTA

    this.http.post("http://r3app-server/FOUNDATION_R3/RefMaster/GetListActiveRefMaster", refMasterCategoryObj).subscribe(
      (response) => {
        this.itemCategoryType = response["ReturnObject"];
        this.VendorSchmForm.patchValue({
          MrVendorCategoryCode: this.itemCategoryType[0].MasterCode
        });
      } 
    );
    
      if (this.mode == "edit") {
          this.vendorSchemeObj = new VendorSchemeObj();
          this.vendorSchemeObj.VendorSchmId = this.VendorSchmId;
          this.VendorSchmForm.controls.MrVendorCategoryCode.disable();
          this.VendorSchmForm.controls.VendorSchmCode.disable();
          this.http.post(AdInsConstant.GetVendorSchmByVendorSchmId, this.vendorSchemeObj).subscribe(
              (response) => {
                  this.result = response;
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
      if (this.mode == "edit") {
          this.vendorSchemeObj.MrVendorCategoryCode = this.result.MrVendorCategoryCode;
          this.vendorSchemeObj.VendorSchmCode = this.result.VendorSchmCode;
          this.vendorSchemeObj.VendorSchmId = this.VendorSchmId;
          
          this.http.post(AdInsConstant.EditVendorSchm, this.vendorSchemeObj).subscribe(
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
          this.http.post(AdInsConstant.AddVendorSchm, this.vendorSchemeObj).subscribe(
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
