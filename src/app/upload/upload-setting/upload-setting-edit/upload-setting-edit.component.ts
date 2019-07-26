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
import { UploadService } from 'app/shared/upload/upload.service';

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

  uploadTypeId: any;
  uploadTypeObject: any;
  userTitleRoleObj: any;
  empPositionId: any;
  addCritLookup: any;
  tempRefRole: any;
  listRefRoleId: Array<any>=[];

  constructor(private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private uploadService : UploadService) { }

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize = 10;
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/lookup/lookupRole.json";
    this.inputLookupObj.urlQryPaging = AdInsConstant.GetRefRolePaging;
    this.inputLookupObj.urlEnviPaging = environment.foundationUrl;

    this.tempRefRole = new Array();
    this.addCritLookup = new Array();
    var critIsActive = new CriteriaObj();
    critIsActive.propName = "IsActive";
    critIsActive.value = "1";
    critIsActive.restriction = AdInsConstant.RestrictionEq;
    critIsActive.DataType = "text";
    this.addCritLookup.push(critIsActive);
    this.inputLookupObj.addCritInput = this.addCritLookup;

    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefRolePaging;
    this.initiateForm()
  }

  initiateForm() {
    this.spinner.show();
  }

  Back(): void {
    this.location.back();
  }

  add(uclRoleObj: any) {
    var refRoleObj = JSON.parse(uclRoleObj.lookupInput.jsonSelect);
    if (refRoleObj != null) {
      if (this.listRefRoleId != null) {
        if (this.listRefRoleId.includes(refRoleObj.refRoleId))
        {
          this.service.errorMessage("Cannot add same Role");
        }
        else {
          this.tempRefRole.push(refRoleObj);
          this.listRefRoleId.push(refRoleObj.refRoleId);
        }
      }
      this.ucLookupRole.lookupInput.nameSelect = "";
      this.ucLookupRole.lookupInput.jsonSelect = null;
    }
    else
      this.service.errorMessage("Please select Role First");
  }

  delete(refRoleId: any) {
    var index = this.listRefRoleId.indexOf(refRoleId);
    if (index > -1) {
      this.listRefRoleId.splice(index, 1);
      this.tempRefRole.splice(index, 1);
    }
  }

  SaveForm(UserRoleDetailForm: NgForm, lookupRole: any): void {
    var assignRoleToUpload = { uploadTypeId: this.uploadTypeId, listRoleId: this.listRefRoleId}
    this.spinner.show();

      this.apiUrl = this.foundationUrl + AdInsConstant.AssignRoleToUploadSetting;
      this.httpClient.post(this.apiUrl, assignRoleToUpload).subscribe(
        (response) => {
          console.log(response);

          this.service.typeSave('Assign Role to Upload Setting Success');
          this.location.back();
          this.spinner.hide();

        },
        (error) => {
          console.log(error);
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
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

}