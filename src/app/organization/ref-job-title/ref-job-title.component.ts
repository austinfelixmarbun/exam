import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ref-job-title',
  templateUrl: './ref-job-title.component.html',
  styleUrls: ['./ref-job-title.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService] // add NgbPaginationConfig to the component providers

})
export class RefJobTitleComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  urlJson: string = "./assets/search/searchJobTitle.json";
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  apiUrl: any;
  orderByKey: any = null;
  orderByValue: boolean = true;

  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  foundationUrl: string = environment.foundationUrl;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private service: NGXToastrService, private adInsService: AdInsServiceService) { }

  ngOnInit() {
    this.pageNow = 1;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefJobTitle;
    // this.adInsService.postData(this.foundationUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
  }

  search(orderBy = null) {
      if (orderBy == null) {
        this.orderByKey = null
        this.orderByValue = true
        this.pageNow = 1;
        this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, null)
          .subscribe(
            (response) => {
              console.log("Success");
              this.resultData = response.returnObject;
              this.totalData = response.returnObject.count;
              console.log(this.resultData);
            },
            (error) => {
              console.log("Error");
              console.log(error);
            }
          );
      } else {
        if (this.orderByKey == orderBy.target.attributes.name.nodeValue) {
          this.orderByValue = !this.orderByValue
        } else {
          this.orderByValue = true
        }
        this.orderByKey = orderBy.target.attributes.name.nodeValue
        var order = {
          key: this.orderByKey,
          value: this.orderByValue
        }
        this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
          .subscribe(
            (response) => {
              console.log("Success");
              this.resultData = response.returnObject;
              this.totalData = response.returnObject.count;
              console.log(this.resultData);
            },
            (error) => {
              console.log("Error");
              console.log(error);
            }
          );
      }
  }

  pagingSearch() {
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
          this.spinner.hide();
        },
        (error) => {
          console.log("Error");
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  pageChange(page: number) {
    this.pageNow = page;
    this.pagingSearch();
  }

  // Success Type
  typeSuccess() {
    this.service.typeSuccess();
  }

  typeError() {
    this.service.typeError();
  }

  timeout() {
    this.service.timeout();
  }

  errMsg() {
    this.service.errorMessage('asdasd');
  }

}
