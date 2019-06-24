import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';

@Component({
  selector: 'app-lookup-ref-bank',
  templateUrl: './lookup-ref-bank.component.html',
  providers: [NgbPaginationConfig, DecimalPipe]
})
export class LookupRefBankComponent implements OnInit {

  @Input() nameSelect: any = "Search ...";
  @Input() codeSelect: any;
  @Input() jsonSelect:string;
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  @ViewChild('content') contentTemplate;
  inputObj: any;

  configuration: any;
  urlGet: string;
  countForm = 0;
  isDataLoaded: boolean = false;
  title: string;
  closeResult: string;
  apiUrl:string;
  resultData: any;
  pageNow: any = 1;
  pageSize: any = 10;
  totalData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;

  addCrit: Array<any>;

  constructor(private modalService: NgbModal){

  }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/lookup/lookupRefBank.json";
    this.inputObj.enviromentUrl = environment.settingUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetBankPaging;
    
    this.apiUrl = environment.settingUrl + AdInsConstant.GetBankPaging;
    this.pageSize = 10;
  }

  choose(code, name,item) {
    console.log(code + " : " + name);
    console.log(item);
    this.codeSelect = code;
    this.nameSelect = name;
    this.jsonSelect = JSON.stringify(item);
    this.modalService.dismissAll();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getResult(ucgridFooter, event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    ucgridFooter.pageNow = event.pageNow;
    ucgridFooter.totalData = this.totalData;
    ucgridFooter.resultData = this.resultData;
  }

  searchSort(searchComp,key) {
    if (this.orderByKey == key) {
      this.orderByValue = !this.orderByValue;
    } else {
      this.orderByValue = true;
    }
    this.orderByKey = key;
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    searchComp.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  searchPagination(searchComp,event: number) {
    this.pageNow = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    searchComp.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  onSelect(searchComponent, event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(searchComponent, this.pageNow);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
