import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UCSearchComponent } from '@adins/ucsearch';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { template } from '@angular/core/src/render3';
import { empty } from 'rxjs';

@Component({
  selector: 'app-search-office',
  templateUrl: './search-office.component.html',
  providers: [NGXToastrService]
})
export class SearchOfficeComponent implements OnInit {
  
  @ViewChild(UCSearchComponent) UCSearchComponent;
  @Output() componentIsOn: EventEmitter<any> = new EventEmitter();
  @Input() ListOfficeMemberObjInput: any;
  constructor(
    private http: HttpClient,
    private toastr:NGXToastrService
  ) { }

  inputObj;
  listSelectedId;
  pageNow;
  pageSize;
  apiUrl;
  
  ngOnInit() {
    this.arrAddCrit = new Array();

    if(this.ListOfficeMemberObjInput["result"].length){
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "ro.REF_OFFICE_ID";
      addCrit.restriction = AdInsConstant.RestrictionNotIn;
      addCrit.listValue = this.ListOfficeMemberObjInput["result"];
      this.arrAddCrit.push(addCrit);
    }
    
    // uc search obj
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchOfficeMember.json";
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputObj.addCritInput = this.arrAddCrit;

    this.listSelectedId = new Array();
    this.tempListId = new Array();
    this.tempData = new Array();
    this.arrCrit = new Array();

    

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetPagingObjectBySQL;
  }

  resultData;
  getResult(ev){
    this.resultData=ev["response"];
    // console.log(this.resultData);
    // console.log(this.tempData);
  }

  searchSort(ev: any){
    if (this.resultData != null) {
      if (this.orderByKey == ev.target.attributes.name.nodeValue) {
        this.orderByValue = !this.orderByValue
      } else {
        this.orderByValue = true
      }
      this.orderByKey = ev.target.attributes.name.nodeValue
      let order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
      this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
    }
  }

  checkboxAll;
  SelectAll(ev: any){
    // console.log(ev);
    // console.log(this.resultData);
    this.checkboxAll=ev;
    if(this.checkboxAll){
      for(var i=0;i<this.resultData.Data.length;i++){
        var idx = this.resultData.Data[i].RefOfficeId;
        if(this.listSelectedId.indexOf(idx)<0){
          this.listSelectedId.push(idx);
        }
      }
    }else{
      for(var i=0;i<this.resultData.Data.length;i++){
        var index = this.resultData.Data[i].RefOfficeId;
        var idx = this.listSelectedId.indexOf(index);
        if(idx > -1){
          this.listSelectedId.splice(idx, 1);
        }
        // console.log(this.resultData.Data[i]);
      }
    }
    // console.log(this.listSelectedId);
  }

  Checked(RefOfficeId: any, isChecked: any){
    // console.log(RefOfficeId);
    // console.log(isChecked);
    if(isChecked){
      this.listSelectedId.push(RefOfficeId);
    }else{
      var idx = this.listSelectedId.indexOf(RefOfficeId);
      if(idx > -1){
        this.listSelectedId.splice(idx, 1);
        this.checkboxAll = false;
      }
    }
  }

  tempListId;
  tempData;
  arrAddCrit;
  arrCrit;
  orderByKey;
  orderByValue;
  
  addToTemp(){
    if(this.listSelectedId.length != 0){
      for (var i = 0; i < this.listSelectedId.length; i++) {
        this.tempListId.push(this.listSelectedId[i]);
      }
      for (var i = 0; i < this.listSelectedId.length; i++) {
        var object = this.resultData.Data.find(x => x.RefOfficeId == this.listSelectedId[i]);
        object["IsAllowedCrt"]=false;
        this.tempData.push(object);
      }

      this.arrAddCrit = new Array();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }
      var addCrit = new CriteriaObj();
      addCrit.DataType = "string";
      addCrit.propName = "ro.REF_OFFICE_ID";
      addCrit.restriction = AdInsConstant.RestrictionNotIn;
      var tempList = [];
      for(var i=0;i<this.tempListId.length;i++){
        tempList.push(this.tempListId[i]);
      }
      for(var i=0;i<this.ListOfficeMemberObjInput["result"].length;i++){
        tempList.push(this.ListOfficeMemberObjInput["result"][i]);
      }
      addCrit.listValue = tempList;
      this.arrAddCrit.push(addCrit);

      var order = null;
      if (this.orderByKey != null) {
        order = {
          key: this.orderByKey,
          value: this.orderByValue
        };
      }
      this.inputObj.addCritInput = this.arrAddCrit;
      this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);
      this.listSelectedId = [];
      this.checkboxAll = false;
    }else{
      this.toastr.typeErrorCustom("Please select at least one Office");
    }
  }

  IsAllowedCrtClicked(ev: any, item: any){
    var idx = this.tempData.findIndex(x => x.RefOfficeId == item.RefOfficeId);
    if(idx > -1) this.tempData[idx].IsAllowedCrt =  ev.returnValue;
  }

  deleteFromTemp(RefOfficeId: any){
    if (confirm('Are you sure to delete this record?')) {
      this.arrAddCrit = new Array();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }

      var index = this.tempListId.indexOf(RefOfficeId);
      if (index > -1) {
        this.tempListId.splice(index, 1);
        this.tempData.splice(index, 1);
      }
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "ro.REF_OFFICE_ID";
      addCrit.restriction = AdInsConstant.RestrictionNotIn;
      var tempList = [];
      for(var i=0;i<this.tempListId.length;i++){
        tempList.push(this.tempListId[i]);
      }
      for(var i=0;i<this.ListOfficeMemberObjInput["result"].length;i++){
        tempList.push(this.ListOfficeMemberObjInput["result"][i]);
      }
      // console.log(tempList);
      addCrit.listValue = tempList;
      this.arrAddCrit.push(addCrit);

      if (this.tempListId.length != 0) {
        this.arrAddCrit.push(addCrit);
      }
      var order = null;
      if (this.orderByKey != null) {
        order = {
          key: this.orderByKey,
          value: this.orderByValue
        };
      }
      this.inputObj.addCritInput = this.arrAddCrit;
      this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);
    }
  }

  GoBack(){
    var obj = {
      isOn: true,
      result: []
    }
    this.componentIsOn.emit(obj);
  }

  SaveForm(){

    var obj = {
      ProductBranchMbrs: [],
      RowVersion: ""
    };

    for(var i=0;i<this.tempData.length;i++){
      var tempObj={
        ProdHId: this.ListOfficeMemberObjInput["param"],
        RefOfficeId: this.tempData[i].RefOfficeId,
        IsAllowedCrt: this.tempData[i].IsAllowedCrt,
        RowVersion: ""
      }
      obj.ProductBranchMbrs.push(tempObj);
    }
    console.log(obj);

    var url=AdInsConstant.AddProductOfficeMbrBatch;
    this.http.post(url, obj).subscribe(
      (response) => {
        console.log(response);
        this.toastr.successMessage(response["message"]);
        var obj = {
          isOn: true,
          result: []
        }
        this.componentIsOn.emit(obj );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
