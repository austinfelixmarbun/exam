import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VerfQuestionGrpHObj } from 'app/shared/model/VerfQuestionGrpHObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';

@Component({
  selector: 'app-verification-question-group-member-add',
  templateUrl: './verification-question-group-member-add.component.html',
  styleUrls: ['./verification-question-group-member-add.component.scss'],
  providers: [NGXToastrService]
})
export class VerificationQuestionGroupMemberAddComponent implements OnInit {
  @ViewChild(UcgridfooterComponent) UCGridFooter;
  @ViewChild(UCSearchComponent) UCSearchComponent;
  
  inputObj: any;
  arrCrit: any[];
  checkboxAll = false;
  listSelectedId: any;
  tempListId: any;
  orderByKey: any;
  orderByValue: any;
  pageNow: number;
  pageSize: number;
  apiUrl: any;
  totalData: any;
  resultData: any;
  tempData: any;
  arrAddCrit: any[];
  viewObj: any;
  Data = [];
  
  verfQuestionGrpHObj: VerfQuestionGrpHObj;
  VerfQuestionGrpHId: any;
  verfQuestionGroup: any;
  listVerfQuestionGrpD: any;

  VerfQuestionGrpCode: any;
  VerfQuestionGrpName: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.VerfQuestionGrpHId = params["VerfQuestionGrpHId"];
   })
  }

  QuestionGroupForm = this.fb.group({
  })

  ngOnInit() {
    this.GetListVerfQuestionGrpDByVerfQuestionGrpHId();

    this.arrCrit = new Array();

    this.listSelectedId = new Array();
    this.tempListId = new Array();
    this.tempData = new Array();
    this.arrCrit = new Array();
    
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/ucpaging/verification/searchVerificationQuestionAnswr.json";
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetPagingObjectBySQL;
    this.inputObj.addCritInput = new Array();

    var verfGroupObj = { VerfQuestionGrpHId: this.VerfQuestionGrpHId }
    this.http.post(AdInsConstant.GetQuestionGrpHForUpdateById, verfGroupObj).subscribe(
      (response) => {
        this.verfQuestionGroup = response["ReturnObject"];
          this.VerfQuestionGrpCode = this.verfQuestionGroup.VerfQuestionGrpCode,
          this.VerfQuestionGrpName = this.verfQuestionGroup.VerfQuestionGrpName
      }
    );
  }

  searchSort(event: any) {
    if (this.resultData != null) {
      if (this.orderByKey == event.target.attributes.name.nodeValue) {
        this.orderByValue = !this.orderByValue
      } else {
        this.orderByValue = true
      }
      this.orderByKey = event.target.attributes.name.nodeValue
      let order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
      this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
    }
  }

  Checked(VerfQuestionAnswerId: any, isChecked: any): void {
    console.log(VerfQuestionAnswerId);
    if (isChecked) {
      this.listSelectedId.push(VerfQuestionAnswerId);
    } else {
      const index = this.listSelectedId.indexOf(VerfQuestionAnswerId)
      console.log(index);
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
    console.log('Sel', this.listSelectedId);
  }
  
  searchPagination(event: number) {
    this.pageNow = event;
    let order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
  }

  getResult(event) {
    this.resultData = event.response;
    this.totalData = event.response.Count;
    this.UCGridFooter.pageNow = event.pageNow;
    this.UCGridFooter.totalData = this.totalData;
    this.UCGridFooter.resultData = this.resultData;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.totalData = event.Count;
    this.searchPagination(this.pageNow);
  }

  SelectAll(condition) {
    this.checkboxAll = condition;
    console.log(condition);
    if (condition) {
      for (let i = 0; i < this.resultData.Data.length; i++) {
        if (this.listSelectedId.indexOf(this.resultData.Data[i].VerfQuestionAnswerId) < 0) {
          this.listSelectedId.push(this.resultData.Data[i].VerfQuestionAnswerId);
        }
      }

    } else {
      for (let i = 0; i < this.resultData.Data.length; i++) {
        let index = this.listSelectedId.indexOf(this.resultData.Data[i].VerfQuestionAnswerId);
        if (index > -1) {
          this.listSelectedId.splice(index, 1);
        }
        console.log(this.resultData.Data[i]);
      }
    }
    console.log(this.checkboxAll);
    console.log(this.listSelectedId);
  }

  addToTemp() {
    if (this.listSelectedId.length != 0) {
      for (var i = 0; i < this.listSelectedId.length; i++) {
        this.tempListId.push(this.listSelectedId[i]);
      }
      for (var i = 0; i < this.listSelectedId.length; i++) {
        var object = this.resultData.Data.find(x => x.VerfQuestionAnswerId == this.listSelectedId[i]);
        this.tempData.push(object);
      }

      this.arrAddCrit = new Array();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "VERF_QUESTION_ANSWER_ID";
      addCrit.restriction = AdInsConstant.RestrictionNotIn;
      addCrit.listValue = this.tempListId;
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
    } else {
      this.toastr.typeErrorCustom("Please select at least one Question Answer");
    }
  }

  deleteFromTemp(VerfQuestionAnswerId: any) {
    if (confirm('Are you sure to delete this record?')) {
      this.arrAddCrit = new Array();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }

      var index = this.tempListId.indexOf(VerfQuestionAnswerId);
      if (index > -1) {
        this.tempListId.splice(index, 1);
        this.tempData.splice(index, 1);
      }
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "VERF_QUESTION_ANSWER_ID";
      addCrit.restriction = AdInsConstant.RestrictionNotIn;
      addCrit.listValue = this.tempListId;
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

  GetListVerfQuestionGrpDByVerfQuestionGrpHId()
  {
    var verfGroupObj = { VerfQuestionGrpHId: this.VerfQuestionGrpHId }
    this.http.post(AdInsConstant.GetActiveVerfQuestionGrpDForUpdateByGrpHId, verfGroupObj).subscribe(
      (response) => {
        this.listVerfQuestionGrpD = response;
        var arrMemberList = new Array();

        for (let index = 0; index < this.listVerfQuestionGrpD.ReturnObject.length; index++) {
           arrMemberList.push(this.listVerfQuestionGrpD.ReturnObject[index].VerfQuestionAnswerId)
        }
        
        if(arrMemberList.length != 0){
          const addCritListVerfQuestionAnswerId = new CriteriaObj();
          addCritListVerfQuestionAnswerId.DataType = "numeric";
          addCritListVerfQuestionAnswerId.propName = "VERF_QUESTION_ANSWER_ID";
          addCritListVerfQuestionAnswerId.restriction = AdInsConstant.RestrictionNotIn;
          addCritListVerfQuestionAnswerId.listValue = arrMemberList;
          this.arrCrit.push(addCritListVerfQuestionAnswerId);
          this.inputObj.addCritInput.push(addCritListVerfQuestionAnswerId);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
