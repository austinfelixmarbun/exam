import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ProdOfferingObj } from 'app/shared/model/ProdOfferingObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcLookupObj } from 'app/shared/model/UcLookupObj.Model';
import { formatDate } from '@angular/common';
import { environment } from 'environments/environment';
import { IfStmt } from '@angular/compiler';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';

@Component({
  selector: 'app-prod-offering-add',
  templateUrl: './prod-offering-add.component.html',
  providers: [NGXToastrService]
})
export class ProdOfferingAddComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.ProdOfferingHId = params["ProdOfferingHId"];
      this.mode = params["mode"];
      this.source = params["source"];
      if (this.mode == "edit") {
        var tempCrit = new CriteriaObj();
        tempCrit.propName = this.key;
        tempCrit.restriction = "Eq";
        tempCrit.value = this.ProdOfferingHId.toString();
        this.criteria.push(tempCrit);
      }
    })
  }

  source: string = "";
  mode: string = "add";
  key: any;
  criteria: CriteriaObj[] = [];
  prodOfferingObj: ProdOfferingObj;
  resultData: any;
  ProdOfferingId: any;
  inputLookupObj: any;
  ProdOfferingHId: number;

  ProdOfferingForm = this.fb.group({
    ProdOfferingCode: ['', Validators.required],
    ProdOfferingName: ['', Validators.required],
    ProdOfferingDescr: ['', Validators.required],
    StartDt: ['', Validators.required],
    EndDt: ['', Validators.required]
  });

  ngOnInit() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";

    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));

    var currOfcCode = context["OfficeCode"];
    if (currOfcCode == CommonConstant.HeadOffice) {
      this.inputLookupObj.urlJson = "./assets/uclookup/product/lookupProductForHO.json";
      this.inputLookupObj.pagingJson = "./assets/uclookup/product/lookupProductForHO.json";
      this.inputLookupObj.genericJson = "./assets/uclookup/product/lookupProductForHO.json";
    }
    else {
      this.inputLookupObj.urlJson = "./assets/uclookup/lookupProdOffering.json";
      this.inputLookupObj.pagingJson = "./assets/uclookup/lookupProdOffering.json";
      this.inputLookupObj.genericJson = "./assets/uclookup/lookupProdOffering.json";

      var arrCrit = new Array();
      var critObj = new CriteriaObj();
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.propName = 'O.OFFICE_CODE';
      critObj.value = context["OfficeCode"];
      arrCrit.push(critObj);

      critObj = new CriteriaObj();
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.propName = 'PBM.IS_ALLOWED_CRT';
      critObj.value = '1';
      arrCrit.push(critObj);

      this.inputLookupObj.addCritInput = arrCrit;
    }

    if (this.mode == "edit") {

      this.ProdOfferingForm.controls.ProdOfferingCode.disable();
      var prodOfferingObj = new ProdOfferingObj();
      prodOfferingObj.ProdOfferingHId = this.ProdOfferingHId;
      this.http.post(URLConstant.GetProductOfferingMainInfo, prodOfferingObj).subscribe(
        (response) => {
          this.resultData = response;
          this.inputLookupObj.nameSelect = this.resultData.ProdName;
          this.inputLookupObj.jsonSelect = { ProdName: this.resultData.ProdName, CurrentProdHId: this.resultData.ProdHId };
          prodOfferingObj.ProdHId = this.resultData.ProdHId;
          this.ProdOfferingForm.patchValue({
            ProdOfferingCode: this.resultData.ProdOfferingCode,
            ProdOfferingName: this.resultData.ProdOfferingName,
            ProdOfferingDescr: this.resultData.ProdOfferingDescr,
            StartDt: formatDate(this.resultData['StartDt'], 'yyyy-MM-dd', 'en-US'),
            EndDt: formatDate(this.resultData['EndDt'], 'yyyy-MM-dd', 'en-US')
          })
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  SaveForm() {
    this.prodOfferingObj = new ProdOfferingObj();
    this.prodOfferingObj = this.ProdOfferingForm.value;

    if (this.ValidateDate()) {
      if (this.mode == "edit") {
        this.prodOfferingObj.ProdOfferingCode = this.resultData.ProdOfferingCode;
        this.prodOfferingObj.ProdOfferingId = this.resultData.ProdOfferingId;
        this.prodOfferingObj.ProdHId =  this.inputLookupObj.jsonSelect.CurrentProdHId;
        this.prodOfferingObj.RowVersion = this.resultData.RowVersion;
        this.prodOfferingObj.ProdOfferingHId = this.ProdOfferingHId;
        this.http.post(URLConstant.EditProdOffering, this.prodOfferingObj).subscribe(
          response => {
            this.toastr.successMessage(response["message"]);
            this.router.navigate(["/Product/ProdOffering/AddDetail"], { queryParams: { "ProdOfferingId": response["ProdOfferingId"], "ProdOfferingHId": response["DraftProdOfferingHId"], source: this.source } });
          },
          error => {
            console.log(error);
          }
        );
      }
      else {

        this.prodOfferingObj.ProdOfferingId = "0";
        this.prodOfferingObj.ProdHId = this.inputLookupObj.jsonSelect.CurrentProdHId;
        this.prodOfferingObj.RowVersion = "";
        this.http.post(URLConstant.AddProdOffering, this.prodOfferingObj).subscribe(
          response => {
            this.toastr.successMessage(response["message"]);
            this.router.navigate(["/Product/ProdOffering/AddDetail"], { queryParams: { "ProdOfferingId": response["ProdOfferingId"], "ProdOfferingHId": response["DraftProdOfferingHId"], source: this.source } });
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  ProdName = "ProdName";
  handleOutput(event) {
    this.ProdOfferingForm.patchValue({
      ProdName: event.ProdName
    });
  }

  ValidateDate() {
    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    let businessDate = new Date(context[CommonConstant.BUSINESS_DT]);
    let startDate = new Date(this.ProdOfferingForm.get("StartDt").value);
    let endDate = new Date(this.ProdOfferingForm.get("EndDt").value);

    if (startDate > endDate) {
      this.toastr.warningMessage("Start Date Must be Less than End Date");
      return false;
    }

    if (endDate <= businessDate) {
      this.toastr.warningMessage("End Date Must be Greater than Business Date");
      return false;
    }
    return true;
  }

  Cancel() {
    this.BackToPaging();
  }

  BackToPaging() {
    if (this.source == "return") {
      this.router.navigate(["/Product/ProdOffering/Returnpaging"]);
    }
    else {
      this.router.navigate(["/Product/ProdOffering/Paging"]);
    }
  }
}

