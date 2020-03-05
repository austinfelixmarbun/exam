// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-asset-scheme-add-edit-member',
//   templateUrl: './asset-scheme-add-edit-member.component.html',
//   styleUrls: ['./asset-scheme-add-edit-member.component.scss']
// })
// export class AssetSchemeAddEditMemberComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { UCSearchComponent } from '@adins/ucsearch';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AssetSchemeHObj } from 'app/shared/model/AssetSchemeHObj.Model';
import { Observable } from 'rxjs';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsService } from 'app/shared/services/adIns.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asset-scheme-add-edit-member',
  templateUrl: './asset-scheme-add-edit-member.component.html',
  styleUrls: ['./asset-scheme-add-edit-member.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService]
})
export class AssetSchemeAddEditMemberComponent implements OnInit {

  @ViewChild(UCGridFooterComponent) ucgridFooter;
  @ViewChild(UCSearchComponent) UCSearchComponent;
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  apiUrl: any;
  orderByKey: any = null;
  orderByValue = true;
  deleteUrl: any;
  inputObj: any;
  pageType: any = 'add';
  AssetSchmCode: any;
  AssetTypeName: any;
  AssetSchmName: any;
  IsActive: any;
  assetSchmHObj: any;
  AssetTypeId: any;
  exportData: any;
  arrAssetSchmD: any = new Array();

  listSelectedId: Array<any> = [];
  listDeletedId: Array<any> = [];
  tempListId: Array<any> = [];
  tempData: Array<any> = [];
  arrAddCrit = new Array<CriteriaObj>();
  arrCrit: any;
  checkboxAll: any = false;
  getAssetSchmHByIdUrl = environment.FoundationR3Url + '/AssetSchmH/GetAssetSchmHById';
  getAssetTypeByIdUrl = environment.FoundationR3Url + "/AssetType/GetAssetTypeById";

