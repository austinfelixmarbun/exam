import { AdInsServiceService } from './../../../ad-ins-service.service';
import { OrganizationObj } from './../../../shared/model/OrganizationObj.Model';
import { environment } from './../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
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

  param: string;
  mode: string = "add";

  parentId: any;
  orgName: any;
  hierarchyNo: any;
  isActive: any;
  result: any;

  constructor(
    private route: ActivatedRoute,
    private service: NGXToastrService,
    private http: Http,
    private spinner: NgxSpinnerService,
    private location: Location,
    private adInsService: AdInsServiceService) {
      this.route.queryParams.subscribe(params => {
        this.param = params['refOrgId'];
        this.mode = params['mode'];


    })
    }


  ngOnInit() {
    this.spinner.show();
    this.GetListParents();
    this.parentId = '';
    if (this.mode === 'edit') {
      this.FillFormEdit();
    }
    this.spinner.hide();
  }

  Back(): void {
    this.location.back();
  }

  Save(OrgObjectForm: NgForm): void {
    this.spinner.show();

    if (this.mode !== 'edit')
    {
      this.apiUrl = this.foundationUrl + AdInsConstant.AddRefOrg;

      //GENERATE OBJECT
      this.orgObj = new OrganizationObj();
      this.orgObj.refOrgId = 0;
      this.orgObj.oldParentId =  0;
      this.orgObj.orgName = OrgObjectForm.value.orgName;
      this.orgObj.hierarchyNo = OrgObjectForm.value.hierarchyNo;
      this.orgObj.parentId =   OrgObjectForm.value.parentId;
      if (OrgObjectForm.value.isActive) {this.orgObj.isActive = '1'} else {this.orgObj.isActive = '0'};

      //SAVE
      this.adInsService.postData(this.apiUrl, this.orgObj).subscribe(
        (response) => {
          console.log("Success Save");
          console.log(response);
          this.spinner.hide();
        },
        (error) => {
          console.log("Error Save");
          console.log(error);
          this.spinner.hide();
        }
      );


    }
    else
    {
      this.apiUrl = this.foundationUrl + AdInsConstant.EditRefOrgWithOldParentId;

      //GENERATE OBJECT
      this.orgObj.oldParentId = this.orgObj.parentId
      this.orgObj.orgName = OrgObjectForm.value.orgName;
      this.orgObj.hierarchyNo = OrgObjectForm.value.hierarchyNo;
      this.orgObj.parentId =   OrgObjectForm.value.parentId;
      if (OrgObjectForm.value.isActive) {this.orgObj.isActive = '1'} else {this.orgObj.isActive = '0'};

      //SAVE
      this.adInsService.postData(this.apiUrl, this.orgObj).subscribe(
        (response) => {
          console.log("Success Edit");
          console.log(response);
          this.spinner.hide();
        },
        (error) => {
          console.log("Error Edit");
          console.log(error);
          this.spinner.hide();
        }
      );
      this.location.back();
    };
  }

  GetListParents() {
    this.spinner.show();
    this.apiUrl = this.foundationUrl + AdInsConstant.GetListAllRefOrg;
    var organizationObj = new OrganizationObj();
    this.adInsService.postData(this.apiUrl, organizationObj).subscribe(
      (response) => {
        console.log("Success Get List");
        this.parents = response;
        console.log(response);

      },
      (error) => {
        console.log("Error");
        console.log(error);

      }
    );
    this.spinner.hide();
   }

   FillFormEdit(){
    this.spinner.show();
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefOrg;
    this.orgObj = new OrganizationObj();
    this.orgObj.refOrgId = +this.param;
    console.log(this.orgObj.refOrgId);
    console.log(this.apiUrl);

    this.adInsService.postData(this.apiUrl, this.orgObj).subscribe(
        (response) => {
            console.log("Success Get Object");
            console.log(response);


            this.orgObj = response.returnObject;

            if(this.orgObj.isActive === '1'){
                this.isActive = true;
            }
            else
            {
                this.isActive = false;
            }
            if(this.orgObj.parentId === null) { this.parentId = '' } else {this.parentId = +this.orgObj.parentId};
            this.orgName = this.orgObj.orgName;
            this.hierarchyNo = this.orgObj.hierarchyNo;
        },
        (error) => {
            console.log("Error");
            console.log(error);
        }
    );
    this.spinner.hide();
   }
}
