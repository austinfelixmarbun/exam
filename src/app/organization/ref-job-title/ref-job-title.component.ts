import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { RefJobTitleObj } from 'app/shared/model/RefJobTitleObj.Model';
import { HttpClient } from '@angular/common/http';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';

@Component({
  selector: 'app-ref-job-title',
  templateUrl: './ref-job-title.component.html',
  styleUrls: ['./ref-job-title.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService] // add NgbPaginationConfig to the component providers

})
export class RefJobTitleComponent implements OnInit {

  //** Start Query Paging */
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  urlQryPaging : string = AdInsConstant.GetRefJobTitle;
  urlEnviPaging : string = environment.foundationUrl;
  //** End Query Paging */

  urlJson: string = "./assets/search/searchJobTitle.json";
  resultData: any;
  rjtObj: RefJobTitleObj;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  apiUrl: any;
  deleteUrl: any;
  orderByKey: any = null;
  orderByValue: boolean = true;

  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  foundationUrl: string = environment.foundationUrl;

  constructor(private http: Http, private httpClient: HttpClient, private spinner: NgxSpinnerService, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.pageNow = 1;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefJobTitle;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteRefJobTitle;
  }

  //** Start UC Search **/

  getResult(event){
    this.resultData = event.returnObject;
    this.totalData = event.returnObject.count;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event)
  {
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

  //** End UC Search **/

  delete(refJobId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.rjtObj = new RefJobTitleObj();
      this.rjtObj.RefJobTitleId = refJobId;
      this.httpClient.post(this.deleteUrl, this.rjtObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.searchPagination(this.pageNow);
        });
    }
  }
  // Success Type
  typeSuccess() {
    this.toastr.typeSuccess();
  }

  typeError() {
    this.toastr.typeError();
  }

  timeout() {
    this.toastr.timeout();
  }

  errMsg() {
    this.toastr.errorMessage('asdasd');
  }

}
