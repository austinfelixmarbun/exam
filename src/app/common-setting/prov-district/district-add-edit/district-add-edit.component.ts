import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { RefProvDistrictObj } from 'app/shared/model/RefProvDistrictObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-district-add-edit',
  templateUrl: './district-add-edit.component.html',
  providers: [NGXToastrService]
})
export class DistrictAddEditComponent implements OnInit {

  pageType: string = "add";
  refProvDistrictId: any;
  refProvDistrictObj: RefProvDistrictObj;
  resultData: any;
  getUrl: any;
  addUrl: any;
  editUrl: any;
  parentId: any;
  DistrictForm = this.fb.group({
    ProvinceName: [{disabled: true, value: ''}],
    ProvDistrictCode: ['', [Validators.required, Validators.maxLength(50)]],
    ProvDistrictName: ['', [Validators.required, Validators.maxLength(100)]],
    DistrictRegRptCode: ['', Validators.maxLength(100)],
    PhnArea: ['', [Validators.required, Validators.maxLength(10)]],
    IsActive: [true]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.getUrl = URLConstant.GetRefProvDistrictById;
    this.addUrl = URLConstant.AddRefProvDistrict;
    this.editUrl = URLConstant.EditRefProvDistrict;
    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["refProvDistrictId"] != null) {
        this.refProvDistrictId = params["refProvDistrictId"];
      }
      if (params["parentId"] != null) {
        this.parentId = params["parentId"];
      }
    });
  }

  ngOnInit() {
    this.refProvDistrictObj = new RefProvDistrictObj();
    this.refProvDistrictObj.RefProvDistrictId = this.parentId;
    this.http.post(this.getUrl, this.refProvDistrictObj).subscribe(
      response => {
        this.resultData = response;
        this.DistrictForm.patchValue({
          ProvinceName: this.resultData.ProvDistrictName
        });
      },
      error => {
        console.log(error);
      }
    );
    if (this.pageType == "edit") {
      this.DistrictForm.controls["ProvDistrictCode"].disable();
      this.refProvDistrictObj = new RefProvDistrictObj();
      this.refProvDistrictObj.RefProvDistrictId = this.refProvDistrictId;
      this.http.post(this.getUrl, this.refProvDistrictObj).subscribe(
        response => {
          this.resultData = response;
          this.DistrictForm.patchValue({
            ProvDistrictCode: this.resultData.ProvDistrictCode,
            ProvDistrictName: this.resultData.ProvDistrictName,
            DistrictRegRptCode: this.resultData.DistrictRegRptCode,
            IsActive: this.resultData.IsActive,
            PhnArea: this.resultData.PhnArea
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
      this.refProvDistrictObj.ProvDistrictCode = this.DistrictForm.controls["ProvDistrictCode"].value
      this.refProvDistrictObj.ProvDistrictName = this.DistrictForm.controls["ProvDistrictName"].value;
      this.refProvDistrictObj.DistrictRegRptCode = this.DistrictForm.controls["DistrictRegRptCode"].value;
      this.refProvDistrictObj.IsActive = this.DistrictForm.controls["IsActive"].value;
      this.refProvDistrictObj.PhnArea = this.DistrictForm.controls["PhnArea"].value;
      this.refProvDistrictObj.ParentId = this.parentId;
      this.refProvDistrictObj.Type = CommonConstant.RefProvDistrictTypeDis;
      this.http.post(this.addUrl, this.refProvDistrictObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            this.router.navigateByUrl("/CommonSetting/District/Paging?refProvDistrictId=" + this.parentId);        
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.refProvDistrictObj = this.resultData;
      this.refProvDistrictObj.RefProvDistrictId = this.refProvDistrictId;
      this.refProvDistrictObj.ProvDistrictName = this.DistrictForm.controls["ProvDistrictName"].value;
      this.refProvDistrictObj.DistrictRegRptCode = this.DistrictForm.controls["DistrictRegRptCode"].value;
      this.refProvDistrictObj.IsActive = this.DistrictForm.controls["IsActive"].value;
      this.refProvDistrictObj.PhnArea = this.DistrictForm.controls["PhnArea"].value;
      this.refProvDistrictObj.Type =  CommonConstant.RefProvDistrictTypeDis;
      this.http.post(this.editUrl, this.refProvDistrictObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigateByUrl("/CommonSetting/District/Paging?refProvDistrictId=" + this.parentId);        
        },
        error => {
          console.log(error);
        }
      );
    }
  } 
}
