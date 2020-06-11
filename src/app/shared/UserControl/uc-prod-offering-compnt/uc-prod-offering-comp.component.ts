import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { saveAs } from 'file-saver';

@Component({
  selector: 'uc-prod-offering-comp',
  templateUrl: './uc-prod-offering-comp.component.html',
})
export class UcProdOfferingCompComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  )
  {}

  FormProdOfferingComp : any;
  dictOptions: { [key: string]: any; } = {};
  dictBehaviour: {[key: string]: any;} = {};
  list = new Array();
  UrlGetProdOfferingCompGrouped : any;


  @Input() CompGroups : string;
  @Input() ProdOfferingHId : number;
  @Input() ShowComparison : boolean;
  @Input() ShowBehaviour : boolean;
  @Input() IsFilterBizTmpltCode: boolean;

  @Output() Save: EventEmitter<any> = new EventEmitter();
  @Output() Next: EventEmitter<any> = new EventEmitter();

  DlRuleObj = {
    CompntValue: "",
  };
  ngOnInit() {
    this.FormProdOfferingComp = this.fb.group(
      {
        groups: this.fb.array([])
      }
    );
    
    this.LoadProdComponent(this.ProdOfferingHId,this.CompGroups, this.IsFilterBizTmpltCode);
    
  }

  addGroup(groupCode, groupName) {
    return this.fb.group({
      groupCode: groupCode,
      groupName: groupName,
      components: this.fb.array([])
    })
  }

  addComponent(obj) {
    var offeringCompCode , offeringCompDescr, hoMrProdBehaviour, offeringMrProdBehaviour;

    if(obj.ProdCompntType=="DDL")
    {
      if(obj.OfferingCompntValue == "")
      {
        if(this.dictOptions[obj.RefProdCompntCode] != undefined){
          if(this.dictOptions[obj.RefProdCompntCode].length > 0){
            offeringCompCode = this.dictOptions[obj.RefProdCompntCode][0].Key;
            offeringCompDescr = this.dictOptions[obj.RefProdCompntCode][0].Value;
          }
        }  
      }
      else
      {
        offeringCompCode = obj.OfferingCompntValue;
        offeringCompDescr = obj.OfferingCompntValueDesc;
      }
    }
    else
    {
      offeringCompCode = obj.OfferingCompntValue;
      offeringCompDescr = obj.OfferingCompntValueDesc;
    }

    if(this.ShowBehaviour == true){
      hoMrProdBehaviour = obj.HOMrProdBehaviour;
      offeringMrProdBehaviour = obj.OfferingMrProdBehaviour;

      if(hoMrProdBehaviour == "")
      {
        if(this.dictBehaviour[obj.RefProdCompntCode] != undefined){
          if(this.dictBehaviour[obj.RefProdCompntCode].length > 0){
            hoMrProdBehaviour = this.dictBehaviour[obj.RefProdCompntCode][0].Key;
          }
        }  
      }

      if(offeringMrProdBehaviour == "")
      {
        if(this.dictBehaviour[obj.RefProdCompntCode] != undefined){
          if(this.dictBehaviour[obj.RefProdCompntCode].length > 0){
            offeringMrProdBehaviour = this.dictBehaviour[obj.RefProdCompntCode][0].Key;
          }
        }  
      }
    }else{
      hoMrProdBehaviour = "LOCK";
      offeringMrProdBehaviour = "LOCK";
    }

    return this.fb.group({
      RefProdCompntId:obj.RefProdCompntId,
      RefProdCompntCode: obj.RefProdCompntCode,
      ProdCompntName : obj.ProdCompntName,
      RefProdCompntGrpCode: obj.RefProdCompntGrpCode,
      ProdCompntType : obj.ProdCompntType,
      BehaviourType : obj.BehaviourType,
      ProdOfferingHId : obj.ProdOfferingHId,
      ProdOfferingDId : obj.ProdOfferingDId,
      IsProdHo: obj.IsProdHo,
      IsProdOffering: obj.IsProdOffering,
      HOCompntValue : obj.HOCompntValue,
      HOCompntValueDesc : obj.HOCompntValueDesc,
      HOMrProdBehaviour : hoMrProdBehaviour,
      OfferingCompntValue : offeringCompCode,
      OfferingCompntValueDesc : offeringCompDescr,
      OfferingMrProdBehaviour : offeringMrProdBehaviour
    })
  }
  
  async PopulateDDL(obj)
  {
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

  async PopulateBehaviourDDL(obj, behaviourDDL)
  {
    this.dictBehaviour[obj.RefProdCompntCode] = behaviourDDL.filter(f=>f.BehaviourType == obj.BehaviourType);
  }

  LoadProdComponent(ProdOfferingHId, CompGroups, IsFilterBizTmpltCode)
  {
    this.UrlGetProdOfferingCompGrouped = AdInsConstant.GetProductOfferingComponentGrouped;

    var ProdOfferingComponent = {
      ProdOfferingHId : ProdOfferingHId,
      GroupCodes: CompGroups.split(","),
      IsFilterBizTmpltCode: IsFilterBizTmpltCode,
      RowVersion: ""
    }

    this.http.post(this.UrlGetProdOfferingCompGrouped, ProdOfferingComponent).toPromise().then(
      async (response) => {
        for (var i = 0; i < response["ReturnObject"]["ProdOffComponents"].length; i++) {
          var group = response["ReturnObject"]["ProdOffComponents"][i];
          var fa_group = this.FormProdOfferingComp.controls['groups'] as FormArray;
          var behaviourDDL = response["ReturnObject"]["BehaviourDropDownList"];

          fa_group.push(this.addGroup(group.GroupCode, group.GroupName));

          for (var j = 0; j < group.Components.length; j++) {
            var comp = group.Components[j];
            if(comp.ProdCompntType=="DDL" && comp.IsProdOffering == true)
            {
              await this.PopulateDDL(comp)
            }
            if(this.ShowBehaviour == true){
              await this.PopulateBehaviourDDL(comp, behaviourDDL);
            }
          }

          for (var j = 0; j < group.Components.length; j++) {
            var comp = group.Components[j];
            var fa_comp = (<FormArray>this.FormProdOfferingComp.controls['groups']).at(i).get('components') as FormArray;
            fa_comp.push(this.addComponent(comp));
          }
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }


  GetBehaviourValue(refProdCompntCode, behaviourCode) {
    console.log("THIS")
    console.log(this.dictBehaviour);
    console.log(refProdCompntCode + ":" + behaviourCode)
    console.log(this.dictBehaviour[refProdCompntCode])
    console.log(this.dictBehaviour[refProdCompntCode].find(f => f.Key == behaviourCode))
    console.log(this.dictBehaviour[refProdCompntCode].find(f => f.Key == behaviourCode).Value)
    return this.dictBehaviour[refProdCompntCode].find(f => f.Key == behaviourCode).Value
  }

  SaveForm()
  {
    this.generateListForm(this.FormProdOfferingComp);
    this.Save.emit(this.list);
  }

  NextDetail(){
    this.generateListForm(this.FormProdOfferingComp);
    this.Next.emit(this.list);
  }

  generateListForm(formProdOfferingComp){
    this.list = [];
    for (let i = 0; i < formProdOfferingComp.controls.groups.length; i++) {
      for (let j = 0; j < formProdOfferingComp.controls.groups.controls[i].controls["components"].length; j++) {
        if(this.FormProdOfferingComp.controls["groups"].controls[i].controls["components"].controls[j].controls.ProdCompntType.value == "AMT"){
          this.FormProdOfferingComp.controls["groups"].controls[i].controls["components"].controls[j].patchValue({
            OfferingCompntValueDesc : this.FormProdOfferingComp.controls["groups"].controls[i].controls["components"].controls[j].controls.OfferingCompntValue.value
          });
        }  
        this.list.push(Object.assign({}, ...formProdOfferingComp.controls.groups.controls[i].controls["components"].controls[j].value));
      }
    }
  }

  onChangeCompntEvent(val,event,index,indexparent)
  {
    this.FormProdOfferingComp.controls["groups"].controls[indexparent].controls["components"].controls[index].patchValue({
      OfferingCompntValueDesc : this.dictOptions[val].find(f=>f.Key == event.target.value).Value
    })
  }
  DownloadRule(CompntValue, CompntValueDesc) {
    this.DlRuleObj.CompntValue = CompntValue;
    this.http.post(AdInsConstant.DownloadProductRule, this.DlRuleObj, { responseType: 'blob' }).subscribe(
      response => {
        saveAs(response, CompntValueDesc + '.xlsx');
      },
      error => {
        console.log(error);
      }
    );
  }
}

