import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefJobTitleObj } from 'app/shared/model/RefJobTitle.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ref-job-title-add',
  templateUrl: './ref-job-title-add.component.html',
  styleUrls: ['./ref-job-title-add.component.scss']
})
export class RefJobTitleAddComponent implements OnInit {

  type: string = "Add";
  param: string;
  resultData: any;
  jobTitleId: any;
  JobTitleCode: any;
  JobTitleName: any;
  Descr: any;
  apiUrl: any;
  editUrl: any;
  foundationUrl: string = environment.foundationUrl;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefJobTitleById; 
    this.editUrl = this.foundationUrl + AdInsConstant.EditRefJobTitle; 

    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.type = params['param'];
      }
      if (params['jobTitleId'] != null) {
        this.jobTitleId = params['jobTitleId'];
      }
      console.log(this.type)
      console.log(this.jobTitleId)
  });
  }

  ngOnInit() {
    if (this.type == "edit") {
    var jobTitleObj = new RefJobTitleObj()
    jobTitleObj.RefJobTitleId = this.jobTitleId
    this.httpClient.post(this.apiUrl, jobTitleObj).subscribe(
      (response) => {
        console.log("Success");
        this.resultData = response['returnObject'];
        console.log(this.resultData);
        this.JobTitleCode = response['returnObject']['jobTitleCode']
        this.JobTitleName = response['returnObject']['jobTitleName']
        this.Descr = response['returnObject']['descr']
      },
      (error) => {
        console.log("Error");
        console.log(error);
      }
    );
    }
  }

  SaveForm(ReqForm: NgForm) {
    var formInput = this.resultData;
    formInput.jobTitleCode = ReqForm.value.JobTitleCode;
    formInput.jobTitleName = ReqForm.value.JobTitleName;
    formInput.descr = ReqForm.value.Descr;

    console.log(JSON.stringify(formInput))
    console.log(formInput);
    
    this.httpClient.post(this.editUrl, formInput).subscribe(
      (response) => {
        console.log("Success");
        console.log(response);
      },
      (error) => {
        console.log("Error");
        console.log(error);
      }
    );
  }
}
