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



@Component({
  selector: 'app-user-paging',
  templateUrl: './user-paging.component.html',
  providers: [NGXToastrService,  NGXToastrService, ExcelService]
})
export class UserPagingComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  urlJson: string = './assets/search/searchUser.json';
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  show: any;
  exportData: any;
  ExcelData: any;

  foundationUrl: string = environment.foundationUrl;

  constructor(
    private http: Http,
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private adInsService: AdInsServiceService,
    private excelService: ExcelService,
    private https: HttpClient
  ) { }

  ngOnInit() {
    this.show = AdInsConstant.showData.split(',');
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefUserPaging;

    this.initiateForm()
    // this.adInsService.postData(this.foundationUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
  }

  search() {
    this.spinner.show();

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
    this.getJSON(this.urlJson).subscribe(data => {
      console.log(data);
      this.exportData = data.exportExcel;
    });
  }

  public getJSON(url: string): Observable<any> {
    return this.https.get(url);
  }

  changeShowData(value: any) {
    this.pageSize = +value;
    if (this.resultData !== null && this.resultData !== '' && this.resultData !== undefined) { this.search(); }
  }

  exportAsXLSX(): void {
    this.spinner.show();
    this.searchComponent.search(this.apiUrl, this.pageNow, 9999, null)
      .subscribe(
        (response) => {
          console.log("Success");
          this.ExcelData = response.returnObject.data;
          this.excelService.exportAsExcelFile(this.ExcelData, 'sample');
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

}
