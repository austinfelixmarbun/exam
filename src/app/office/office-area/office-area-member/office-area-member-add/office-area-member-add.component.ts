import { Component, OnInit, ViewChild } from '@angular/core';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefOfficeAreaObj } from 'app/shared/model/RefOfficeAreaObj.model';

@Component({
  selector: 'app-office-area-member-add',
  templateUrl: './office-area-member-add.component.html',
  styleUrls: ['./office-area-member-add.component.scss'],
  providers: [NGXToastrService]
})
export class OfficeAreaMemberAddComponent implements OnInit {

  //** Start UC Search **//
  @ViewChild(UCSearchComponent) UCSearchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  OfficeCode: any;
  OfficeName: any;
  RefOfficeId: any;
  refOfficeAreaObj: any;
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
  orderByKey: any = null;
  orderByValue: boolean = true;

  arrAddCrit = new Array<CriteriaObj>();
  tempListId: Array<any> = [];
  tempData: Array<any> = [];
  listSelectedId: Array<any> = [];
  listDeletedId: Array<any> = [];
  Data = [];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params['RefOfficeAreaId'] != null) {
        this.RefOfficeId = params['RefOfficeAreaId'];
      }
    });
  }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchOfficeAreaMember.json";
    this.inputObj.enviromentUrl = this.foundationUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetPagingObjectBySQL;
    this.officeUrl = this.foundationUrl + AdInsConstant.GetRefOfficeObj;
    this.addUrl = this.foundationUrl + AdInsConstant.AddOfficeZipcodeMember;

    this.arrCrit = new Array();

  }

  getResult(event) {
    this.resultData = event.response;
    this.totalData = event.response.Count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.totalData = event.Count;
    this.searchPagination(this.pageNow);
  }

  searchSort(event: any) {
    this.orderByKey = event.target.attributes.name.nodeValue
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue
    } else {
      this.orderByValue = true
    }
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
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
    this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  Checked(RefOfficeId: any, isChecked: any): void {
    if (isChecked) {
      this.listSelectedId.push(RefOfficeId);
    } else {
      let index = this.listSelectedId.indexOf(RefOfficeId)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
  }

  AddToTemp() {
    if (this.listSelectedId.length != 0) {
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
      addCrit.DataType = "numeric";
      addCrit.propName = "REF_OFFICE_ID";
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

  DeleteFromTemp(RefOfficeId) {
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
      addCrit.propName = "REF_OFFICE_ID";
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

  SaveOfficeAreaMember() {
    // this.refOfficeAreaObj = new RefOfficeAreaObj()
    // for (let index = 0; index < this.tempData.length; index++) {
    //   console.log(this.tempData);
    //   var refOfficeAreaObj = {
    //     AssetSchmDId:this.tempData[index].assetSchmDId,
    //     AssetSchmHId: this.tempData[index].assetSchmHId,
    //     AssetMasterId: this.tempData[index].assetMasterId
    //   }
    //   this.arrAssetSchmD.push(refOfficeAreaObj);
    // }

    // var AssetSchmObj = {
    //   AssetSchmH: this.assetSchmHObj,
    //   AssetSchmD: this.arrAssetSchmD
    // }
    // console.log(refOfficeAreaObj);
    // // if (this.pageType === 'add') {
    // //   this.assetService.addAssetSchmHAndD(AssetSchmObj).subscribe(
    // //     response => {
    // //       console.log(response);
    // //       this.toastr.successMessage(response['message']);
    // //       this.router.navigateByUrl('asset/assetSchmPaging');
    // //     },
    // //     error => {
    // //       console.log(error);
    // //     }
    // //   );
    // // } else {
    //   this.assetService.editAssetSchmHAndD(AssetSchmObj).subscribe(
    //     response => {
    //       console.log(response);
    //       this.toastr.successMessage(response['message']);
    //       this.router.navigateByUrl('asset/assetSchmPaging');
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // // }
  }
}