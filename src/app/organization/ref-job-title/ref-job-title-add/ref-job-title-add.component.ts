import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefJobTitleObj } from 'app/shared/model/RefJobTitleObj.Model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-ref-job-title-add',
  templateUrl: './ref-job-title-add.component.html',
  styleUrls: ['./ref-job-title-add.component.scss'],
  providers: [NGXToastrService]
})
export class RefJobTitleAddComponent implements OnInit {

  pageType: string = "add";
  param: string;
  resultData: any;
  jobTitleId: any;
  jobTitleCode: any;
  jobTitleName: any;
  refOrgId: any;
  jobPosition: any;
  descr: any;
  isInternal: boolean = false;
  rjtObj : RefJobTitleObj;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  refOrgUrl: any;
  allRefOrg: any;
  allJobPosition: any;
  jobPositionUrl: any;
  foundationUrl: string = environment.foundationUrl;
  settingUrl: string = environment.settingUrl;
  mrJobPositionLvl: any;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefJobTitleById;
    this.addUrl = this.foundationUrl + AdInsConstant.AddRefJobTitle;
    this.editUrl = this.foundationUrl + AdInsConstant.EditRefJobTitle;
    this.refOrgUrl = this.foundationUrl + AdInsConstant.GetListAllRefOrg;
    this.jobPositionUrl = this.settingUrl + AdInsConstant.GetRefMasterListKeyValuePair;

    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.pageType = params['param'];
      }
      if (params['jobTitleId'] != null) {
        this.jobTitleId = params['jobTitleId'];
      }
      console.log(this.pageType)
      console.log(this.jobTitleId)
    });
  }

  ngOnInit() {
    this.httpClient.post(this.refOrgUrl, null).subscribe(
      (response) => {
        console.log("Success");
        console.log(response);
        this.allRefOrg = response['returnObject'];
        this.refOrgId = response['returnObject'][0]['refOrgId']
        console.log(this.allRefOrg);
      },
      (error) => {
        console.log("Error");
        console.log(error);
      }
    );
    var refMasterObj = {
      RefMasterTypeCode: "JOB_POSITION_LVL",
    };
    this.httpClient.post(this.jobPositionUrl, refMasterObj).subscribe(
      (response) => {
        console.log("Success");
        console.log(response);
        this.allJobPosition = response['returnObject'];
        this.mrJobPositionLvl = response['returnObject'][0]['value']
        console.log(this.allJobPosition);
      },
      (error) => {
        console.log("Error");
        console.log(error);
      }
    );

    if (this.pageType == "edit") {
      this.rjtObj = new RefJobTitleObj()
      this.rjtObj.RefJobTitleId = this.jobTitleId
      this.httpClient.post(this.apiUrl, this.rjtObj).subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response['returnObject'];
          console.log(this.resultData);
          this.jobTitleCode = response['returnObject']['jobTitleCode']
          this.jobTitleName = response['returnObject']['jobTitleName']
          this.descr = response['returnObject']['descr']
          this.refOrgId = response['returnObject']['refOrgId']
          this.mrJobPositionLvl = response['returnObject']['mrJobPositionLvl']
          if (this.resultData.isInternal == "1") {
            this.isInternal = true;
          }
          else {
            this.isInternal = false;
          }
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }

  toggleVisibility(e) {
    this.isInternal = e.target.checked;
  }

  SaveForm(ReqForm: NgForm) {
    if (this.pageType == 'add') {
      this.rjtObj = new RefJobTitleObj();
      this.rjtObj = ReqForm.value;
      if (this.isInternal === false) {
        this.rjtObj.IsInternal = "0";
      }
      else {
        this.rjtObj.IsInternal = "1";
      }
      this.rjtObj.MrJobPositionLvl = ReqForm.value.MrJobPositionLvl;

      console.log(JSON.stringify(this.rjtObj))
      console.log(this.rjtObj);
      this.httpClient.post(this.addUrl, this.rjtObj).subscribe(
        (response) => {
          console.log(response);
          if (response['isError'] != true) {
            this.toastr.successMessage(response['returnObject']['refJobTitleId']);
            this.router.navigateByUrl('/organization/refjobtitle', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/organization/refjobtitle/add']));
          }else{
          }
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    } else {
      var formInput: RefJobTitleObj = this.resultData;
      formInput.JobTitleCode = ReqForm.value.jobTitleCode;
      formInput.JobTitleName = ReqForm.value.jobTitleName;
      formInput.Descr = ReqForm.value.descr;
      formInput.MrJobPositionLvl = ReqForm.value.mrJobPositionLvl;
      if (this.isInternal === false) {
        formInput.IsInternal = "0";
      }
      else {
        formInput.IsInternal = "1";
      }

      console.log(JSON.stringify(formInput))
      console.log(formInput);
      this.httpClient.post(this.editUrl, formInput).subscribe(
        (response) => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response['message']);
          this.router.navigate(["/organization/refjobtitle"]);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }
}
