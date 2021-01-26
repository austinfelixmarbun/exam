import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { IndustryTypeCategoryObj } from 'app/shared/model/IndustryTypeCategoryObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-industry-type-category-detail',
  templateUrl: './industry-type-category-detail.component.html'
})
export class IndustryTypeCategoryDetailComponent implements OnInit {
  
  title: string = "Industry Type Category - Add"
  pageType: string = "add";
  RefIndustryTypeCategoryId: number;
  industryTypeCategoryObj: IndustryTypeCategoryObj;
  resultData: any;
  inputLookupObj : InputLookupObj;
  RefIndustryTypeCategoryForm = this.fb.group({
    RefIndustryTypeCategoryCode: ['', [Validators.required, Validators.maxLength(100)]],
    RefIndustryTypeCategoryName: ['', [Validators.required, Validators.maxLength(200)]],
    RefEconomicSectorId: ['', Validators.required],
    RegRptCode: ['',[Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.route.queryParams.subscribe(params => {
      if (params["mode"] != null) {
        this.pageType = params["mode"];
      }
      if (params["IndustryTypeCategoryId"] != null) {
        this.RefIndustryTypeCategoryId = params["IndustryTypeCategoryId"];
      }
    });
  }

  ngOnInit() {
    
    
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson =  "./assets/uclookup/EconomicSector/lookupEconomicSector.json";
    this.inputLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson =  "./assets/uclookup/EconomicSector/lookupEconomicSector.json";
    this.inputLookupObj.genericJson =  "./assets/uclookup/EconomicSector/lookupEconomicSector.json";
    this.inputLookupObj.isRequired = false;


    if (this.pageType == "edit") {
      console.log("aa")
      this.title = "Industry Type Category - Edit"
      this.RefIndustryTypeCategoryForm.controls["RefIndustryTypeCategoryCode"].disable();
      this.industryTypeCategoryObj = new IndustryTypeCategoryObj();
      this.industryTypeCategoryObj.RefIndustryTypeCategoryId = this.RefIndustryTypeCategoryId ;
      this.http.post(URLConstant.GetIndustryTypeCategoryByIndustryTypeCategoryId, this.industryTypeCategoryObj).subscribe(
        response => {
          this.resultData = response;
          console.log(response)
          this.RefIndustryTypeCategoryForm.patchValue({ 
             RefIndustryTypeCategoryCode: this.resultData. RefIndustryTypeCategoryCode,
            RefIndustryTypeCategoryName: this.resultData.RefIndustryTypeCategoryName,
            RefEconomicSectorId: this.resultData.RefEconomicSectorId,
            RegRptCode: this.resultData.RegRptCode, 
            IsActive: this.resultData.IsActive
          });
          this.inputLookupObj.nameSelect = this.resultData.RefEconomicSectorName; 
          this.inputLookupObj.jsonSelect = { EconomicSectorName: this.resultData.RefEconomicSectorName};
        }
      );
    } 
  }
  SaveForm() {
    if (this.pageType == "add") {
      this.industryTypeCategoryObj = new IndustryTypeCategoryObj();
      this.industryTypeCategoryObj.RefIndustryTypeCategoryCode = this.RefIndustryTypeCategoryForm.controls["RefIndustryTypeCategoryCode"].value
      this.industryTypeCategoryObj.RefIndustryTypeCategoryName = this.RefIndustryTypeCategoryForm.controls["RefIndustryTypeCategoryName"].value;
      this.industryTypeCategoryObj.RefEconomicSectorId = this.RefIndustryTypeCategoryForm.controls["RefEconomicSectorId"].value;
      this.industryTypeCategoryObj.RegRptCode = this.RefIndustryTypeCategoryForm.controls["RegRptCode"].value;
      this.industryTypeCategoryObj.IsActive = this.RefIndustryTypeCategoryForm.controls["IsActive"].value;
   
    } else {
      this.industryTypeCategoryObj = this.resultData;
      this.industryTypeCategoryObj.RefIndustryTypeCategoryCode = this.RefIndustryTypeCategoryForm.controls["RefIndustryTypeCategoryCode"].value
      this.industryTypeCategoryObj.RefIndustryTypeCategoryName = this.RefIndustryTypeCategoryForm.controls["RefIndustryTypeCategoryName"].value;
      this.industryTypeCategoryObj.RefEconomicSectorId = this.RefIndustryTypeCategoryForm.controls["RefEconomicSectorId"].value;
      this.industryTypeCategoryObj.RegRptCode = this.RefIndustryTypeCategoryForm.controls["RegRptCode"].value;
      this.industryTypeCategoryObj.IsActive = this.RefIndustryTypeCategoryForm.controls["IsActive"].value;
    }

    this.http.post(URLConstant.AddEditIndustryTypeCategory, this.industryTypeCategoryObj).subscribe(
      response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,["/CommonSetting/IndustryTypeCategory/Paging"],{});         
      }
    );
  }
  getEconomicSector(ev: any){
    console.log(ev)
    this.RefIndustryTypeCategoryForm.patchValue({
      RefEconomicSectorId: ev.RefEconomicSectorId
    });
  }



}
