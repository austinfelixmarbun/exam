import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefZipcodeObj } from 'app/shared/model/RefZipcodeObj.Model';
import { RefProvDistrictObj } from 'app/shared/model/RefProvDistrictObj.Model'
import { Validators, FormBuilder } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'add-zipcode',
  templateUrl: './add-zipcode.component.html',
  providers: [NGXToastrService]
})
export class ZipcodeAddComponent implements OnInit {
  pageType: string = "add";
  refZipcodeId: number;
  rzcObj: RefZipcodeObj;
  resultData: any;
  apiUrl: string;
  addUrl: string;
  editUrl: string;
  getRefDistrictUrl: string;
  inputPagingObj: any;
  inputDistrictLookupObj;
  refDistrict: RefProvDistrictObj;
  resultDistrictData: any;

  RefZipCodeForm = this.fb.group({
    AreaCode1: ['', [Validators.required, Validators.maxLength(50)]],
    AreaCode2: ['', [Validators.required, Validators.maxLength(50)]],
    City: ['', [Validators.required, Validators.maxLength(50)]],
    Zipcode: ['', [Validators.required, Validators.maxLength(10)]],
    SubZipcode: [' ', Validators.maxLength(4)],
    IsActive: [true, Validators.required]
  });

  readonly CancelLink: string = NavigationConstant.CS_ZIPCODE_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.apiUrl = URLConstant.GetRefZipCodeById;
    this.addUrl = URLConstant.AddRefZipcode;
    this.editUrl = URLConstant.EditRefZipcode;
    this.getRefDistrictUrl = URLConstant.GetRefProvDistrictById;

    this.route.queryParams.subscribe(params => {
      if (params["mode"] != null) {
        this.pageType = params["mode"];
      }
      if (params["refZipcodeId"] != null) {
        this.refZipcodeId = params["refZipcodeId"];
      }
    });
  }

  ngOnInit() {
    this.inputDistrictLookupObj = new InputLookupObj();
    this.inputDistrictLookupObj.urlJson = "./assets/lookup/lookupDistrict.json";
    this.inputDistrictLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputDistrictLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputDistrictLookupObj.pagingJson = "./assets/lookup/lookupDistrict.json";
    this.inputDistrictLookupObj.genericJson = "./assets/lookup/lookupDistrict.json";

    if (this.pageType == "edit") {
      this.rzcObj = new RefZipcodeObj();
      this.rzcObj.RefZipcodeId = this.refZipcodeId;
      this.http.post(this.apiUrl, this.rzcObj).subscribe(
        response => {
          this.resultData = response;
          this.refZipcodeId = this.resultData.RefZipcodeId;
          this.inputDistrictLookupObj.idSelect = this.resultData.RefProvDistrictId;
          this.RefZipCodeForm.patchValue({
            AreaCode1: this.resultData.AreaCode1,
            AreaCode2: this.resultData.AreaCode2,
            City: this.resultData.City,
            Zipcode: this.resultData.Zipcode,
            SubZipcode: this.resultData.SubZipcode,
            RefProvDistrictId: this.resultData.RefProvDistrictId,
            IsActive: this.resultData.IsActive
          });
          this.refDistrict = new RefProvDistrictObj();
          this.refDistrict.RefProvDistrictId = this.resultData.RefProvDistrictId;
          this.http.post(this.getRefDistrictUrl, this.refDistrict).subscribe(
            (response) => {
              this.resultDistrictData = response;
              this.inputDistrictLookupObj.jsonSelect = this.resultDistrictData;
              this.inputDistrictLookupObj.nameSelect = this.resultDistrictData.ProvDistrictName;
            });
        });
    }
  }

  SaveForm() {
    this.rzcObj = new RefZipcodeObj();
    this.rzcObj = this.RefZipCodeForm.value;
    this.rzcObj.RefProvDistrictId = this.inputDistrictLookupObj.idSelect;
    if (this.rzcObj.SubZipcode == "") {
      this.rzcObj.SubZipcode = " ";
    }
    if (this.pageType == "add") {
      this.rzcObj.RowVersion = "";
      this.http.post(this.addUrl, this.rzcObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_ZIPCODE_PAGING],{});
        }
      );
    } else {
      this.rzcObj.RefZipcodeId = this.refZipcodeId;
      this.rzcObj.RowVersion = this.resultData.RowVersion;
      this.http.post(this.editUrl, this.rzcObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_ZIPCODE_PAGING],{});
        }
      );
    }
  }
}
