import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-ucgridview',
  templateUrl: './ucgridview.component.html',
  styleUrls: ['./ucgridview.component.scss']
})
export class UcgridviewComponent implements OnInit {

  @Input() gridInput: any;
  @Output() output: EventEmitter<any> = new EventEmitter();
  
  pagingJson: any;
  headerList: any;
  bodyList: any;

  pageNow: any = 1;
  pageSize: any = 10;
  orderByKey: any = null;
  orderByValue: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.pagingJson = "./assets/form-setting/dummyPaging.json";

    this.initiateForm();
  }

  initiateForm() {
    this.getJSON(this.pagingJson).subscribe(data => {
      console.log(data);
      this.headerList = data.headerList;
      this.bodyList = data.bodyList;

    })
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  genAction(item, param) {
    var arrList = {};

    for (var i = 0; i < param.length; i++) {
      if (param[i].type == "mode") {
        arrList[param[i].type] = param[i].property;
      } else if (param[i].type == "key") {
        arrList[param[i].type] = item[param[i].property];
      }
    }
    return arrList;
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
    this.output.emit(gridOutput);
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.gridInput.searchComp.search(this.gridInput.apiUrl, this.gridInput.pageNow, this.gridInput.pageSize, order);
  }

  delete(refBankId: any) {
    if (confirm("Are you sure to delete this record?")) {
      // this.deleteUrl = this.settingUrl + AdInsConstant.DeleteRefBank;
      // this.bankObj = new RefBankObj();
      // this.bankObj.refBankId = refBankId;
      // this.http.post(this.deleteUrl, this.bankObj).subscribe(
      //   (response) => {
      //     this.toastr.successMessage(response['message']);
      //     this.searchPagination(1);
      //   },
      //   (error) => {
      //     console.log(error);
      //   });
    }
  }
}
