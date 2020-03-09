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

@Component({
  selector: 'app-asset-scheme-add-edit-member',
  templateUrl: './asset-scheme-add-edit-member.component.html',
  styleUrls: ['./asset-scheme-add-edit-member.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService]
})
export class AssetSchemeAddEditMemberComponent implements OnInit {

  @ViewChild(UcgridfooterComponent) ucgridFooter;
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
  responseResultData: any;

  listSelectedId: Array<any> = [];
  listDeletedId: Array<any> = [];
  tempListId: Array<any> = [];
  tempData: Array<any> = [];
  arrAddCrit = new Array<CriteriaObj>();
  arrCrit: any;
  checkboxAll: any = false;
  getAssetSchmHByIdUrl = environment.FoundationR3Url + '/AssetSchmH/GetAssetSchmHById';
  getAssetTypeByIdUrl = environment.FoundationR3Url + "/AssetType/GetAssetTypeById";
  editAssetSchmHAndDUrl = environment.FoundationR3Url + '/AssetSchmH/EditAssetSchmHAndD';
  AssetSchmHId: any;
  getListAssetMasterByAssetSchmHId = "http://localhost:5000" + '/AssetMaster/GetListAssetMasterByAssetSchmHId';
  getListAssetSchmDByAssetSchmHId = "http://localhost:5000" + '/AssetSchmD/GetListAssetSchmDByAssetSchmHId';

  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService) { }

  ngOnInit() {

    // this.GetListAssetMasterId();

    console.log("member");
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

    // let assetSchmHObj = { AssetSchmHId: this.AssetSchmHId, "RowVersion": "" };
    // // this.assetService.getAssetSchmHByAssetSchmHId(assetSchmHObj).subscribe(


    //     if (this.responseResultData.IsActive == 0) {
    //       this.IsActive = 'No';
    //     } else {
    //       this.IsActive = 'Yes';
    //     }
    //     let assetObj = { AssetTypeId: this.responseResultData.AssetTypeId,"RowVersion": "" };
    //     // this.assetService.getAssetTypeHbyAssetTypeId(assetObj).subscribe(
    //     this.http.post(this.getAssetTypeByIdUrl, assetObj).subscribe(
    //       response => {
    //         console.log('getassettype');
    //         console.log(response);
    //         this.AssetTypeName = response['AssetTypeName'];
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     );


    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    // WHERE AM.IS_ACTIVE = '1' AND AM.IS_FINAL = '1' 

    this.inputObj = new InputSearchObj();
    this.inputObj._url = './assets/search/searchAssetMasterInAssetSchm.json'; // ini search json
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    // this.inputObj.apiQryPaging = AdInsConstant.GetAssetMasterPaging;
    
    this.inputObj.addCritInput = new Array();

    this.pageNow = 1;
    this.pageSize = 10;
    // this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetAssetMasterPaging;
    this.apiUrl = environment.FoundationR3Url + AdInsConstant.GetPagingObjectBySQL;

    if (this.pageType == 'edit') {
      let assetSchmDObj = { AssetSchmHId: this.AssetSchmHId, "RowVersion": "" };
      // this.assetService.getListAssetMasterByAssetSchmHId(assetSchmDObj).subscribe( //lgi buat api ny
      this.http.post(this.getListAssetMasterByAssetSchmHId, assetSchmDObj).subscribe(
        response => {
          console.log('masuk edittttt');
          console.log(response);
          for (let index = 0; index < response['ReturnObject'].length; index++) {
            this.tempData.push(response['ReturnObject'][index]);
            console.log(this.tempData);
          }
        },
        error => {
          console.log(error);
        }
      );

    let assetSchmHObj = { AssetSchmHId: this.AssetSchmHId, "RowVersion": "" };
    // this.assetService.getAssetSchmHByAssetSchmHId(assetSchmHObj).subscribe(

    this.http.post(this.getAssetSchmHByIdUrl, assetSchmHObj).subscribe(
      response => {
        console.log('ini respons ny')
        console.log(response);
        this.responseResultData = response;
        this.AssetTypeId = this.responseResultData.AssetTypeId;

        const addCritTypeHId = new CriteriaObj();
        addCritTypeHId.DataType = 'numeric';
        addCritTypeHId.propName = 'AM.ASSET_TYPE_ID';
        addCritTypeHId.restriction = AdInsConstant.RestrictionEq;
        addCritTypeHId.value = this.AssetTypeId;
        this.arrCrit.push(addCritTypeHId);
        this.inputObj.addCritInput.push(addCritTypeHId);
      });
    }

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

    this.inputObj.addCritInput.push(addCritIsActive);
    this.inputObj.addCritInput.push(addCritIsFinal);
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
        AssetMasterId: this.tempData[index].AssetMasterId
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
    this.http.post(this.editAssetSchmHAndDUrl, AssetSchmObj).subscribe(
      response => {
        console.log(response);
        this.toastr.successMessage(response['message']);
        this.router.navigateByUrl('Asset/Scheme/Paging');
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


  GetListAssetMasterId(){
    console.log('GetListAssetMasterId');
    var url = environment.FoundationR3Url + '/AssetSchmD/GetListAssetSchmDByAssetSchmHId';
    var obj = { "AssetSchmHId": this.AssetSchmHId, "RowVersion": ""};
    // var obj = { "AssetSchmHId": 1, "RowVersion": ""}; 
    var arr = new Array();
    var temp;
    this.http.post(url, obj).subscribe(
          response => {
            temp = response['ReturnObject'];

            for(var i=0;i<temp.length;i++){
              arr.push(temp[i]['AssetMasterId']);
            }
            console.log('isi arr');
            console.log(arr);
          },
          error => {
            console.log(error);
          }
    );
    return arr;
  }

  SelectAll(condition) {
    this.checkboxAll = condition;
    console.log(condition);
    if (condition) {
      for (let i = 0; i < this.resultData.data.length; i++) {
        if (this.listSelectedId.indexOf(this.resultData.data[i].AssetMasterId) < 0) {
          this.listSelectedId.push(this.resultData.data[i].AssetMasterId);
        }
      }

    } else {
      for (let i = 0; i < this.resultData.data.length; i++) {
        let index = this.listSelectedId.indexOf(this.resultData.data[i].AssetMasterId);
        if (index > -1) {
          this.listSelectedId.splice(index, 1);
        }
        console.log(this.resultData.data[i]);
      }
    }
    console.log(this.checkboxAll);
    console.log(this.listSelectedId);
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


