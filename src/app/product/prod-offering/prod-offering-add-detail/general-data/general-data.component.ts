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

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
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
      DropDownList: this.fb.array([this.fb.group({
        indexOf: [''],
        Key: [''],
        Value: ['']
      })])
    })])
  });

  inputLookUpObj;
  UrlBackEnd;

  lookupEnvironment;

  lengthDataReturnObj
  listRefProductDetailObj;
  refProductDetailObj;
  items;

  ngOnInit() {

    this.inputLookUpObj = new InputLookupObj();
    this.inputLookUpObj.urlJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookUpObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookUpObj.pagingJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.genericJson = "./assets/uclookup/product/lookupProduct.json";

    // Get Data Input 
    // mode add
    // if(this.objInput.mode == "add"){
      this.UrlBackEnd = AdInsConstant.GetProductOfferingComponent;
      var ProdOfferingComponent = {
        GroupCodes: [
          "GEN"
        ],
        RowVersion: ""
      }
  
      this.items = this.RefGeneralDataForm.get('items') as FormArray;
      this.http.post(this.UrlBackEnd, ProdOfferingComponent).subscribe(
        (response) => {
          // console.log(response);
          // console.log(response["ReturnObject"].length);
          this.lengthDataReturnObj = response["ReturnObject"].length;
  
          if (this.lengthDataReturnObj) {
            for (var i = 0; i < this.lengthDataReturnObj; i++) {
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
                  indexOf: i,
                  Key: "",
                  Value: ""
                })])
              }) as FormGroup;
            // Get DDL
            if(eachDataDetail.controls.ProdCompntType.value == "DDL"){
              this.resolveDDL(eachDataDetail, i);
            }
              // Push Data
              this.items.push(eachDataDetail);
            }
          }
          this.items.removeAt(0);
          console.log("cek form");
          console.log(this.RefGeneralDataForm);
        },
        (error) => {
          console.log(error);
        }
      );
    // }else{ // mode edit

    // }
    
  }

  resolveDDL(obj: any, indexAt: any) {
    // console.log("Cek Obj DDL:");
    // console.log(indexAt);

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
                indexOf: indexAt,
                Key: response["ReturnObject"][i].Key,
                Value: response["ReturnObject"][i].Value,
              }) as FormGroup;
              // console.log(eachDDLDetail);
              this.RefGeneralDataForm.controls.items["controls"][indexAt].controls.DropDownList.push(eachDDLDetail);
            }
            this.RefGeneralDataForm.controls.items["controls"][indexAt].controls.DropDownList.removeAt(0);
            this.RefGeneralDataForm.controls.items["controls"][indexAt].patchValue({
              CompntValue: response["ReturnObject"][0].Value,
              CompntValueDesc: response["ReturnObject"][0].Key
            });
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

    this.RefGeneralDataForm.controls.items["controls"][idx].patchValue({
      CompntValue: ev.target.selectedOptions[0].text,
      CompntValueDesc: ev.target.selectedOptions[0].value
    });

    console.log(this.RefGeneralDataForm);
  }
  
  listGeneralDataObj;
  SaveForm(){
    this.listGeneralDataObj = new ListRefProductOfferingDetailObj();
    this.listGeneralDataObj.ProductDetails = new Array();
    this.listGeneralDataObj.ProdHId = this.objInput["param"];
    this.UrlBackEnd = AdInsConstant.AddOrEditProductDetail;
    for(var i = 0; i < this.lengthDataReturnObj; i++){
      var GeneralDataObj = new this.refProductDetailObj();
      GeneralDataObj.ProdOfferingDId = this.RefGeneralDataForm.controls.items["controls"][i].controls.ProdOfferingDId.value;
      GeneralDataObj.ProdOfferingHId = this.RefGeneralDataForm.controls.items["controls"][i].controls.ProdOFferingHId.value;
      GeneralDataObj.RefProdCompntCode = this.RefGeneralDataForm.controls.items["controls"][i].controls.RefProdCompntCode.value;
      GeneralDataObj.RefProdCompntGrpCode = this.RefGeneralDataForm.controls.items["controls"][i].controls.RefProdCompntGrpCode.value;
      GeneralDataObj.CompntValue = this.RefGeneralDataForm.controls.items["controls"][i].controls.CompntValue.value;
      GeneralDataObj.CompntValueDesc = this.RefGeneralDataForm.controls.items["controls"][i].controls.CompntValueDesc.value;
      GeneralDataObj.MrProdBehaviour = this.RefGeneralDataForm.controls.items["controls"][i].controls.MrProdBehaviour.value;
      GeneralDataObj.RowVersion = this.RefGeneralDataForm.controls.items["controls"][i].controls.RowVersion.value;
      this.listGeneralDataObj.ProductDetails.push(GeneralDataObj); 
  }

  this.http.post(this.UrlBackEnd, this.listGeneralDataObj).subscribe(
    (response) => {
      console.log(response);
      this.toastr.successMessage(response["message"]);
      this.router.navigate(["/Product/prod-offering/paging"]);
    },
    (error) => {
      console.log(error);
    }
  );
}
  NextDetail(){
    this.wizard.goToNextStep();
  }

}
