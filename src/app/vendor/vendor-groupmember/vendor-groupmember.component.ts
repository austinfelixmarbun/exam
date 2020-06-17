import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-vendor-groupmember',
  templateUrl: './vendor-groupmember.component.html',
  styleUrls: ['./vendor-groupmember.component.scss'],
  providers: [NGXToastrService]
})
export class VendorGroupmemberComponent implements OnInit {
  @ViewChild(UcgridfooterComponent) UCGridFooter;
  @ViewChild(UCSearchComponent) UCSearchComponent;

  arrCrit: any[];
  arrAddCrit: any[];
  VendorId: any;
  VendorGrpMbrId: any;
  pageNow: number;
  pageSize: number;
  apiUrl: string;
  viewObj: string;
  resultData: any;
  orderByKey: any;
  orderByValue: boolean;
  listSelectedId: any;
  totalData: any;
  VendorGrpId: any;
  tempListId: any[];
  tempData: any[];
  vendorGrpMbrObj: any;
  checkboxAll = false;
  addUrl: string;
  MrVendorCategoryCode: any;
  constructor(private http: HttpClient,
    private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params['VendorGrpId'] != null) {
        this.VendorGrpId = params['VendorGrpId'];

      }
      if (params['MrVendorCategoryCode'] != null) {
        this.MrVendorCategoryCode = params['MrVendorCategoryCode'];
      }
    });
  }
  inputObj: any;
  ngOnInit() {

    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/ucpaging/searchVendorGrpMember.json";
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputObj.addCritInput = new Array();

    this.arrCrit = new Array();
    var crit1Obj = new CriteriaObj();
    crit1Obj.propName = "MR_VENDOR_CATEGORY_CODE";
    crit1Obj.restriction = AdInsConstant.RestrictionEq;
    crit1Obj.value = this.MrVendorCategoryCode;
    this.arrCrit.push(crit1Obj);
    this.inputObj.addCritInput = this.arrCrit;

    this.GetListVendorGrpMbrByVendorGrpId();


    this.listSelectedId = new Array();
    this.tempListId = new Array();
    this.tempData = new Array();

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
    console.log(this.resultData);
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
    if (this.listSelectedId.length != 0) {
      for (var i = 0; i < this.listSelectedId.length; i++) {
        this.tempListId.push(this.listSelectedId[i]);
        var object = this.resultData.Data.find(x => x.VendorId == this.listSelectedId[i]);
        this.tempData.push(object);
      }

      this.arrAddCrit = new Array();
      console.log(this.arrAddCrit.length);
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "VENDOR_ID";
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
      this.toastr.typeErrorCustom("Please select at least one Office");
    }
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
        let index = this.listSelectedId.indexOf(this.resultData.data[i].VendorId);
        if (index > -1) {
          this.listSelectedId.splice(index, 1);
        }
        console.log(this.resultData.Data[i]);
      }
    }
    console.log(this.checkboxAll);
    console.log(this.listSelectedId);
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

  SaveVendorGroupMember() {
    var obj = {
      VendorGrpId: this.VendorGrpId,
      VendorId: this.tempListId
    }

    this.addUrl = AdInsConstant.AddVendorGrpMbr;
    this.http.post(this.addUrl, obj).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/Vendor/Group/View/'], { queryParams: { VendorGrpId: this.VendorGrpId, MrVendorCategoryCode: this.MrVendorCategoryCode } });
      },
      (error) => {
        console.log(error);
      });

  }


  GetListVendorGrpMbrByVendorGrpId() {
    var obj = {
      VendorGrpId: this.VendorGrpId,
    }
    var getListUrl = AdInsConstant.GetListVendorGrpMbrByVendorGrpId;
    this.http.post(getListUrl, obj).subscribe(
      (response) => {
        console.log(response);
        this.vendorGrpMbrObj = response;

        var arrMemberList = new Array();

        for (let index = 0; index < this.vendorGrpMbrObj.ReturnObject.length; index++) {
          arrMemberList.push(this.vendorGrpMbrObj.ReturnObject[index].VendorId)
        }

        if (arrMemberList.length != 0) {
          const addCritListVendorGrp = new CriteriaObj();
          addCritListVendorGrp.DataType = 'numeric';
          addCritListVendorGrp.propName = 'VENDOR_ID';
          addCritListVendorGrp.restriction = AdInsConstant.RestrictionNotIn;
          addCritListVendorGrp.listValue = arrMemberList;
          this.arrCrit.push(addCritListVendorGrp);
          this.inputObj.addCritInput.push(addCritListVendorGrp);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
