import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefJobTitleObj } from 'app/shared/model/RefJobTitle.model';

@Component({
  selector: 'app-ref-job-title-add',
  templateUrl: './ref-job-title-add.component.html',
  styleUrls: ['./ref-job-title-add.component.scss']
})
export class RefJobTitleAddComponent implements OnInit {

  type: string = "Add";
  param: string;
  resultData: any;
  jobTitleId: any
  apiUrl: any
  foundationUrl: string = environment.foundationUrl;

  constructor(private route: ActivatedRoute, private adInsService: AdInsServiceService) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefJobTitleById; 

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
    this.adInsService.postData(this.apiUrl,jobTitleObj).subscribe(
      (response) => {
        console.log("Success");
        this.resultData = response.returnObject;
        console.log(this.resultData);
      },
      (error) => {
        console.log("Error");
        console.log(error);
      }
    );;
    }
  }

}
