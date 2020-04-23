import { Component, OnInit } from '@angular/core';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefUserRole } from 'app/shared/model/RefUserRoleObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { BusinessUnitObj } from 'app/shared/model/BusinessUnitObj.Model';
import { RefJobTitleObj } from 'app/shared/model/RefJobTitleObj.Model';
import { RefUserObj } from 'app/shared/model/RefUserObj.Model';
import { OfficeObj } from 'app/shared/model/OfficeObj.model';
import { RefOfficeObj } from 'app/shared/model/RefOfficeObj.model';
import { RefRoleObj } from 'app/shared/model/RefRoleObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-employee-businessunit-add',
  templateUrl: './employee-businessunit-add.component.html',
  styleUrls: ['./employee-businessunit-add.component.scss'],
  providers: [NGXToastrService]
})
export class EmployeeBusinessunitAddComponent implements OnInit {

  EmployeeBusinessUnitForm = this.fb.group({
    IsActive: [false]
  });

  title: string = "Business Unit-Add";
  lookupValue: any;
  mode: string;

  inputPagingObjBusinessUnit: InputLookupObj;
  inputPagingObjJobTitle: InputLookupObj;
  inputPagingObjSupervisor: InputLookupObj;
  inputPagingObjOffice: InputLookupObj;
  inputPagingObjRole: InputLookupObj;

