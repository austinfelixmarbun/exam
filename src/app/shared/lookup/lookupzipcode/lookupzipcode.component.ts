import { Component, OnInit, Input, ViewChild, ViewChildren, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { formatDate } from '@angular/common';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { SearchComponent } from 'app/shared/search/search.component';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-lookupzipcode',
  templateUrl: './lookupzipcode.component.html',
  providers: [NGXToastrService]
})
export class LookupzipcodeComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  urlJson: string = "./assets/lookup/lookupZipcode.json";
  @Input() _url: string;
  @Input() nameSelect: any = "Search ...";
  @Input() idSelect: any;
  @Input() jsonSelect: string;
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild('content') contentTemplate;

  roleName: any;
  refRoleId: any;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  @Output() select : EventEmitter<any> = new EventEmitter();

  urlQryPaging : any = AdInsConstant.GetRefZipcodePaging;
  urlEnviPaging : string = environment.settingUrl;
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

  settingUrl: string = environment.settingUrl;

  ngOnInit() {
    this.apiUrl = this.settingUrl + AdInsConstant.GetRefZipcodePaging;
    this.show = AdInsConstant.showData.split(',');
    this.pageNow = 1;
    this.pageSize = this.show[0];

  }

  choose(id, name, item) {
    console.log(id + " : " + name);
    console.log(item);
    this.idSelect = id;
    this.refRoleId = id;
    this.roleName = name;
    this.nameSelect = name;
    this.jsonSelect = JSON.stringify(item);
    this.select.emit(item);
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
