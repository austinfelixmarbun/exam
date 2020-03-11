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
import { ListRefProductDetailObj } from 'app/shared/model/ListRefProductDetailObj.Model';

@Component({
  selector: 'app-product-component-HO',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.scss'],
  providers: [NGXToastrService]
})
export class ProductComponentHOComponent implements OnInit {

  @Input() objInput: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: NGXToastrService,
    private wizard: WizardComponent
  ) { }


  RefGeneralDataForm = this.fb.group({
    items: this.fb.array([this.fb.group({
      ProdDId: [''],
      ProdHId: [''],
      RefProdCompntCode: [''],
      RefProdCompntGrpCode: [''],
      CompntValue: [''],
      CompntValueDesc: [''],
      MrProdBehaviour: [''],
      RowVersion: [''],
      ProdCompntType: [''],
      ProdCompntDtaSrcApi: [''],
      ProdCompntDtaSrc: [''],
      ProdCompntDtaValue: [''],
      ProdCompntName: [''],
      BehaviourType: [''],
      DropDownList: this.fb.array([this.fb.group({
        Key: [''],
        Value: ['']
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

  listRefProductDetailObj;
  refProductDetailObj;
  items;
  lengthDataReturnObj;
  SchmData;
  RuleData;
  ScoreData;
  OthrData;
  ngOnInit() {
    this.SchmData = 0;
    this.RuleData = 0;
    this.ScoreData = 0;
    this.OthrData = 0;

    this.inputLookUpObj = new InputLookupObj();
    this.inputLookUpObj.urlJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookUpObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookUpObj.pagingJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.genericJson = "./assets/uclookup/product/lookupProduct.json";

    // Get Data Input 
    // mode add
    // if(this.objInput.mode == "add"){
    this.UrlBackEnd = AdInsConstant.GetProductHOComponent;
    var ProdHOComponent = {
      ProdHId: this.objInput["param"],
      GroupCodes: [
        "SCHM",
        "SCORE",
        "RULE",
        "OTHR"
      ],
      RowVersion: ""
    }

    this.items = this.RefGeneralDataForm.get('items') as FormArray;
    this.http.post(this.UrlBackEnd, ProdHOComponent).subscribe(
      (response) => {
        console.log("Response dynamic data 1");
        console.log(response);
        // console.log(response["ReturnObject"].length);
        this.lengthDataReturnObj = response["ReturnObject"].length;
        var dataTemp = response["ReturnObject"];

        if (this.lengthDataReturnObj) {
          for (var i = 0; i < this.lengthDataReturnObj; i++) {
            var eachDataDetail = this.fb.group({
              ProdDId: response["ReturnObject"][i].ProdDId,
              ProdHId: response["ReturnObject"][i].ProdHId,
              RefProdCompntCode: response["ReturnObject"][i].RefProdCompntCode,
              RefProdCompntGrpCode: response["ReturnObject"][i].RefProdCompntGrpCode,
              CompntValue: response["ReturnObject"][i].CompntValue,
              CompntValueDesc: response["ReturnObject"][i].CompntValueDesc,
              MrProdBehaviour: response["ReturnObject"][i].MrProdBehaviour,
              RowVersion: response["ReturnObject"][i].RowVersion,
              ProdCompntType: response["ReturnObject"][i].ProdCompntType,
              ProdCompntDtaSrcApi: response["ReturnObject"][i].ProdCompntDtaSrcApi,
              ProdCompntDtaSrc: response["ReturnObject"][i].ProdCompntDtaSrc,
              ProdCompntDtaValue: response["ReturnObject"][i].ProdCompntDtaValue,
              ProdCompntName: response["ReturnObject"][i].ProdCompntName,
              BehaviourType: response["ReturnObject"][i].BehaviourType,
              DropDownList: this.fb.array([this.fb.group({
                Key: "",
                Value: ""
              })]),
              DropDownListBehaviour: this.fb.array([this.fb.group({
                key: [''],
                value: ['']
              })])
            }) as FormGroup;
            if (eachDataDetail.controls.RowVersion.value == null) {
              eachDataDetail.patchValue({
                RowVersion: ""
              });
            }
            
            if(eachDataDetail.controls.RefProdCompntGrpCode.value == "SCHM"){
              this.SchmData++;
            }else if(eachDataDetail.controls.RefProdCompntGrpCode.value == "RULE"){
              this.RuleData++;
            }else if(eachDataDetail.controls.RefProdCompntGrpCode.value == "SCORE"){
              this.ScoreData++;
            }else if(eachDataDetail.controls.RefProdCompntGrpCode.value == "OTHR"){
              this.OthrData++;
            }

            var flag = false;
            if (eachDataDetail.controls.ProdHId.value == 0) {
              flag = true;
            }
            
            // Get DDL
            if (eachDataDetail.controls.ProdCompntType.value == "DDL") {
              this.resolveDDL(eachDataDetail, i, flag);
              eachDataDetail.controls.CompntValue.clearValidators();
              eachDataDetail.controls.CompntValue.updateValueAndValidity();
            }else if(eachDataDetail.controls.ProdCompntType.value == "AMT"){
              eachDataDetail.controls.CompntValue.setValidators([Validators.required, Validators.pattern("^[0-9]+$")]);
              eachDataDetail.controls.CompntValue.updateValueAndValidity();
            }
            // Get DDL Behaviour
            this.resolveDDLBehaviour(eachDataDetail, i, flag);
            // Push Data
            this.items.push(eachDataDetail);
          }
        }
        this.items.removeAt(0);
        console.log("cek form");
        console.log(this.RefGeneralDataForm);
        // this.RuleData = dataTemp.filter(comp => 
        //   comp.RefProdCompntGrpCode == "RULE");
        // console.log(this.RuleData);
        // console.log(this.items);
        // console.log("total data:")
        // console.log(this.SchmData);
        // console.log(this.RuleData);
        // console.log(this.OthrData);
        // console.log(this.ScoreData);

        console.log("cek finish");
        
        // console.log("ruledata:");
        // console.log(this.RuleData);
      },
      (error) => {
        console.log(error);
      }
    );
    // }else{ // mode edit

    // }

  }

  resolveDDLBehaviour(obj: any, indexAt: any, flag: any){
    console.log("Behaviour DDL");
    var urlGet = AdInsConstant.GetRefBehaviourByBehaviourTypeCode;
    if (urlGet) {
      var ddlObj = {
        BehaviourTypeCode: obj.controls.BehaviourType.value
      };
      // console.log("cek API " + (indexAt + 1));

      // Make different obj passing
      this.http.post(urlGet, ddlObj).subscribe(
        (response) => {
          console.log(response);
          var lengthDDL = response["ReturnObject"].length;
          if (lengthDDL > 0) {
            for (var i = 0; i < lengthDDL; i++) {
              var eachDDLDetail = this.fb.group({
                Key: response["ReturnObject"][i].Key,
                Value: response["ReturnObject"][i].Value,
              }) as FormGroup;
              // console.log(eachDDLDetail);
              this.RefGeneralDataForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.push(eachDDLDetail);
            }
            this.RefGeneralDataForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.removeAt(0);
            if (flag) {
              this.RefGeneralDataForm.controls.items["controls"][indexAt].patchValue({
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
  }

  resolveDDL(obj: any, indexAt: any, flag: any) {
    console.log("Cek Obj DDL:");
    // console.log(indexAt);
    console.log(obj);
    var urlGet = obj.controls.ProdCompntDtaSrcApi.value;
    if (urlGet) {
      var ddlObj = JSON.parse(obj.controls.ProdCompntDtaValue.value);
      console.log("Json parse");
      console.log(ddlObj);
      // console.log("cek API " + (indexAt + 1));
      // if(obj.controls.RefProdCompntGrpCode.value == "RULE"){
      //   console.log("DDL RULE:");
      // }
      // Make different obj passing
      this.http.post(urlGet, ddlObj).subscribe(
        (response) => {
          // console.log("response:");
          console.log(response);
          
          var lengthDDL = response["ReturnObject"].length;
          if (lengthDDL > 0) {
            for (var i = 0; i < lengthDDL; i++) {
              var eachDDLDetail = this.fb.group({
                Key: response["ReturnObject"][i].Key,
                Value: response["ReturnObject"][i].Value,
              }) as FormGroup;
              // console.log(eachDDLDetail);
              this.RefGeneralDataForm.controls.items["controls"][indexAt].controls.DropDownList.push(eachDDLDetail);
            }
            this.RefGeneralDataForm.controls.items["controls"][indexAt].controls.DropDownList.removeAt(0);
            if (flag) {
              this.RefGeneralDataForm.controls.items["controls"][indexAt].patchValue({
                CompntValue: response["ReturnObject"][0].Value,
                CompntValueDesc: response["ReturnObject"][0].Key
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

  clickTest(ev: any, idx: any) {
    // console.log(idx);
    // console.log(ev.target.selectedOptions[0].text);
    // console.log(ev.target.selectedOptions[0].value);

    this.RefGeneralDataForm.controls.items["controls"][idx].patchValue({
      CompntValue: ev.target.selectedOptions[0].value,
      CompntValueDesc: ev.target.selectedOptions[0].text
    });

  }

  clickTestBehaviour(ev: any, idx: any){
    this.RefGeneralDataForm.controls.items["controls"][idx].patchValue({
      MrProdBehaviour: ev.target.selectedOptions[0].value,
    });
  }

  listGeneralDataObj;
  SaveForm() {
    this.listGeneralDataObj = new ListRefProductDetailObj();
    this.listGeneralDataObj.ProductDetails = new Array();
    this.listGeneralDataObj.ProdHId = this.objInput["param"];
    this.UrlBackEnd = AdInsConstant.AddOrEditProductDetail;
    for (var i = 0; i < this.lengthDataReturnObj; i++) {
      var GeneralDataObj = new RefProductDetailObj();
      GeneralDataObj.ProdDId = this.RefGeneralDataForm.controls.items["controls"][i].controls.ProdDId.value;
      GeneralDataObj.ProdHId = this.objInput["param"];
      GeneralDataObj.RefProdCompntCode = this.RefGeneralDataForm.controls.items["controls"][i].controls.RefProdCompntCode.value;
      GeneralDataObj.RefProdCompntGrpCode = this.RefGeneralDataForm.controls.items["controls"][i].controls.RefProdCompntGrpCode.value;
      GeneralDataObj.CompntValue = this.RefGeneralDataForm.controls.items["controls"][i].controls.CompntValue.value;
      GeneralDataObj.CompntValueDesc = this.RefGeneralDataForm.controls.items["controls"][i].controls.CompntValueDesc.value;
      GeneralDataObj.MrProdBehaviour = this.RefGeneralDataForm.controls.items["controls"][i].controls.MrProdBehaviour.value;
      GeneralDataObj.RowVersion = this.RefGeneralDataForm.controls.items["controls"][i].controls.RowVersion.value;
      this.listGeneralDataObj.ProductDetails.push(GeneralDataObj);
    }
    // this.listGeneralDataObj.ProductDetails.removeAt(0);
    console.log(this.listGeneralDataObj);
    console.log(this.RefGeneralDataForm.controls.items["controls"][0].controls.RowVersion.value);

    this.http.post(this.UrlBackEnd, this.listGeneralDataObj).subscribe(
      (response) => {
        console.log("Response save form");
        console.log(response);
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/Product/HOpaging"]);
      },
      (error) => {
        console.log("Response save error");
        console.log(error);
      }
    );
  }

  NextDetail() {
    this.listGeneralDataObj = new ListRefProductDetailObj();
    this.listGeneralDataObj.ProductDetails = new Array();
    this.listGeneralDataObj.ProdHId = this.objInput["param"];
    this.UrlBackEnd = AdInsConstant.AddOrEditProductDetail;
    for (var i = 0; i < this.lengthDataReturnObj; i++) {
      var GeneralDataObj = new RefProductDetailObj();
      GeneralDataObj.ProdDId = this.RefGeneralDataForm.controls.items["controls"][i].controls.ProdDId.value;
      GeneralDataObj.ProdHId = this.objInput["param"];
      GeneralDataObj.RefProdCompntCode = this.RefGeneralDataForm.controls.items["controls"][i].controls.RefProdCompntCode.value;
      GeneralDataObj.RefProdCompntGrpCode = this.RefGeneralDataForm.controls.items["controls"][i].controls.RefProdCompntGrpCode.value;
      GeneralDataObj.CompntValue = this.RefGeneralDataForm.controls.items["controls"][i].controls.CompntValue.value;
      GeneralDataObj.CompntValueDesc = this.RefGeneralDataForm.controls.items["controls"][i].controls.CompntValueDesc.value;
      GeneralDataObj.MrProdBehaviour = this.RefGeneralDataForm.controls.items["controls"][i].controls.MrProdBehaviour.value;
      GeneralDataObj.RowVersion = this.RefGeneralDataForm.controls.items["controls"][i].controls.RowVersion.value;
      this.listGeneralDataObj.ProductDetails.push(GeneralDataObj);
    }
    // this.listGeneralDataObj.ProductDetails.removeAt(0);
    console.log(this.listGeneralDataObj);
    console.log(this.RefGeneralDataForm.controls.items["controls"][0].controls.RowVersion.value);

    this.http.post(this.UrlBackEnd, this.listGeneralDataObj).subscribe(
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


 }
