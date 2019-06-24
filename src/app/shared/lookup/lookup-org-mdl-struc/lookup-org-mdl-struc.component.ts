import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { environment } from 'environments/environment';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from "app/shared/model/InputSearchObj.Model";


@Component({
  selector: "app-lookup-org-mdl-struc",
  templateUrl: "./lookup-org-mdl-struc.component.html",
  providers: [NGXToastrService, DecimalPipe]
})
export class LookupOrgMdlStrucComponent implements OnInit {
  constructor(private modalService: NgbModal) { }

  @Input() nameSelect: any = "Search ...";
  @Input() idSelect: any;
  @Input() jsonSelect: string;
  @Input() addCritInput: CriteriaObj[] = null;
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild("content") contentTemplate;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;

  bizUnitName: any;
  refBizUnitId: any;

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
  foundationUrl: string = environment.foundationUrl;

  addCrit: Array<any>;

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/lookup/lookupOrgMdlStruc.json";
    this.inputObj.enviromentUrl = environment.foundationUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetOrgMdlStrucPaging;
    
    this.apiUrl = this.foundationUrl + AdInsConstant.GetOrgMdlStrucPaging;
    this.show = AdInsConstant.showData.split(",");
    this.pageNow = 1;
    this.pageSize = this.show[0];

    /* #region   Additional Criteria*/
    if (this.addCritInput !== null) {
      this.addCrit = new Array();
      for (var i = 0; i < this.addCritInput.length; i++) {
        this.addCrit.push(this.addCritInput[i]);
      }
    }
    this.inputObj.addCritInput = this.addCrit;
    /* #endregion */
  }

  choose(id, name, item) {
    console.log(id + " : " + name);
    console.log(item);
    this.idSelect = id;
    this.refBizUnitId = id;
    this.bizUnitName = name;
    this.nameSelect = name;
    this.jsonSelect = JSON.stringify(item);
    this.modalService.dismissAll();
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  getResult(ucgridFooter, event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    ucgridFooter.pageNow = event.pageNow;
    ucgridFooter.totalData = this.totalData;
    ucgridFooter.resultData = this.resultData;
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
    searchComponent
      .search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit)
      .subscribe(
        response => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
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
    searchComp
      .search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit)
      .subscribe(
        response => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
  }
}
