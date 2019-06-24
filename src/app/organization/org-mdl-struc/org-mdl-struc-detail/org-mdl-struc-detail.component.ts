import { BusinessUnitObj } from "app/shared/model/BusinessUnitObj.Model";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { OrgMdlStrucObj } from "app/shared/model/OrgMdlStrucObj";
import { OrgMdlObj } from "app/shared/model/OrgMdlObj.Model";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { NgForm } from "@angular/forms";
import { environment } from "environments/environment";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";

@Component({
  selector: "app-org-mdl-struc-detail",
  templateUrl: "./org-mdl-struc-detail.component.html",
  providers: [NGXToastrService]
})
export class OrgMdlStrucDetailComponent implements OnInit {
  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  orgModelObj: OrgMdlObj;
  orgMdlStrucObj: OrgMdlStrucObj;
  type: string = "add";
  resultData: any;

  orgMdlStrucId: any;
  orgMdlId: any;

  orgMdlLvl: any = '1';
  refBizUnitId: any;
  parentId: any;
  isActive: any;

  /* #region  Lookup Biz Unit */
  bizUnitName: any;
  jsonSelectBizUnit: any;
  /* #endregion */

  /* #region  Lookup Mdl Struc */
  parentName: any;
  jsonSelectStruct: any;
  /* #endregion */

