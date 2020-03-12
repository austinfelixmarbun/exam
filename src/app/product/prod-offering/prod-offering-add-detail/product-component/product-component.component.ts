import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { RefProductDetailObj } from 'app/shared/model/RefProductDetailObj.Model';
import { WizardComponent } from 'angular-archwizard';
import { ListRefProductOfferingDetailObj } from 'app/shared/model/ListRefProductOfferingDetailObj.Model'
import { ListRefProductDetailObj } from 'app/shared/model/ListRefProductDetailObj.Model';
import { RefProdOfferingDetailObj } from 'app/shared/model/RefProdOfferingDetailObj.Model';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.scss'],
  providers: [NGXToastrService]
})
export class ProductComponentComponent implements OnInit {

  @Input() objInput: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: NGXToastrService,
    private wizard: WizardComponent
  ) { }


  RefSchemeForm = this.fb.group({
    items: this.fb.array([this.fb.group({
      ProdOfferingDId: [''],
      ProdOfferingHId: [''],
      RefProdCompntCode: [''],
      RefProdCompntGrpCode: [''],
      CompntValue: [''],
      CompntValueDesc: [''],
      MrProdBehaviour: [''],
      RowVersion: [''],
      ProdCompntType: [''],
      BehaviourType: [''],
      ProdCompntDtaSrcApi: [''],
      ProdCompntDtaSrc: [''],
      ProdCompntDtaValue: [''],
      ProdCompntName: [''],
      DropDownList: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })]),
      DropDownListBehaviour: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })])
    })])
  });

  inputLookUpObj;
  UrlBackEnd;

  lookupEnvironment;

  lengthDataReturnObj

  listRefProdOfferingDetailObj;
  refProductOfferingDetailObj;
  items;
  SchmData;
  RuleData;
  LosData;
  OthrData;

  ngOnInit() {
    
    this.SchmData = 0;
    this.RuleData = 0;
    this.LosData = 0;
    this.OthrData = 0;

    this.inputLookUpObj = new InputLookupObj();
    this.inputLookUpObj.urlJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookUpObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookUpObj.pagingJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.genericJson = "./assets/uclookup/product/lookupProduct.json";


    this.UrlBackEnd = AdInsConstant.GetProductOfferingComponent;

    var ProdOfferingComponentScheme = {
      ProdOfferingHId: this.objInput["param"],
      GroupCodes: [
        "SCHM",
        "LOS",
        "RULE",
        "OTHR"
      ],
      RowVersion: ""
    }
    this.items = this.RefSchemeForm.get('items') as FormArray;
    this.getList(ProdOfferingComponentScheme);

  }

  getList(obj: any){

    this.http.post(this.UrlBackEnd, obj).subscribe(
      (response) => {
        console.log(response);
        console.log(response["ReturnObject"].length);
        var lengthDataReturnObj = response["ReturnObject"].length;

        if (lengthDataReturnObj) {
          for (var i = 0; i < lengthDataReturnObj; i++) {
            var eachDataDetail = this.fb.group({
              ProdOfferingDId: response["ReturnObject"][i].ProdOfferingDId,
              ProdOfferingHId: response["ReturnObject"][i].ProdOfferingHId,
              RefProdCompntCode: response["ReturnObject"][i].RefProdCompntCode,
              RefProdCompntGrpCode: response["ReturnObject"][i].RefProdCompntGrpCode,
              CompntValue: response["ReturnObject"][i].CompntValue,
              CompntValueDesc: response["ReturnObject"][i].CompntValueDesc,
              MrProdBehaviour: response["ReturnObject"][i].BehaviourType,
              RowVersion: response["ReturnObject"][i].RowVersion,
              ProdCompntType: response["ReturnObject"][i].ProdCompntType,
              BehaviourType: response["ReturnObject"][i].BehaviourType,
              ProdCompntDtaSrcApi: response["ReturnObject"][i].ProdCompntDtaSrcApi,
              ProdCompntDtaSrc: response["ReturnObject"][i].ProdCompntDtaSrc,
              ProdCompntDtaValue: response["ReturnObject"][i].ProdCompntDtaValue,
              ProdCompntName: response["ReturnObject"][i].ProdCompntName,
              DropDownList: this.fb.array([this.fb.group({
                key: [''],
                value: ['']
              })]),
              DropDownListBehaviour: this.fb.array([this.fb.group({
                key: [''],
                value: ['']
              })])
            }) as FormGroup;
            // Get DDL
            if (eachDataDetail.controls.RowVersion.value == null) {
              eachDataDetail.patchValue({
                RowVersion: ""
              });
            }

            if(eachDataDetail.controls.RefProdCompntGrpCode.value == "SCHM"){
              this.SchmData++;
            }else if(eachDataDetail.controls.RefProdCompntGrpCode.value == "RULE"){
              this.RuleData++;
            }else if(eachDataDetail.controls.RefProdCompntGrpCode.value == "LOS"){
              this.LosData++;
            }else if(eachDataDetail.controls.RefProdCompntGrpCode.value == "OTHR"){
              this.OthrData++;
            }

            var flag = false;
            if (eachDataDetail.controls.ProdOfferingHId.value == 0) {
              flag = true;
            }
            if (eachDataDetail.controls.ProdCompntType.value == "DDL") {
              this.resolveDDL(eachDataDetail, i, flag);
              eachDataDetail.controls.CompntValue.clearValidators();
              eachDataDetail.controls.CompntValue.updateValueAndValidity();
            }else if(eachDataDetail.controls.ProdCompntType.value == "AMT"){
              eachDataDetail.controls.CompntValue.setValidators([Validators.required, Validators.pattern("^[0-9]+$")]);
              eachDataDetail.controls.CompntValue.updateValueAndValidity();
            }
              this.resolveBehaviour(eachDataDetail,i,flag);
              this.items.push(eachDataDetail);
          }
        }
        this.items.removeAt(0);
        console.log("cek form");
        console.log(this.RefSchemeForm);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  resolveBehaviour(obj:any, indexAt: any, flag:any){
    var url = AdInsConstant.GetRefBehaviourByBehaviourTypeCode;
    var objBehaviour =obj.controls.BehaviourType.value;
    var requestBehaviour = {
      BehaviourTypeCode : objBehaviour
    }

    this.http.post(url, requestBehaviour).subscribe(
      (response) => {
        console.log(response);
        var lengthDDL = response["ReturnObject"].length;
        if(lengthDDL > 0){
          for (var i = 0; i < lengthDDL; i++) {
            var eachDDLDetail = this.fb.group({
              Key: response["ReturnObject"][i].Key,
              Value: response["ReturnObject"][i].Value,
            }) as FormGroup;
            // console.log("test");
            // console.log(eachDDLDetail);
            this.RefSchemeForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.push(eachDDLDetail);
          }
            this.RefSchemeForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.removeAt(0);
            if(flag){
            this.RefSchemeForm.controls.items["controls"][indexAt].patchValue({
              MrProdBehaviour: response["ReturnObject"][0].Value
            });
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );

    
  }
  resolveDDL(obj: any, indexAt: any, flag: any) {
    // console.log("Cek Obj DDL:");

    var urlGet = obj.controls.ProdCompntDtaSrcApi.value;
    var ddlObj = JSON.parse(obj.controls.ProdCompntDtaValue.value);
    console.log("Json parse");
    console.log(ddlObj);
    if (urlGet) {
      // console.log("cek API " + (indexAt + 1));

      // Make different obj passing
      this.http.post(urlGet, ddlObj).subscribe(
        (response) => {
          // console.log(response);
          var lengthDDL = response["ReturnObject"].length;
          if(lengthDDL > 0){
            for (var i = 0; i < lengthDDL; i++) {
              var eachDDLDetail = this.fb.group({
                Key: response["ReturnObject"][i].Key,
                Value: response["ReturnObject"][i].Value,
              }) as FormGroup;
              // console.log(eachDDLDetail);
              this.RefSchemeForm.controls.items["controls"][indexAt].controls.DropDownList.push(eachDDLDetail); 
            }
              this.RefSchemeForm.controls.items["controls"][indexAt].controls.DropDownList.removeAt(0);
              if(flag){
              this.RefSchemeForm.controls.items["controls"][indexAt].patchValue({
                CompntValue: response["ReturnObject"][0].Key,
                CompntValueDesc: response["ReturnObject"][0].Value
              });
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );

    }
  }

  clickTest(ev: any, idx: any){
    // console.log(idx);
    // console.log(ev.target.selectedOptions[0].text);
    // console.log(ev.target.selectedOptions[0].value);
      this.RefSchemeForm.controls.items["controls"][idx].patchValue({
        CompntValue: ev.target.selectedOptions[0].value,
        CompntValueDesc: ev.target.selectedOptions[0].text
      });
    

    // console.log(this.RefSchemeForm);
  }
  clickBehaviour(ev: any, idx: any){

      this.RefSchemeForm.controls.items["controls"][idx].patchValue({
        MrProdBehaviour : ev.target.selectedOptions[0].value
      });

    // console.log(this.RefSchemeForm);
  }
  
  listProductComponentObj;
  SaveForm(){
    this.listProductComponentObj = new ListRefProductDetailObj();
    this.listProductComponentObj.ProductDetails = new Array();
    this.listProductComponentObj.ProdOfferingHId = this.objInput["param"];
    this.UrlBackEnd = AdInsConstant.AddOrEditProductDetail;
    for (var i = 0; i < this.lengthDataReturnObj; i++) {
      var ProductComponentObj = new RefProdOfferingDetailObj();
      ProductComponentObj.ProdOfferingDId = this.RefSchemeForm.controls.items["controls"][i].controls.ProdDId.value;
      ProductComponentObj.ProdOfferingHId = this.objInput["param"];
      ProductComponentObj.RefProdCompntCode = this.RefSchemeForm.controls.items["controls"][i].controls.RefProdCompntCode.value;
      ProductComponentObj.RefProdCompntGrpCode = this.RefSchemeForm.controls.items["controls"][i].controls.RefProdCompntGrpCode.value;
      ProductComponentObj.CompntValue = this.RefSchemeForm.controls.items["controls"][i].controls.CompntValue.value;
      ProductComponentObj.CompntValueDesc = this.RefSchemeForm.controls.items["controls"][i].controls.CompntValueDesc.value;
      ProductComponentObj.MrProdBehaviour = this.RefSchemeForm.controls.items["controls"][i].controls.MrProdBehaviour.value;
      ProductComponentObj.RowVersion = this.RefSchemeForm.controls.items["controls"][i].controls.RowVersion.value;
      this.listProductComponentObj.ProductDetails.push(ProductComponentObj);
    }
    // this.listGeneralDataObj.ProductDetails.removeAt(0);
    console.log(this.listProductComponentObj);
    console.log(this.RefSchemeForm.controls.items["controls"][0].controls.RowVersion.value);

    this.http.post(this.UrlBackEnd, this.listProductComponentObj).subscribe(
      (response) => {
        console.log("Response save form");
        console.log(response);
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/Product/ProdOffering/paging"]);
      },
      (error) => {
        console.log("Response save error");
        console.log(error);
      }
    );
  }

  NextDetail(){
    this.listProductComponentObj = new ListRefProductOfferingDetailObj();
    this.listProductComponentObj.ProductDetails = new Array();
    this.listProductComponentObj.ProdOfferingHId = this.objInput["param"];
    this.UrlBackEnd = AdInsConstant.AddOrEditProdOfferingDetail;
    for (var i = 0; i < this.lengthDataReturnObj; i++) {
      var ProductComponentObj = new RefProdOfferingDetailObj();
      ProductComponentObj.ProdOfferingDId = this.RefSchemeForm.controls.items["controls"][i].controls.ProdDId.value;
      ProductComponentObj.ProdOfferingHId = this.objInput["param"];
      ProductComponentObj.RefProdCompntCode = this.RefSchemeForm.controls.items["controls"][i].controls.RefProdCompntCode.value;
      ProductComponentObj.RefProdCompntGrpCode = this.RefSchemeForm.controls.items["controls"][i].controls.RefProdCompntGrpCode.value;
      ProductComponentObj.CompntValue = this.RefSchemeForm.controls.items["controls"][i].controls.CompntValue.value;
      ProductComponentObj.CompntValueDesc = this.RefSchemeForm.controls.items["controls"][i].controls.CompntValueDesc.value;
      ProductComponentObj.MrProdBehaviour = this.RefSchemeForm.controls.items["controls"][i].controls.MrProdBehaviour.value;
      ProductComponentObj.RowVersion = this.RefSchemeForm.controls.items["controls"][i].controls.RowVersion.value;
      this.listProductComponentObj.ProductDetails.push(ProductComponentObj);
    }
    // this.listGeneralDataObj.ProductDetails.removeAt(0);
    console.log(this.listProductComponentObj);
    console.log(this.RefSchemeForm.controls.items["controls"][0].controls.RowVersion.value);

    this.http.post(this.UrlBackEnd, this.listProductComponentObj).subscribe(
      (response) => {
        console.log("Response next form");
        console.log(response);
        this.toastr.successMessage(response["message"]);
        this.wizard.goToNextStep();
      },
      (error) => {
        console.log("Response save error");
        console.log(error);
      }
    );
  }

  Next(){
    this.wizard.goToNextStep();
  }

 }
