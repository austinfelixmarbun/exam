import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-verf-paging',
  templateUrl: './verf-paging.component.html',
  styleUrls: ['./verf-paging.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService]
})
export class VerfPagingComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  urlJson: string = "./assets/search/searchLeaveVerif.json";
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  apiUrlGateway: any;

  foundationUrl: string = environment.foundationUrl;

  constructor(private http: Http, private spinner: NgxSpinnerService, private service: NGXToastrService, private adInsService: AdInsServiceService) { }

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrlGateway = 'https://172.19.11.114:8243/POC_TEST2/v1/LeaveManagement/GetLeaveMngmtPagingReq';
    this.apiUrl = 'http://R2AppServer/POC/LeaveManagement/GetLeaveMngmtPagingReq';
    console.log('ip:', this.apiUrl);
    // this.adInsService.postData(this.foundationUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
  }

  search() {
    this.spinner.show();
    console.log('api',this.apiUrl);
    this.searchComponent.search(this.apiUrlGateway, this.pageNow, this.pageSize, null)
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

}
