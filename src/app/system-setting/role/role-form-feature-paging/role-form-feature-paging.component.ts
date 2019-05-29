import { AuthFormObj } from "app/shared/model/AuthFormObj.Model";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { SearchComponent } from "app/shared/search/search.component";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from "@angular/common/http";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UCGridFooterComponent } from "app/shared/UserControl/ucgrid-footer/ucgrid-footer.component";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";
import { DecimalPipe } from "@angular/common";
import { RefFormObj } from "app/shared/model/RefFormObj.Model";
@Component({
  selector: "app-role-form-feature-paging",
  templateUrl: "./role-form-feature-paging.component.html"
})
export class RoleFormFeaturePagingComponent implements OnInit {
  resultData: any;
  apiUrl: any;
  deleteUrl: any;
  authFormObj: AuthFormObj = new AuthFormObj();
  foundationUrl: string = environment.foundationUrl;
  refRoleId: any;
  refFormId: any;
  roleName: any;
  formName: any;
  check: any;

  formFeature: any;
  listSelectedId: Array<any> = [];
  listDeletedId: Array<any> = [];
  listFeature: Array<any> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["refRoleId"] != null) {
        this.refRoleId = params["refRoleId"];
      }
    });
  }

  ngOnInit() {
    console.log("masuk");
    this.initiateForm();
    // this.adInsService.postData(this.foundationUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
  }

  initiateForm() {
    ///Get Data Auth Form
    var urlGetRefRole: any =
      this.foundationUrl + AdInsConstant.GetRefRoleByRefRoleId;
    var getAuthFormUrl: any =
      this.foundationUrl + AdInsConstant.GetAllAuthFormsByRefRoleId;
    this.authFormObj = new AuthFormObj();
    this.authFormObj.refRoleId = this.refRoleId;
    console.log(urlGetRefRole);
    this.httpClient.post(urlGetRefRole, this.authFormObj).subscribe(
      response => {
        this.authFormObj = response["returnObject"];
        this.spinner.hide();
        this.httpClient.post(getAuthFormUrl, this.authFormObj).subscribe(
          response => {
            this.resultData = response["returnObject"];
            console.log(response)
          },
          error => {
            console.log(error);
            this.spinner.hide();
          }
        );
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  Back(): void {
    this.location.back();
  }
}
