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
  assetUrl: string = environment.assetUrl;
  deleteUrl: any;
  inputObj: any;
  pageType: any = 'add';
  assetSchmHId: any = 1;
  assetSchmCode: any;
  assetTypeName: any;
  assetSchmName: any;
  isActive: any;
  assetSchmHObj: any;
  assetTypeHId: any;
  exportData: any;
  arrAssetSchmD: any = new Array();

  listSelectedId: Array<any> = [];
  listDeletedId: Array<any> = [];
  tempListId: Array<any> = [];
  tempData: Array<any> = [];
  arrAddCrit = new Array<CriteriaObj>();
  arrCrit: any;
  checkboxAll: any = false;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: NGXToastrService,
    private route: ActivatedRoute,
    private assetService: AssetService,
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
      if (params['assetSchmHId'] != null) {
        this.assetSchmHId = params['assetSchmHId'];
      }
      if (params['assetTypeHId'] != null) {
        this.assetTypeHId = params['assetTypeHId'];
      }
    });

    let assetSchmHObj = { AssetSchmHId: this.assetSchmHId };
    this.assetService.getAssetSchmHByAssetSchmHId(assetSchmHObj).subscribe(
      response => {
        console.log(response);
        this.assetSchmCode = response['returnObject'].assetSchmCode;
        this.assetSchmName = response['returnObject'].assetSchmName;
        this.assetTypeHId = response['returnObject'].assetTypeHId;
        if (response['returnObject'].isActive == 0) {
          this.isActive = 'No';
        } else {
          this.isActive = 'Yes';
        }
        let assetObj = { AssetTypeHId: response['returnObject'].assetTypeHId }
        this.assetService.getAssetTypeHbyAssetTypeHId(assetObj).subscribe(
          response => {
            this.assetTypeName = response['returnObject'].assetTypeName;
          }
        )
      },
      error => {
        console.log(error);
      }
    )

    this.inputObj = new InputSearchObj();
    this.inputObj._url = './assets/search/searchAssetMasterInAssetSchm.json';
    this.inputObj.enviromentUrl = environment.assetUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetAssetMasterPaging;

    this.inputObj.addCritInput = new Array();
    const addCritTypeHId = new CriteriaObj();
    addCritTypeHId.DataType = 'numeric';
    addCritTypeHId.propName = 'AM.ASSET_TYPE_H_ID';
    addCritTypeHId.restriction = AdInsConstant.RestrictionEq;
    addCritTypeHId.value = this.assetTypeHId;
    this.arrCrit.push(addCritTypeHId);

    const addCritIsFinal = new CriteriaObj();
    addCritIsFinal.DataType = 'text';
    addCritIsFinal.propName = 'AM.IS_FINAL';
    addCritIsFinal.restriction = AdInsConstant.RestrictionEq;
    addCritIsFinal.value = '1';
    this.arrCrit.push(addCritIsFinal);

    this.inputObj.addCritInput.push(addCritTypeHId);
    this.inputObj.addCritInput.push(addCritIsFinal);

    console.log(this.inputObj);

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.assetUrl + AdInsConstant.GetAssetMasterPaging;

    if (this.pageType === 'edit') {
      let assetSchmDObj = { AssetSchmHId: this.assetSchmHId };
      this.assetService.getListAssetMasterByAssetSchmHId(assetSchmDObj).subscribe(
        response => {
          console.log(response);
          for (let index = 0; index < response['returnObject'].length; index++) {
            this.tempData.push(response['returnObject'][index]);
            console.log(this.tempData);
          }
          this.setTempData(assetSchmHObj, addCritTypeHId, addCritIsFinal);
        },
        error => {
          console.log(error);
        }
      );
    }
    this.deleteUrl = this.assetUrl + AdInsConstant.DeleteAssetCategory;
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
  setTempData(assetSchmHObj: any, addCritTypeHId: any, addCritIsFinal: any) {
    console.log(assetSchmHObj);
    this.assetService.getListAssetSchmDByAssetSchmHId(assetSchmHObj).subscribe(
      response => {
        console.log(response);
        for (var i = 0; i < response['returnObject'].length; i++) {
          this.tempListId.push(response['returnObject'][i].assetMasterId);
        }
        console.log(this.tempListId);
        console.log(response['returnObject']);
        for (var i = 0; i < this.tempListId.length; i++) {
          if (response['returnObject'].length != 0) {
            var object = response['returnObject'].find(x => x.assetMasterId == this.tempListId[i]);
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
    this.assetSchmHObj = new AssetSchmHObj();
    this.assetSchmHObj.assetSchmHId = this.assetSchmHId;
    this.assetSchmHObj.assetSchmCode = this.assetSchmCode;
    this.assetSchmHObj.assetSchmName = this.assetSchmName;
    this.assetSchmHObj.assetTypeHId = this.assetTypeHId;
    if (assetSchmForm.value.isActive) {
      this.assetSchmHObj.isActive = '1';
    } else {
      this.assetSchmHObj.isActive = '0';
    }
    console.log(this.assetSchmHObj);

    for (let index = 0; index < this.tempData.length; index++) {
      console.log(this.tempData);
      var assetSchmDObj = {
        AssetSchmDId:this.tempData[index].assetSchmDId,
        AssetSchmHId: this.tempData[index].assetSchmHId,
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
      this.assetService.editAssetSchmHAndD(AssetSchmObj).subscribe(
        response => {
          console.log(response);
          this.toastr.successMessage(response['message']);
          this.router.navigateByUrl('asset/assetSchmPaging');
        },
        error => {
          console.log(error);
        }
      );
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


// export class AssetSchmAddEditPagingComponent implements OnInit {

// }
