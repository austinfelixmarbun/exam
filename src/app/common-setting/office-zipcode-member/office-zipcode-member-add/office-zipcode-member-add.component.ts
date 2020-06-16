import { Component, OnInit, ViewChild } from '@angular/core';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-office-zipcode-member-add',
  templateUrl: './office-zipcode-member-add.component.html',
  styleUrls: ['./office-zipcode-member-add.component.scss'],
  providers: [NGXToastrService]
})
export class OfficeZipcodeMemberAddComponent implements OnInit {
  //** Start UC Search **//
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  refOfficeId: any;
  officeCode: any;
  officeName: any;
  city: any;
  //** End UC Search **//
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  officeUrl: any;
  addUrl: any;
  arrCrit: any;

  foundationUrl: string = environment.FoundationR3Url;
  settingUrl: string = environment.FoundationR3Url;
  orderByKey: any = null;
  orderByValue: boolean = true;

  arrAddCrit = new Array<CriteriaObj>();
  tempListId: Array<any> = [];
  tempData: Array<any> = [];
  listSelectedId: Array<any> = [];
  listDeletedId: Array<any> = [];
  data = [];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params['refOfficeId'] != null) {
        this.refOfficeId = params['refOfficeId'];
      }
    });
  }

  ngOnInit() {
    console.log("test");
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchOfficeZipcodeMember.json";
    this.inputObj.enviromentUrl = this.settingUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetOfficeZipcodeMemberAddPaging;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.settingUrl + AdInsConstant.GetOfficeZipcodeMemberAddPaging;
    this.officeUrl = this.foundationUrl + AdInsConstant.GetRefOfficeObj;
    this.addUrl = this.foundationUrl + AdInsConstant.AddOfficeZipcodeMember;

    this.arrCrit = new Array();

    this.initiateForm();
  }

  initiateForm() {
    var officeId = { refOfficeId: this.refOfficeId };
    this.http.post(this.officeUrl, officeId).subscribe(
      (response) => {
        this.officeCode = response['returnObject']['officeCode'];
        this.officeName = response['returnObject']['officeName'];
        this.city = response['returnObject']['city'];
      },
      (error) => {
        console.log(error);
      });

  }
  //** Start UC Search **/
  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }

  searchSort(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue
    } else {
      this.orderByValue = true
    }
    this.orderByKey = event.target.attributes.name.nodeValue
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  searchPagination(event: number) {
    this.pageNow = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  Checked(refZipcodeId: any, isChecked: any): void {
    console.log(refZipcodeId);
    if (isChecked) {
      this.listSelectedId.push(refZipcodeId);
    } else {
      let index = this.listSelectedId.indexOf(refZipcodeId)
      console.log(index);
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
    console.log('Sel', this.listSelectedId);
    console.log('Del', this.listDeletedId);
  }

  AddToTemp() {
    if (this.listSelectedId.length != 0) {
      for (var i = 0; i < this.listSelectedId.length; i++) {
        this.tempListId.push(this.listSelectedId[i]);
      }
      for (var i = 0; i < this.listSelectedId.length; i++) {
        var object = this.resultData.data.find(x => x.refZipcodeId == this.listSelectedId[i]);
        this.tempData.push(object);
      }
      this.arrAddCrit = this.arrCrit;
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "RZ.REF_ZIPCODE_ID";
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
      this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);

      this.listSelectedId = [];
      console.log(this.listSelectedId);
      console.log(this.tempData);
    } else {
      this.toastr.typeErrorCustom("Please select at least one Zipcode");
    }
  }

  deleteFromTemp(refZipcodeId) {
    this.arrAddCrit = this.arrCrit;
    var index = this.tempListId.indexOf(refZipcodeId);
    if (index > -1) {
      this.tempListId.splice(index, 1);
      this.tempData.splice(index, 1);
    }
    var addCrit = new CriteriaObj();
    addCrit.DataType = "numeric";
    addCrit.propName = "RZ.REF_ZIPCODE_ID";
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);
    console.log("selectedID : " + this.listSelectedId)
    console.log("templateID : " + this.tempListId);
    console.log(this.tempData);
    console.log(this.resultData.data);
  }
  
  saveZipMember() {
    var listObj = new Array();
    for (var i = 0; i < this.tempData.length; i++) {
      var arrZipMember = {
        ZipcodeNumber: this.tempData[i].zipcodeNumber,
        RefOfficeId: this.refOfficeId
      }
      
      listObj.push(arrZipMember);
    }
    var zipCodeMemberList = { listOfOfficeZipcodeMember: listObj };
    console.log(zipCodeMemberList);

    this.http.post(this.addUrl, zipCodeMemberList).subscribe(
      (response) => {
          console.log(response);
          this.toastr.successMessage(response['message']);
          this.router.navigateByUrl('/commonSetting/officeZipcodeMember/Paging?refOfficeId=' + this.refOfficeId);
      },
      (error) => {
          console.log(error);
      });

  }
}