  RefUserId: any;
  RefUserRoleId: any;
  viewObj: string;
  criteria: CriteriaObj[] = [];
  result: any;
  userRole = new RefUserRole;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.RefUserId = params["RefUserId"];
      this.RefUserRoleId = params["RefUserRoleId"];
      this.mode = params["mode"];
    })
  }

  ngOnInit() {

    this.initLookUp();
    var critInput = new CriteriaObj();
    critInput.propName = "usr.REF_USER_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefUserId;

    this.viewObj = "./assets/ucviewgeneric/viewEmployeeBusinessUnitMember.json";
    if (this.mode == "edit") {
      this.title = "Business Unit-Edit";
      this.userRole.RefUserRoleId = this.RefUserRoleId;

      this.http.post(AdInsConstant.GetRefUserRoleById, this.userRole).subscribe(
        (response) => {
          console.log(response);
          this.result = response;
          this.userRole = this.result;
          this.EmployeeBusinessUnitForm.patchValue({
            IsActive : this.result.IsActive
          });
          var BizUnit = new BusinessUnitObj();

          BizUnit.RefBizUnitId = this.result["RefBizUnitId"];

          this.http.post(AdInsConstant.GetRefBizUnit, BizUnit).subscribe(
            (response) => {
              this.inputPagingObjBusinessUnit.nameSelect = response["BizUnitName"];
            }
          )

          var JobTitle = new RefJobTitleObj();
          JobTitle.RefJobTitleId = this.result["RefJobTitleId"];

          this.http.post(AdInsConstant.GetRefJobTitleById, JobTitle).subscribe(
            (response) => {
              this.inputPagingObjJobTitle.nameSelect = response["JobTitleName"];
            }
          )

          var Supervisor = new RefUserObj();
          Supervisor.RefUserId = this.result["SpvId"];
          if (this.result["SpvId"] == null) {
            this.inputPagingObjSupervisor.nameSelect = "";
          }
          else {
            this.http.post(AdInsConstant.GetRefUserById, Supervisor).subscribe(
              (response) => {
                this.inputPagingObjSupervisor.nameSelect = response["Username"];
              }
            )
          }
          var Office = new OfficeObj();
          Office.RefOfficeId = this.result["RefOfficeId"];
          this.http.post(AdInsConstant.GetRefOfficeByRefOfficeId, Office).subscribe(
            (response) => {
              console.log("isi Office");
              console.log(Office);
              this.inputPagingObjOffice.nameSelect = response["OfficeName"];
            }
          )

          var Role = new RefRoleObj();
          Role.RefRoleId = this.result["RefRoleId"];
          this.http.post(AdInsConstant.GetRefRoleByRefRoleId, Role).subscribe(
            (response) => {
              this.inputPagingObjRole.nameSelect = response["RoleName"];
            }
          )
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  initLookUp() {
    this.inputPagingObjBusinessUnit = new InputLookupObj();
    this.inputPagingObjBusinessUnit.urlJson = "./assets/lookup/lookupEmployeeBusinessUnit.json";
    this.inputPagingObjBusinessUnit.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjBusinessUnit.urlEnviPaging = environment.FoundationR3Url;
    this.inputPagingObjBusinessUnit.pagingJson = "./assets/lookup/lookupEmployeeBusinessUnit.json";
    this.inputPagingObjBusinessUnit.genericJson = "./assets/lookup/lookupEmployeeBusinessUnit.json";

    this.inputPagingObjJobTitle = new InputLookupObj();
    this.inputPagingObjJobTitle.urlJson = "./assets/lookup/lookupEmployeeJobTitle.json";
    this.inputPagingObjJobTitle.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjJobTitle.urlEnviPaging = environment.FoundationR3Url;
    this.inputPagingObjJobTitle.pagingJson = "./assets/lookup/lookupEmployeeJobTitle.json";
    this.inputPagingObjJobTitle.genericJson = "./assets/lookup/lookupEmployeeJobTitle.json";

    this.inputPagingObjSupervisor = new InputLookupObj();
    this.inputPagingObjSupervisor.urlJson = "./assets/lookup/lookupEmployeeSupervisor.json";
    this.inputPagingObjSupervisor.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjSupervisor.urlEnviPaging = environment.FoundationR3Url;
    this.inputPagingObjSupervisor.pagingJson = "./assets/lookup/lookupEmployeeSupervisor.json";
    this.inputPagingObjSupervisor.genericJson = "./assets/lookup/lookupEmployeeSupervisor.json";
    this.inputPagingObjSupervisor.isRequired = false;

    this.inputPagingObjOffice = new InputLookupObj();
    this.inputPagingObjOffice.urlJson = "./assets/lookup/lookupEmployeeOffice.json";
    this.inputPagingObjOffice.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjOffice.urlEnviPaging = environment.FoundationR3Url;
    this.inputPagingObjOffice.pagingJson = "./assets/lookup/lookupEmployeeOffice.json";
    this.inputPagingObjOffice.genericJson = "./assets/lookup/lookupEmployeeOffice.json";

    this.inputPagingObjRole = new InputLookupObj();
    this.inputPagingObjRole.urlJson = "./assets/lookup/lookupEmployeeRole.json";
    this.inputPagingObjRole.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObjRole.urlEnviPaging = environment.FoundationR3Url;
    this.inputPagingObjRole.pagingJson = "./assets/lookup/lookupEmployeeRole.json";
    this.inputPagingObjRole.genericJson = "./assets/lookup/lookupEmployeeRole.json";

  }
  //#region getLookup
  getBizUnitId(ev) {
    this.userRole.RefBizUnitId = ev.RefBizUnitId;

  }
  getJobTitleId(ev) {
    this.userRole.RefJobTitleId = ev.RefJobTitleId;

  }
  getSpvId(ev) {
    this.userRole.SpvId = ev.RefUserId;

  }
  getOfficeId(ev) {
    this.userRole.RefOfficeId = ev.RefOfficeId;

  }
  getRoleId(ev) {
    this.userRole.RefRoleId = ev.RefRoleId;

  }
  //#endregion


  SaveForm() {
    if (this.mode == "edit") {
      this.userRole.IsActive = this.EmployeeBusinessUnitForm.controls.IsActive.value;
      this.userRole.RefUserRoleId = this.RefUserRoleId;
      this.userRole.RefUserId = this.RefUserId;
      this.userRole.RowVersion = this.result["RowVersion"];

      this.http.post(AdInsConstant.EditRefUserRole, this.userRole).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.router.navigate(['/Employee/EmployeeBusinessUnit/Paging'], { queryParams: { RefUserId: this.RefUserId } });
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.userRole.IsActive = this.EmployeeBusinessUnitForm.controls.IsActive.value;
      this.userRole.RowVersion = "";
      this.userRole.RefUserId = this.RefUserId;
      this.http.post(AdInsConstant.AddRefUserRole, this.userRole).subscribe((response) => {
        this.toastr.successMessage(response['message']);
        this.router.navigate(['/Employee/EmployeeBusinessUnit/Paging'], { queryParams: { RefUserId: this.RefUserId } });
      },
        (error) => {
          console.log(error);
        });
    }
  }
}
