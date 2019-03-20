import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchComponent } from 'app/shared/search/search.component';
import { NgbModal, ModalDismissReasons, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment} from '../../../../environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-lookupdistrict',
  templateUrl: './lookup-district.component.html',
  providers: [NgbPaginationConfig]
})
export class LookupDistrictComponent implements OnInit {

  urlJson: string = "./assets/lookup/lookupDistrict.json";
  @Input() _url: string;
  @Input() nameSelect: any = "Search ...";
  @Input() idSelect: any;
  @Input() jsonSelect:string;
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild('content') contentTemplate;

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
  addCrit : CriteriaObj[];
  constructor(private modalService: NgbModal){
    
  }

  ngOnInit() {
    this.addCrit = new Array();
    this.apiUrl = environment.foundationUrl+AdInsConstant.GetRefProvDistrictPaging;
    this.pageSize = 10;
    var critIsActive = new CriteriaObj();

    critIsActive.propName = "isActive";
    critIsActive.value = "1";
    critIsActive.restriction = AdInsConstant.RestrictionEq;

    var critType = new CriteriaObj();
    critType.propName = "type";
    critType.value = "DIS";
    critType.restriction = AdInsConstant.RestrictionEq;
    this.addCrit.push(critIsActive);
    this.addCrit.push(critType);
  }

  choose(id, name,item,searchComp) {
    console.log(id + " : " + name);
    console.log(item);
    this.idSelect = id;
    this.nameSelect = name;
    this.jsonSelect = JSON.stringify(item);
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

  search(searchComp) {
    searchComp.search(this.apiUrl,this.pageNow,this.pageSize,null,this.addCrit)
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
    searchComp.search(this.apiUrl, this.pageNow, this.pageSize, order,this.addCrit)
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

  searchPagination(searchComp,event: number) {
    this.pageNow = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    searchComp.search(this.apiUrl, this.pageNow, this.pageSize, order,this.addCrit)
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

  onChange(searchComp,eventValue: any) {

    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    searchComp.search(this.apiUrl, this.pageNow, this.pageSize, order,this.addCrit)
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
