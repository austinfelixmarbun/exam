import { Component, OnInit, ViewChild } from '@angular/core';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-vendor-scheme-member-add',
  templateUrl: './vendor-scheme-member-add.component.html',
  styleUrls: ['./vendor-scheme-member-add.component.scss'],
  providers:[NGXToastrService]
})
export class VendorSchemeMemberAddComponent implements OnInit {
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
  VendorSchmId: any;
  vendorSchmObj: any;
  MrVendorCategoryCode: any;

  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr:NGXToastrService) {
      this.route.queryParams.subscribe(params => {
        this.VendorSchmId  = params['VendorSchmId'];
        this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
      });
    }

  ngOnInit() {
    this.GetListVendorSchmMemberByVendorSchmId();

    this.arrCrit = new Array();

    this.listSelectedId = new Array();
    this.tempListId = new Array();
    this.tempData = new Array();
    this.arrCrit = new Array();
    
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchVendorSchemeMbr.json";
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetPagingObjectBySQL;

    this.inputObj.addCritInput = new Array();
    const addCritTypeCode = new CriteriaObj();
    addCritTypeCode.DataType = 'text';
    addCritTypeCode.propName = 'MR_VENDOR_CATEGORY_CODE';
    addCritTypeCode.restriction = AdInsConstant.RestrictionEq;
    addCritTypeCode.value = this.MrVendorCategoryCode;
    this.arrCrit.push(addCritTypeCode);

    this.inputObj.addCritInput.push(addCritTypeCode);

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetPagingObjectBySQL;
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

  Checked(VendorId: any, isChecked: any): void {
    console.log(VendorId);
    if (isChecked) {
      this.listSelectedId.push(VendorId);
    } else {
      const index = this.listSelectedId.indexOf(VendorId)
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
        if (this.listSelectedId.indexOf(this.resultData.Data[i].VendorId) < 0) {
          this.listSelectedId.push(this.resultData.Data[i].VendorId);
        }
      }

    } else {
      for (let i = 0; i < this.resultData.Data.length; i++) {
        let index = this.listSelectedId.indexOf(this.resultData.Data[i].VendorId);
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
        var object = this.resultData.Data.find(x => x.VendorId == this.listSelectedId[i]);
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
      addCrit.propName = "vENDOR_ID";
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
      this.toastr.typeErrorCustom("Please select at least one Vendor");
    }
  }

  deleteFromTemp(VendorId: any) {
    if (confirm('Are you sure to delete this record?')) {
      this.arrAddCrit = new Array();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }

      var index = this.tempListId.indexOf(VendorId);
      if (index > -1) {
        this.tempListId.splice(index, 1);
        this.tempData.splice(index, 1);
      }
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "VENDOR_ID";
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

  SaveVendorSchemeMember() {
    if (this.tempListId.length == 0) {
      this.toastr.typeErrorCustom('Please Add At Least One Data');
      return;
    }

    var obj = {
      VendorSchmId: this.VendorSchmId,
      VendorId: this.tempListId
    }

    this.http.post(AdInsConstant.AddVendorSchmMember, obj).subscribe(
        (response) => {
            console.log(response);
            this.router.navigate(['/Vendor/VendorScheme/Member'], {queryParams: {VendorSchmId:this.VendorSchmId}});
        },
        (error) => {
            console.log(error);
        });

  }

  GetListVendorSchmMemberByVendorSchmId() {
    var obj = {
      VendorSchmId: this.VendorSchmId 
    }

    this.http.post(AdInsConstant.GetListVendorSchmMemberByVendorSchmId, obj).subscribe(
      (response) => {
        this.vendorSchmObj = response;
        var arrMemberList = new Array();

        for (let index = 0; index < this.vendorSchmObj.ListVendorSchmMbr.length; index++) {
           arrMemberList.push(this.vendorSchmObj.ListVendorSchmMbr[index].VendorId)
        }
        
        if(arrMemberList.length != 0){
          const addCritListVendorId = new CriteriaObj();
          addCritListVendorId.DataType = "numeric";
          addCritListVendorId.propName = "VENDOR_ID";
          addCritListVendorId.restriction = AdInsConstant.RestrictionNotIn;
          addCritListVendorId.listValue = arrMemberList;
          this.arrCrit.push(addCritListVendorId);
          this.inputObj.addCritInput.push(addCritListVendorId);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
