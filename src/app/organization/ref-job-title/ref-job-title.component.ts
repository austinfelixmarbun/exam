import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { RefJobTitleObj } from 'app/shared/model/RefJobTitle.model';
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
  rjtObj : RefJobTitleObj;
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

  constructor(private http: Http, private httpClient: HttpClient, private spinner: NgxSpinnerService, private service: NGXToastrService, private toastr: NGXToastrService) { 
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteRefJobTitle;
  }

  ngOnInit() {
    this.pageNow = 1;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefJobTitle;
    // this.adInsService.postData(this.foundationUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
  }

  search() {
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

  searchPagination(event: number) {
    this.pageNow = event;
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

  delete(refJobId: any) {
    if(confirm("Are you sure to delete this record?")) {
      this.rjtObj = new RefJobTitleObj();
      this.rjtObj.RefJobTitleId = refJobId;
      this.httpClient.post(this.deleteUrl, this.rjtObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
        });
    }
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

  onChange(eventValue: any) {

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
