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
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService, ExcelService] // add NgbPaginationConfig to the component providers
})
export class EmployeeComponent implements OnInit {

  //** Start Query Paging */
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  urlQryPaging : string = AdInsConstant.GetListEmployee;
  urlEnviPaging : string = environment.foundationUrl;
  //** End Query Paging */

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
      this.exportData = data.exportExcel;
    });
  }

  public getJSON(url: string): Observable<any> {
    return this.https.get(url);
  }

  ngOnInit() {
    this.pageNow = 1;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetListEmployee;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteRefEmpAndEmpBankAcc;
    this.initiateForm()
  }

  //** Start UC Search **/

  getResult(event){
    this.resultData = event.returnObject;
    this.totalData = event.returnObject.count;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event)
  {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }

  searchSort(event: any) {
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  //** End UC Search **/

  delete(refEmpId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.empObj = new RefEmpObj();
      this.empObj.refEmpId = refEmpId;
      this.httpClient.post(this.deleteUrl, this.empObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.searchPagination(this.pageNow);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        });
    }
  }



  reset(){
    this.searchComponent.initiateForm();
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
