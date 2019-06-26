import { RefJobTitleObj } from 'app/shared/model/RefJobTitleObj.Model';
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { NgForm } from "@angular/forms";
import { environment } from "environments/environment";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { OrgJobTitleObj } from 'app/shared/model/OrgJobTitleObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';

@Component({
  selector: 'app-org-job-title-detail',
  templateUrl: './org-job-title-detail.component.html',
  providers: [NGXToastrService]
})
export class OrgJobTitleDetailComponent implements OnInit {
  inputLookupObj: any;
  inputLookupObj2: any;
  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  type: string = "add";
  resultData: any;
  bizUnitName: any;
  refOrgId: any;
  orgMdlStrucId: any;
  isActive: any;

  refJobTitleId: any;
  refJobTitleObj: RefJobTitleObj;

  orgJobTitleId: any;
  orgJobTitleObj: OrgJobTitleObj;


  /* #region  Lookup Job Title */
  jobTitleName: any;
  jsonSelectRefJobTile: any;
  /* #endregion */

  /* #region  Lookup Mdl Struc */
  parentOrgJobTitleId: any;
  parentJobTitleName: any;
  jsonSelectOrgJobTitle: any;
  /* #endregion */

  /* #region  Addition Criteria Lookup */
  addCritOrgJobTitle: Array<any>;
  addCritJobTitle: Array<any>;
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
      if (params["refOrgId"] != null) {
        this.refOrgId = params["refOrgId"];
        console.log(params["refOrgId"] );
      }
      if (params["orgMdlStrucId"] != null) {
        this.orgMdlStrucId = params["orgMdlStrucId"];
      }
      if (params["bizUnitName"] != null) {
        this.bizUnitName = params["bizUnitName"];
      }
      if (params["orgJobTitleId"] != null) {
        this.orgJobTitleId = params["orgJobTitleId"];
      }
    });
  }

  ngOnInit() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/lookup/lookupRefJobTitle.json";
    this.inputLookupObj.urlQryPaging = AdInsConstant.GetRefJobTitle;
    this.inputLookupObj.urlEnviPaging = environment.foundationUrl;
    
    this.inputLookupObj2 = new InputLookupObj();
    this.inputLookupObj2.urlJson = "./assets/lookup/lookupParentForm.json";
    this.inputLookupObj2.urlQryPaging = AdInsConstant.GetOrgJobTitlePaging;
    this.inputLookupObj2.urlEnviPaging = environment.foundationUrl;
    console.log("masuk");
    this.orgJobTitleObj = new OrgJobTitleObj();
    this.InitForm();
    if (this.type === "edit") {
      this.apiUrl = this.foundationUrl + AdInsConstant.GetOrgJobTitleByOrgJobTitleId;
      this.orgJobTitleObj.orgJobTitleId = +this.orgJobTitleId;
      this.httpClient.post(this.apiUrl, this.orgJobTitleObj).subscribe(
        response => {
          console.log("Success Get");
          this.orgJobTitleObj = response["returnObject"];
          console.log("obj", response["returnObject"]);
          this.inputLookupObj.idSelect = response["returnObject"]["refJobTitleId"];
          this.inputLookupObj2.idSelect = response["returnObject"]["parentOrgJobTitleId"];
          if (response["returnObject"]["isActive"] === "1") {
            this.isActive = true;
          } else {
            this.isActive = false;
          }

          /* #region Fill Lookup RefJobTitle */
          console.log('fill lookup job title',+ this.inputLookupObj.idSelect )
          var jobTitleObj: RefJobTitleObj = new RefJobTitleObj();
          var getJobTitleUrl: any =
            this.foundationUrl + AdInsConstant.GetRefJobTitleById;
          jobTitleObj.RefJobTitleId = + this.inputLookupObj.idSelect;
          this.httpClient
            .post(getJobTitleUrl, jobTitleObj)
            .subscribe(response => {
              console.log(jobTitleObj);
              this.jobTitleName =  response["returnObject"]["jobTitleName"];
              this.inputLookupObj.jsonSelect = response["returnObject"];
            });
          /* #endregion */


          /* #region Fill Lookup OrgJobTitle */
          if(this.parentOrgJobTitleId !== 0 && this.parentOrgJobTitleId !== null){
          console.log('fill lookup OrgJobTitle',this.parentOrgJobTitleId )

          var job: RefJobTitleObj = new RefJobTitleObj();
          var orgJobTitle: OrgJobTitleObj = new OrgJobTitleObj();
          var orgJobTitleUrl =
            this.foundationUrl + AdInsConstant.GetOrgJobTitleByOrgJobTitleId;
          var getJobUrl: any =
            this.foundationUrl + AdInsConstant.GetRefJobTitleById;
          orgJobTitle.orgJobTitleId = +this.parentOrgJobTitleId;
          this.httpClient
            .post(orgJobTitleUrl, orgJobTitle)
            .subscribe(response => {
              this.inputLookupObj2.jsonSelect = response["returnObject"];
              job.RefJobTitleId = response["returnObject"]["refJobTitleId"];
              this.httpClient
                .post(getJobUrl, job)
                .subscribe(response => {
                  this.inputLookupObj2.nameSelect = response["returnObject"]["jobTitleName"];
                });
            });
          }
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

  Save(OrgJobTitleForm: NgForm, lookupRefJobTitle: any, lookupOrgJobTitle: any): void {
    this.spinner.show();
    console.log('lms', lookupRefJobTitle);
    console.log('lbu', lookupOrgJobTitle);

    //MODE-ADD
    if (this.type !== "edit") {
      this.apiUrl = this.foundationUrl + AdInsConstant.AddOrgJobTitle;
      this.orgJobTitleObj = new OrgJobTitleObj();
      this.orgJobTitleObj.orgMdlStrucId = +this.orgMdlStrucId;
      this.orgJobTitleObj.refJobTitleId = lookupRefJobTitle.idSelect;
      if (lookupOrgJobTitle.idSelect !== undefined) { this.orgJobTitleObj.parentOrgJobTitleId = lookupOrgJobTitle.idSelect; }
      if (OrgJobTitleForm.value.isActive) {
        this.orgJobTitleObj.isActive = '1';
      } else {
        this.orgJobTitleObj.isActive = '0';
      }

      this.httpClient.post(this.apiUrl, this.orgJobTitleObj).subscribe(
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
      this.apiUrl = this.foundationUrl + AdInsConstant.EditOrgJobTitle;
      this.orgJobTitleObj.orgJobTitleId = +this.orgJobTitleId;
      this.orgJobTitleObj.orgMdlStrucId = +this.orgMdlStrucId;
      this.orgJobTitleObj.refJobTitleId = lookupRefJobTitle.idSelect;
      if (lookupOrgJobTitle.idSelect !== undefined) { this.orgJobTitleObj.parentOrgJobTitleId = lookupOrgJobTitle.idSelect; }
      if (OrgJobTitleForm.value.isActive) {
        this.orgJobTitleObj.isActive = '1';
      } else {
        this.orgJobTitleObj.isActive = '0';
      }
      this.httpClient.post(this.apiUrl, this.orgJobTitleObj).subscribe(
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
  InitForm() {

    /* #region  Additional Criteria Job Title */
    this.addCritJobTitle = new Array();
    var critOrgId = new CriteriaObj();
    critOrgId.propName = "refOrgId";
    critOrgId.value = this.refOrgId;
    critOrgId.restriction = AdInsConstant.RestrictionEq;
    critOrgId.DataType = "numeric";
    this.addCritJobTitle.push(critOrgId);
    this.inputLookupObj.addCritInput = this.addCritJobTitle;
    /* #endregion */

    /* #region  Additional Criteria Org Job Title */
    this.addCritOrgJobTitle = new Array();

    var critOrgStrucId = new CriteriaObj();
    critOrgStrucId.propName = "orgMdlStrucId";
    critOrgStrucId.value = this.orgMdlStrucId;
    critOrgStrucId.restriction = AdInsConstant.RestrictionEq;
    critOrgStrucId.DataType = "numeric";

    var critJobTitleId = new CriteriaObj();
    critJobTitleId.propName = "orgJobTitleId";
    critJobTitleId.value = this.orgJobTitleId;
    critJobTitleId.restriction = 'Neq';
    critJobTitleId.DataType = "numeric";

    var critParent = new CriteriaObj();
    critParent.propName = "parentOrgJobTitleId";
    critParent.value = this.orgJobTitleId;
    critParent.restriction = 'Neq';
    critParent.DataType = "numeric";

    this.addCritOrgJobTitle.push(critJobTitleId);
    this.addCritOrgJobTitle.push(critOrgStrucId);
    this.addCritOrgJobTitle.push(critParent);
    /* #endregion */
  }

}
