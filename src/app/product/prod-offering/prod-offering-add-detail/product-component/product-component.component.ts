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
import { ListRefProductOfferingDetailObj } from 'app/shared/model/ListRefProductOfferingDetailObj.Model'

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
        indexOf: [''],
        key: [''],
        value: ['']
      })]),
      DropDownListBehaviour: this.fb.array([this.fb.group({
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
      BehaviourType:[''],
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
      BehaviourType:[''],
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
      BehaviourType:[''],
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

  listRefProductDetailObj;
  refProductOfferingDetailObj;
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
        "SCHM"
      ],
      RowVersion: ""
    }

    var ProdOfferingComponentApproval = {
      GroupCodes: [
        "LOS"
      ],
      RowVersion: ""
    }

    var ProdOfferingComponentRule = {
      GroupCodes: [
        "RULE"
      ],
      RowVersion: ""
    }

    var ProdOfferingComponentOther = {
      GroupCodes: [
        "OTHR"
      ],
      RowVersion: ""
    }

    this.items = this.RefSchemeForm.get('items') as FormArray;
    this.getList(ProdOfferingComponentScheme,0);

    this.items1 = this.RefApprovalForm.get('items') as FormArray;
    this.getList(ProdOfferingComponentApproval,1);

    this.items2 = this.RefRuleForm.get('items') as FormArray;
    this.getList(ProdOfferingComponentRule,2);

    this.items3= this.RefOtherForm.get('items') as FormArray;
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
              BehaviourType: response["ReturnObject"][i].BehaviourType,
              ProdCompntDtaSrcApi: response["ReturnObject"][i].ProdCompntDtaSrcApi,
              ProdCompntDtaSrc: response["ReturnObject"][i].ProdCompntDtaSrc,
              ProdCompntDtaValue: response["ReturnObject"][i].ProdCompntDtaValue,
              ProdCompntName: response["ReturnObject"][i].ProdCompntName,
              DropDownList: this.fb.array([this.fb.group({
                indexOf: i,
                key: [''],
                value: ['']
              })]),
              DropDownListBehaviour: this.fb.array([this.fb.group({
                indexOf: i,
                key: [''],
                value: ['']
              })])
            }) as FormGroup;
            // Get DDL
            if(index == 0){
              if(eachDataDetail.controls.ProdCompntType.value == "DDL"){
                this.resolveDDL(eachDataDetail, i,index);
              }
              this.resolveBehaviour(eachDataDetail,i,index);
              this.items.push(eachDataDetail);
              this.items.removeAt(0);
              console.log("cek form");
              console.log(this.RefSchemeForm);
            }
            else if(index==1){
              if(eachDataDetail.controls.ProdCompntType.value == "DDL"){
                this.resolveDDL(eachDataDetail, i,index);
              }
              this.resolveBehaviour(eachDataDetail,i,index);
              this.items1.push(eachDataDetail);
              this.items1.removeAt(0);
              console.log("cek form");
              console.log(this.RefApprovalForm);
            }
            else if(index ==2){
              if(eachDataDetail.controls.ProdCompntType.value == "DDL"){
                this.resolveDDL(eachDataDetail, i,index);
              }
              this.resolveBehaviour(eachDataDetail,i,index);
              this.items2.push(eachDataDetail);
              this.items2.removeAt(0);
              console.log("cek form");
              console.log(this.RefRuleForm);
            }
            else if(index==3){
              if(eachDataDetail.controls.ProdCompntType.value == "DDL"){
                this.resolveDDL(eachDataDetail, i,index);
              }
              this.resolveBehaviour(eachDataDetail,i,index);
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

  resolveBehaviour(obj:any, indexAt: any, index:any){
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
              indexOf: indexAt,
              Key: response["ReturnObject"][i].Key,
              Value: response["ReturnObject"][i].Value,
            }) as FormGroup;
            // console.log("test");
            // console.log(eachDDLDetail);
            if(index==0){
              this.RefSchemeForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.push(eachDDLDetail);
            }
            if(index==1){
              this.RefApprovalForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.push(eachDDLDetail);
            }
            if(index==2){
              this.RefRuleForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.push(eachDDLDetail);
            }
            if(index==3){
              this.RefOtherForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.push(eachDDLDetail);
            }
          }
          if(index==0){
            this.RefSchemeForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.removeAt(0);
            this.RefSchemeForm.controls.items["controls"][indexAt].patchValue({
              MrProdBehaviour: response["ReturnObject"][0].Value
            });
          }
          if(index==1){
            this.RefApprovalForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.removeAt(0);
            this.RefApprovalForm.controls.items["controls"][indexAt].patchValue({
              MrProdBehaviour: response["ReturnObject"][0].Value
            });
          }
          if(index==2){
            this.RefRuleForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.removeAt(0);
            this.RefRuleForm.controls.items["controls"][indexAt].patchValue({
              MrProdBehaviour: response["ReturnObject"][0].Value
            });
          }
          if(index==3){
            this.RefOtherForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.removeAt(0);
            this.RefOtherForm.controls.items["controls"][indexAt].patchValue({
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
              this.RefSchemeForm.controls.items["controls"][indexAt].patchValue({
                CompntValue: response["ReturnObject"][0].Value,
                CompntValueDesc: response["ReturnObject"][0].Key
              });
            }
            if(index==1){
              this.RefApprovalForm.controls.items["controls"][indexAt].controls.DropDownList.removeAt(0);
              this.RefApprovalForm.controls.items["controls"][indexAt].patchValue({
                CompntValue: response["ReturnObject"][0].Value,
                CompntValueDesc: response["ReturnObject"][0].Key
              });
            }
            if(index==2){
              this.RefRuleForm.controls.items["controls"][indexAt].controls.DropDownList.removeAt(0);
              this.RefRuleForm.controls.items["controls"][indexAt].patchValue({
                CompntValue: response["ReturnObject"][0].Value,
                CompntValueDesc: response["ReturnObject"][0].Key
              });
            }
            if(index==3){
              this.RefOtherForm.controls.items["controls"][indexAt].controls.DropDownList.removeAt(0);
              this.RefOtherForm.controls.items["controls"][indexAt].patchValue({
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

  clickTest(ev: any, idx: any, flag: any){
    // console.log(idx);
    // console.log(ev.target.selectedOptions[0].text);
    // console.log(ev.target.selectedOptions[0].value);
    if(flag==1){
      this.RefSchemeForm.controls.items["controls"][idx].patchValue({
        CompntValue: ev.target.selectedOptions[0].text,
        CompntValueDesc: ev.target.selectedOptions[0].value
      });
    }
    if(flag==2){
      this.RefApprovalForm.controls.items["controls"][idx].patchValue({
        CompntValue: ev.target.selectedOptions[0].text,
        CompntValueDesc: ev.target.selectedOptions[0].value
      });
    }
    if(flag==3){
      this.RefRuleForm.controls.items["controls"][idx].patchValue({
        CompntValue: ev.target.selectedOptions[0].text,
        CompntValueDesc: ev.target.selectedOptions[0].value
      });
    }
    if(flag==4){
      this.RefOtherForm.controls.items["controls"][idx].patchValue({
        CompntValue: ev.target.selectedOptions[0].text,
        CompntValueDesc: ev.target.selectedOptions[0].value
      });
    }

    // console.log(this.RefSchemeForm);
  }
  clickBehaviour(ev: any, idx: any, flag: any){

    if(flag==1){
      this.RefSchemeForm.controls.items["controls"][idx].patchValue({
        MrProdBehaviour : ev.target.selectedOptions[0].value
      });
    }
    if(flag==2){
      this.RefApprovalForm.controls.items["controls"][idx].patchValue({
        MrProdBehaviour : ev.target.selectedOptions[0].value
      });
    }
    if(flag==3){
      this.RefRuleForm.controls.items["controls"][idx].patchValue({
        MrProdBehaviour : ev.target.selectedOptions[0].value
      });
    }
    if(flag==4){
      this.RefOtherForm.controls.items["controls"][idx].patchValue({
        MrProdBehaviour : ev.target.selectedOptions[0].value
      });
    }

    // console.log(this.RefSchemeForm);
  }
  
  listProductComponentObj;
  SaveForm(){
    this.listProductComponentObj = new ListRefProductOfferingDetailObj();
    this.listProductComponentObj.ProductOfferingDetails = new Array();
    this.listProductComponentObj.ProdOfferingHId = this.objInput["param"];
    this.UrlBackEnd = AdInsConstant.AddOrEditProdOfferingDetail;
    for(var i = 0; i < 25; i++){
      var ProductComponentObj = new this.refProductOfferingDetailObj();
      if(i<2){
        ProductComponentObj.ProdOfferingDId = this.RefSchemeForm.controls.items["controls"][i].controls.ProdDId.value;
        ProductComponentObj.ProdOfferingHId = this.RefSchemeForm.controls.items["controls"][i].controls.ProdHId.value;
        ProductComponentObj.RefProdCompntCode = this.RefSchemeForm.controls.items["controls"][i].controls.RefProdCompntCode.value;
        ProductComponentObj.RefProdCompntGrpCode = this.RefSchemeForm.controls.items["controls"][i].controls.RefProdCompntGrpCode.value;
        ProductComponentObj.CompntValue = this.RefSchemeForm.controls.items["controls"][i].controls.CompntValue.value;
        ProductComponentObj.CompntValueDesc = this.RefSchemeForm.controls.items["controls"][i].controls.CompntValueDesc.value;
        ProductComponentObj.MrProdBehaviour = this.RefSchemeForm.controls.items["controls"][i].controls.MrProdBehaviour.value;
        ProductComponentObj.RowVersion = this.RefSchemeForm.controls.items["controls"][i].controls.RowVersion.value;
        this.listProductComponentObj.ProductOfferingDetails.push(ProductComponentObj);
      }
      if(i<5){
        ProductComponentObj.ProdOfferingDId = this.RefApprovalForm.controls.items["controls"][i].controls.ProdDId.value;
        ProductComponentObj.ProdOfferingHId = this.RefApprovalForm.controls.items["controls"][i].controls.ProdHId.value;
        ProductComponentObj.RefProdCompntCode = this.RefApprovalForm.controls.items["controls"][i].controls.RefProdCompntCode.value;
        ProductComponentObj.RefProdCompntGrpCode = this.RefApprovalForm.controls.items["controls"][i].controls.RefProdCompntGrpCode.value;
        ProductComponentObj.CompntValue = this.RefApprovalForm.controls.items["controls"][i].controls.CompntValue.value;
        ProductComponentObj.CompntValueDesc = this.RefApprovalForm.controls.items["controls"][i].controls.CompntValueDesc.value;
        ProductComponentObj.MrProdBehaviour = this.RefApprovalForm.controls.items["controls"][i].controls.MrProdBehaviour.value;
        ProductComponentObj.RowVersion = this.RefApprovalForm.controls.items["controls"][i].controls.RowVersion.value;
        this.listProductComponentObj.ProductOfferingDetails.push(ProductComponentObj);
      }
      if(i<20){
        ProductComponentObj.ProdOfferingDId = this.RefRuleForm.controls.items["controls"][i].controls.ProdDId.value;
        ProductComponentObj.ProdOfferingHId = this.RefRuleForm.controls.items["controls"][i].controls.ProdHId.value;
        ProductComponentObj.RefProdCompntCode = this.RefRuleForm.controls.items["controls"][i].controls.RefProdCompntCode.value;
        ProductComponentObj.RefProdCompntGrpCode = this.RefRuleForm.controls.items["controls"][i].controls.RefProdCompntGrpCode.value;
        ProductComponentObj.CompntValue = this.RefRuleForm.controls.items["controls"][i].controls.CompntValue.value;
        ProductComponentObj.CompntValueDesc = this.RefRuleForm.controls.items["controls"][i].controls.CompntValueDesc.value;
        ProductComponentObj.MrProdBehaviour = this.RefRuleForm.controls.items["controls"][i].controls.MrProdBehaviour.value;
        ProductComponentObj.RowVersion = this.RefRuleForm.controls.items["controls"][i].controls.RowVersion.value;
        this.listProductComponentObj.ProductOfferingDetails.push(ProductComponentObj);
      }
      if(i<25){
        ProductComponentObj.ProdOfferingDId = this.RefOtherForm.controls.items["controls"][i].controls.ProdDId.value;
        ProductComponentObj.ProdOfferingHId = this.RefOtherForm.controls.items["controls"][i].controls.ProdHId.value;
        ProductComponentObj.RefProdCompntCode = this.RefOtherForm.controls.items["controls"][i].controls.RefProdCompntCode.value;
        ProductComponentObj.RefProdCompntGrpCode = this.RefOtherForm.controls.items["controls"][i].controls.RefProdCompntGrpCode.value;
        ProductComponentObj.CompntValue = this.RefOtherForm.controls.items["controls"][i].controls.CompntValue.value;
        ProductComponentObj.CompntValueDesc = this.RefOtherForm.controls.items["controls"][i].controls.CompntValueDesc.value;
        ProductComponentObj.MrProdBehaviour = this.RefOtherForm.controls.items["controls"][i].controls.MrProdBehaviour.value;
        ProductComponentObj.RowVersion = this.RefOtherForm.controls.items["controls"][i].controls.RowVersion.value;
        this.listProductComponentObj.ProductOfferingDetails.push(ProductComponentObj);
      }
    }

    this.http.post(this.UrlBackEnd, this.listProductComponentObj).subscribe(
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

  SaveDetail(){

  }

  NextDetail(){
    this.wizard.goToNextStep();
  }

 }
