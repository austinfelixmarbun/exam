import { Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefZipcodeObj } from 'app/shared/model/RefZipcodeObj.Model';
import { RefProvDistrictObj } from 'app/shared/model/RefProvDistrictObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { LookupdistrictComponent } from '@adins/lookupdistrict';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UcPagingObj } from '../../shared/model/UcPagingObj.Model';


@Component({
  selector: 'add-zipcode',
  templateUrl: './add-zipcode.component.html',
  providers: [NGXToastrService]
})
export class ZipcodeAddComponent implements OnInit {
  pageType: string = "add";
  refZipcodeId: any;
  rzcObj: RefZipcodeObj;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  getRefDistrictUrl: any;
  inputPagingObj: any;
  inputDistrictLookupObj;

  RefZipCodeForm = this.fb.group({
    AreaCode1: ['', [Validators.required, Validators.maxLength(50)]],
    AreaCode2: ['', [Validators.required, Validators.maxLength(50)]],
    City: ['', [Validators.required, Validators.maxLength(50)]],
    Zipcode: ['', [Validators.required, Validators.maxLength(10)]],
    SubZipcode: ['', Validators.maxLength(10)],
    PhnArea: ['', Validators.maxLength(10)],
    IsActive: ['', Validators.required]
  });


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.apiUrl = AdInsConstant.GetRefZipCodeById;
    this.addUrl = AdInsConstant.AddRefZipcode;
    this.editUrl = AdInsConstant.EditRefZipcode;
    this.getRefDistrictUrl = AdInsConstant.GetPagingObjectBySQL;

    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["refZipcodeId"] != null) {
        this.refZipcodeId = params["refZipcodeId"];
      }
    });
  }

  ngOnInit() {

    this.inputDistrictLookupObj = new InputLookupObj();
    this.inputDistrictLookupObj.urlJson = "./assets/lookup/lookupDistrict.json";
    this.inputDistrictLookupObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputDistrictLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputDistrictLookupObj.pagingJson = "./assets/lookup/lookupDistrict.json";
    this.inputDistrictLookupObj.genericJson = "./assets/lookup/lookupDistrict.json";

    if (this.pageType == "edit") {
      this.rzcObj = new RefZipcodeObj();
      this.rzcObj.refZipcodeId = this.refZipcodeId;
      this.http.post(this.apiUrl, this.rzcObj).subscribe(
        response => {
          this.resultData = response;
          console.log("Response: ");
          console.log(response);
          this.refZipcodeId = this.resultData.RefZipcodeId;
          this.inputDistrictLookupObj.idSelect = this.resultData.RefProvDistrictId;
          this.inputDistrictLookupObj.idSelect = this.resultData.RefProvDistrictId;
          this.RefZipCodeForm.patchValue({
            AreaCode1: this.resultData.AreaCode1,
            AreaCode2: this.resultData.AreaCode2,
            City: this.resultData.City,
            Zipcode: this.resultData.Zipcode,
            SubZipcode: this.resultData.SubZipcode,
            RefProvDistrictId: this.resultData.RefProvDistrictId,
            PhnArea: this.resultData.PhnArea,
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
    this.rzcObj = new RefZipcodeObj();
    this.rzcObj = this.RefZipCodeForm.value;
    this.rzcObj.refProvDistrictId = this.inputDistrictLookupObj.jsonSelect.RefProvDistrictId;
    if (this.pageType == "add") {
      this.rzcObj.RowVersion = "";
      this.http.post(this.addUrl, this.rzcObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/zipcode/paging"]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.rzcObj.refZipcodeId = this.refZipcodeId;
      this.rzcObj.RowVersion = this.resultData.RowVersion;
      this.http.post(this.editUrl, this.rzcObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/zipcode/paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
