import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefJobTitleObj } from 'app/shared/model/RefJobTitle.model';
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
  JobTitleCode: any;
  JobTitleName: any;
  Descr: any;
  isInternal: boolean = false;
  rjtObj : RefJobTitleObj;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  foundationUrl: string = environment.foundationUrl;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefJobTitleById;
    this.addUrl = this.foundationUrl + AdInsConstant.AddRefJobTitle;
    this.editUrl = this.foundationUrl + AdInsConstant.EditRefJobTitle;

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
    if (this.pageType == "edit") {
      this.rjtObj = new RefJobTitleObj()
      this.rjtObj.RefJobTitleId = this.jobTitleId
      this.httpClient.post(this.apiUrl, this.rjtObj).subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response['returnObject'];
          console.log(this.resultData);
          this.JobTitleCode = response['returnObject']['jobTitleCode']
          this.JobTitleName = response['returnObject']['jobTitleName']
          this.Descr = response['returnObject']['descr']
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
      this.rjtObj.MrJobPositionLvl = '3';
      this.rjtObj.RefOrgId = '1';

      console.log(JSON.stringify(this.rjtObj))
      console.log(this.rjtObj);
      this.httpClient.post(this.addUrl, this.rjtObj).subscribe(
        (response) => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response['returnObject']['refJobTitleId']);
          this.router.navigate(["/organization/refjobtitle"]);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    } else {
      var formInput = this.resultData;
      formInput.jobTitleCode = ReqForm.value.JobTitleCode;
      formInput.jobTitleName = ReqForm.value.JobTitleName;
      formInput.descr = ReqForm.value.Descr;
      if (this.isInternal === false) {
        formInput.isInternal = "0";
      }
      else {
        formInput.isInternal = "1";
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
