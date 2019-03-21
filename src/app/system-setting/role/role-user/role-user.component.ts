import { ExcelService } from './../../../shared/excel-service/excel-service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RefRoleObj } from 'app/shared/model/RefRoleObj.Model';
import { RefUserObj } from 'app/shared/model/RefUserObj.Model';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-role-user',
  templateUrl: './role-user.component.html',
  providers: [NGXToastrService, NGXToastrService, ExcelService]
})
export class RoleUserComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  urlJson: string = './assets/search/searchUser.json';
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  show: any;
  exportData: any;
  excelData: any;
  refRoleObj: RefRoleObj;
  orderByKey: any = null;
  orderByValue: boolean = true;
  foundationUrl: string = environment.foundationUrl;

  refUserId: any;
  refUserObj: RefUserObj;
  refEmpObj: RefEmpObj;

  constructor(
    private http: Http,
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private adInsService: AdInsServiceService,
    private excelService: ExcelService,
    private httpClient: HttpClient,
    private location: Location
  ) { }

  ngOnInit() {
    console.log('masuk');
    this.show = AdInsConstant.showData.split(',');
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.initiateForm()
    // this.adInsService.postData(this.foundationUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
  }

  search() {
    this.spinner.show();
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefRolePaging;

    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, null)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response;
          this.totalData = response.returnObject.count;
          console.log(response);
          this.spinner.hide();
        },
        (error) => {
          console.log("Error");
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  pageChange(page: number) {
    this.pageNow = page;
    this.search();
  }

  initiateForm() {

    /// GET INFO USER AND EMPLOYEE
    var urlGetUser: any = this.foundationUrl + AdInsConstant.GetRefUser;
    var urlGetEmp: any = this.foundationUrl + AdInsConstant.GetRefEmployeeById;
    var urlGetListEmpPos: any = this.foundationUrl + AdInsConstant.GetListEmployeebyRefEmpId;
    var empObj: RefEmpObj = new RefEmpObj;
    var urlGetEmpPosition: any;

    this.refUserObj = new RefUserObj();
    this.refEmpObj = new RefEmpObj();

    this.refUserObj.refUserId = this.refUserId;

    this.httpClient.post(urlGetUser, this.refUserObj).subscribe(
      (response) => {
        console.log('Success Get');
        this.refUserObj = response['returnObject'];
        this.refEmpObj.refEmpId = +this.refUserObj.refEmpId;
        this.httpClient.post(urlGetEmp, this.refEmpObj).subscribe(
          (response) => {
            this.refEmpObj = response["returnObject"];
            console.log(this.refEmpObj);
          },
          (error) => {
            console.log('Error Get');
            console.log(error);
          })
      },
      (error) => {
        console.log('Error Get');
        console.log(error);
      }
    );

    /// FOR EXCEL EXPORT
    this.getJSON(this.urlJson).subscribe(data => {
      console.log(data);
      this.exportData = data.exportExcel;
    });
  }

  public getJSON(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  changeShowData(value: any) {
    this.pageSize = +value;
    if (this.resultData !== null && this.resultData !== '' && this.resultData !== undefined) { this.search(); }
  }

  exportAsXLSX(): void {
    this.spinner.show();
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefRolePaging;
    this.searchComponent.search(this.apiUrl, this.pageNow, 9999, null)
      .subscribe(
        (response) => {
          console.log("Success");
          this.excelData = response.returnObject.data;
          this.excelService.exportAsExcelFile(this.excelData, 'sample');
          console.log(response);
          this.spinner.hide();
        },
        (error) => {
          console.log("Error");
          console.log(error);
          this.spinner.hide();
        }
      );
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
  }

  Back(): void {
    this.location.back();
  }

  Save(RoleUserForm: NgForm): void {
  }
}
