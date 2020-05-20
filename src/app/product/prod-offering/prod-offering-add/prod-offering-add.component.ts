import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ProdOfferingObj } from 'app/shared/model/ProdOfferingObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcLookupObj } from 'app/shared/model/UcLookupObj.Model';
import { formatDate } from '@angular/common';
import { environment } from 'environments/environment';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-prod-offering-add',
  templateUrl: './prod-offering-add.component.html',
  providers: [NGXToastrService]
})
export class ProdOfferingAddComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.ProdOfferingHId = params["ProdOfferingHId"];
      console.log(params);
      this.mode = params["mode"];
      if (this.mode == "edit") {
        var tempCrit = new CriteriaObj();
        tempCrit.propName = this.key;
        tempCrit.restriction = "Eq";
        tempCrit.value = this.ProdOfferingHId.toString();
        this.criteria.push(tempCrit);
      }
    })
  }

  mode: string = "add";
  key: any;
  criteria: CriteriaObj[] = [];
  prodOfferingObj: ProdOfferingObj;
  resultData: any;
  ProdOfferingId: any;
  inputLookupObj: any;
  ProdOfferingHId: number;

  ProdOfferingForm = this.fb.group({
    ProdName: [''],
    ProdOfferingCode: [''],
    ProdOfferingName: [''],
    ProdOfferingDescr: [''],
    StartDt: [''],
    EndDt: ['']
  });

  ngOnInit() {
    this.inputLookupObj = new UcLookupObj();
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    

    var context = JSON.parse(localStorage.getItem("UserAccess"));

    var currOfcCode = context["OfficeCode"];
    if(currOfcCode == "HO")
    {
      this.inputLookupObj.urlJson = "./assets/uclookup/product/lookupProductForHO.json";
      this.inputLookupObj.pagingJson = "./assets/uclookup/product/lookupProductForHO.json";
      this.inputLookupObj.genericJson = "./assets/uclookup/product/lookupProductForHO.json";
    }
    else
    {
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
      this.http.post(AdInsConstant.GetProductOfferingMainInfo, prodOfferingObj).subscribe(
        (response) => {
          console.log("response: ");
          console.log(response);
          this.resultData = response;
          this.inputLookupObj.nameSelect = this.resultData.ProdName;
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

  AddDetail() {
    this.prodOfferingObj = new ProdOfferingObj();
    this.prodOfferingObj = this.ProdOfferingForm.value;
    if (this.mode == "edit") {
      this.prodOfferingObj.ProdOfferingCode = this.resultData.ProdOfferingCode;
      this.prodOfferingObj.ProdHId = this.resultData.ProdHId;
      this.prodOfferingObj.ProdOfferingId = this.resultData.ProdOfferingId;
      this.prodOfferingObj.RowVersion = this.resultData.RowVersion;
      this.prodOfferingObj.ProdOfferingHId = this.ProdOfferingHId;
      this.http.post(AdInsConstant.EditProdOffering, this.prodOfferingObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Product/ProdOffering/AddDetail"], { queryParams: { "ProdOfferingHId": this.resultData.ProdOfferingHId } });
        },
        error => {
          console.log(error);
        }
      );
    } else {
      
      this.prodOfferingObj.ProdHId = this.inputLookupObj.jsonSelect.CurrentProdHId;
      this.prodOfferingObj.ProdOfferingId = "0";
      this.prodOfferingObj.RowVersion = "";
      this.http.post(AdInsConstant.AddProdOffering, this.prodOfferingObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Product/ProdOffering/AddDetail"], { queryParams: { "ProdOfferingHId": response["DraftProdOfferingHId"] } });
        },
        error => {
          console.log(error);
        }
      );
    }
  }


  SaveForm() {
    this.prodOfferingObj = new ProdOfferingObj();
    this.prodOfferingObj = this.ProdOfferingForm.value;
    console.log(this.prodOfferingObj);
    if (this.mode == "edit") {
      this.prodOfferingObj.ProdOfferingCode = this.resultData.ProdOfferingCode;
      this.prodOfferingObj.ProdOfferingId = this.resultData.ProdOfferingId;
      this.prodOfferingObj.ProdHId = this.resultData.ProdHId;
      this.prodOfferingObj.RowVersion = this.resultData.RowVersion;
      this.prodOfferingObj.ProdOfferingHId = this.ProdOfferingHId;
      this.http.post(AdInsConstant.EditProdOffering, this.prodOfferingObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Product/ProdOffering/paging"]);
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
      this.http.post(AdInsConstant.AddProdOffering, this.prodOfferingObj).subscribe(
        response => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/Product/ProdOffering/paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  ProdName = "";
  handleOutput(event) {
    console.log(this.inputLookupObj.CurrentProdHId)
  }
}
