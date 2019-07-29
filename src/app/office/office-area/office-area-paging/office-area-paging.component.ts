import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { RefOfficeAreaObj } from 'app/shared/model/RefOfficeAreaObj.model';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';

@Component({
  selector: 'app-office-area-paging',
  templateUrl: './office-area-paging.component.html',
  providers: [NGXToastrService, DecimalPipe]
})
export class OfficeAreaPagingComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  exportData: any;
  excelData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  foundationUrl: any = environment.foundationUrl;

  refOfficeAreaObj: RefOfficeAreaObj;
  constructor(
    private service: NGXToastrService,
    private https: HttpClient
  ) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchOfficeArea.json";
    this.inputObj.enviromentUrl = environment.foundationUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetRefOfficeAreaPaging;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefOfficeAreaPaging;
    this.initiateForm()
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

  initiateForm() {
  }

  searchSort(event: any) {
    if (
      this.orderByKey ==
      event.target.attributes
        .name.nodeValue
    ) {
      this.orderByValue = !this
        .orderByValue;
    } else {
      this.orderByValue = true;
    }
    this.orderByKey =
      event.target.attributes.name.nodeValue;
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    };
    console.log(this.apiUrl);
    this.searchComponent
      .search(
        this.apiUrl,
        this.pageNow,
        this.pageSize,
        order
      )
      .subscribe(
        response => {
          console.log(
            "Success"
          );
          this.resultData = response;
          this.totalData =
            response.returnObject.count;
          console.log(
            this.resultData
          );
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
  }

  del(id: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteRefOfficeArea;
      this.refOfficeAreaObj = new RefOfficeAreaObj();
      this.refOfficeAreaObj.refOfficeAreaId = +id;

      this.https.post(this.deleteUrl, this.refOfficeAreaObj).subscribe(
        (response) => {
          this.service.successMessage(response['message']);
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
        });
    }
  }

}
