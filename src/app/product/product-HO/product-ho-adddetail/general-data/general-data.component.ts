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
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
  ) { 
    this.route.queryParams.subscribe(params => {
      this.source = params["source"];
    })

  }


  FormProdComp: any;
  dictOptions: { [key: string]: any; } = {};
  dictMultiOptions: { [key: string]: any; } = {};
  selectedMultiDDLItems: { [key: string]: any; } = {};
  UrlGetProdCompGrouped: string;
  UrlPostAddEditProdD: string;
  ProdHId: number;
  ProdId: number;
  StateSave: string;
  LOBSelected: string;

  inputLookUpObj: any;
  indentifierTemp;
  source:string="";

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

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
    this.LoadProdComponent(this.ProdHId, "GEN", false);


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
    }else if(obj.ProdCompntType == "MULTI_DDL"){
      if (obj.CompntValue != "") {
        compValue = obj.CompntValue;
        compDescr = obj.CompntValueDesc;

        var selectedId = obj.CompntValue.split(";");
        var selectedText = obj.CompntValueDesc.split(",");

        this.selectedMultiDDLItems[obj.RefProdCompntCode] = new Array();

        for(var i = 0; i < selectedId.length; i++){
          this.selectedMultiDDLItems[obj.RefProdCompntCode].push({item_id: selectedId[i], item_text: selectedText[i]});
        }
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

  async PopulateMultiDDL(obj) {
    if (url != "") {
      var url = obj.ProdCompntDtaSrcApi;
      var payload = JSON.parse(obj.ProdCompntDtaValue);
      await this.http.post(url, payload).toPromise().then(
        (response) => {
          var result = response["ReturnObject"];
          this.dictMultiOptions[obj.RefProdCompntCode] = new Array();
          this.selectedMultiDDLItems[obj.RefProdCompntCode] = new Array();
          for (let i = 0; i < result.length; i++) {
            this.dictMultiOptions[obj.RefProdCompntCode].push({ item_id: result[i].Key, item_text: result[i].Value});
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
        var result = response["ReturnObject"];
        this.dictMultiOptions["INST_SCHM"] = new Array();
        this.selectedMultiDDLItems["INST_SCHM"] = new Array();

        for (let i = 0; i < result.length; i++) {
          this.dictMultiOptions["INST_SCHM"].push({ item_id: result[i].Key, item_text: result[i].Value});
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  LoadProdComponent(ProdHId, CompGroups, IsFilterBizTmpltCode) {
    var ProdHOComponent = {
      ProdHId: ProdHId,
      GroupCodes: CompGroups.split(","),
      IsFilterBizTmpltCode: IsFilterBizTmpltCode,
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
            if(comp.ProdCompntType == "MULTI_DDL"){
              await this.PopulateMultiDDL(comp);
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

  onMultiDDLChangeEvent(refProdCompntCode, index, indexparent) {
    var selectedId = this.selectedMultiDDLItems[refProdCompntCode].map(x => x.item_id);
    var selectedText = this.selectedMultiDDLItems[refProdCompntCode].map(x => x.item_text);
    this.FormProdComp.controls["groups"].controls[indexparent].controls["components"].controls[index].patchValue({
      CompntValue : selectedId.join(";"),
      CompntValueDesc: selectedText.join(",")
    })
  }

  BuildReqProdDetail() {
    var list = new Array();
    for (let i = 0; i < this.FormProdComp.controls.groups.length; i++) {
      for (let j = 0; j < this.FormProdComp.controls.groups.controls[i].controls["components"].length; j++) {
        var prodCompntType = this.FormProdComp.controls["groups"].controls[i].controls["components"].controls[j].controls.ProdCompntType.value;

        if(prodCompntType == "AMT"){
          this.FormProdComp.controls["groups"].controls[i].controls["components"].controls[j].patchValue({
            CompntValueDesc : this.FormProdComp.controls["groups"].controls[i].controls["components"].controls[j].controls.CompntValue.value
          });
        }
        if(prodCompntType == "MULTI_DDL"){
          var refProdCompntCode = this.FormProdComp.controls["groups"].controls[i].controls["components"].controls[j].controls.RefProdCompntCode.value;
          var selectedId = this.selectedMultiDDLItems[refProdCompntCode].map(x => x.item_id);
          var selectedText = this.selectedMultiDDLItems[refProdCompntCode].map(x => x.item_text);
          this.FormProdComp.controls["groups"].controls[i].controls["components"].controls[j].patchValue({
            CompntValue : selectedId.join(";"),
            CompntValueDesc: selectedText.join(", ")
          });
        }
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
        this.BackToPaging();
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

  test(){
    console.log(this.FormProdComp);
    console.log(this.selectedMultiDDLItems);
    var objPost = this.BuildReqProdDetail();
    console.log(objPost);
  }
  
  onSelect(){
    console.log("event");
  }

  Cancel()
  {
    this.BackToPaging();
  }

  BackToPaging()
  {
    if(this.source == "return")
    {
      this.router.navigate(["/Product/HOReturnPaging"]);
    }
    else
    {
      this.router.navigate(["/product/HOpaging"]);
    }
  }
}
