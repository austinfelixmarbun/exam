import { AuthFormObj } from "app/shared/model/AuthFormObj.Model";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { SearchComponent } from "app/shared/search/search.component";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from "@angular/common/http";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UCGridFooterComponent } from "app/shared/UserControl/ucgrid-footer/ucgrid-footer.component";
import { ExcelService } from "app/shared/excel-service/excel-service";
import { environment } from "environments/environment";

@Component({
  selector: "app-role-form-feature",
  templateUrl: "./role-form-feature.component.html",
  providers: [NGXToastrService, NGXToastrService, ExcelService]
})
export class RoleFormFeatureComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
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
    private service: NGXToastrService,
    private httpClient: HttpClient,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["refRoleId"] != null) {
        this.refRoleId = params["refRoleId"];
      }
      if (params["refFormId"] != null) {
        this.refFormId = params["refFormId"];
      }
      if (params["roleName"] != null) {
        this.roleName = params["roleName"];
      }
      if (params["formName"] != null) {
        this.formName = params["formName"];
      }
    });
  }

  ngOnInit() {
    console.log("masuk");
    this.initiateForm();
  }

  initiateForm() {
    this.spinner.show();
    var feature: any;
    var urlGetFeature: any =
      this.foundationUrl + AdInsConstant.GetListRefFeature;
    var urlGetFeatureAuth: any =
      this.foundationUrl + AdInsConstant.GetAuthByRefFormIdAndRefRoleId;
    var authForm: AuthFormObj = new AuthFormObj();
    authForm.refRoleId = +this.refRoleId;
    authForm.refFormId = +this.refFormId;
    this.httpClient.post(urlGetFeature, authForm).subscribe(
      response => {
        this.resultData = response;

        response["returnObject"].forEach(element => {
          feature = { formComponent: element.formComponent, value: true };
          this.listFeature.push(feature);
        });

        this.httpClient.post(urlGetFeatureAuth, authForm).subscribe(
          hasil => {
            console.log("hasil", hasil);
            if (
              hasil["returnObject"]["formFeature"] != undefined &&
              hasil["returnObject"]["formFeature"] != '' &&
              hasil["returnObject"]["formFeature"] != null

            ) {
              this.listFeature = [];
              var featureData: any = JSON.parse(
                hasil["returnObject"]["formFeature"]
              );
              console.log("featureData", featureData["formFeature"]);
              featureData["formFeature"].forEach(data => {
                feature = {
                  formComponent: data.formComponent,
                  value: data.value
                };
                this.listFeature.push(feature);
              });
            }
            this.spinner.hide();
            console.log(this.listFeature);
          },
          error => {
            console.log(error);
            this.spinner.hide();
          }
        );

        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  Back(): void {
    this.location.back();
  }

  Save(): void {
    var assignRoleToFormsUrl =
      this.foundationUrl + AdInsConstant.UpdateFormFeatureAuthForm;
    var formFeatureobj = {
      formFeature: Array<any>()
    };
    formFeatureobj.formFeature = this.listFeature;
    this.formFeature = JSON.stringify(formFeatureobj);
    // this.formFeature = "{formFeature:[";
    // this.listFeature.forEach(element => {
    //   this.formFeature +=
    //     "{formComponent: " +
    //     element.formComponent +
    //     ", value:" +
    //     element.value +
    //     "}, ";
    // });
    // this.formFeature += "]}";
    var abc =
      '{"formFeature":[{"formComponent":"ADD","value":true},{"formComponent":"EDIT","value":true},{"formComponent":"DELETE","value":true}]}';
    this.authFormObj.refRoleId = this.refRoleId;
    this.authFormObj.refFormId = this.refFormId;
    this.authFormObj.formFeature = this.formFeature;
    console.log(this.authFormObj);
    console.log("JSON", JSON.parse(abc));
    this.httpClient.post(assignRoleToFormsUrl, this.authFormObj).subscribe(
      response => {
        this.service.typeSave(response["message"]);
        this.location.back();
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.service.typeErrorCustom(error);
        this.spinner.hide();
      }
    );
  }

  Checked(formComponent: any, isChecked: any): void {
    var newFeature: any;
    if (isChecked) {
      newFeature = {
        formComponent: formComponent["formComponent"],
        value: true
      };
      let index = this.listFeature.indexOf(formComponent);
      this.listFeature[index] = newFeature;
    } else {
      newFeature = {
        formComponent: formComponent["formComponent"],
        value: false
      };
      let index = this.listFeature.indexOf(formComponent);
      this.listFeature[index] = newFeature;
    }
    console.log(this.listFeature);
  }
}
