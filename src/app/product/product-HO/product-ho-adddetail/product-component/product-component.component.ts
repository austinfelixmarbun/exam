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

  FormProdComp: any;
  dictOptions: { [key: string]: any; } = {};
  UrlGetProdCompGrouped: string;
  UrlPostAddEditProdD: string;
  ProdHId: number;
  StateSave : string;
  dictBehaviour: {[key: string]: any;} = {};

  ngOnInit() {
    this.UrlGetProdCompGrouped = AdInsConstant.GetProductHOComponentGrouped;
    this.UrlPostAddEditProdD = AdInsConstant.AddOrEditProductDetail;

    this.FormProdComp = this.fb.group(
      {
        groups: this.fb.array([])
      }
    );

    this.ProdHId = this.objInput["param"];
    this.LoadProdComponent(this.ProdHId, "SCORE,RULE,OTHR");
  }


  addGroup(groupCode, groupName) {
    return this.fb.group({
      groupCode: groupCode,
      groupName: groupName,
      components: this.fb.array([])
    })
  }

  addComponent(obj) {
    var compCode, compDescr;

    console.log(this.dictOptions);

    if (obj.ProdCompntType == "DDL") {
      if (obj.CompntValue == "") {
        var dict = this.dictOptions[obj.RefProdCompntCode];
        if(dict != undefined)
        {
          compCode = this.dictOptions[obj.RefProdCompntCode][0].Key;
          compDescr = this.dictOptions[obj.RefProdCompntCode][0].Value;
        }
      }
      else {
        compCode = obj.CompntValue;
        compDescr = obj.CompntValueDesc;
      }
    }
    else {
      compCode = obj.CompntValue;
      compDescr = obj.CompntValueDesc;
    }

    var mrProdBehaviour = obj.MrProdBehaviour;

    if(mrProdBehaviour == "")
    {
      if(this.dictBehaviour[obj.BehaviourType] != undefined){
        if(this.dictBehaviour[obj.BehaviourType].length > 0){
          mrProdBehaviour = this.dictBehaviour[obj.BehaviourType][0].Key;
        }
      }  
    }

    return this.fb.group({
      RefProdCompntId: obj.RefProdCompntId,
      RefProdCompntCode: obj.RefProdCompntCode,
      ProdCompntName: obj.ProdCompntName,
      RefProdCompntGrpCode: obj.RefProdCompntGrpCode,
      ProdCompntType: obj.ProdCompntType,
      BehaviourType: obj.BehaviourType,
      ProdHId: obj.ProdHId,
      ProdDId: obj.ProdDId,
      CompntValue: [compCode,Validators.required],
      CompntValueDesc: compDescr,
      MrProdBehaviour: mrProdBehaviour
    })
  }

  async PopulateDDL(obj) {
    var url = obj.ProdCompntDtaSrcApi;
    if(url != "")
    {
      var payload = JSON.parse(obj.ProdCompntDtaValue);
      await this.http.post(url, payload).toPromise().then(
        (response) => {
          this.dictOptions[obj.RefProdCompntCode] = response["ReturnObject"];
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  async PopulateRefBehaviour(obj) {
    var bhvrTypeCode = obj.BehaviourType;
    if(this.dictBehaviour[bhvrTypeCode] == undefined)
    {
      var url = AdInsConstant.GetRefBehaviourByBehaviourTypeCode;
      await this.http.post(url, { RowVersion : "", BehaviourTypeCode : bhvrTypeCode}).toPromise().then(
        (response) => {
          this.dictBehaviour[bhvrTypeCode] = response["ReturnObject"];
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  LoadProdComponent(ProdHId, CompGroups) {
    var ProdHOComponent = {
      ProdHId: ProdHId,
      GroupCodes: CompGroups.split(","),
      RowVersion: ""
    }
    this.http.post(this.UrlGetProdCompGrouped, ProdHOComponent).toPromise().then(
      async (response) => {
        for (var i = 0; i < response["ReturnObject"].length; i++) {
          var group = response["ReturnObject"][i];
          var fa_group = this.FormProdComp.controls['groups'] as FormArray;
          fa_group.push(this.addGroup(group.GroupCode, group.GroupName));

          for (var j = 0; j < group.Components.length; j++) {
            var comp = group.Components[j];
            if (comp.ProdCompntType == "DDL") {
              await this.PopulateDDL(comp);
              
            }
            if(comp.BehaviourType != "")
            {
              await this.PopulateRefBehaviour(comp);
            }
          }
          console.log("Behaviour")
          console.log(this.dictBehaviour)

          for (var j = 0; j < group.Components.length; j++) {
            var comp = group.Components[j];
            var fa_comp = (<FormArray>this.FormProdComp.controls['groups']).at(i).get('components') as FormArray;
            var comp_group = this.addComponent(comp) as FormGroup;
            if (comp.ProdCompntType == "AMT")
            {
              comp_group.controls['CompntValue'].setValidators([Validators.required, Validators.pattern("^[0-9]+$")]);
            }
            fa_comp.push(comp_group);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  ChangeDropdown() {
    this.dictOptions["COMP3"] = [{ "key": "oeoe", "value": "oeoe" }];
  }

  onChangeEvent(val, event, index, indexparent) {
    this.FormProdComp.controls["groups"].controls[indexparent].controls["components"].controls[index].patchValue({
      CompntValueDesc: this.dictOptions[val].find(f => f.Key == event.target.value).Value
    })
  }

  BuildReqProdDetail() {
    var list = new Array();
    for (let i = 0; i < this.FormProdComp.controls.groups.length; i++) {
      for (let j = 0; j < this.FormProdComp.controls.groups.controls[i].controls["components"].length; j++) {
        list.push(Object.assign({}, ...this.FormProdComp.controls.groups.controls[i].controls["components"].controls[j].value));
      }
    }

    for (let i = 0; i < list.length; i++) {
      if(list[i].ProdCompntType == "AMT")
      {
        list[i].CompntValueDesc = list[i].CompntValue;
      }
      list[i].RowVersion = "";
    }

    var objPost = {
      ProdHId: this.ProdHId,
      ProductDetails: list
    }

    return objPost;
  }

  SaveForm() {
    var objPost = this.BuildReqProdDetail();
    this.http.post(this.UrlPostAddEditProdD, objPost).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        this.router.navigate(["/Product/HOpaging"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  NextDetail() {
    var objPost = this.BuildReqProdDetail();
    this.http.post(this.UrlPostAddEditProdD, objPost).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        this.wizard.goToNextStep();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ClickSave(state) {
    this.StateSave = state;
  }

  SubmitForm()
  {
    if(this.StateSave == "save")
    {
      this.SaveForm();
    }
    else
    {
      this.NextDetail();
    }
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
          // var lengthDDL = response["ReturnObject"].length;
          // if (lengthDDL > 0) {
          //   for (var i = 0; i < lengthDDL; i++) {
          //     var eachDDLDetail = this.fb.group({
          //       Key: response["ReturnObject"][i].Key,
          //       Value: response["ReturnObject"][i].Value,
          //     }) as FormGroup;
          //     // console.log(eachDDLDetail);
          //     this.RefGeneralDataForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.push(eachDDLDetail);
          //   }
          //   this.RefGeneralDataForm.controls.items["controls"][indexAt].controls.DropDownListBehaviour.removeAt(0);
          //   if (flag) {
          //     this.RefGeneralDataForm.controls.items["controls"][indexAt].patchValue({
          //       MrProdBehaviour: response["ReturnObject"][0].Value
          //     });
          //   }
          // }
        },
        (error) => {
          console.log(error);
        }
      );

    }
  }

  
  // SaveForm() {
  //   this.listGeneralDataObj = new ListRefProductDetailObj();
  //   this.listGeneralDataObj.ProductDetails = new Array();
  //   this.listGeneralDataObj.ProdHId = this.objInput["param"];
  //   this.UrlBackEnd = AdInsConstant.AddOrEditProductDetail;
  //   for (var i = 0; i < this.lengthDataReturnObj; i++) {
  //     var GeneralDataObj = new RefProductDetailObj();
  //     GeneralDataObj.ProdDId = this.RefGeneralDataForm.controls.items["controls"][i].controls.ProdDId.value;
  //     GeneralDataObj.ProdHId = this.objInput["param"];
  //     GeneralDataObj.RefProdCompntCode = this.RefGeneralDataForm.controls.items["controls"][i].controls.RefProdCompntCode.value;
  //     GeneralDataObj.RefProdCompntGrpCode = this.RefGeneralDataForm.controls.items["controls"][i].controls.RefProdCompntGrpCode.value;
  //     GeneralDataObj.CompntValue = this.RefGeneralDataForm.controls.items["controls"][i].controls.CompntValue.value;
  //     GeneralDataObj.CompntValueDesc = this.RefGeneralDataForm.controls.items["controls"][i].controls.CompntValueDesc.value;
  //     GeneralDataObj.MrProdBehaviour = this.RefGeneralDataForm.controls.items["controls"][i].controls.MrProdBehaviour.value;
  //     GeneralDataObj.RowVersion = this.RefGeneralDataForm.controls.items["controls"][i].controls.RowVersion.value;
  //     this.listGeneralDataObj.ProductDetails.push(GeneralDataObj);
  //   }
  //   // this.listGeneralDataObj.ProductDetails.removeAt(0);
  //   console.log(this.listGeneralDataObj);
  //   console.log(this.RefGeneralDataForm.controls.items["controls"][0].controls.RowVersion.value);

  //   this.http.post(this.UrlBackEnd, this.listGeneralDataObj).subscribe(
  //     (response) => {
  //       console.log("Response save form");
  //       console.log(response);
  //       this.toastr.successMessage(response["message"]);
  //       this.router.navigate(["/Product/HOpaging"]);
  //     },
  //     (error) => {
  //       console.log("Response save error");
  //       console.log(error);
  //     }
  //   );
  // }

  // NextDetail() {
  //   this.listGeneralDataObj = new ListRefProductDetailObj();
  //   this.listGeneralDataObj.ProductDetails = new Array();
  //   this.listGeneralDataObj.ProdHId = this.objInput["param"];
  //   this.UrlBackEnd = AdInsConstant.AddOrEditProductDetail;
  //   for (var i = 0; i < this.lengthDataReturnObj; i++) {
  //     var GeneralDataObj = new RefProductDetailObj();
  //     GeneralDataObj.ProdDId = this.RefGeneralDataForm.controls.items["controls"][i].controls.ProdDId.value;
  //     GeneralDataObj.ProdHId = this.objInput["param"];
  //     GeneralDataObj.RefProdCompntCode = this.RefGeneralDataForm.controls.items["controls"][i].controls.RefProdCompntCode.value;
  //     GeneralDataObj.RefProdCompntGrpCode = this.RefGeneralDataForm.controls.items["controls"][i].controls.RefProdCompntGrpCode.value;
  //     GeneralDataObj.CompntValue = this.RefGeneralDataForm.controls.items["controls"][i].controls.CompntValue.value;
  //     GeneralDataObj.CompntValueDesc = this.RefGeneralDataForm.controls.items["controls"][i].controls.CompntValueDesc.value;
  //     GeneralDataObj.MrProdBehaviour = this.RefGeneralDataForm.controls.items["controls"][i].controls.MrProdBehaviour.value;
  //     GeneralDataObj.RowVersion = this.RefGeneralDataForm.controls.items["controls"][i].controls.RowVersion.value;
  //     this.listGeneralDataObj.ProductDetails.push(GeneralDataObj);
  //   }
  //   // this.listGeneralDataObj.ProductDetails.removeAt(0);
  //   console.log(this.listGeneralDataObj);
  //   console.log(this.RefGeneralDataForm.controls.items["controls"][0].controls.RowVersion.value);

  //   this.http.post(this.UrlBackEnd, this.listGeneralDataObj).subscribe(
  //     (response) => {
  //       console.log("Response next form");
  //       console.log(response);
  //       this.toastr.successMessage(response["message"]);
  //       this.wizard.goToNextStep();
  //     },
  //     (error) => {
  //       console.log("Response save error");
  //       console.log(error);
  //     }
  //   );
  // }


 }
