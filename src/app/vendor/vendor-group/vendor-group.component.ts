import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VendorGroupObj } from 'app/shared/model/VendorGroupObj.Model';

@Component({
  selector: 'app-vendor-group',
  templateUrl: './vendor-group.component.html',
  styleUrls: ['./vendor-group.component.scss'],
  providers: [NGXToastrService]
})
export class VendorGroupComponent implements OnInit {
  pageType: string = "add";
  VendorGrpId: any;


  VendorGroupFrom = this.fb.group({
    VendorGrpCode: ['', Validators.required],
    VendorGrpName: ['', Validators.required],
    VenderGrpDesc: [''],
    MrVendorCategoryCode: ['', Validators.required],
    IsActive: false,
  })
  refMasterObj: RefMasterObj;
  refMasterOfficeType: RefMasterObj;
  allVendorCategory: any;
  vendorGrpObj: VendorGroupObj;
  resultData: any;


  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.pageType = params['mode'];
      }
      if (params['VendorGrpId'] != null) {
        this.VendorGrpId = params['VendorGrpId'];
      }
    });
  }



  ngOnInit() {
    this.refMasterObj = new RefMasterObj();
    this.refMasterObj.RefMasterTypeCode = 'VENDOR_CATEGORY';

    if (this.pageType == "add") {
      this.httpClient.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterObj).subscribe(
        (response) => {
          console.log(response);
          this.allVendorCategory = response['ReturnObject'];
          this.VendorGroupFrom.patchValue({
            MrVendorCategoryCode: this.allVendorCategory[0].Key
          });
        },
        (error) => {
          console.log(error);
        })
    }
    else if (this.pageType == "edit") {
      this.VendorGroupFrom.controls["VendorGrpCode"].disable();
      this.vendorGrpObj = new VendorGroupObj();
      this.vendorGrpObj.VendorGrpId = this.VendorGrpId;

      this.httpClient.post(AdInsConstant.GetVendorGrpByVendorGrpId, this.vendorGrpObj).subscribe(
        (response) => {
          console.log(response);
          this.resultData = response;
          this.VendorGroupFrom.patchValue({

            VendorGrpCode: this.resultData.VendorGrpCode,
            VendorGrpName: this.resultData.VendorGrpName,
            VenderGrpDesc: this.resultData.VenderGrpDesc,
            MrVendorCategoryCode: this.resultData.MrVendorCategoryCode,
            IsActive: this.resultData.IsActive
          })

          this.httpClient.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterObj).subscribe(
            (response) => {
              console.log(response);
              this.allVendorCategory = response['ReturnObject'];
              this.VendorGroupFrom.patchValue({
                MrVendorCategoryCode: this.resultData.MrVendorCategoryCode
              });
            },
            (error) => {
              console.log(error);
            })
        })
    }
  }
  SaveForm(): void {
    this.vendorGrpObj = new VendorGroupObj();
    this.vendorGrpObj = this.VendorGroupFrom.value;
    this.vendorGrpObj.RowVersion = "";
    console.log(this.VendorGroupFrom.value);
    console.log(this.vendorGrpObj);

    if (this.pageType == "add") {
      this.httpClient.post(AdInsConstant.AddVendorGrp, this.vendorGrpObj).subscribe(
        (response) => {
          console.log(response);
          this.toastr.successMessage(response['message']);
          this.router.navigate(["/Vendor/Group/Paging"]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      this.vendorGrpObj.VendorGrpId = this.resultData.VendorGrpId;
      this.vendorGrpObj.RowVersion = this.resultData.RowVersion;

      this.httpClient.post(AdInsConstant.EditVendorGrp, this.vendorGrpObj).subscribe(
        (response) => {
          console.log(response);
          this.toastr.successMessage(response['message']);
          this.router.navigate(["/Vendor/Group/Paging"]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
