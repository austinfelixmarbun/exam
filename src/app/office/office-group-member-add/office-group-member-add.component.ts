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
  styleUrls: ['./office-group-member-add.component.scss']
})
export class OfficeGroupMemberAddComponent implements OnInit {
  @ViewChild(UCGridFooterComponent) ucgridFooter;
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

  

  constructor(private http: HttpClient,
    private route: ActivatedRoute,private location: Location) { }

    Back(): void {
      this.location.back();
    }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params["centerGrpId"] != null) {
        this.centerGrpId = params["centerGrpId"];
      }
    });

    this.listSelectedId = new Array();
    this.tempListId = new Array();
    this.tempData = new Array();
    this.arrCrit = new Array();
    
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchOfficeCenterGrp.json";
    this.inputObj.enviromentUrl = environment.foundationUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = environment.foundationUrl + AdInsConstant.GetPagingObjectBySQL;

    /* #region Additional Criteria */
    this.arrCrit = new Array();

    var critNull = new CriteriaObj();
    critNull.propName = "CG.REF_OFFICE_ID";
    critNull.value = "";
    critNull.restriction = "ISNULL";
    this.arrCrit.push(critNull);

    
    var critOrgId = new CriteriaObj();
    critOrgId.propName = "CG.CENTER_GRP_ID";
    critOrgId.value = this.centerGrpId;
    critOrgId.restriction = "ORNEQ";
    this.arrCrit.push(critOrgId);

    this.inputObj.addCritInput = this.arrCrit;
    /* #endregion */
  }

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
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
    this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
  }

  searchSort(event: any) {
    if (this.resultData != null) {
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
      this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
    }
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
    for (var i = 0; i < this.resultData.data.length; i++) {
      var index = this.listSelectedId.indexOf(this.resultData.data[i].officeId);
      if (index > -1) {
        this.listSelectedId.splice(index, 1);
      }
    }
  }

  //event when checkbox checked or unchecked
  Checked(officeId: any, isChecked: any): void {
    if (isChecked) {
      this.listSelectedId.push(officeId);
    } else {
      let index = this.listSelectedId.indexOf(officeId)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }
  }

  SelectAll(condition) {
    this.checkboxAll = condition;
    if (condition) {
      for (var i = 0; i < this.resultData.data.length; i++) {
        if (this.listSelectedId.indexOf(this.resultData.data[i].officeId) < 0) {
          this.listSelectedId.push(this.resultData.data[i].officeId);
        }
      }

    } else {
      for (var i = 0; i < this.resultData.data.length; i++) {
        var index = this.listSelectedId.indexOf(this.resultData.data[i].officeId);
        if (index > -1) {
          this.listSelectedId.splice(index, 1);
        }
      }
    }
  }

  AddToTemp() {
    
    this.checkboxAll = false;
    for (var i = 0; i < this.listSelectedId.length; i++) {
      this.tempListId.push(this.listSelectedId[i]);
    }

    for (var i = 0; i < this.listSelectedId.length; i++) {
      var object = this.resultData.data.find(x => x.officeId == this.listSelectedId[i]);
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
    addCrit.propName = "Ro.REF_OFFICE_ID";
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
    this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);
    this.listSelectedId = [];
  }

  deleteFromTemp(officeId) {
    this.arrAddCrit = new Array();
    if (this.arrCrit.length != 0) {
      for (var i = 0; i < this.arrCrit.length; i++) {
        this.arrAddCrit.push(this.arrCrit[i]);
      }
    }
    var index = this.tempListId.indexOf(officeId);
    if (index > -1) {
      this.tempListId.splice(index, 1);
      this.tempData.splice(index, 1);
    }
    var addCrit = new CriteriaObj();
    addCrit.DataType = "numeric";
    addCrit.propName = "Ro.REF_OFFICE_ID";
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
    this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);
  }

  Save() {
    console.log("Save");
    var listId = new Array();
    for(var i=0;i<this.tempData.length;i++)
    {
      listId.push(this.tempData[i].officeId);
    }

    var reqObj = {"CenterGrpId":this.centerGrpId,"ListOfficeId":listId};
    this.http.post(environment.foundationUrl+"/"+AdInsConstant.AddCenterGroupOfficeMember,reqObj).subscribe(
      (response) => {
        this.location.back();
      },
      (error) => {
        
      });
    
  }

}
