import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NGXToastrService} from 'app/components/extra/toastr/toastr.service';
import {UcPagingObj} from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-vendor-grading-inquiry-paging-x',
  templateUrl: './vendor-grading-inquiry-paging-x.component.html',
})
export class VendorGradingInquiryPagingXComponent implements OnInit {
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
    this.inputPagingObj.pagingJson =
      "./assets/ucpaging/dealer-grading/searchDealerGradingInquiry.json";
    this.inputPagingObj._url =
      "./assets/ucpaging/dealer-grading/searchDealerGradingInquiry.json";
  }
}
