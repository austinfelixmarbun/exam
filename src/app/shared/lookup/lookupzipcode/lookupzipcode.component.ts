import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { ControlContainer, NgForm } from '@angular/forms';


@Component({
  selector: 'app-lookupzipcode',
  templateUrl: './lookupzipcode.component.html',
  providers: [NGXToastrService],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class LookupzipcodeComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  @Input() lookupInput: any;
  @Input() parentForm: any;
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild('content') contentTemplate;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  @Output() select : EventEmitter<any> = new EventEmitter();
  inputObj: any;

  configuration: any;
  urlGet: string;
  countForm = 0;
  isDataLoaded: boolean = false;
  title: string;
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  show: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  closeResult: string;
  addCrit: Array<any>;
  zipcode: any;

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = this.lookupInput.urlJson;
    this.inputObj.enviromentUrl = this.lookupInput.urlEnviPaging;
    this.inputObj.apiQryPaging = this.lookupInput.urlQryPaging;
    
    this.apiUrl = this.lookupInput.urlEnviPaging + this.lookupInput.urlQryPaging;
    this.pageNow = 1;
    this.pageSize = 10;
    /* #region   Additional Criteria*/
    if (this.lookupInput.addCritInput !== null) {
      this.addCrit = new Array();
      for (var i = 0; i < this.lookupInput.addCritInput.length; i++) {
        this.addCrit.push(this.lookupInput.addCritInput[i]);
      }
    }
    /* #endregion */
    this.inputObj.addCritInput = this.addCrit;
  }

  choose(id, name, item) {
    console.log(id + " : " + name);
    console.log(item);
    this.zipcode = id;
    this.lookupInput.idSelect = id;
    this.lookupInput.nameSelect = name;
    this.lookupInput.jsonSelect = JSON.stringify(item);
    this.modalService.dismissAll();
    this.select.emit(item);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  search(searchComp) {

    searchComp.search(this.apiUrl, this.pageNow, this.pageSize, null)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(response);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
    //searchComp.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }
  searchPagination(searchComp, event: number) {
    this.pageNow = event;
    var order = null;
    if (this.orderByKey != null && this.orderByKey != undefined) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    searchComp.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  searchSort(searchComp, key) {
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

  changeShowData(searchComp, value: any) {
    this.pageSize = +value;
    if (this.resultData !== null && this.resultData !== '' && this.resultData !== undefined) {
      var order = null;
      if (this.orderByKey != null) {
        order = {
          key: this.orderByKey,
          value: this.orderByValue
        }
      }
      searchComp.search(this.apiUrl, this.pageNow, this.pageSize, order)
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

  getResult(ucgridFooter, event){
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    ucgridFooter.pageNow = event.pageNow;
    ucgridFooter.totalData = this.totalData;
    ucgridFooter.resultData = this.resultData;
  }

  onSelect(searchComp, event)
  {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(searchComp, this.pageNow);
  }
}
