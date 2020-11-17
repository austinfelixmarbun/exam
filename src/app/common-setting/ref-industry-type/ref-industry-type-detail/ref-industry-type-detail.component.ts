import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { RefIndustryTypeObj } from 'app/shared/model/RefIndustryTypeObj.Model';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { map, mergeMap } from 'rxjs/operators';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-ref-industry-type-detail',
  templateUrl: './ref-industry-type-detail.component.html',
  providers: [NGXToastrService]
})
export class RefIndustryTypeDetailComponent implements OnInit {
  refIndustryType: RefIndustryTypeObj;
  economicSectorObj: any;
  type: String = 'add';
  RefIndustryTypeId: Number;
  resultData: any;
  inputLookupObj: InputLookupObj;

  RefIndustryTypeForm = this.fb.group({
    RefIndustryTypeId: [0, [Validators.required]],
    IndustryTypeCode: ['', [Validators.required]],
    IndustryTypeName: ['', [Validators.required]],
    RefEconomicSectorId: ['', [Validators.required]],
    IsActive: [true],
    RowVersion: [""]
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.type = params['mode'];
      }
      if (params['RefIndustryTypeId'] != null) {
        this.RefIndustryTypeId = params['RefIndustryTypeId'];
      }
    });
  }


  ngOnInit() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/uclookup/EconomicSector/lookupEconomicSector.json";
    this.inputLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/uclookup/EconomicSector/lookupEconomicSector.json";
    this.inputLookupObj.genericJson = "./assets/uclookup/EconomicSector/lookupEconomicSector.json";

    if (this.type == 'edit') {
      this.refIndustryType = new RefIndustryTypeObj();
      this.refIndustryType.RefIndustryTypeId = this.RefIndustryTypeId;
      this.httpClient.post(URLConstant.GetRefIndustryTypeById, this.refIndustryType).pipe(
        map(response => {
          this.resultData = response;
          this.economicSectorObj = new RefIndustryTypeObj();
          this.economicSectorObj.RefEconomicSectorId = this.resultData.RefEconomicSectorId;
          return this.economicSectorObj;
        }),
        mergeMap((economicSectorObj) => this.httpClient.post(URLConstant.GetRefEconomicSectorById, economicSectorObj))
      ).subscribe(
        (response2) => {
          this.economicSectorObj = response2;
          this.RefIndustryTypeForm.patchValue({
            RefIndustryTypeId: this.resultData.RefIndustryTypeId,
            IndustryTypeCode: this.resultData.IndustryTypeCode,
            IndustryTypeName: this.resultData.IndustryTypeName,
            RefEconomicSectorId: this.resultData.RefEconomicSectorId,
            IsActive: this.resultData.IsActive,
            RowVersion: this.resultData.RowVersion
          });
          this.inputLookupObj.nameSelect = this.economicSectorObj.EconomicSectorName;
        }
      );
    }
  }

  getLookupResponse(e) {
    this.RefIndustryTypeForm.patchValue({
      RefEconomicSectorId: e.RefEconomicSectorId,
    });
  }

  Save() {
    this.refIndustryType = this.RefIndustryTypeForm.value;

    //MODE-ADD
    if (this.type != 'edit') {
      this.httpClient.post(URLConstant.AddRefIndustryType, this.refIndustryType).subscribe(
        //SAVE
        (response) => {
          this.service.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,['/CommonSetting/IndustryType/Paging'],{});
        },
        (error) => {
          this.service.typeErrorCustom(error);
        }
      );
    }
    //MODE-EDIT
    else {
      //SAVE
      this.httpClient.post(URLConstant.EditRefIndustryType, this.refIndustryType).subscribe(
        (response) => {
          this.service.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,['/CommonSetting/IndustryType/Paging'],{});
        },
        (error) => {
          this.service.typeErrorCustom(error);
        }
      );
    }
  }
}
