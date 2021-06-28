import { Component, OnInit } from "@angular/core";
import { UcPagingObj, WhereValueObj } from "app/shared/model/UcPagingObj.Model";
import { environment } from "environments/environment";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { CriteriaObj } from "app/shared/model/CriteriaObj.Model";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { URLConstant } from "app/shared/constant/URLConstant";
@Component({
  selector: "app-vendor-grading-request-paging",
  templateUrl: "./vendor-grading-request-paging.component.html",
})
export class VendorGradingRequestPagingComponent implements OnInit {
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
      "./assets/ucpaging/dealer-grading/searchDealerGradingRequest.json";
    this.inputPagingObj._url =
      "./assets/ucpaging/dealer-grading/searchDealerGradingRequest.json";
  }
}
