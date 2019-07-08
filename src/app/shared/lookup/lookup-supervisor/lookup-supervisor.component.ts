import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { DecimalPipe } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { CriteriaObj } from '@adins/ucsearch/lib/model/CriteriaObj.Model';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';

@Component({
  selector: 'app-lookup-supervisor',
  templateUrl: './lookup-supervisor.component.html',
  styleUrls: ['./lookup-supervisor.component.scss'],
  providers: [NGXToastrService, DecimalPipe]
})
export class LookupSupervisorComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  @Input() lookupInput: any;
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild("content") contentTemplate;
  @ViewChild(UcgridfooterComponent) ucgridFooter;

  refEmpId: any;
  empName: any;
  inputObj:any;
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
    this.apiUrl = this.foundationUrl + AdInsConstant.GetListEmployee;
    this.show = AdInsConstant.showData.split(",");
    this.pageNow = 1;
    this.pageSize = this.show[0];

    /* #region   Additional Criteria*/
    this.inputObj = new InputSearchObj();
    this.inputObj._url = this.lookupInput.urlJson;
    this.inputObj.enviromentUrl = this.lookupInput.urlEnviPaging;
    this.inputObj.apiQryPaging = this.lookupInput.urlQryPaging;
    /* #endregion */
  }

  choose(id, name, item) {
    console.log(id + " : " + name);
    console.log(item);
    this.lookupInput.idSelect = id;
    this.refEmpId = id;
    this.empName = name;
    this.lookupInput.nameSelect = name;
    this.lookupInput.jsonSelect = JSON.stringify(item);
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
    console.log(this.lookupInput.urlQryPaging);
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
