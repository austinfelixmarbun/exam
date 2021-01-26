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
  industryTypeCategoryObj: any;
  type: String = 'add';
  RefIndustryTypeId: Number;
  resultData: any;
  inputLookupObj: InputLookupObj;

  RefIndustryTypeForm = this.fb.group({
    RefIndustryTypeId: [0, [Validators.required]],
    IndustryTypeCode: ['', [Validators.required]],
    IndustryTypeName: ['', [Validators.required]],
    RefIndustryTypeCategoryId: ['', [Validators.required]],
    IsActive: [true],
    RowVersion: [""]
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: NGXToastrService,
    private fb: FormBuilder,
    private http: HttpClient
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


  async ngOnInit() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/lookup/lookupIndustryTypeCategory.json";
    this.inputLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/lookup/lookupIndustryTypeCategory.json";
    this.inputLookupObj.genericJson = "./assets/clookup/lookupIndustryTypeCategory.json";

    if (this.type == 'edit') {
      this.refIndustryType = new RefIndustryTypeObj();
      this.refIndustryType.RefIndustryTypeId = this.RefIndustryTypeId;

      await this.http.post(URLConstant.GetRefIndustryTypeById, this.refIndustryType).toPromise().then(
        response => {
          this.resultData = response;
          this.industryTypeCategoryObj = this.resultData;
          this.RefIndustryTypeForm.patchValue({
            RefIndustryTypeId: this.resultData.RefIndustryTypeId,
            IndustryTypeCode: this.resultData.IndustryTypeCode,
            IndustryTypeName: this.resultData.IndustryTypeName,
            RefIndustryTypeCategoryId: this.resultData.RefIndustryTypeCategoryId,
            IsActive: this.resultData.IsActive,
            RowVersion: this.resultData.RowVersion
          });
        });

        await this.http.post(URLConstant.GetIndustryTypeCategoryByIndustryTypeCategoryId, this.industryTypeCategoryObj).toPromise().then(
          response => {
            this.industryTypeCategoryObj = response;
           
          this.inputLookupObj.nameSelect = this.industryTypeCategoryObj.RefIndustryTypeCategoryName;
           
          }); 
    }else{
      this.checkIsAutoFormNoFromSetting('IT');
    }
  }

  getLookupResponse(e) {
    this.RefIndustryTypeForm.patchValue({
      RefIndustryTypeCategoryId: e.RefIndustryTypeCategoryId,
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

  //check is automatic/not form no 4
  isAuto: boolean = false;
  checkIsAutoFormNoFromSetting(msAutoGenCode: any) {
    var generalSettingObj = {
      GsCode: "MASTER_AUTO_GNRT_CODE"
    }
    var result: any;
    this.http.post(URLConstant.GetGeneralSettingByCode, generalSettingObj).subscribe(
      (response) => {
        result = response;

        if (result.GsValue != undefined && result.GsValue != "") {
          if (result.GsValue.split(';').find(x => x == msAutoGenCode)) {
            this.isAuto = true;
            this.RefIndustryTypeForm.patchValue({
              IndustryTypeCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4

}
