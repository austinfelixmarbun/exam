import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEconomicSectorObj } from 'app/shared/model/RefEconomicSectorObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-economic-sector-add-edit',
  templateUrl: './economic-sector-add-edit.component.html',
  styleUrls: ['./economic-sector-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class EconomicSectorAddEditComponent implements OnInit {

  pageType: string = "add";
  refEconomicSectorId: any;
  refEconomicSectorObj: RefEconomicSectorObj;
  resultData: any;
  getUrl: any;
  addUrl: any;
  editUrl: any;
  RefEconomicSectorForm = this.fb.group({
    EconomicSectorCode: ['', [Validators.required, Validators.maxLength(50)]],
    EconomicSectorName: ['', [Validators.required, Validators.maxLength(100)]],
    RegRptCode: ['', Validators.maxLength(100)],
    IsActive: [true]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.getUrl = AdInsConstant.GetRefEconomicSectorById;
    this.addUrl = AdInsConstant.AddRefEconomicSector;
    this.editUrl = AdInsConstant.EditRefEconomicSector;


    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["refEconomicSectorId"] != null) {
        this.refEconomicSectorId = params["refEconomicSectorId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.RefEconomicSectorForm.controls["EconomicSectorCode"].disable();
      this.refEconomicSectorObj = new RefEconomicSectorObj();
      this.refEconomicSectorObj.RefEconomicSectorId = this.refEconomicSectorId;
      this.http.post(this.getUrl, this.refEconomicSectorObj).subscribe(
        response => {
          this.resultData = response;
          this.RefEconomicSectorForm.patchValue({
            EconomicSectorCode: this.resultData.EconomicSectorCode,
            EconomicSectorName: this.resultData.EconomicSectorName,
            RegRptCode: this.resultData.RegRptCode,
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
      this.refEconomicSectorObj = new RefEconomicSectorObj();
      this.refEconomicSectorObj.EconomicSectorCode = this.RefEconomicSectorForm.controls["EconomicSectorCode"].value
      this.refEconomicSectorObj.EconomicSectorName = this.RefEconomicSectorForm.controls["EconomicSectorName"].value;
      this.refEconomicSectorObj.RegRptCode = this.RefEconomicSectorForm.controls["RegRptCode"].value;
      this.refEconomicSectorObj.IsActive = this.RefEconomicSectorForm.controls["IsActive"].value;
      this.http.post(this.addUrl, this.refEconomicSectorObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            this.router.navigate(["/CommonSetting/economicSector/paging"]);
          
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.refEconomicSectorObj = this.resultData;
      this.refEconomicSectorObj.RefEconomicSectorId = this.refEconomicSectorId;
      this.refEconomicSectorObj.EconomicSectorName = this.RefEconomicSectorForm.controls["EconomicSectorName"].value;
      this.refEconomicSectorObj.RegRptCode = this.RefEconomicSectorForm.controls["RegRptCode"].value;
      this.refEconomicSectorObj.IsActive = this.RefEconomicSectorForm.controls["IsActive"].value;
      this.http.post(this.editUrl, this.refEconomicSectorObj).subscribe(
        response => {
          console.log(response);
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/CommonSetting/economicSector/paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
}
