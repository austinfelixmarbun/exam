import { OrgMdlObj } from 'app/shared/model/OrgMdlObj.Model';
import { OrganizationObj } from 'app/shared/model/OrganizationObj.Model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';


@Component({
  selector: 'app-organization-model-detail',
  templateUrl: './organization-model-detail.component.html',
  providers: [NGXToastrService]
})
export class OrganizationModelDetailComponent implements OnInit {


  foundationUrl: string = environment.FoundationR3Url;
  apiUrl: any;
  orgModelObj: OrgMdlObj;
  orgObj: OrganizationObj;
  type: string = 'add';
  refOrgId: any;
  orgMdlId: any;

  modelCode: any;
  modelName: any;
  isActive: any;
  resultData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private service: NGXToastrService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.type = params['mode'];
      }
      if (params['orgMdlId'] != null) {
        this.orgMdlId = params['orgMdlId'];
        console.log('MdlCode',this.orgMdlId);
      }
      if (params['refOrgId'] != null) {
        this.refOrgId = params['refOrgId'];
      }
    });
  }


  ngOnInit() {
    console.log('masuk');
    this.orgModelObj = new OrgMdlObj()
    this.GetRefOrg();
    if (this.type == 'edit') {
      this.apiUrl = this.foundationUrl + AdInsConstant.GetOrgMdlByOrgMdlId;
      this.orgModelObj = new OrgMdlObj();
      this.orgModelObj.orgMdlId = +this.orgMdlId;
      this.httpClient.post(this.apiUrl, this.orgModelObj).subscribe(
        (response) => {
          console.log('Success Get');
          this.orgModelObj = response['returnObject'];
          console.log('obj',response['returnObject'])
          this.modelCode = response['returnObject']['orgMdlCode'];
          this.modelName = response['returnObject']['orgMdlName'];
          if (response['returnObject']['isActive'] == '1') { this.isActive = true; } else { this.isActive = false; }
        },
        (error) => {
          console.log('Error Get');
          console.log(error);
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  Save(OrgMdlForm: NgForm): void {
    this.spinner.show();
    var getOrgModel = this.foundationUrl + AdInsConstant.GetOrgMdl;
    var orgMdlObj: OrgMdlObj;
    orgMdlObj = new OrgMdlObj()
    orgMdlObj.refOrgId = +this.refOrgId;
    orgMdlObj.orgMdlCode = OrgMdlForm.value.modelCode;

    //MODE-ADD
    if (this.type != 'edit') {

      //CHECK-DUPLICATE-CODE
      this.httpClient.post(getOrgModel, orgMdlObj).subscribe(
        (response) => {
          console.log("Success Check Duplicate");
          if (response['returnObject'] != null) {
            this.service.typeErrorCustom('Code Has Been Used');
          }
          else {
            this.apiUrl = this.foundationUrl + AdInsConstant.AddOrgMdl;
            this.orgModelObj = new OrgMdlObj();
            this.orgModelObj.refOrgId = +this.refOrgId;
            this.orgModelObj.orgMdlCode = OrgMdlForm.value.modelCode;
            this.orgModelObj.orgMdlName = OrgMdlForm.value.modelName;
            if (OrgMdlForm.value.isActive) { this.orgModelObj.isActive = '1' } else { this.orgModelObj.isActive = '0' };

            //SAVE
            this.httpClient.post(this.apiUrl, this.orgModelObj).subscribe(
              (response) => {
                console.log("Success Save");
                this.service.typeSave(response['message']);
                this.location.back();
                // this.router.navigate(['/commonSetting/master/detail']);

              },
              (error) => {
                console.log("Error Save");
                this.service.typeErrorCustom(error);
              }
            );
          }
        },
        (error) => {
          console.log("Error Check Duplicate");
          this.service.typeErrorCustom(error);
        }
      );
    }
    //MODE-EDIT
    else {
      this.apiUrl = this.foundationUrl + AdInsConstant.EditOrgMdl;
      this.orgModelObj.refOrgId = +this.refOrgId;
      this.orgModelObj.orgMdlCode = OrgMdlForm.value.modelCode;
      this.orgModelObj.orgMdlName = OrgMdlForm.value.modelName;
      if (OrgMdlForm.value.isActive) { this.orgModelObj.isActive = '1' } else { this.orgModelObj.isActive = '0' };

      //SAVE
      this.httpClient.post(this.apiUrl, this.orgModelObj).subscribe(
        (response) => {
          console.log("Success Edit");
          this.service.typeSave(response['message']);
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

  }

  GetRefOrg() {
    var getOrgUrl = this.foundationUrl + AdInsConstant.GetRefOrg;
    this.orgObj = new OrganizationObj();
    this.orgObj.refOrgId = +this.refOrgId;
    this.httpClient.post(getOrgUrl, this.orgObj).subscribe(
      (response) => {
        this.orgObj = response['returnObject'];
      },
      (error) => {
        this.service.typeErrorCustom(error);
      });
  }

}