  urlJson: any = "./assets/lookup/lookupOrgMdlStruc.json";
  urlEnviPaging: any = environment.foundationUrl;
  urlQryPaging: any = AdInsConstant.GetOrgMdlStrucPaging;
  /* #region  Addition Criteria Lookup */
  addCrit: Array<any>;
  /* #endregion */

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private service: NGXToastrService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["mode"] != null) {
        this.type = params["mode"];
      }
      if (params["orgMdlId"] != null) {
        this.orgMdlId = params["orgMdlId"];
        console.log("MdlCode", this.orgMdlId);
      }
      if (params["orgMdlStrucId"] != null) {
        this.orgMdlStrucId = params["orgMdlStrucId"];
      }
      if (params["refBizUnitId"] != null) {
        this.refBizUnitId = params["refBizUnitId"];
      }
    });
  }

  ngOnInit() {
    console.log("masuk");
    this.orgMdlStrucObj = new OrgMdlStrucObj();
    this.InitForm();
    if (this.type === "edit") {
      this.apiUrl = this.foundationUrl + AdInsConstant.GetOrgMdlStrucById;
      this.orgMdlStrucObj = new OrgMdlStrucObj();
      this.orgMdlStrucObj.orgMdlStrucId = +this.orgMdlStrucId;
      this.httpClient.post(this.apiUrl, this.orgMdlStrucObj).subscribe(
        response => {
          console.log("Success Get");
          this.orgMdlStrucObj = response["returnObject"];
          this.orgMdlLvl = response["returnObject"]["orgMdlLvl"];
          this.refBizUnitId = response["returnObject"]["refBizUnitId"];
          this.parentId = response["returnObject"]["parentId"];
          if (response["returnObject"]["isActive"] === "1") {
            this.isActive = true;
          } else {
            this.isActive = false;
          }

          /* #region Fill Lookup Mdl Struct */
          if(this.parentId !== 0)
          {
          var orgMdlStruc: OrgMdlStrucObj = new OrgMdlStrucObj();
          var getOrgMdlSructUrl =
            this.foundationUrl + AdInsConstant.GetOrgMdlStrucById;
          var getBizUnitUrl: any =
            this.foundationUrl + AdInsConstant.GetRefBizUnit;
          orgMdlStruc.orgMdlStrucId = +this.parentId;
          this.httpClient
            .post(getOrgMdlSructUrl, orgMdlStruc)
            .subscribe(response => {
              console.log("obj", response["returnObject"]);
              this.jsonSelectStruct = response["returnObject"];
              var bizUnit: BusinessUnitObj = new BusinessUnitObj();
              bizUnit.RefBizUnitId = response["returnObject"]["refBizUnitId"];
              this.httpClient
                .post(getBizUnitUrl, bizUnit)
                .subscribe(response => {
                  this.parentName = response["returnObject"]["bizUnitName"];
                });
            });
          }
          /* #endregion */

          /* #region Fill Lookup Biz Unit */
          var bizUnitObj: BusinessUnitObj = new BusinessUnitObj();
          var getBizUnitUrl: any =
            this.foundationUrl + AdInsConstant.GetRefBizUnit;
          bizUnitObj.RefBizUnitId = this.refBizUnitId;
          this.httpClient
            .post(getBizUnitUrl, bizUnitObj)
            .subscribe(response => {
              bizUnitObj = response["returnObject"];
              this.bizUnitName = response["returnObject"]['bizUnitName'];
              this.jsonSelectBizUnit = response["returnObject"];
            });
          /* #endregion */
        },
        error => {
          console.log("Error Get");
          console.log(error);
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  Save(OrgMdlForm: NgForm, lookupBizUnit: any, lookupMdlStruc: any): void {
    this.spinner.show();
    console.log('lms',lookupMdlStruc);
    console.log('lbu',lookupBizUnit);

    if (OrgMdlForm.value.orgMdlLvl > 1 && lookupMdlStruc.idSelect === undefined) {
      this.service.typeSuccess();
      this.service.typeErrorCustom('Must Have Parent');
      this.spinner.hide();
    }
    else {
      /* #region  Have Parent */
      if (lookupMdlStruc.idSelect !== undefined) {
        var orgMdlStrucCheck: OrgMdlStrucObj = new OrgMdlStrucObj();
        var getOrgMdlSructCheckUrl =
          this.foundationUrl + AdInsConstant.GetOrgMdlStrucById;
        orgMdlStrucCheck.orgMdlStrucId = +lookupMdlStruc.idSelect;
        this.httpClient
          .post(getOrgMdlSructCheckUrl, orgMdlStrucCheck)
          .subscribe(response => {
            console.log(response)
            var lvlMust: number = + response['returnObject']['orgMdlLvl'] + 1;
            if (+OrgMdlForm.value.orgMdlLvl !== lvlMust) {
              this.service.typeErrorCustom(
                "Level Must Be " + lvlMust
              );
            } else {
              //MODE-ADD
              if (this.type !== "edit") {
                this.apiUrl = this.foundationUrl + AdInsConstant.AddOrgMdlStruc;
                this.orgMdlStrucObj = new OrgMdlStrucObj();
                this.orgMdlStrucObj.orgMdlId = +this.orgMdlId;
                this.orgMdlStrucObj.orgMdlLvl = OrgMdlForm.value.orgMdlLvl;
                this.orgMdlStrucObj.refBizUnitId = lookupBizUnit.idSelect;
               this.orgMdlStrucObj.parentId = lookupMdlStruc.idSelect;
                if (OrgMdlForm.value.isActive) {
                  this.orgMdlStrucObj.isActive = "1";
                } else {
                  this.orgMdlStrucObj.isActive = "0";
                }

                this.httpClient.post(this.apiUrl, this.orgMdlStrucObj).subscribe(
                  response => {
                    this.service.typeSave(response["message"]);
                    this.location.back();
                  },
                  error => {
                    this.service.typeErrorCustom(error);
                  }
                );
              }
              //MODE-EDIT
              else {
                this.apiUrl = this.foundationUrl + AdInsConstant.EditOrgMdlStruc;
                this.orgMdlStrucObj.orgMdlStrucId = +this.orgMdlStrucId;
                this.orgMdlStrucObj.orgMdlId = +this.orgMdlId;
                this.orgMdlStrucObj.orgMdlLvl = OrgMdlForm.value.orgMdlLvl;
                this.orgMdlStrucObj.refBizUnitId = lookupBizUnit.idSelect;
               this.orgMdlStrucObj.parentId = lookupMdlStruc.idSelect;
                if (OrgMdlForm.value.isActive) {
                  this.orgMdlStrucObj.isActive = "1";
                } else {
                  this.orgMdlStrucObj.isActive = "0";
                }
                this.httpClient.post(this.apiUrl, this.orgMdlStrucObj).subscribe(
                  response => {
                    this.service.typeSave(response["message"]);
                    this.location.back();
                    this.spinner.hide();
                  },
                  error => {
                    this.service.typeErrorCustom(error);
                    this.spinner.hide();
                  }
                );
              }
            }
          });
      }
      /* #endregion */
      /* #region  Dont Have Parent */
      else {
        //MODE-ADD
        if (this.type !== "edit") {
          this.apiUrl = this.foundationUrl + AdInsConstant.AddOrgMdlStruc;
          this.orgMdlStrucObj = new OrgMdlStrucObj();
          this.orgMdlStrucObj.orgMdlId = +this.orgMdlId;
          this.orgMdlStrucObj.orgMdlLvl = OrgMdlForm.value.orgMdlLvl;
          this.orgMdlStrucObj.refBizUnitId = lookupBizUnit.idSelect;
          if (OrgMdlForm.value.isActive) {
            this.orgMdlStrucObj.isActive = "1";
          } else {
            this.orgMdlStrucObj.isActive = "0";
          }

          this.httpClient.post(this.apiUrl, this.orgMdlStrucObj).subscribe(
            response => {
              this.service.typeSave(response["message"]);
              this.location.back();
            },
            error => {
              this.service.typeErrorCustom(error);
            }
          );
        }
        //MODE-EDIT
        else {
          this.apiUrl = this.foundationUrl + AdInsConstant.EditOrgMdlStruc;
          this.orgMdlStrucObj.orgMdlStrucId = +this.orgMdlStrucId;
          this.orgMdlStrucObj.orgMdlId = +this.orgMdlId;
          this.orgMdlStrucObj.orgMdlLvl = OrgMdlForm.value.orgMdlLvl;
          this.orgMdlStrucObj.refBizUnitId = lookupBizUnit.idSelect;
          if (OrgMdlForm.value.isActive) {
            this.orgMdlStrucObj.isActive = "1";
          } else {
            this.orgMdlStrucObj.isActive = "0";
          }
          this.httpClient.post(this.apiUrl, this.orgMdlStrucObj).subscribe(
            response => {
              this.service.typeSave(response["message"]);
              this.location.back();
              this.spinner.hide();
            },
            error => {
              this.service.typeErrorCustom(error);
              this.spinner.hide();
            }
          );
        }
      }
      /* #endregion */
    }
  }
  InitForm() {
    var getOrgMdlUrl = this.foundationUrl + AdInsConstant.GetOrgMdlByOrgMdlId;
    this.orgModelObj = new OrgMdlObj();
    this.orgModelObj.orgMdlId = +this.orgMdlId;
    this.httpClient.post(getOrgMdlUrl, this.orgModelObj).subscribe(
      response => {
        this.orgModelObj = response["returnObject"];
      },
      error => {
        this.service.typeErrorCustom(error);
      }
    );

    /* #region  Additional Criteria */
    this.addCrit = new Array();
    var critOrgMdlId = new CriteriaObj();
    critOrgMdlId.propName = "orgMdlId";
    critOrgMdlId.value = this.orgMdlId;
    critOrgMdlId.restriction = AdInsConstant.RestrictionEq;
    critOrgMdlId.DataType = "numeric";

    var critOrgMdlStrucId = new CriteriaObj();
    critOrgMdlStrucId.propName = "orgMdlStrucId";
    critOrgMdlStrucId.value = this.orgMdlStrucId;
    critOrgMdlStrucId.restriction = 'Neq';
    critOrgMdlStrucId.DataType = "numeric";

    var critParentId = new CriteriaObj();
    critParentId.propName = "parentId";
    critParentId.value = this.orgMdlStrucId;
    critParentId.restriction = 'Neq';
    critParentId.DataType = "numeric";

    this.addCrit.push(critOrgMdlId);
    this.addCrit.push(critParentId);
    this.addCrit.push(critOrgMdlStrucId);

    /* #endregion */
  }
}
