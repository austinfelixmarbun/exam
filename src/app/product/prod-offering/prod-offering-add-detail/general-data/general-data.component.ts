import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { RefProductDetailObj } from 'app/shared/model/RefProductDetailObj.Model';
import { WizardComponent } from 'angular-archwizard';
import { ListRefProductOfferingDetailObj } from 'app/shared/model/ListRefProductOfferingDetailObj.Model';
import { RefProductOfferingDetailObj } from 'app/shared/model/RefProductOfferingDetailObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  providers: [NGXToastrService]
})
export class GeneralDataComponent implements OnInit {

  @Input() objInput: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: NGXToastrService,
    private wizard: WizardComponent
  ) {
    this.route.queryParams.subscribe(params => {
      this.source = params["source"];
    });
  }

  UrlBackEnd;
  listGeneralDataObj;
  prodOfferingHId: number;
  prodOfferingId: number;
  source: string = "";
  inputLookUpObj: InputLookupObj;

  FormCopyProdOffering = this.fb.group(
    {

    }
  );

  ngOnInit() {
    this.prodOfferingHId = this.objInput["param"];
    this.prodOfferingId = this.objInput["ProdOfferingId"];

    this.initLookup();
  }

  initLookup() {
    var user = JSON.parse(localStorage.getItem("UserAccess"));

    //if (user.MrOfficeTypeCode == "HO") {
    this.inputLookUpObj = new InputLookupObj();
    this.inputLookUpObj.urlJson = "./assets/uclookup/product/lookupCopyProductOfferingHO.json";
    this.inputLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookUpObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookUpObj.pagingJson = "./assets/uclookup/product/lookupCopyProductOfferingHO.json";
    this.inputLookUpObj.genericJson = "./assets/uclookup/product/lookupCopyProductOfferingHO.json";
    this.inputLookUpObj.isRequired = false;

    var critObj = new CriteriaObj();
    critObj.propName = 'PO.PROD_OFFERING_ID';
    critObj.restriction = AdInsConstant.RestrictionNeq;
    critObj.value = this.prodOfferingId.toString();
    var arrCrit = new Array();
    arrCrit.push(critObj);

    critObj = new CriteriaObj();
    critObj.propName = 'PO.REF_OFFICE_ID';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = user.OfficeId;
    arrCrit.push(critObj);

    this.inputLookUpObj.addCritInput = arrCrit;

    //}else{
    //   this.inputLookUpObj = new InputLookupObj();
    //   this.inputLookUpObj.urlJson = "./assets/uclookup/product/lookupCopyProductOfferingBranch.json";
    //   this.inputLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    //   this.inputLookUpObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    //   this.inputLookUpObj.pagingJson = "./assets/uclookup/product/lookupCopyProductOfferingBranch.json";
    //   this.inputLookUpObj.genericJson = "./assets/uclookup/product/lookupCopyProductOfferingBranch.json";
    //   this.inputLookUpObj.isRequired = false;

    //   var critObj = new CriteriaObj();
    //   critObj.propName = 'PO.PROD_OFFERING_ID';
    //   critObj.restriction = AdInsConstant.RestrictionNeq;
    //   critObj.value = this.prodOfferingId.toString();
    //   var arrCrit = new Array();
    //   arrCrit.push(critObj);

    //   critObj = new CriteriaObj();
    //   critObj.propName = 'POBM.REF_OFFICE_ID';
    //   critObj.restriction = AdInsConstant.RestrictionEq;
    //   critObj.value = user.OfficeId;
    //   arrCrit.push(critObj);

    //   this.inputLookUpObj.addCritInput = arrCrit;
    // }

  }

  SaveForm(event) {
    this.UrlBackEnd = URLConstant.AddOrEditProdOfferingDetail;
    this.generateSaveObj(event);
    this.http.post(this.UrlBackEnd, this.listGeneralDataObj).subscribe(
      (response) => {
        console.log(response);
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/Product/ProdOffering/Paging"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  reload() {
    if (this.inputLookUpObj.jsonSelect["ProdOfferingId"] == undefined) {
      this.toastr.warningMessage("Please select Product Offering to copied");
    }
    else {
      if (confirm('This action will overwrite your Product Component and Product Branch Member, Are you sure to copy this Product ?')) {
        this.http.post(URLConstant.CopyProductOffering, { ProdOfferingHId: this.prodOfferingHId, FromProdOfferingId: this.inputLookUpObj.jsonSelect["ProdOfferingId"] }).subscribe(
          (response) => {
            this.toastr.successMessage("Product Offering Copied Successfully");
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  NextDetail(event) {
    this.UrlBackEnd = URLConstant.AddOrEditProdOfferingDetail;
    this.generateSaveObj(event);
    this.http.post(this.UrlBackEnd, this.listGeneralDataObj).subscribe(
      (response) => {
        console.log(response);
        this.toastr.successMessage(response["message"]);
        this.wizard.goToNextStep();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  generateSaveObj(event) {
    this.listGeneralDataObj = new ListRefProductOfferingDetailObj();
    this.listGeneralDataObj.ProdOfferingDetails = new Array();
    this.listGeneralDataObj.ProdOfferingHId = this.objInput["param"];
    for (var i = 0; i < event.length; i++) {
      var GeneralDataObj = new RefProductOfferingDetailObj();
      GeneralDataObj.ProdOfferingDId = event[i].ProdOfferingDId;
      GeneralDataObj.ProdOfferingHId = this.objInput["param"];
      GeneralDataObj.RefProdCompntCode = event[i].RefProdCompntCode;
      GeneralDataObj.RefProdCompntGrpCode = event[i].RefProdCompntGrpCode;
      if (event[i].IsProdOffering == true) {
        GeneralDataObj.CompntValue = event[i].OfferingCompntValue;
        GeneralDataObj.CompntValueDesc = event[i].OfferingCompntValueDesc;
        GeneralDataObj.MrProdBehaviour = event[i].OfferingMrProdBehaviour;
      } else {
        GeneralDataObj.CompntValue = event[i].HOCompntValue;
        GeneralDataObj.CompntValueDesc = event[i].HOCompntValueDesc;
        GeneralDataObj.MrProdBehaviour = event[i].HOMrProdBehaviour;
      }
      this.listGeneralDataObj.ProdOfferingDetails.push(GeneralDataObj);
    }
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
