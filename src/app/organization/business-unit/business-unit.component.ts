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
    selector: 'app-business-unit',
    templateUrl: './business-unit.component.html',
    providers: [NgbPaginationConfig, NGXToastrService] // add NgbPaginationConfig to the component providers
  })

  export class BusinessUnitComponent implements OnInit {

    @ViewChild(SearchComponent) searchComponent;
    urlJson: string = "./assets/search/searchBusinessUnit.json";
    resultData: string;
    pageNow: any;
    totalData: any;
    pageSize: any;
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
      this.pageSize = 10;
      this.apiUrl = this.foundationUrl + AdInsConstant.GetBusinessUnitPaging;

    }
  
    search() {
      this.orderByKey = null
      this.orderByValue = true
      this.pageNow = 1;
      this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, null)
        .subscribe(
          (response) => {
            console.log("Success");
            this.resultData = response;
            this.totalData = response.returnObject.count;
            console.log(response);
          },
          (error) => {
            console.log("Error");
            console.log(error);
          }
        );
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
      this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
        .subscribe(
          (response) => {
            console.log("Success");
            this.resultData = response;
            this.totalData = response.returnObject.count;
            console.log(this.resultData);
          },
          (error) => {
            console.log("Error");
            console.log(error);
          }
        );
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
      this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
        .subscribe(
          (response) => {
            console.log("Success");
            this.resultData = response;
            this.totalData = response.returnObject.count;
            console.log(this.resultData);
          },
          (error) => {
            console.log("Error");
            console.log(error);
          }
        );
    }
  
    pageChange(page: number) {
      this.pageNow = page;
      this.search();
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
    
    onChange() {
      var order = null;
      if (this.orderByKey != null) {
        order = {
          key: this.orderByKey,
          value: this.orderByValue
        }
      }
      this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
        .subscribe(
          (response) => {
            console.log("Success");
            this.resultData = response;
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