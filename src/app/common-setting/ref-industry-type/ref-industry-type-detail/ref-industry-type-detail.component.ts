import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { RefIndustryTypeObj } from 'app/shared/model/RefIndustryTypeObj.Model';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { Location } from '@angular/common';
import { map, mergeMap } from 'rxjs/operators';
import { RefEconomicSectorObj } from 'app/shared/model/RefEconomicSectorObj.Model';

@Component({
  selector: 'app-ref-industry-type-detail',
  templateUrl: './ref-industry-type-detail.component.html',
  styleUrls: ['./ref-industry-type-detail.component.scss'],
  providers: [NGXToastrService]
})
export class RefIndustryTypeDetailComponent implements OnInit {

  settingUrl: String = environment.FoundationR3Url;
  refIndustryType: any;
  economicSectorObj: any;
  type: String = 'add';
  refIndustryTypeId: Number;
  resultData: any;
  inputLookupObj: any;

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
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private service: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.type = params['param'];
      }
      if (params['refIndustryTypeId'] != null) {
        this.refIndustryTypeId = params['refIndustryTypeId'];
      }
    });
  }


  ngOnInit() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/uclookup/EconomicSector/lookupEconomicSector.json";
    this.inputLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/uclookup/EconomicSector/lookupEconomicSector.json";
    this.inputLookupObj.genericJson = "./assets/uclookup/EconomicSector/lookupEconomicSector.json";

    if (this.type == 'edit') {
      this.refIndustryType = new RefIndustryTypeObj();
      this.refIndustryType.RefIndustryTypeId = this.refIndustryTypeId;
      var getRefIndustryUrl = this.settingUrl + AdInsConstant.GetRefIndustryTypeById;
      var getRefEconomicSectorById = AdInsConstant.GetRefEconomicSectorById;
      this.httpClient.post(getRefIndustryUrl, this.refIndustryType).pipe(
        map( response => {
          console.log("Response : " + JSON.stringify(response));
          this.resultData = response;
          this.economicSectorObj = new RefEconomicSectorObj();
          this.economicSectorObj.RefEconomicSectorId = this.resultData.RefEconomicSectorId;
          console.log("economicSectorObj : " + JSON.stringify(this.economicSectorObj));
          return this.economicSectorObj;
        }),
        mergeMap((economicSectorObj) => this.httpClient.post(getRefEconomicSectorById, economicSectorObj))
      ).subscribe(
        (response2) => {
          console.log("Response 2 : " + JSON.stringify(response2));
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
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  getLookupResponse(e){
    this.RefIndustryTypeForm.patchValue({
      RefEconomicSectorId: e.refEconomicSectorId,
    });
  }

  Save() {
    this.spinner.show();
    this.refIndustryType = this.RefIndustryTypeForm.value;

    //MODE-ADD
    if (this.type != 'edit') {
      var addRefIndustryType = this.settingUrl + AdInsConstant.AddRefIndustryType;
      this.httpClient.post(addRefIndustryType, this.refIndustryType).subscribe(
        //SAVE
        (response) => {
          this.service.typeSave(response['message']);
          this.router.navigateByUrl('industryType', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/industryType/detail']));
        },
        (error) => {
          this.service.typeErrorCustom(error);
        }
      );
    }
    //MODE-EDIT
    else {
      var editRefIndustryType = this.settingUrl + AdInsConstant.EditRefIndustryType;
      //SAVE
      this.httpClient.post(editRefIndustryType, this.refIndustryType).subscribe(
        (response) => {
          this.service.typeSave(response['message']);
          this.location.back();
          this.spinner.hide();
        },
        (error) => {
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
  }

}
