import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { AdInsServiceService } from "app/ad-ins-service.service";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { RefUserObj } from "app/shared/model/RefUserObj.Model";
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { DecimalPipe } from "@angular/common";

@Component({
  selector: "app-user-paging",
  templateUrl: "./user-paging.component.html",
  providers: [NGXToastrService, NGXToastrService, ExcelService, DecimalPipe]
})
export class UserPagingComponent implements OnInit {
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  urlJson: string = "./assets/search/searchUser.json";
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  show: any;
  exportData: any;
  ExcelData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  foundationUrl: string = environment.foundationUrl;
  urlQryPaging: string = AdInsConstant.GetRefUserPaging;
  urlEnviPaging : string = environment.foundationUrl;
  constructor(
    private http: Http,
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private adInsService: AdInsServiceService,
    private excelService: ExcelService,
    private https: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.show = AdInsConstant.showData.split(",");
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefUserPaging;

    this.initiateForm();
    // this.adInsService.postData(this.foundationUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
  }

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }
  searchPagination(event: number) {
    this.pageNow = event;

    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      };
    }
    this.searchComponent
      .search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  initiateForm() {}

  searchSort(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue;
    } else {
      this.orderByValue = true;
    }
    this.orderByKey = event.target.attributes.name.nodeValue;
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    };
    this.searchComponent
      .search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  resetPassword(id: any) {
    if (confirm("Are you sure to reset this password to default?")) {
      var resetPassUrl = this.foundationUrl + AdInsConstant.ResetPassword;
      var refUser = new RefUserObj();
      refUser.refUserId = id;
      this.https.post(resetPassUrl, refUser).subscribe(
        response => {
          this.service.successMessage(response["message"]);
          this.router
            .navigateByUrl("/dashboard/dash-board", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/systemSetting/refUser"]));
        },
        error => {
          console.log(error);
          this.service.typeErrorCustom(error);
        }
      );
    }
  }
}
