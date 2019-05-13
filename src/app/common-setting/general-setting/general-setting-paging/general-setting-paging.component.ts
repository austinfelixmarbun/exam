import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { environment } from "environments/environment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { SearchComponent } from "app/shared/search/search.component";
import { UCGridFooterComponent } from "app/shared/UserControl/ucgrid-footer/ucgrid-footer.component";

@Component({
  selector: "app-general-setting-paging",
  templateUrl: "./general-setting-paging.component.html"
})
export class GeneralSettingPagingComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  urlJson: string = "./assets/search/searchGeneralSetting.json";
  resultData: string;
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
  settingUrl: string = environment.settingUrl;
  urlQryPaging: string = AdInsConstant.GetGeneralSettingPaging;
  urlEnviPaging : string = environment.settingUrl;
  addCrit: CriteriaObj[];

  constructor() {}

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
    this.searchComponent
      .search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit)
      .subscribe(
        response => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
  }

  initiateForm() {
    this.addCrit = new Array();
    var critIsActive = new CriteriaObj();
    critIsActive.propName = "is_Updateable";
    critIsActive.value = "1";
    critIsActive.restriction = AdInsConstant.RestrictionEq;

    this.addCrit.push(critIsActive);
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
