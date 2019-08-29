import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { InputGridObj } from 'app/shared/model/InputGridObj.Model';
import { SearchV2Component } from 'app/shared/search-v2/search-v2.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ucpaging',
  templateUrl: './ucpaging.component.html',
  styleUrls: ['./ucpaging.component.scss']
})
export class UcpagingComponent implements OnInit {

  @Input() searchObj: any;
  @Output() select: EventEmitter<any> = new EventEmitter();
  
  //** Start UC Search **//
  @ViewChild(SearchV2Component) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  gridObj: any;
  //** End UC Search **//

  apiUrl: any;
  pageNow: any = 1;
  pageSize: any = 10;
  totalData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;

  constructor(public toastr: ToastrService) { }

  ngOnInit() {
    console.log("ucpaging");
    this.apiUrl = this.searchObj.enviromentUrl + this.searchObj.apiQryPaging;
    this.gridObj = new InputGridObj();
    this.gridObj.apiUrl = this.apiUrl;
    this.gridObj.deleteUrl = this.searchObj.enviromentUrl + this.searchObj.deleteUrl;
    this.gridObj.pageNow = this.pageNow;
    this.gridObj.pageSize = this.pageSize;
    this.gridObj.pagingJson = this.searchObj.pagingJson;
    this.gridObj.searchComp = this.searchComponent;
    
    this.inputObj = new InputSearchObj();
    this.inputObj._url = this.searchObj._url;
    this.inputObj.enviromentUrl = this.searchObj.enviromentUrl;
    this.inputObj.apiQryPaging = this.searchObj.apiQryPaging;
  }

  //** Start UC Search **/
  getResult(event) {
    console.log(event.response.returnObject.count)
    if (event.response.returnObject.count == 0) {
      this.toastr.error("No Data Found");
    }
      this.gridObj.resultData = event.response.returnObject;
      this.totalData = event.response.returnObject.count;
      this.ucgridFooter.pageNow = event.pageNow;
      this.ucgridFooter.totalData = this.totalData;
      this.ucgridFooter.resultData = this.gridObj.resultData;
    
  }

  getOutput(event) {
    this.orderByKey = event.orderByKey;
    this.orderByValue = event.orderByValue;
  }

  getSelect(event) {
    this.select.emit(event);
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.gridObj.pageNow = event.pageNow;
    this.gridObj.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }

  searchPagination(event: number) {
    this.pageNow = event;
    this.gridObj.pageNow = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }
  //** End UC Search **/
}
