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
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

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
  ProdId: number;
  StateSave: string;
  LOBSelected: string;

  inputLookUpObj: any;
  indentifierTemp;

  ngOnInit() {
    this.UrlGetProdCompGrouped = AdInsConstant.GetProductHOComponentGrouped;
    this.UrlPostAddEditProdD = AdInsConstant.AddOrEditProductDetail;

    this.FormProdComp = this.fb.group(
      {
        groups: this.fb.array([])
      }
    );

    this.ProdHId = this.objInput["param"];
    this.ProdId = this.objInput["ProdId"];
    this.LoadProdComponent(this.ProdHId, "GEN");


    this.inputLookUpObj = new InputLookupObj();
    this.inputLookUpObj.urlJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookUpObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookUpObj.pagingJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.genericJson = "./assets/uclookup/product/lookupProduct.json";
    this.inputLookUpObj.isRequired = false;

    var critObj = new CriteriaObj();
    critObj.propName = 'P.PROD_ID';
    critObj.restriction = AdInsConstant.RestrictionNeq;
    critObj.value = this.ProdId.toString();
    var arrCrit = new Array();
    arrCrit.push(critObj);
    this.inputLookUpObj.addCritInput = arrCrit;
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
      CompntValue: [compValue, Validators.required],
      CompntValueDesc: compDescr,
      MrProdBehaviour: "LOCK"
    })
  }

  async PopulateDDL(obj) {
    if (url != "") {
      var url = obj.ProdCompntDtaSrcApi;
      var payload = JSON.parse(obj.ProdCompntDtaValue);
      await this.http.post(url, payload).toPromise().then(
        (response) => {
          this.dictOptions[obj.RefProdCompntCode] = response["ReturnObject"];
          var compValue;
          if (obj.CompntValue == "") {
            compValue = this.dictOptions[obj.RefProdCompntCode][0].Key;
          }
          else {
            compValue = obj.CompntValue;
          }

          if (obj.RefProdCompntCode == "LOB") {
            this.LOBSelected = compValue
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  async PopulateFinMapFromLOB() {
    var url = AdInsConstant.GetKvpRefFinMapByLobCode;
    await this.http.post(url, { LobCode: this.LOBSelected, RowVersion: "" }).toPromise().then(
      (response) => {
        this.dictOptions["WAY_OF_FINANCING"] = response["RefWayOfFin"]
        this.dictOptions["PURPOSE_OF_FINANCING"] = response["RefPurposeOfFin"]
        this.dictOptions["PROD_TYPE"] = response["RefProdType"]

        for (var i = 0; i < this.FormProdComp.controls["groups"].controls.length; i++) {
          for (var j = 0; j < this.FormProdComp.controls["groups"].controls[i].controls["components"].length; j++) {
            var comp = this.FormProdComp.controls["groups"].controls[i].controls["components"].controls[j] as FormGroup;
            var compCode = comp.value["RefProdCompntCode"];
            if (compCode == "PURPOSE_OF_FINANCING") {
              comp.patchValue({ CompntValueDesc: this.dictOptions["PURPOSE_OF_FINANCING"][0].Value, CompntValue: this.dictOptions["PURPOSE_OF_FINANCING"][0].Key })
            }
            else if (compCode == "WAY_OF_FINANCING") {
              comp.patchValue({ CompntValueDesc: this.dictOptions["WAY_OF_FINANCING"][0].Value, CompntValue: this.dictOptions["WAY_OF_FINANCING"][0].Key })
            }
            else if (compCode == "PROD_TYPE") {
              comp.patchValue({ CompntValueDesc: this.dictOptions["PROD_TYPE"][0].Value, CompntValue: this.dictOptions["PROD_TYPE"][0].Key })
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async PopulateInstallmentSchedule() {
    var url = AdInsConstant.GetListKvpInstSchmByLobCode;
    await this.http.post(url, { LobCode: this.LOBSelected, RowVersion: "" }).toPromise().then(
      (response) => {
        this.dictOptions["INSTSCHM"] = response["ReturnObject"]

        for (var i = 0; i < this.FormProdComp.controls["groups"].controls.length; i++) {
          for (var j = 0; j < this.FormProdComp.controls["groups"].controls[i].controls["components"].length; j++) {
            var comp = this.FormProdComp.controls["groups"].controls[i].controls["components"].controls[j] as FormGroup;
            var compCode = comp.value["RefProdCompntCode"];
            if (compCode == "INSTSCHM") {
              comp.patchValue({ CompntValueDesc: this.dictOptions["INSTSCHM"][0].Value, CompntValue: this.dictOptions["INSTSCHM"][0].Key })
            }
          }
        }
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
        console.log(response)
        for (var i = 0; i < response["ReturnObject"].length; i++) {
          var group = response["ReturnObject"][i];
          var fa_group = this.FormProdComp.controls['groups'] as FormArray;
          fa_group.push(this.addGroup(group.GroupCode, group.GroupName));

          for (var j = 0; j < group.Components.length; j++) {
            var comp = group.Components[j];
            if (comp.ProdCompntType == "DDL") {
              await this.PopulateDDL(comp);
            }
          }
          await this.PopulateFinMapFromLOB();
          await this.PopulateInstallmentSchedule();

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

    // this.dictOptions["COMP3"] = [{ "key": "oeoe", "value": "oeoe" }];
  }


  onChangeEvent(val, event, index, indexparent) {
    if (val == "LOB") {
      this.LOBSelected = event.target.value;
      this.PopulateFinMapFromLOB()
      this.PopulateInstallmentSchedule();
    }
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

  SubmitForm() {
    if (this.StateSave == "save") {
      this.SaveForm();
    }
    else {
      this.NextDetail();
    }
  }

  reload() {
    if(this.inputLookUpObj.jsonSelect["ProdId"] == undefined)
    {
      this.toastr.errorMessage("Please select Product to copied");
    }
    else
    {
      if (confirm('This action will overwrite your Product Component and Product Branch Member, Are you sure to copy this Product ?')) {
        var url = environment.FoundationR3Url + "/Product/CopyProduct";
        this.http.post(url, { prodHId: this.ProdHId, fromProdId: this.inputLookUpObj.jsonSelect["ProdId"] }).subscribe(
          (response) => {
            this.toastr.successMessage("Product Copied Successfully");
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
}
