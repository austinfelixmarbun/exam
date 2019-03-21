import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService]
})
export class CompanyComponent implements OnInit {

  pageNow: any;
  pageSize: any;
  apiUrl: any;
  foundationUrl: string = environment.foundationUrl;
  resultData: string;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private service: NGXToastrService) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.pageNow = 1;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefCoyPaging;
    this.http.post(this.apiUrl, null)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response["returnObject"];
          console.log(response);
          console.log(this.resultData);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
  }

}
