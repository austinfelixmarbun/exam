import { UcPagingObj, WhereValueObj } from "app/shared/model/UcPagingObj.Model";
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-vendor-grading-inquiry-paging',
  templateUrl: './vendor-grading-inquiry-paging.component.html',
})
export class VendorGradingInquiryPagingComponent implements OnInit {
  inputPagingObj: any;
  mode: string;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: NGXToastrService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {});
  }

  ngOnInit(): void {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;

    this.inputPagingObj.pagingJson =
      "./assets/ucpaging/dealer-grading/searchDealerGradingInquiry.json";
    this.inputPagingObj._url =
      "./assets/ucpaging/dealer-grading/searchDealerGradingInquiry.json";
  }
}
