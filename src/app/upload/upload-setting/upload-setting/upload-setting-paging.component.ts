import { Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { SearchComponent } from 'app/shared/search/search.component';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-setting-paging',
  templateUrl: './upload-setting-paging.component.html',
  styleUrls: ['./upload-setting-paging.component.scss'],
  providers: [NGXToastrService]
})
export class UploadSettingPagingComponent implements OnInit {
  //** Start Query Paging */
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  urlQryPaging: string;
  urlEnviPaging: string;
  //** End Query Paging */

  urlJson: string;
  resultData: string;
  verficationObj: any;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  apiUrl: any;
  deleteUrl: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  foundationUrl: string = environment.foundationUrl
  inputObj: any;
  verfTrxTypeId: any;
  exportData: any;

  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: NGXToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchUploadTypePaging.json";
    this.inputObj.enviromentUrl = this.foundationUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetUploadTypePaging;
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetUploadTypePaging;
    this.initiateForm()
  }

  initiateForm() {
    this.getJSON(this.inputObj._url).subscribe(data => {
      this.exportData = data.exportExcel;
    });
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  //** Start UC Search **/

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event) {
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
}