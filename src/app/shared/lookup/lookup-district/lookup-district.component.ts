import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchComponent } from 'app/shared/search/search.component';
import { NgbModal, ModalDismissReasons, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { environment } from 'environments/environment';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-lookupdistrict',
  templateUrl: './lookup-district.component.html',
  providers: [NgbPaginationConfig],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class LookupDistrictComponent implements OnInit {
  constructor(private modalService: NgbModal) { }

  @Input() parentForm: any;
  @Input() lookupInput: any;
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild("content") contentTemplate;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj : any;
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
  msNewCatalogId:any;

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = this.lookupInput.urlJson;
    this.inputObj.enviromentUrl = this.lookupInput.urlEnviPaging;
    this.inputObj.apiQryPaging = this.lookupInput.urlQryPaging;
    this.inputObj.addCritInput = [];

    this.apiUrl = this.lookupInput.urlEnviPaging + this.lookupInput.urlQryPaging;
    this.pageSize = 10;
    var critIsActive = new CriteriaObj();
    if (this.lookupInput.addCritInput == null || this.lookupInput.addCritInput == undefined) {
      this.lookupInput.addCritInput = [];
    }
    
    critIsActive.propName = "is_active";
    critIsActive.value = "1";
    critIsActive.restriction = AdInsConstant.RestrictionEq;

    var critType = new CriteriaObj();
    critType.propName = "type";
    critType.value = "DIS";
    critType.restriction = AdInsConstant.RestrictionEq;
    this.inputObj.addCritInput.push(critIsActive);
    this.inputObj.addCritInput.push(critType);
    this.lookupInput.addCritInput.push(critIsActive);
    this.lookupInput.addCritInput.push(critType);
  
  }

  choose(id, name,item,searchComp) {
    console.log(id + " : " + name);
    console.log(item);
    this.lookupInput.idSelect = id;
    this.lookupInput.nameSelect = name;
    this.lookupInput.jsonSelect = JSON.stringify(item);
    this.resultData = "";
    searchComp.initiateForm();
    this.modalService.dismissAll();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  onSelect(searchComponent, event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(searchComponent, this.pageNow);
  }
  searchPagination(searchComponent, event: number) {
    this.pageNow = event;

    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      };
    }
    searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.lookupInput.addCritInput );
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
    };
    searchComp.search(this.apiUrl, this.pageNow, this.pageSize, order, this.lookupInput.addCritInput );
  }

  getResult(ucgridFooter,event) {
    console.log(this.lookupInput.urlQryPaging);
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    ucgridFooter.pageNow = event.pageNow;
    ucgridFooter.totalData = this.totalData;
    ucgridFooter.resultData = this.resultData;
  }

}
