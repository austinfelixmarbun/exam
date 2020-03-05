import { Component, OnInit, ViewChild } from '@angular/core';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { UCSearchComponent } from '@adins/ucsearch';
import { Location } from '@angular/common';

@Component({
  selector: 'app-office-group-member-add',
  templateUrl: './office-group-member-add.component.html',
  styleUrls: ['./office-group-member-add.component.scss'],
  providers: [NGXToastrService]
})
export class OfficeGroupMemberAddComponent implements OnInit {
  @ViewChild(UCGridFooterComponent) UCGridFooter;
  @ViewChild(UCSearchComponent) UCSearchComponent;

  inputObj: any;
  centerGrpId : any;
  arrCrit: any[];
  checkboxAll = false;
  listSelectedId: any;
  tempListId: any;
  orderByKey: any;
  orderByValue: any;
  pageNow: number;
  pageSize: number;
  apiUrl: any;
  vendorUrl: any;
  totalData: any;
  resultData: any;
  tempData: any;
  arrAddCrit: any[];
  viewObj: any;
  Data = [];
  RefOfficeId: any;
  MrOfficeTypeCode: string = "CG";

  constructor(private http: HttpClient,
    private route: ActivatedRoute, private toastr:NGXToastrService) {
      this.route.queryParams.subscribe(params => {
        this.RefOfficeId = params['RefOfficeId'];
      });
    }

  ngOnInit() {
    this.arrCrit = new Array();

    this.listSelectedId = new Array();
    this.tempListId = new Array();
    this.tempData = new Array();
    this.arrCrit = new Array();
    
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchOfficeCenterGrp.json";
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetPagingObjectBySQL;

    this.inputObj.addCritInput = new Array();
    const addCritTypeOCode = new CriteriaObj();
    addCritTypeOCode.DataType = 'text';
    addCritTypeOCode.propName = 'MEMBER.MR_OFFICE_TYPE_CODE';
    addCritTypeOCode.restriction = AdInsConstant.RestrictionNeq;
    addCritTypeOCode.value = this.MrOfficeTypeCode;
    this.arrCrit.push(addCritTypeOCode);

    const addCritIsActive = new CriteriaObj();
    addCritIsActive.DataType = 'boolean';
    addCritIsActive.propName = 'MEMBER.IS_ACTIVE';
    addCritIsActive.restriction = AdInsConstant.RestrictionEq;
    addCritIsActive.value = "true";
    this.arrCrit.push(addCritIsActive);

    this.inputObj.addCritInput.push(addCritTypeOCode);
    this.inputObj.addCritInput.push(addCritIsActive);

    console.log(this.inputObj);

    this.viewObj = "./assets/ucviewgeneric/viewOfficeCenterGrpMbr.json";
    // this.pageNow = 1;
    // this.pageSize = 10;
    // this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetPagingObjectBySQL;
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

  Checked(RefOfficeId: any, isChecked: any): void {
    console.log(RefOfficeId);
    if (isChecked) {
      this.listSelectedId.push(RefOfficeId);
    } else {
      const index = this.listSelectedId.indexOf(RefOfficeId)
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

  // ** Start UC Search **/
  getResult(event) {
    this.checkboxAll = false;
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

  addToTemp() {
    if (this.listSelectedId.length !== 0) {

      this.checkboxAll = false;
      for (var i = 0; i < this.listSelectedId.length; i++) {
        this.tempListId.push(this.listSelectedId[i]);
      }

      for (var i = 0; i < this.listSelectedId.length; i++) {
        var object = this.resultData.Data.find(x => x.RefOfficeId == this.listSelectedId[i]);
        this.tempData.push(object);
      }
      this.arrAddCrit = new Array();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }

      var addCrit = new CriteriaObj();
      addCrit.DataType = "text";
      addCrit.propName = "MEMBER.ASSET_MASTER_ID";
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

    } else {
      this.toastr.typeErrorCustom('Please select at least one Office');
    }
  }

  SelectAll(condition) {
    this.checkboxAll = condition;
    console.log(condition);
    if (condition) {
      for (let i = 0; i < this.resultData.Data.length; i++) {
        if (this.listSelectedId.indexOf(this.resultData.Data[i].RefOfficeId) < 0) {
          this.listSelectedId.push(this.resultData.Data[i].RefOfficeId);
        }
      }

    } else {
      for (let i = 0; i < this.resultData.Data.length; i++) {
        let index = this.listSelectedId.indexOf(this.resultData.data[i].RefOfficeId);
        if (index > -1) {
          this.listSelectedId.splice(index, 1);
        }
        console.log(this.resultData.Data[i]);
      }
    }
    console.log(this.checkboxAll);
    console.log(this.listSelectedId);
  }

  deleteFromTemp(RefOfficeId: any) {
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
      addCrit.DataType = "text";
      addCrit.propName = "MEMBER.REF_OFFICE_ID";
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

  SaveOfficeGroupMember() {
    
  }
}