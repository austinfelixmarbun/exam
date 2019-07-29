import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { environment } from "environments/environment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { DecimalPipe } from "@angular/common";
import { InputSearchObj } from "app/shared/model/InputSearchObj.Model";

@Component({
  selector: "app-general-setting-paging",
  templateUrl: "./general-setting-paging.component.html",
  providers: [DecimalPipe]
})
export class GeneralSettingPagingComponent implements OnInit {
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  show: any;
  exportData: any;
  excelData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  settingUrl: any = environment.settingUrl;
  addCrit: CriteriaObj[];

  constructor() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchGeneralSetting.json";
    this.inputObj.enviromentUrl = environment.settingUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetGeneralSettingPaging;
  }

  ngOnInit() {
    console.log("masuk");
    this.show = AdInsConstant.showData.split(",");
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.apiUrl = this.settingUrl + AdInsConstant.GetGeneralSettingPaging;
    this.initiateForm();
  }

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
  searchPagination(event: number) {
    this.pageNow = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      };
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit);
  }

  initiateForm() {
    this.inputObj.addCritInput = new Array();
    var critIsActive = new CriteriaObj();
    critIsActive.propName = "is_Updateable";
    critIsActive.value = "1";
    critIsActive.restriction = AdInsConstant.RestrictionEq;

    this.inputObj.addCritInput.push(critIsActive);
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit);
  }
}
