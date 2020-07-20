import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'uc-prod-comp',
  templateUrl: './uc-prod-comp.component.html',
})
export class UcProdCompComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  )
  {}

  FormProdComp : any;
  dictOptions: { [key: string]: any; } = {};
  list = new Array();
  UrlGetProdCompGrouped : any;

  @Input("comp-groups") public CompGroups : string;
  @Input("prod-h-id") public ProdHId : number;

  ngOnInit() {
    this.FormProdComp = this.fb.group(
      {
        groups: this.fb.array([])
      }
    );
    
    this.LoadProdComponent(this.ProdHId,this.CompGroups);
    
  }

  addGroup(groupCode, groupName) {
    return this.fb.group({
      groupCode: groupCode,
      groupName: groupName,
      components: this.fb.array([])
    })
  }

  addComponent(obj) {
    var compCode,compDescr;

    if(obj.ProdCompntType=="DDL")
    {
      if(obj.CompntValue == "")
      {
        compCode = this.dictOptions[obj.RefProdCompntCode][0].Key;
        compDescr = this.dictOptions[obj.RefProdCompntCode][0].Value;
      }
      else
      {
        compCode = obj.CompntValue;
        compDescr = obj.CompntValueDesc;
      }
    }
    else
    {
      compCode = obj.CompntValue;
      compDescr = obj.CompntValueDesc;
    }

    return this.fb.group({
      RefProdCompntId:obj.RefProdCompntId,
      RefProdCompntCode: obj.RefProdCompntCode,
      ProdCompntName : obj.ProdCompntName,
      RefProdCompntGrpCode: obj.RefProdCompntGrpCode,
      ProdCompntType : obj.ProdCompntType,
      BehaviourType : obj.BehaviourType,
      ProdHId : obj.ProdHId,
      ProdDId : obj.ProdDId,
      CompntValue : compCode,
      CompntValueDesc : compDescr,
      MrProdBehaviour : obj.MrProdBehaviour
    })
  }
  
  async PopulateDDL(obj)
  {
    var url = obj.ProdCompntDtaSrcApi;
    var payload = JSON.parse(obj.ProdCompntDtaValue);
    await this.http.post(url, payload).toPromise().then(
      (response) => {
        this.dictOptions[obj.RefProdCompntCode] = response[CommonConstant.ReturnObj];
      },
      (error) => {
        console.log(error);
      }
    )
  }

  LoadProdComponent(ProdHId,CompGroups)
  {
    this.UrlGetProdCompGrouped = environment.FoundationR3Url + "/ProductComponent/GetProductHOComponentGrouped"

    var ProdHOComponent = {
      ProdHId : ProdHId,
      GroupCodes: CompGroups.split(","),
      RowVersion: ""
    }

    this.http.post(this.UrlGetProdCompGrouped, ProdHOComponent).toPromise().then(
      async (response) => {
        console.log("AAA")
        console.log(response)


        for (var i = 0; i < response[CommonConstant.ReturnObj].length; i++) {
          var group = response[CommonConstant.ReturnObj][i];
          var fa_group = this.FormProdComp.controls['groups'] as FormArray;
          fa_group.push(this.addGroup(group.GroupCode, group.GroupName));

          // for (var j = 0; j < group.Components.length; j++) {
          //   var comp = group.Components[j];
          //   if(comp.ProdCompntType=="DDL")
          //   {
          //     await this.PopulateDDL(comp)
          //   }
          // }

          // for (var j = 0; j < group.Components.length; j++) {
          //   var comp = group.Components[j];
          //   var fa_comp = (<FormArray>this.FormProdComp.controls['groups']).at(i).get('components') as FormArray;
          //   fa_comp.push(this.addComponent(comp));
          // }
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }
  
  ChangeDropdown() {
    this.dictOptions["COMP3"] = [{"key" : "oeoe","value" : "oeoe"}];
  }

  save()
  {
    this.list = [];
    for (let i = 0; i < this.FormProdComp.controls.groups.length; i++) {
      for (let j = 0; j < this.FormProdComp.controls.groups.controls[i].controls["components"].length; j++) {
        this.list.push(Object.assign({}, ...this.FormProdComp.controls.groups.controls[i].controls["components"].controls[j].value));
      }
    }
    console.log(this.list)
  }

  checkValue() {
    console.log(this.dictOptions)
    console.log(this.dictOptions["LOB"])
  }

  onChangeEvent(val,event,index,indexparent)
  {
    this.FormProdComp.controls["groups"].controls[indexparent].controls["components"].controls[index].patchValue({
      CompntValueDesc : this.dictOptions[val].find(f=>f.Key == event.target.value).Value
    })
  }
}

