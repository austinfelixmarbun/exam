import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SearchComponent } from 'app/shared/search/search.component';
import { environment } from 'environments/environment';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefRoleObj } from 'app/shared/model/RefRoleObj.Model';
import { UserTitleRoleObj } from 'app/shared/model/UserTitleRoleObj';
import { EmpPositionObj } from 'app/shared/model/EmpPositionObj.Model';
import { NgForm } from '@angular/forms';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-upload-setting-edit',
  templateUrl: './upload-setting-edit.component.html',
  styleUrls: ['./upload-setting-edit.component.scss'],
  providers: [NGXToastrService]
})
export class UploadSettingEditComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild("uclRole") ucLookupRole;
  inputLookupObj: any;
  resultData: string;
  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  nameSelect: any;
  idSelect: any;
  jsonSelect: any;
  isActive: any;
  mode: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  pageNow: any;
  pageSize: any;
  pageType: any;
  uploadTypeCode: any;
  uploadTypeName: any;
  uploadSettingSomethingAddEdit: any;

  userTitleRoleObj: any;
  empPositionId: any;
  addCritIsActive: any;
  tempRefRole: any;

  constructor(private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize = 10;
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/lookup/lookupRole.json";
    this.inputLookupObj.urlQryPaging = AdInsConstant.GetRefRolePaging;
    this.inputLookupObj.urlEnviPaging = environment.foundationUrl;

    this.tempRefRole = new Array();
    this.addCritIsActive = new Array();
    var critIsActive = new CriteriaObj();
    critIsActive.propName = "IsActive";
    critIsActive.value = "1";
    critIsActive.restriction = AdInsConstant.RestrictionEq;
    critIsActive.DataType = "text";
    this.addCritIsActive.push(critIsActive);
    this.inputLookupObj.addCritInput = this.addCritIsActive;

    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefRolePaging;
    this.initiateForm()
  }

  initiateForm() {
    this.spinner.show();
    var refRoleObj: RefRoleObj = new RefRoleObj();
    this.userTitleRoleObj = new UserTitleRoleObj();
    var empPositionObj: EmpPositionObj = new EmpPositionObj();
    var getRoleUrl: any = this.foundationUrl + AdInsConstant.GetRefRoleByEmpPositionId;
    var getUserTitleRole: any = this.foundationUrl + AdInsConstant.GetUserTitleRoleByEmpPositionIdAndRefRoleId;
    empPositionObj.empPositionId = this.empPositionId;

    this.httpClient.post(getRoleUrl, empPositionObj).subscribe(
      (response) => {
        console.log('Success Get');
        if (response['returnObject'] !== null) {
          this.mode = 'edit';
          refRoleObj = response['returnObject'];
          this.inputLookupObj.nameSelect = refRoleObj.roleName;
          this.inputLookupObj.jsonSelect = response["returnObject"];
          this.inputLookupObj.idSelect = refRoleObj.refRoleId;
          this.userTitleRoleObj.empPositionId = this.empPositionId;
          this.userTitleRoleObj.refRoleId = refRoleObj.refRoleId;

          console.log('A', refRoleObj);
          this.httpClient.post(getUserTitleRole, this.userTitleRoleObj).subscribe(
            (response) => {
              this.userTitleRoleObj = response['returnObject'];
              console.log('B', this.userTitleRoleObj);

              if (this.userTitleRoleObj.isActive === '1') { this.isActive = true } else { this.isActive = false }
              //this.userTitleRoleId = this.userTitleRoleObj.userTitleRoleId;
            },
            (error) => {
              console.log('Error Get');
              console.log(error);
              this.spinner.hide();
            }
          );
          this.spinner.hide();
        }
      },
      (error) => {
        console.log('Error Get');
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  Back(): void {
    this.location.back();
  }

  add(uclRoleObj: any) {
    var refRoleObj = JSON.parse(uclRoleObj.lookupInput.jsonSelect);
    if (refRoleObj != null)
    {
      this.tempRefRole.push(refRoleObj);
      this.ucLookupRole.lookupInput.nameSelect = "";
      this.ucLookupRole.lookupInput.jsonSelect = null;
    }
    else
      this.service.errorMessage("Please select Role First");
  }

  Save(UserRoleDetailForm: NgForm, lookupRole: any): void {
    this.spinner.show();
    if (this.mode === 'edit') {
      console.log('edit');
      this.apiUrl = this.foundationUrl + AdInsConstant.EditUserTitleRole;
      //this.userTitleRoleObj.userTitleRoleId = +this.userTitleRoleId;
      this.userTitleRoleObj.empPositionId = +this.empPositionId;
      this.userTitleRoleObj.refRoleId = lookupRole.idSelect;
      if (UserRoleDetailForm.value.isActive) { this.userTitleRoleObj.isActive = '1' } else { this.userTitleRoleObj.isActive = '0' };

      this.httpClient.post(this.apiUrl, this.userTitleRoleObj).subscribe(
        (response) => {
          console.log("Success Edit");

          this.service.typeSave('Edit Successed');
          this.location.back();
          this.spinner.hide();

        },
        (error) => {
          console.log("Error Edit");
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
    else {
      console.log("add");
      this.apiUrl = this.foundationUrl + AdInsConstant.AddUserTitleRole;
      this.userTitleRoleObj = new UserTitleRoleObj();
      this.userTitleRoleObj.empPositionId = +this.empPositionId;
      this.userTitleRoleObj.refRoleId = lookupRole.idSelect;
      if (UserRoleDetailForm.value.isActive) { this.userTitleRoleObj.isActive = '1' } else { this.userTitleRoleObj.isActive = '0' };

      this.httpClient.post(this.apiUrl, this.userTitleRoleObj).subscribe(
        (response) => {
          console.log("Success Save");

          this.service.typeSave('Save Successed');
          this.location.back();
          this.spinner.hide();

        },
        (error) => {
          console.log("Error Save");
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
  }
  
  searchSort(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue
    } else {
      this.orderByValue = true
    }
    this.orderByKey = event.target.attributes.name.nodeValue
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  SaveForm(){

  }

}