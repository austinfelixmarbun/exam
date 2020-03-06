import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { RefProductDetailObj } from 'app/shared/model/RefProductDetailObj.Model';
import { WizardComponent } from 'angular-archwizard';

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
      ProdCompntDtaSrcApi: [''],
      ProdCompntDtaSrc: [''],
      ProdCompntDtaValue: [''],
      ProdCompntName: [''],
      DropDownList: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })]),
      DropDownList2: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })])
    })])
  });

  RefApprovalForm = this.fb.group({
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
      ProdCompntDtaSrcApi: [''],
      ProdCompntDtaSrc: [''],
      ProdCompntDtaValue: [''],
      ProdCompntName: [''],
      DropDownList: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })]),
      DropDownList2: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })])
    })])
  });

  RefRuleForm = this.fb.group({
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
      ProdCompntDtaSrcApi: [''],
      ProdCompntDtaSrc: [''],
      ProdCompntDtaValue: [''],
      ProdCompntName: [''],
      DropDownList: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })]),
      DropDownList2: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })])
    })])
  });

  RefOtherForm = this.fb.group({
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
      ProdCompntDtaSrcApi: [''],
      ProdCompntDtaSrc: [''],
      ProdCompntDtaValue: [''],
      ProdCompntName: [''],
      DropDownList: this.fb.array([this.fb.group({
        key: [''],
        value: ['']
      })]),
      DropDownList2: this.fb.array([this.fb.group({
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
  items1;
  items2;
  items3;

  ngOnInit() {

    this.inputLookUpObj = new InputLookupObj();
    this.inputLookUpObj.urlJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookUpObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookUpObj.pagingJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.genericJson = "./assets/uclookup/product/lookupProduct.json";


    this.UrlBackEnd = AdInsConstant.GetProductOfferingComponent;

    var ProdOfferingComponentScheme = {
      GroupCodes: [
        "VAN"
      ],
      RowVersion: ""
    }

    var ProdOfferingComponentApproval = {
      GroupCodes: [
        "VAN"
      ],
      RowVersion: ""
    }

    var ProdOfferingComponentRule = {
      GroupCodes: [
        "VAN"
      ],
      RowVersion: ""
    }

    var ProdOfferingComponentOther = {
      GroupCodes: [
        "VAN"
      ],
      RowVersion: ""
    }

    this.items = this.RefSchemeForm.get('items') as FormArray;
    this.getList(ProdOfferingComponentScheme,0);

    this.items1 = this.RefApprovalForm.get('items') as FormArray;
    this.getList(ProdOfferingComponentApproval,1);

    this.items2 = this.RefRuleForm.get('items') as FormArray;
    this.getList(ProdOfferingComponentRule,2);

    this.items3= this.RefOtherForm.get('items3') as FormArray;
    this.getList(ProdOfferingComponentOther,3);

  }

  getList(obj: any, index: any){

    this.http.post(this.UrlBackEnd, obj).subscribe(
      (response) => {
        console.log(response);
        console.log(response["ReturnObject"].length);
        var lengthDataReturnObj = response["ReturnObject"].length;

        if (lengthDataReturnObj) {
          for (var i = 0; i < lengthDataReturnObj; i++) {
            var eachDataDetail = this.fb.group({
              ProdOfferingDId: response["ReturnObject"][i].ProdOfferingDId,
              ProdOFferingHId: response["ReturnObject"][i].ProdOfferingHId,
              RefProdCompntCode: response["ReturnObject"][i].RefProdCompntCode,
              RefProdCompntGrpCode: response["ReturnObject"][i].RefProdCompntGrpCode,
              CompntValue: response["ReturnObject"][i].CompntValue,
              CompntValueDesc: response["ReturnObject"][i].CompntValueDesc,
              MrProdBehaviour: response["ReturnObject"][i].BehaviourType,
              RowVersion: response["ReturnObject"][i].RowVersion,
              ProdCompntType: response["ReturnObject"][i].ProdCompntType,
              ProdCompntDtaSrcApi: response["ReturnObject"][i].ProdCompntDtaSrcApi,
              ProdCompntDtaSrc: response["ReturnObject"][i].ProdCompntDtaSrc,
              ProdCompntDtaValue: response["ReturnObject"][i].ProdCompntDtaValue,
              ProdCompntName: response["ReturnObject"][i].ProdCompntName,
              DropDownList: this.fb.array([this.fb.group({
                key: [''],
                value: ['']
              })])
            }) as FormGroup;
            // Get DDL
            if(index == 0){
              this.resolveDDL(eachDataDetail, i,index);
              this.items.push(eachDataDetail);
              this.items.removeAt(0);
              console.log("cek form");
              console.log(this.RefSchemeForm);
            }
            else if(index==1){
              this.resolveDDL(eachDataDetail, i,index);
              this.items1.push(eachDataDetail);
              this.items1.removeAt(0);
              console.log("cek form");
              console.log(this.RefApprovalForm);
            }
            else if(index ==2){
              this.resolveDDL(eachDataDetail, i,index);
              this.items2.push(eachDataDetail);
              this.items2.removeAt(0);
              console.log("cek form");
              console.log(this.RefRuleForm);
            }
            else{
              this.resolveDDL(eachDataDetail, i,index);
              this.items3.push(eachDataDetail);
              this.items3.removeAt(0);
              console.log("cek form");
              console.log(this.RefOtherForm);
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  resolveDDL(obj: any, indexAt: any, index: any) {
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
              if(index==0){
                this.RefSchemeForm.controls.items["controls"][indexAt].controls.DropDownList.push(eachDDLDetail);
              }
              if(index==1){
                this.RefApprovalForm.controls.items["controls"][indexAt].controls.DropDownList.push(eachDDLDetail);
              }
              if(index==2){
                this.RefRuleForm.controls.items["controls"][indexAt].controls.DropDownList.push(eachDDLDetail);
              }
              if(index==3){
                this.RefOtherForm.controls.items["controls"][indexAt].controls.DropDownList.push(eachDDLDetail);
              }
            }
            if(index==0){
              this.RefSchemeForm.controls.items["controls"][indexAt].controls.DropDownList.removeAt(0);
            }
            if(index==1){
              this.RefApprovalForm.controls.items["controls"][indexAt].controls.DropDownList.removeAt(0);
            }
            if(index==2){
              this.RefRuleForm.controls.items["controls"][indexAt].controls.DropDownList.removeAt(0);
            }
            if(index==3){
              this.RefOtherForm.controls.items["controls"][indexAt].controls.DropDownList.removeAt(0);
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
      CompntValue: ev.target.selectedOptions[0].text,
      CompntValueDesc: ev.target.selectedOptions[0].value
    });

    console.log(this.RefSchemeForm);
  }
  
  SaveForm(){
    
  }

  NextDetail(){
    this.wizard.goToNextStep();
  }

 }