  AssetSchmHId: any;
  getListAssetMasterByAssetSchmHId = environment.FoundationR3Url + '/AssetMaster/GetListAssetMasterByAssetSchmHId';
  getListAssetSchmDByAssetSchmHId = environment.FoundationR3Url + '/AssetSchmD/GetListAssetSchmDByAssetSchmHId';

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: NGXToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.arrCrit = new Array();
    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.pageType = params['param'];
      } else {
        this.pageType = 'add';
      }
      if (params['AssetSchmHId'] != null) {
        this.AssetSchmHId = params['AssetSchmHId'];
      }
      if (params['AssetTypeId'] != null) {
        this.AssetTypeId = params['AssetTypeId'];
      }
    });

    let assetSchmHObj = { AssetSchmHId: this.AssetSchmHId };
    // this.assetService.getAssetSchmHByAssetSchmHId(assetSchmHObj).subscribe(

    this.http.post(this.getAssetSchmHByIdUrl, assetSchmHObj).subscribe(
      response => {
        console.log('ini respons ny')
        console.log(response);
        this.AssetSchmCode = response.AssetSchmCode;
        this.AssetSchmName = response.AssetSchmName;
        this.AssetTypeId = response.AssetTypeId;
        if (response.IsActive == 0) {
          this.IsActive = 'No';
        } else {
          this.IsActive = 'Yes';
        }
        let assetObj = { AssetTypeId: response.AssetTypeId };
        // this.assetService.getAssetTypeHbyAssetTypeId(assetObj).subscribe(
        this.http.post(this.getAssetTypeByIdUrl, assetObj).subscribe(
          response => {
            this.AssetTypeName = response.AssetTypeName;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
    // WHERE AM.IS_ACTIVE = '1' AND AM.IS_FINAL = '1' 

    this.inputObj = new InputSearchObj();
    this.inputObj._url = './assets/search/searchAssetMasterInAssetSchm.json'; // ini search json
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    // this.inputObj.apiQryPaging = AdInsConstant.GetAssetMasterPaging;
    this.inputObj.addCritInput = new Array();

    const addCritTypeHId = new CriteriaObj();
    addCritTypeHId.DataType = 'numeric';
    addCritTypeHId.propName = 'AM.ASSET_TYPE_ID';
    addCritTypeHId.restriction = AdInsConstant.RestrictionEq;
    addCritTypeHId.value = this.AssetTypeId;
    this.arrCrit.push(addCritTypeHId);

    const addCritIsFinal = new CriteriaObj();
    addCritIsFinal.DataType = 'text';
    addCritIsFinal.propName = 'AM.IS_FINAL';
    addCritIsFinal.restriction = AdInsConstant.RestrictionEq;
    addCritIsFinal.value = '1';
    this.arrCrit.push(addCritIsFinal);

    const addCritIsActive = new CriteriaObj();
    addCritIsActive.DataType = 'text';
    addCritIsActive.propName = 'AM.IS_ACTIVE';
    addCritIsActive.restriction = AdInsConstant.RestrictionEq;
    addCritIsActive.value = '1';
    this.arrCrit.push(addCritIsActive);


    this.inputObj.addCritInput.push(addCritTypeHId);
    this.inputObj.addCritInput.push(addCritIsFinal);

    console.log(this.inputObj);

    this.pageNow = 1;
    this.pageSize = 10;
    // this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetAssetMasterPaging;
    this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetPagingObjectBySQL;

    if (this.pageType === 'edit') {
      let assetSchmDObj = { AssetSchmHId: this.AssetSchmHId };
      // this.assetService.getListAssetMasterByAssetSchmHId(assetSchmDObj).subscribe( //lgi buat api ny
        this.http.post(this.getListAssetMasterByAssetSchmHId  , assetSchmHObj).subscribe(
        response => {
          console.log(response);
          for (let index = 0; index < response['ReturnObject'].length; index++) {
            this.tempData.push(response['ReturnObject'][index]);
            console.log(this.tempData);
          }
          this.setTempData(assetSchmHObj, addCritTypeHId, addCritIsFinal);
        },
        error => {
          console.log(error);
        }
      );
    }
    this.deleteUrl = environment.FoundationR3Url + AdInsConstant.DeleteAssetCategory;
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
  Checked(assetSchmDId: any, isChecked: any): void {
    console.log(assetSchmDId);
    if (isChecked) {
      this.listSelectedId.push(assetSchmDId);
    } else {
      const index = this.listSelectedId.indexOf(assetSchmDId)
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
    this.resultData = event.response.ReturnObject;
    this.totalData = event.response.ReturnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }
  setTempData(assetSchmHObj: any, addCritTypeHId: any, addCritIsFinal: any) {
    console.log(assetSchmHObj);
    // this.assetService.getListAssetSchmDByAssetSchmHId(assetSchmHObj).subscribe(
    this.http.post(this.getListAssetSchmDByAssetSchmHId, assetSchmHObj).subscribe(
      response => {
        console.log(response);
        for (var i = 0; i < response['ReturnObject'].length; i++) {
          this.tempListId.push(response['ReturnObject'][i].assetMasterId);
        }
        console.log(this.tempListId);
        console.log(response['ReturnObject']);
        for (var i = 0; i < this.tempListId.length; i++) {
          if (response['ReturnObject'].length != 0) {
            var object = response['ReturnObject'].find(x => x.assetMasterId == this.tempListId[i]);
            this.tempData.push(object);
          }
        }
        var addCrit = new CriteriaObj();
        addCrit.DataType = "numeric";
        addCrit.propName = "AM.ASSET_MASTER_ID";
        addCrit.restriction = AdInsConstant.RestrictionNotIn;
        addCrit.listValue = this.tempListId;
        this.arrAddCrit.push(addCrit);
        this.arrAddCrit.push(addCritTypeHId);
        this.arrAddCrit.push(addCritIsFinal);
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
      },
      error => {
        console.log(error);
      });
  }

  SaveForm(assetSchmForm: any) {
    this.assetSchmHObj = new AssetSchemeHObj();
    this.assetSchmHObj.AssetSchmHId = this.AssetSchmHId;
    this.assetSchmHObj.AssetSchmCode = this.AssetSchmCode;
    this.assetSchmHObj.AssetSchmName = this.AssetSchmName;
    this.assetSchmHObj.AssetTypeId = this.AssetTypeId;
    if (assetSchmForm.value.IsActive) {
      this.assetSchmHObj.IsActive = '1';
    } else {
      this.assetSchmHObj.IsActive = '0';
    }
    console.log(this.assetSchmHObj);

    for (let index = 0; index < this.tempData.length; index++) {
      console.log(this.tempData);
      var assetSchmDObj = {
        AssetSchmDId: this.tempData[index].assetSchmDId,
        AssetSchmHId: this.tempData[index].AssetSchmHId,
        AssetMasterId: this.tempData[index].assetMasterId
      }
      this.arrAssetSchmD.push(assetSchmDObj);
    }

    var AssetSchmObj = {
      AssetSchmH: this.assetSchmHObj,
      AssetSchmD: this.arrAssetSchmD
    }
    console.log(AssetSchmObj);
    // if (this.pageType === 'add') {
    //   this.assetService.addAssetSchmHAndD(AssetSchmObj).subscribe(
    //     response => {
    //       console.log(response);
    //       this.toastr.successMessage(response['message']);
    //       this.router.navigateByUrl('asset/assetSchmPaging');
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // } else {


    // ini diuncoment
    // this.assetService.editAssetSchmHAndD(AssetSchmObj).subscribe(
    //   response => {
    //     console.log(response);
    //     this.toastr.successMessage(response['message']);
    //     this.router.navigateByUrl('asset/scheme/paging');
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );


    // }
  }

  formValidate(form: any) {
    this.adInsService.scrollIfFormHasErrors(form);
  }

  addToTemp() {
    if (this.listSelectedId.length !== 0) {

      this.checkboxAll = false;
      for (var i = 0; i < this.listSelectedId.length; i++) {
        this.tempListId.push(this.listSelectedId[i]);

      }
      for (var i = 0; i < this.listSelectedId.length; i++) {
        var object = this.resultData.data.find(x => x.assetMasterId == this.listSelectedId[i]);
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
      addCrit.propName = "AM.ASSET_MASTER_ID";
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
      this.toastr.typeErrorCustom('Please select at least one Available Asset');
    }
  }

  SelectAll(condition) {
    this.checkboxAll = condition;
    console.log(condition);
    if (condition) {
      for (let i = 0; i < this.resultData.data.length; i++) {
        if (this.listSelectedId.indexOf(this.resultData.data[i].assetMasterId) < 0) {
          this.listSelectedId.push(this.resultData.data[i].assetMasterId);
        }
      }

    } else {
      for (let i = 0; i < this.resultData.data.length; i++) {
        let index = this.listSelectedId.indexOf(this.resultData.data[i].assetMasterId);
        if (index > -1) {
          this.listSelectedId.splice(index, 1);
        }
        console.log(this.resultData.data[i]);
      }
    }
    console.log(this.checkboxAll);
    console.log(this.listSelectedId);
  }

  deleteFromTemp(assetMasterId: any) {
    if (confirm('Are you sure to delete this record?')) {
      this.arrAddCrit = new Array();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }
      var index = this.tempListId.indexOf(assetMasterId);
      if (index > -1) {
        this.tempListId.splice(index, 1);
        this.tempData.splice(index, 1);
      }
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = "AM.ASSET_MASTER_ID";
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

}


