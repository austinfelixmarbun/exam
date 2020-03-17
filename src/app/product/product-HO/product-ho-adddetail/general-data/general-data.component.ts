import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { RefProductDetailObj } from 'app/shared/model/RefProductDetailObj.Model';
import { WizardComponent } from 'angular-archwizard';
import { ListRefProductDetailObj } from 'app/shared/model/ListRefProductDetailObj.Model';

@Component({
  selector: 'app-general-data-HO',
  templateUrl: './general-data.component.html',
  providers: [NGXToastrService]
})
export class GeneralDataHOComponent implements OnInit {

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

  inputLookUpObj: any;

  ngOnInit() {
    this.UrlGetProdCompGrouped = AdInsConstant.GetProductHOComponentGrouped;
    this.UrlPostAddEditProdD = AdInsConstant.AddOrEditProductDetail;

    this.FormProdComp = this.fb.group(
      {
        groups: this.fb.array([])
      }
    );

    this.ProdHId = this.objInput["param"];
    this.LoadProdComponent(this.ProdHId, "GEN");

    // this.inputLookUpObj = new InputLookupObj();
    // this.inputLookUpObj.urlJson = "./assets/uclookup/product/lookupProduct.json";
    // this.inputLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    // this.inputLookUpObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    // this.inputLookUpObj.pagingJson = "./assets/uclookup/product/lookupProduct.json";
    // this.inputLookUpObj.genericJson = "./assets/uclookup/product/lookupProduct.json";
  }


  addGroup(groupCode, groupName) {
    return this.fb.group({
      groupCode: groupCode,
      groupName: groupName,
      components: this.fb.array([])
    })
  }

  addComponent(obj) {
    var compValue, compDescr;

    if (obj.ProdCompntType == "DDL") {
      if (obj.CompntValue == "") {
        compValue = this.dictOptions[obj.RefProdCompntCode][0].Key;
        compDescr = this.dictOptions[obj.RefProdCompntCode][0].Value;
      }
      else {
        compValue = obj.CompntValue;
        compDescr = obj.CompntValueDesc;
      }
    }
    else {
      compValue = obj.CompntValue;
      compDescr = obj.CompntValueDesc;
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
      CompntValue: [compValue,Validators.required],
      CompntValueDesc: compDescr,
      MrProdBehaviour: "LOCK"
    })
  }

  async PopulateDDL(obj) {
    var url = obj.ProdCompntDtaSrcApi;
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

  LoadProdComponent(ProdHId, CompGroups) {
    var ProdHOComponent = {
      ProdHId: ProdHId,
      GroupCodes: CompGroups.split(","),
      RowVersion: ""
    }
    this.http.post(this.UrlGetProdCompGrouped, ProdHOComponent).toPromise().then(
      async (response) => {
        console.log("AAA")
        console.log(response)
        for (var i = 0; i < response["ReturnObject"].length; i++) {
          var group = response["ReturnObject"][i];
          var fa_group = this.FormProdComp.controls['groups'] as FormArray;
          fa_group.push(this.addGroup(group.GroupCode, group.GroupName));

          for (var j = 0; j < group.Components.length; j++) {
            var comp = group.Components[j];
            if (comp.ProdCompntType == "DDL") {
              await this.PopulateDDL(comp)
            }
          }

          for (var j = 0; j < group.Components.length; j++) {
            var comp = group.Components[j];
            var fa_comp = (<FormArray>this.FormProdComp.controls['groups']).at(i).get('components') as FormArray;
            fa_comp.push(this.addComponent(comp));
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

  CopyProduct(ev: any) {
    // console.log("Cp Product:");
    // console.log(ev);
    // console.log(this.RefGeneralDataForm);

    // this.UrlBackEnd = AdInsConstant.GetProductHOComponent;
    // var tempObj = {
    //   ProdHId: ev.ProdId,
    //   GroupCodes: [
    //     "VAN"
    //   ],
    //   RowVersion: ""
    // }

    // this.http.post(this.UrlBackEnd, tempObj).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.lengthDataReturnObj = response["ReturnObject"].length;
    //     for (var i = 0; i < this.lengthDataReturnObj; i++) {
    //       this.RefGeneralDataForm.controls.items["controls"][i].patchValue({
    //         ProdDId: response["ReturnObject"][i].ProdDId,
    //         ProdHId: response["ReturnObject"][i].ProdHId,
    //         RefProdCompntCode: response["ReturnObject"][i].RefProdCompntCode,
    //         RefProdCompntGrpCode: response["ReturnObject"][i].RefProdCompntGrpCode,
    //         CompntValue: response["ReturnObject"][i].CompntValue,
    //         CompntValueDesc: response["ReturnObject"][i].CompntValueDesc,
    //         MrProdBehaviour: response["ReturnObject"][i].BehaviourType,
    //         RowVersion: response["ReturnObject"][i].RowVersion,
    //       });
    //     }
    //     console.log("cek form");
    //     console.log(this.RefGeneralDataForm);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

  }
}
