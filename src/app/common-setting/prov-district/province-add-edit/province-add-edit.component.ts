import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { RefProvDistrictObj } from 'app/shared/model/RefProvDistrictObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-province-add-edit',
  templateUrl: './province-add-edit.component.html',
  providers: [NGXToastrService]
})
export class ProvinceAddEditComponent implements OnInit {

  pageType: string = "add";
  refProvDistrictId: any;
  refProvDistrictObj: RefProvDistrictObj;
  resultData: any;
  getUrl: any;
  addUrl: any;
  editUrl: any;
  ProvinceForm = this.fb.group({
    ProvDistrictCode: ['', [Validators.required, Validators.maxLength(50)]],
    ProvDistrictName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.getUrl = AdInsConstant.GetRefProvDistrictById;
    this.addUrl = AdInsConstant.AddRefProvDistrict;
    this.editUrl = AdInsConstant.EditRefProvDistrict;


    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["refProvDistrictId"] != null) {
        this.refProvDistrictId = params["refProvDistrictId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.ProvinceForm.controls["ProvDistrictCode"].disable();
      this.refProvDistrictObj = new RefProvDistrictObj();
      this.refProvDistrictObj.RefProvDistrictId = this.refProvDistrictId;
      this.http.post(this.getUrl, this.refProvDistrictObj).subscribe(
        response => {
          this.resultData = response;
          this.ProvinceForm.patchValue({
            ProvDistrictCode: this.resultData.ProvDistrictCode,
            ProvDistrictName: this.resultData.ProvDistrictName,
            IsActive: this.resultData.IsActive
          });

        },
        error => {
          console.log(error);
        }
      );
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.refProvDistrictObj = new RefProvDistrictObj();
      this.refProvDistrictObj.ProvDistrictCode = this.ProvinceForm.controls["ProvDistrictCode"].value
      this.refProvDistrictObj.ProvDistrictName = this.ProvinceForm.controls["ProvDistrictName"].value;
      this.refProvDistrictObj.IsActive = this.ProvinceForm.controls["IsActive"].value;
      this.refProvDistrictObj.Type = CommonConstant.RefProvDistrictTypePrv;
      this.http.post(this.addUrl, this.refProvDistrictObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            this.router.navigate(["/CommonSetting/RefProvince/Paging"]);        
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.refProvDistrictObj = this.resultData;
      this.refProvDistrictObj.RefProvDistrictId = this.refProvDistrictId;
      this.refProvDistrictObj.ProvDistrictName = this.ProvinceForm.controls["ProvDistrictName"].value;
      this.refProvDistrictObj.IsActive = this.ProvinceForm.controls["IsActive"].value;
      this.http.post(this.editUrl, this.refProvDistrictObj).subscribe(
        response => {
          console.log(response);
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/CommonSetting/RefProvince/Paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
}
