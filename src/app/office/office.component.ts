import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UCSearchComponent } from '@adins/ucsearch';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { HttpClient } from '@angular/common/http';
import { OfficeObj } from 'app/shared/model/OfficeObj.model';
import { environment } from 'environments/environment';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
  providers: [DecimalPipe, NgbPaginationConfig, NGXToastrService] // add NgbPaginationConfig to the component providers
})
export class OfficeComponent implements OnInit {

  @ViewChild(UcgridfooterComponent) ucgridFooter;
  @ViewChild(UCSearchComponent) searchComponent;
  inputObj: any;
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  apiUrl: any;
  deleteUrl: any;
  officeObj: OfficeObj;
  orderByKey: any = null;
  orderByValue: boolean = true;
  displayNone: boolean = false;

  foundationUrl: string = environment.foundationUrl;

  constructor(private httpClient: HttpClient, private toastr: NGXToastrService) {
  }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchOffice.json";
    this.inputObj.enviromentUrl = environment.foundationUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetListOffice;
    
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetListOffice;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteRefOffice;
    
  }

  // Success Type

  searchSort(event: any) {
    if (this.resultData != null) {
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
    }
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
  }

  //** Start UC Search **/
  getResult(event){
    console.log(event);
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
  
  delete(refOfficeId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.officeObj = new OfficeObj();
      this.officeObj.refOfficeId = refOfficeId;
      this.httpClient.post(this.deleteUrl, this.officeObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.searchPagination(1);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        });
    }
  }
}
