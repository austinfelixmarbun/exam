import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [NGXToastrService] // add NgbPaginationConfig to the component providers
})
export class EmployeeComponent implements OnInit {

  //** Start Query Paging */
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj : any;
  //** End Query Paging */

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
  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchEmployee.json";
    this.inputObj.enviromentUrl = environment.foundationUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetListEmployee;
    
    this.pageNow = 1;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetListEmployee;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteRefEmpAndEmpBankAcc;
    this.initiateForm()
  }

  initiateForm() {
    this.getJSON(this.inputObj._url).subscribe(data => {
      this.exportData = data.exportExcel;
    });
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  //** Start UC Search **/

  getResult(event){
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
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
      this.http.post(this.deleteUrl, this.empObj).subscribe(
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
}
