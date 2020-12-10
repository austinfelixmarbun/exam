import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEconomicSectorObj } from 'app/shared/model/RefEconomicSectorObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-economic-sector-add-edit',
  templateUrl: './economic-sector-add-edit.component.html',
})
export class EconomicSectorAddEditComponent implements OnInit {
  title: string = "Economic Sector Add"
  pageType: string = "add";
  RefEconomicSectorId: number;
  refEconomicSectorObj: RefEconomicSectorObj;
  resultData: any;
  RefEconomicSectorForm = this.fb.group({
    EconomicSectorCode: ['', [Validators.required, Validators.maxLength(50)]],
    EconomicSectorName: ['', [Validators.required, Validators.maxLength(100)]],
    RegRptCode: ['', Validators.maxLength(100)],
    IsActive: [true]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.route.queryParams.subscribe(params => {
      if (params["mode"] != null) {
        this.pageType = params["mode"];
      }
      if (params["RefEconomicSectorId"] != null) {
        this.RefEconomicSectorId = params["RefEconomicSectorId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.title = "Economic Sector Edit"
      this.RefEconomicSectorForm.controls["EconomicSectorCode"].disable();
      this.refEconomicSectorObj = new RefEconomicSectorObj();
      this.refEconomicSectorObj.RefEconomicSectorId = this.RefEconomicSectorId;
      this.http.post(URLConstant.GetRefEconomicSectorById, this.refEconomicSectorObj).subscribe(
        response => {
          this.resultData = response;
          this.RefEconomicSectorForm.patchValue({
            EconomicSectorCode: this.resultData.EconomicSectorCode,
            EconomicSectorName: this.resultData.EconomicSectorName,
            RegRptCode: this.resultData.RegRptCode,
            IsActive: this.resultData.IsActive
          });

        }
      );
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.refEconomicSectorObj = new RefEconomicSectorObj();
      this.refEconomicSectorObj.EconomicSectorCode = this.RefEconomicSectorForm.controls["EconomicSectorCode"].value
      this.refEconomicSectorObj.EconomicSectorName = this.RefEconomicSectorForm.controls["EconomicSectorName"].value;
      this.refEconomicSectorObj.RegRptCode = this.RefEconomicSectorForm.controls["RegRptCode"].value;
      this.refEconomicSectorObj.IsActive = this.RefEconomicSectorForm.controls["IsActive"].value;
      this.http.post(URLConstant.AddRefEconomicSector, this.refEconomicSectorObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            AdInsHelper.RedirectUrl(this.router,["/CommonSetting/EconomicSector/Paging"],{});         
        }
      );
    } else {
      this.refEconomicSectorObj = this.resultData;
      this.refEconomicSectorObj.RefEconomicSectorId = this.RefEconomicSectorId;
      this.refEconomicSectorObj.EconomicSectorName = this.RefEconomicSectorForm.controls["EconomicSectorName"].value;
      this.refEconomicSectorObj.RegRptCode = this.RefEconomicSectorForm.controls["RegRptCode"].value;
      this.refEconomicSectorObj.IsActive = this.RefEconomicSectorForm.controls["IsActive"].value;
      this.http.post(URLConstant.EditRefEconomicSector, this.refEconomicSectorObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,["/CommonSetting/EconomicSector/Paging"],{});  
        }
      );
    }
  }
  
}
