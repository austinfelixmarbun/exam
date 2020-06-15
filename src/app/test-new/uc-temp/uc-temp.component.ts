import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-uc-temp',
  templateUrl: './uc-temp.component.html',
  styleUrls: ['./uc-temp.component.css']
})
export class UcTempComponent implements OnInit {

  @Input() tempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  @Output() callback: EventEmitter<object> = new EventEmitter();
  inputSearchObj: InputSearchObj = new InputSearchObj();

  @ViewChild("ucTempSearch") ucSearch: UCSearchComponent;
  @ViewChild("ucTempFooter") ucGridFooter: UcgridfooterComponent;

  IsOverflow: boolean = false;
  apiUrl: string = "";
  totalData: number = 0;
  pageNow: number = 1;
  pageSize: number = 10;
  orderByKey: string = null;
  orderByValue: boolean = true;
  checkboxAll: boolean = false;
  listSelectedId: Array<number> = new Array<number>();
  tempListId: Array<number> = new Array<number>();
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  arrAddCrit: Array<CriteriaObj> = new Array<CriteriaObj>();

  resultData: any;
  tempData: Array<any> = new Array<any>();
  configuration: any;
  constructor(private http: HttpClient, public toastr: ToastrService) { }

  ngOnInit() {
    console.log("uctemp");

    this.getJSON(this.tempPagingObj.urlJson).subscribe(data => {
      this.configuration = data;
      if (data.orderby != null) {
        this.orderByKey = data.orderby.key;
        this.orderByValue = data.orderby.value;
      }

      if (this.configuration.headerList.length >= 8) {
        this.IsOverflow = true;
      }
    });

    //Set UcSearch input obj
    this.apiUrl = this.tempPagingObj.enviromentUrl + this.tempPagingObj.apiQryPaging;
    this.inputSearchObj._url = this.tempPagingObj.urlJson;
    this.inputSearchObj.enviromentUrl = this.tempPagingObj.enviromentUrl;
    this.inputSearchObj.apiQryPaging = this.tempPagingObj.apiQryPaging;
    this.inputSearchObj.addCritInput = this.tempPagingObj.addCritInput;
    this.inputSearchObj.ddlEnvironments = this.tempPagingObj.ddlEnvironments;

    this.arrCrit = this.tempPagingObj.addCritInput;
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  //** Start UC Search **/
  getResult(event) {
    if (event.response.Count == 0) {
      // this.toastr.error("No Data Found");
    }
    this.resultData = event.response;
    this.totalData = event.response.Count;
    this.ucGridFooter.pageNow = event.pageNow;
    this.ucGridFooter.totalData = this.totalData;
    this.ucGridFooter.resultData = event.response;
    this.listSelectedId = new Array<number>();
    this.checkboxAll = false;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.totalData = event.Count;
    this.searchPagination(this.pageNow);
  }

  Checked(SelectedId: number, isChecked: boolean): void {
    if (isChecked) {
      this.listSelectedId.push(SelectedId);
    } else {
      const index = this.listSelectedId.indexOf(SelectedId)
      if (index > -1) { this.listSelectedId.splice(index, 1); }
    }

    if (this.listSelectedId.length != this.totalData) {
      this.checkboxAll = false;
    } else {
      this.checkboxAll = true;
    }
  }

  SelectAll(condition: boolean) {
    this.checkboxAll = condition;
    if (condition) {
      for (let i = 0; i < this.resultData.Data.length; i++) {
        if (this.listSelectedId.indexOf(this.resultData.Data[i][this.configuration.keyProperty]) < 0) {
          this.listSelectedId.push(this.resultData.Data[i][this.configuration.keyProperty]);
        }
      }
    } else {
      for (let i = 0; i < this.resultData.Data.length; i++) {
        let index = this.listSelectedId.indexOf(this.resultData.Data[i][this.configuration.keyProperty]);
        if (index > -1) {
          this.listSelectedId.splice(index, 1);
        }
      }
    }
  }

  addToTemp() {
    if (this.listSelectedId.length != 0) {
      for (var i = 0; i < this.listSelectedId.length; i++) {
        this.tempListId.push(this.listSelectedId[i]);
      }
      for (var i = 0; i < this.listSelectedId.length; i++) {
        var object = this.resultData.Data.find(x => x.VendorId == this.listSelectedId[i]);
        this.tempData.push(object);
      }

      //Criteria from added data
      this.arrAddCrit = new Array<CriteriaObj>();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = this.configuration.keyPropCriteria;
      addCrit.restriction = "NotIn";
      addCrit.listValue = this.tempListId;
      this.arrAddCrit.push(addCrit);

      var order = null;
      if (this.orderByKey != null) {
        order = {
          key: this.orderByKey,
          value: this.orderByValue
        };
      }
      this.inputSearchObj.addCritInput = this.arrAddCrit;
      this.ucSearch.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);
      this.listSelectedId = [];
      this.callback.emit(this.tempListId);
    } else {
      this.toastr.warning("Please select at least one data");
    }
  }

  deleteFromTemp(SelectedId: number) {
    if (confirm('Are you sure to delete this data?')) {
      this.arrAddCrit = new Array<CriteriaObj>();
      if (this.arrCrit.length != 0) {
        for (var i = 0; i < this.arrCrit.length; i++) {
          this.arrAddCrit.push(this.arrCrit[i]);
        }
      }

      var index = this.tempListId.indexOf(SelectedId);
      if (index > -1) {
        this.tempListId.splice(index, 1);
        this.tempData.splice(index, 1);
      }
      var addCrit = new CriteriaObj();
      addCrit.DataType = "numeric";
      addCrit.propName = this.configuration.keyPropCriteria;
      addCrit.restriction = "NotIn";
      addCrit.listValue = this.tempListId;
      if (this.tempListId.length != 0) {
        this.arrAddCrit.push(addCrit);
      }
      var order = null;
      if (this.orderByKey != null) {
        order = {
          key: this.orderByKey,
          value: this.orderByValue
        };
      }
      this.inputSearchObj.addCritInput = this.arrAddCrit;
      this.ucSearch.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrAddCrit);
      this.callback.emit(this.tempListId);
    }
  }

  searchSort(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue;
    } else {
      this.orderByValue = true;
    }
    this.orderByKey = event.target.attributes.name.nodeValue;
    var gridOutput = {
      orderByKey: this.orderByKey,
      orderByValue: this.orderByValue
    }
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.ucSearch.search(this.apiUrl, this.pageNow, this.pageSize, order)
  }

  searchPagination(event: number = 1) {
    this.pageNow = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.ucSearch.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }
}
