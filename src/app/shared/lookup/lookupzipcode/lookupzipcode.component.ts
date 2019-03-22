import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { SearchComponent } from 'app/shared/search/search.component';
import { NgbModal, ModalDismissReasons, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment} from '../../../../environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';

@Component({
  selector: 'app-lookupzipcode',
  templateUrl: './lookupzipcode.component.html',
  styleUrls: ['./lookupzipcode.component.scss'],
  providers: [NgbPaginationConfig]
})
export class LookupzipcodeComponent implements OnInit {

  urlJson: string = "./assets/lookup/lookupZipcode.json";
  @Input() _url: string;
  @Input() nameSelect: any = "Search ...";
  @Input() idSelect: any;
  @Input() jsonSelect:string;
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild('content') contentTemplate;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  @Output() select : EventEmitter<any> = new EventEmitter();

  urlQryPaging : any = AdInsConstant.GetRefZipcodePaging;
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

  constructor(private modalService: NgbModal){
    
  }

  ngOnInit() {
    this.apiUrl = environment.foundationUrl+AdInsConstant.GetRefZipcodePaging;
    this.pageSize = 10;
  }

  choose(id, name,item) {
    console.log(id + " : " + name);
    console.log(item);
    this.idSelect = id;
    this.nameSelect = name;
    this.jsonSelect = JSON.stringify(item);
    this.select.emit(item);
    this.modalService.dismissAll();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  search(searchComp) {
    searchComp.search(this.apiUrl,this.pageNow,this.pageSize,null)
      .subscribe(
        (response) => {
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
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

  onChange(searchComp,eventValue: any) {

    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    searchComp.search(this.apiUrl, this.pageNow, this.pageSize, order);
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

  getResult(gridFooter, event){
    this.resultData = event.returnObject;
    this.totalData = event.returnObject.count;
    gridFooter.totalData = this.totalData;
    gridFooter.resultData = this.resultData;
  }

  onSelect(searchComp, event)
  {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(searchComp, this.pageNow);
  }

}
