import { Component, OnInit, ViewChild } from '@angular/core';
import { UCSearchComponent } from '@adins/ucsearch';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AssetSchemeHObj } from 'app/shared/model/AssetSchemeHObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsService } from 'app/shared/services/adIns.service';
import { AssetSchmDObj } from 'app/shared/model/AssetSchmDObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-add-asset-scheme',
  templateUrl: './add-asset-scheme.component.html'
})

export class AddAssetSchemeComponent implements OnInit {
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  @ViewChild(UCSearchComponent) UCSearchComponent;
  resultData: any;
  pageNow: number;
  totalData: number;
  pageSize: number = 10;
  apiUrl: string;
  orderByKey: string = null;
  orderByValue: boolean = true;
  deleteUrl: string;
  inputObj: InputSearchObj;
  pageType: string = 'add';
  AssetSchmCode: string;
  AssetSchmName: string;
  IsActive: string;
  assetSchmHObj: AssetSchemeHObj;
  AssetTypeId: number;
  // exportData: any;
  arrAssetSchmD: Array<AssetSchmDObj> = new Array<AssetSchmDObj>();
  responseResultData: AssetSchemeHObj;
  listSelectedId: Array<number> = new Array<number>();
  tempListId: Array<number> = new Array<number>();
  tempData: Array<any> = new Array<any>();
  arrAddCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  checkboxAll: boolean = false;
  getAssetSchmHByIdUrl: string = URLConstant.GetAssetSchmHById;
  addListAssetSchmDUrl: string = URLConstant.AddRangeAssetSchmD;

