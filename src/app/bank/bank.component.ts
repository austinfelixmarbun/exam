import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';
import { HttpClient } from '@angular/common/http';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
  providers: [NgbPaginationConfig]
})
export class BankComponent implements OnInit {

  //** Start UC Search **//
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj : any;
  urlQryPaging : string = AdInsConstant.GetBankPaging;
  urlEnviPaging : string = environment.settingUrl;
  //** End UC Search **//
  editUrl: any;
  bankObj: RefBankObj;
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  
  // array of all items to be paged
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  settingUrl: string = environment.settingUrl;
  orderByKey: any = null;
  orderByValue: boolean = true;

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchBank.json";
    this.inputObj.enviromentUrl = environment.settingUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetBankPaging;
    
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.settingUrl + AdInsConstant.GetBankPaging;
  }

  //** Start UC Search **/
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

  //** End UC Search **/

  delete(refBankId: any) {
    if(confirm("Are you sure to delete this record?")) {
      this.editUrl = this.settingUrl + AdInsConstant.DeleteRefBank;
      this.bankObj = new RefBankObj();
      this.bankObj.refBankId = refBankId;
      this.http.post(this.editUrl, this.bankObj).subscribe(
        (response) => {
          console.log(response);
        },
        (error)=> {
            console.log(error);
        });
    }
  }

  reset(){
    this.searchComponent.initiateForm();
  }

  onChange() {
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }
}
