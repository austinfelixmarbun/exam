import { AdInsServiceService } from './../../../ad-ins-service.service';
import { OrganizationObj } from './../../../shared/model/OrganizationObj.Model';
import { environment } from './../../../../environments/environment';

import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';

@Component({
  selector: 'app-org-add-edit',
  templateUrl: './org-add-edit.component.html',
  styleUrls: ['./org-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class OrgAddEditComponent implements OnInit {

  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  parents: string;
  orgObj: OrganizationObj;
  ParentsId = '';
  constructor(
    private service: NGXToastrService,
    private http: Http,
    private spinner: NgxSpinnerService,
    private location: Location,
    private adInsService: AdInsServiceService) { }


  ngOnInit() {
    this.GetListParents();
  }

  Back(): void {
    this.location.back();
  }

  Save(OrgObjectForm: NgForm): void {
    this.spinner.show();
    this.apiUrl = this.foundationUrl + AdInsConstant.AddRefOrg;
    this.orgObj = new OrganizationObj();
    this.orgObj.RefOrgId = 0;
    this.orgObj.OrgName = OrgObjectForm.value.OrgName;
    this.orgObj.HierarchyNo = OrgObjectForm.value.HierarchyNo;
    this.orgObj.ParentId =   OrgObjectForm.value.ParentsId;
    if (OrgObjectForm.value.IsActive) {this.orgObj.IsActive = '1'}
    else {this.orgObj.IsActive = '0'};
    this.orgObj.OldParentId =  0;

    this.adInsService.postData(this.apiUrl, this.orgObj).subscribe(
      (response) => {
        console.log("Success");
        this.parents = response;
        console.log(response);
        this.spinner.hide();
      },
      (error) => {
        console.log("Error");
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  GetListParents() {
    this.spinner.show();
    this.apiUrl = this.foundationUrl + AdInsConstant.GetListAllRefOrg;
    this.orgObj = new OrganizationObj();
    this.adInsService.postData(this.apiUrl, this.orgObj).subscribe(
      (response) => {
        console.log("Success");
        this.parents = response;
        console.log(response);
        this.spinner.hide();
      },
      (error) => {
        console.log("Error");
        console.log(error);
        this.spinner.hide();
      }
    );


  }
}
