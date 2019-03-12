import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { RefOfficeObj } from 'app/shared/model/RefOfficeObj.model';

@Component({
  selector: 'app-office-add',
  templateUrl: './office-add.component.html',
  styleUrls: ['./office-add.component.scss']
})
export class OfficeAddComponent implements OnInit {
  
  type: string = "add";
  param: string;
  resultData: any;
  refOfficeId: any
  apiUrl: any
  foundationUrl: string = environment.foundationUrl;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefJobTitleById; 
    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.type = params['param'];
      }
      if (params['refOfficeId'] != null) {
        this.refOfficeId = params['refOfficeId'];
      }
      console.log(this.type)
      console.log(this.refOfficeId)
  });
  }

  ngOnInit() {
    if (this.type == "edit") {
    var refOfficeObj = new RefOfficeObj()
    refOfficeObj.refOfficeId = this.refOfficeId
    this.httpClient.post(this.apiUrl, refOfficeObj).subscribe(
      (response) => {
        console.log("Success");
        this.resultData = response['returnObject'];
        console.log(this.resultData);
      },
      (error) => {
        console.log("Error");
        console.log(error);
      }
    );
    }
  }

}
