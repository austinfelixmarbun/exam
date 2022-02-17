import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  providers: [NgbPaginationConfig, NGXToastrService]
})
export class CompanyComponent implements OnInit {

  pageNow: any;
  pageSize: any;
  apiUrl: any;
  resultData: string;

  readonly BodLink: string = NavigationConstant.COY_BOD;
  readonly CommissionerLink: string = NavigationConstant.COY_COMMISSIONER;
  readonly EditLink: string = NavigationConstant.COY_EDIT;
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private service: NGXToastrService, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.pageNow = 1;
    this.apiUrl = this.UrlConstantNew.GetRefCoyPaging;
    this.http.post(this.apiUrl, null)
      .subscribe(
        (response) => {
          this.resultData = response["returnObject"];
        }
      );
  }

}