  AssetSchmHId: any;
  getListAssetSchmDByAssetSchmHId = URLConstant.GetListAssetSchmDByAssetSchmHId;
  viewObj: string;
  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService) { }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewAssetSchemeMember.json";
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

    this.inputObj = new InputSearchObj();
    this.inputObj._url = './assets/search/searchAssetMasterInAssetSchm.json';
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputObj.addCritInput = new Array();
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = environment.FoundationR3Url + URLConstant.GetPagingObjectBySQL;
    let assetSchmHObj = { AssetSchmHId: this.AssetSchmHId, "RowVersion": "" };
    var url = URLConstant.GetListAssetSchmDByAssetSchmHId;
    var obj = { "AssetSchmHId": this.AssetSchmHId, "RowVersion": "" };
    var arr = [0];
    var temp;
    this.http.post(url, obj).subscribe(
      response => {
        temp = response['ReturnObject'];

        for (var i = 0; i < temp.length; i++) {
          arr.push(temp[i]['AssetMasterId']);
        }

        this.http.post(this.getAssetSchmHByIdUrl, assetSchmHObj).subscribe(
          (response: AssetSchemeHObj) => {
            this.responseResultData = response;
            this.AssetTypeId = this.responseResultData.AssetTypeId;

            const addCritAssetMasterId = new CriteriaObj();
            addCritAssetMasterId.DataType = 'numeric';
            addCritAssetMasterId.propName = 'AM.ASSET_MASTER_ID';
            addCritAssetMasterId.restriction = AdInsConstant.RestrictionNotIn;
            addCritAssetMasterId.listValue = arr;
            this.arrCrit.push(addCritAssetMasterId);
            this.inputObj.addCritInput.push(addCritAssetMasterId);

            const addCritIsFinal = new CriteriaObj();
            addCritIsFinal.DataType = 'boolean';
            addCritIsFinal.propName = 'AM.IS_FINAL';
            addCritIsFinal.restriction = AdInsConstant.RestrictionEq;
            addCritIsFinal.value = 'true';
            this.arrCrit.push(addCritIsFinal);

            const addCritIsActive = new CriteriaObj();
            addCritIsActive.DataType = 'boolean';
            addCritIsActive.propName = 'AM.IS_ACTIVE';
            addCritIsActive.restriction = AdInsConstant.RestrictionEq;
            addCritIsActive.value = 'true';
            this.arrCrit.push(addCritIsActive);

            const addCritAssetType = new CriteriaObj();
            addCritAssetType.DataType = 'numeric';
            addCritAssetType.propName = 'AM.ASSET_TYPE_ID';
            addCritAssetType.restriction = AdInsConstant.RestrictionEq;
            addCritAssetType.value = this.AssetTypeId.toString();
            this.arrCrit.push(addCritAssetType);

            this.inputObj.addCritInput.push(addCritIsActive);
            this.inputObj.addCritInput.push(addCritIsFinal);
            this.inputObj.addCritInput.push(addCritAssetType);
          });
      },
      error => {
        this.router.navigateByUrl('Error');
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

  Checked(assetSchmDId: number, isChecked: boolean): void {
    if (isChecked) {
      this.listSelectedId.push(assetSchmDId);
    } else {
      const index = this.listSelectedId.indexOf(assetSchmDId)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
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
    this.resultData = event.response.Data;
    this.totalData = event.response.Count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
    this.totalData = event.Count;
  }

  formValidate(form: any) {
    this.adInsService.scrollIfFormHasErrors(form);
  }

  SaveAssetSchmMember(assetSchmForm: any) {
    this.assetSchmHObj = new AssetSchemeHObj();
    this.assetSchmHObj.AssetSchmHId = this.AssetSchmHId;
    this.assetSchmHObj.AssetSchmCode = this.AssetSchmCode;
    this.assetSchmHObj.AssetSchmName = this.AssetSchmName;
    this.assetSchmHObj.AssetTypeId = this.AssetTypeId;
    if (assetSchmForm.value.IsActive) {
      this.assetSchmHObj.IsActive = 'true';
    } else {
      this.assetSchmHObj.IsActive = 'false';
    }

    for (let index = 0; index < this.tempData.length; index++) {
      var assetSchmDObj = new AssetSchmDObj();
      assetSchmDObj.AssetSchmHId = this.AssetSchmHId;
      assetSchmDObj.AssetMasterId = this.tempData[index].AssetMasterId;
      this.arrAssetSchmD.push(assetSchmDObj);
    }

    if (this.arrAssetSchmD.length == 0) {
      this.toastr.typeErrorCustom('Please Add At Least One Data');
      return;
    }

    var AssetSchmObj = {
      AssetSchmH: this.assetSchmHObj,
      AssetSchmDObjs: this.arrAssetSchmD
    }
    this.http.post(this.addListAssetSchmDUrl, AssetSchmObj).subscribe(
      response => {
        this.toastr.successMessage(response['message']);
        this.router.navigate(["/Asset/Scheme/MemberDetail"], { queryParams: { "AssetSchmHId": this.AssetSchmHId } });
      },
      error => {
        console.log(error);
      }
    );
  }

  addToTemp() {
    if (this.listSelectedId.length !== 0) {
      for (var i = 0; i < this.listSelectedId.length; i++) {
        this.tempListId.push(this.listSelectedId[i]);
        var object = this.resultData.find(x => x.AssetMasterId == this.listSelectedId[i]);
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
    if (condition) {
      for (let i = 0; i < this.resultData.length; i++) {
        if (this.listSelectedId.indexOf(this.resultData[i].AssetMasterId) < 0) {
          this.listSelectedId.push(this.resultData[i].AssetMasterId);
        }
      }
    } else {
      for (let i = 0; i < this.resultData.length; i++) {
        let index = this.listSelectedId.indexOf(this.resultData[i].AssetMasterId);
        if (index > -1) {
          this.listSelectedId.splice(index, 1);
        }
      }
    }
  }

  deleteFromTemp(AssetMasterId: any) {
    if (confirm('Are you sure to delete this record?')) {
      this.arrAddCrit = new Array();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }
      var index = this.tempListId.indexOf(AssetMasterId);
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