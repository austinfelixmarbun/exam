import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-lookup-ref-bank',
  templateUrl: './lookup-ref-bank.component.html',
  providers: [NgbPaginationConfig],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class LookupRefBankComponent implements OnInit {
  @Input() lookupInput: any;
  @Input() parentForm: any;
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild('content') contentTemplate;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;

  refBank:any;
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
    this.inputObj._url = this.lookupInput.urlJson;
    this.inputObj.enviromentUrl = this.lookupInput.urlEnviPaging;
    this.inputObj.apiQryPaging = this.lookupInput.urlQryPaging;
    
    this.apiUrl = this.lookupInput.urlEnviPaging + this.lookupInput.urlQryPaging;
    this.pageNow = 1;
    this.pageSize = 10;
    /* #region   Additional Criteria*/
    if (this.lookupInput.addCritInput != null || this.lookupInput.addCritInput != undefined) {
      this.addCrit = new Array();
      for (var i = 0; i < this.lookupInput.addCritInput.length; i++) {
        this.addCrit.push(this.lookupInput.addCritInput[i]);
      }
    }
    /* #endregion */
    this.inputObj.addCritInput = this.addCrit;
  }

  choose(code, name,item) {
    console.log(code + " : " + name);
    console.log(item);
    this.refBank = code;
    this.lookupInput.idSelect = code;
    this.lookupInput.nameSelect = name;
    this.lookupInput.jsonSelect = JSON.stringify(item);
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
    console.log(this.lookupInput.urlQryPaging);
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
