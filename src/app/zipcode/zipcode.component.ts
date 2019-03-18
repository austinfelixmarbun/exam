import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['./zipcode.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService]
})
export class ZipcodeComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  editUrl: any;
  bankObj: RefBankObj;
  urlJson: string = "./assets/search/searchRefZipcode.json";
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  foundationUrl: string = environment.foundationUrl;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private service: NGXToastrService) { }

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize = 25;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefZipcodePaging;
    // this.adInsService.postData(this.foundationUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
  }

  search() {
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, null)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response;
          this.totalData = response.returnObject.count;
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
    this.service.typeSuccess();
  }

  typeError() {
    this.service.typeError();
  }

  timeout() {
    this.service.timeout();
  }

  errMsg() {
    this.service.errorMessage('asdasd');
  }

  delete(refBankId: any) {
    if(confirm("Are you sure to delete this record?")) {
      this.editUrl = this.foundationUrl + AdInsConstant.DeleteRefBank;
      this.bankObj = new RefBankObj();
      this.bankObj.refBankId = refBankId;
      this.http.post(this.editUrl, this.bankObj).subscribe(
        (response) => {
          console.log(response);
        });
    }
  }

  reset(){
    this.searchComponent.initiateForm();
  }
}
