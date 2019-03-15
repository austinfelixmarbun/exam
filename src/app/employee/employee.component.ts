import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { ExcelService } from 'app/shared/excel-service/excel-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService, ExcelService] // add NgbPaginationConfig to the component providers
})
export class EmployeeComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  urlJson: string = "./assets/search/searchEmployee.json";
  resultData: string;
  ExcelData: any;
  empObj: RefEmpObj;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  apiUrl: any;
  deleteUrl: any;
  exportData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;

  foundationUrl: string = environment.foundationUrl;
  constructor(private http: Http, private httpClient: HttpClient, private spinner: NgxSpinnerService, private toastr: NGXToastrService, private excelService: ExcelService, private https: HttpClient) { }

  initiateForm() {
    this.getJSON(this.urlJson).subscribe(data => {
      console.log(data);
      this.exportData = data.exportExcel;
    });
  }

  public getJSON(url: string): Observable<any> {
    return this.https.get(url);
  }

  ngOnInit() {
    this.pageNow = 1;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetListEmployee;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteRefEmployee;
    this.initiateForm()
  }

  search() {
    this.orderByKey = null
    this.orderByValue = true
    this.pageNow = 1;
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, null)
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

  searchSort(event: any) {
    if (this.resultData != null) {
      if (this.orderByKey == event.target.attributes.name.nodeValue) {
        this.orderByValue = !this.orderByValue
      } else {
        this.orderByValue = true
      }
      this.orderByKey = event.target.attributes.name.nodeValue
      var order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
      this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
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

  searchPagination(event: number) {
    this.pageNow = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
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

  onChange() {
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
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

  delete(refEmpId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.empObj = new RefEmpObj();
      this.empObj.refEmpId = refEmpId;
      this.httpClient.post(this.deleteUrl, this.empObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.onChange()
        },
        (error) => {
          console.log("Error");
          console.log(error);
        });
    }
  }

  exportAsXLSX(): void {
    this.searchComponent.search(this.apiUrl, this.pageNow, 9999, null)
      .subscribe(
        (response) => {
          console.log("Success");
          this.ExcelData = response.returnObject.data;
          this.excelService.exportAsExcelFile(this.ExcelData, 'sample');
          console.log(response);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
  }

  pageChange(page: number) {
    this.pageNow = page;
    this.search();
  }

  // Success Type
  typeSuccess() {
    this.toastr.typeSuccess();
  }

  typeError() {
    this.toastr.typeError();
  }

  timeout() {
    this.toastr.timeout();
  }

  errMsg() {
    this.toastr.errorMessage('asdasd');
  }
}
