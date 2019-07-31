import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private http: HttpClient, public toastr: ToastrService) { }

  ngOnInit() {
    this.initiateForm();
  }

  initiateForm() {
    this.getJSON(this.gridInput.pagingJson).subscribe(data => {
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
      } else {
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

  searchPagination(event: number) {
    this.pageNow = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.gridInput.searchComp.search(this.gridInput.apiUrl, this.pageNow, this.pageSize, order);
  }

  delete(key: any, value: any) {
    if (confirm("Are you sure to delete this record?")) {
      var delId = {};
      delId[key] = value;
      this.http.post(this.gridInput.deleteUrl, delId).subscribe(
        (response) => {
          this.toastr.success(response['message'], 'Success!');
          this.searchPagination(this.pageNow);
        },
        (error) => {
          console.log(error);
        });
    }
  }
}
