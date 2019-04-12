import { OrganizationObj } from "app/shared/model/OrganizationObj.Model";
import { environment } from "environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { NgForm } from "@angular/forms";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-org-add-edit",
  templateUrl: "./org-add-edit.component.html",
  styleUrls: ["./org-add-edit.component.scss"],
  providers: [NGXToastrService]
})
export class OrgAddEditComponent implements OnInit {
  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  parents: any;
  orgObj: OrganizationObj;

  param: string;
  mode: string = "add";

  parentId: any;
  orgName: any;
  hierarchyNo: any;
  isActive: any;
  result: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: NGXToastrService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private location: Location
  ) {
    this.route.queryParams.subscribe(params => {
      this.param = params["refOrgId"];
      this.mode = params["mode"];
    });
  }

  ngOnInit() {
    this.GetListParents();
    this.parentId = "None";
    if (this.mode === "edit") {
      this.FillFormEdit();
    } else {
      this.mode = "add";
      this.orgObj = new OrganizationObj();
    }
  }

  Back(): void {
    this.location.back();
  }

  Save(OrgObjectForm: NgForm): void {
    this.spinner.show();

    if (
      +OrgObjectForm.value.hierarchyNo > 1 &&
      (OrgObjectForm.value.parentId === undefined ||
        OrgObjectForm.value.parentId === "None")
    ) {
      this.service.typeErrorCustom("Must Have Parent");
      this.spinner.hide();
    } else {
      if (this.mode !== "edit") {
        this.apiUrl = this.foundationUrl + AdInsConstant.AddRefOrg;

        //GENERATE OBJECT
        this.orgObj = new OrganizationObj();
        this.orgObj.refOrgId = 0;
        this.orgObj.oldParentId = 0;
        this.orgObj.orgName = OrgObjectForm.value.orgName;
        this.orgObj.hierarchyNo = OrgObjectForm.value.hierarchyNo;
        if (
          +OrgObjectForm.value.hierarchyNo > 1 &&
          OrgObjectForm.value.parentId !== "None"
        ) {
          this.orgObj.parentId = OrgObjectForm.value.parentId;
        }
        if (OrgObjectForm.value.isActive) {
          this.orgObj.isActive = "1";
        } else {
          this.orgObj.isActive = "0";
        }

        //SAVE
        this.http.post(this.apiUrl, this.orgObj).subscribe(
          response => {
            console.log("Success Save");

            this.service.typeSave(response["message"]);
            this.router
              .navigateByUrl("/organization/organization", {
                skipLocationChange: true
              })
              .then(() =>
                this.router.navigate(["/organization/organization/add"])
              );
            this.spinner.hide();
          },
          error => {
            console.log("Error Save");

            this.service.typeErrorCustom(error);
            this.spinner.hide();
          }
        );
      } else {
        this.apiUrl =
          this.foundationUrl + AdInsConstant.EditRefOrgWithOldParentId;

        //GENERATE OBJECT
        this.orgObj.oldParentId = this.orgObj.parentId;
        this.orgObj.orgName = OrgObjectForm.value.orgName;
        this.orgObj.hierarchyNo = OrgObjectForm.value.hierarchyNo;
        if (
          +OrgObjectForm.value.hierarchyNo > 1 &&
          OrgObjectForm.value.parentId !== "None"
        ) {
          this.orgObj.parentId = OrgObjectForm.value.parentId;
        }
        if (OrgObjectForm.value.isActive) {
          this.orgObj.isActive = "1";
        } else {
          this.orgObj.isActive = "0";
        }

        //SAVE
        this.http.post(this.apiUrl, this.orgObj).subscribe(
          response => {
            console.log("Success Edit");

            this.service.typeSave(response["message"]);
            this.location.back();
            this.spinner.hide();
          },
          error => {
            console.log("Error Edit");

            this.service.typeErrorCustom(error);
            this.spinner.hide();
          }
        );
      }
    }
  }

  GetListParents() {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetListAllRefOrg;
    var organizationObj = new OrganizationObj();
    this.http.post(this.apiUrl, organizationObj).subscribe(
      response => {
        this.parents = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  FillFormEdit() {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefOrg;
    this.orgObj = new OrganizationObj();
    this.orgObj.refOrgId = +this.param;

    this.http.post(this.apiUrl, this.orgObj).subscribe(
      response => {
        this.orgObj = response["returnObject"];

        if (this.orgObj.isActive === "1") {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
        if (this.orgObj.parentId === null) {
          this.parentId = "None";
        } else {
          this.parentId = +this.orgObj.parentId;
        }
        this.orgName = this.orgObj.orgName;
        this.hierarchyNo = this.orgObj.hierarchyNo;
      },
      error => {
        console.log(error);
      }
    );
  }
}
