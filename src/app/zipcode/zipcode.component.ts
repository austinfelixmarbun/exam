import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { RefZipcodeObj } from 'app/shared/model/RefZipcodeObj.Model';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';

@Component({
  selector: 'app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['./zipcode.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService]
})
export class ZipcodeComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  editUrl: any;
  zipcodeObj: RefZipcodeObj;
  urlJson: string = "./assets/search/searchRefZipcode.json";
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  settingUrl: string = environment.settingUrl;
  urlQryPaging: string = AdInsConstant.GetRefZipcodePaging;
  urlEnviPaging : string = environment.settingUrl;
  orderByKey: any = null;
  orderByValue: boolean = true;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private service: NGXToastrService) { }

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.settingUrl + AdInsConstant.GetRefZipcodePaging;
    // this.adInsService.postData(this.settingUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
  }

  getResult(event){
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
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

  delete(refZipcodeId: any) {
    if(confirm("Are you sure to delete this record?")) {
      this.editUrl = this.settingUrl + AdInsConstant.DeleteRefZipcode;
      this.zipcodeObj = new RefZipcodeObj();
      this.zipcodeObj.refZipcodeId = refZipcodeId;
      this.http.post(this.editUrl, this.zipcodeObj).subscribe(
        (response) => {
          console.log(response);
        });
    }
  }

  reset(){
    this.searchComponent.initiateForm();
  }
}
