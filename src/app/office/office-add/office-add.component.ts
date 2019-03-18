import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { OfficeObj } from 'app/shared/model/OfficeObj.model';
import { RefOfficeObj } from 'app/shared/model/RefOfficeObj.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-office-add',
  templateUrl: './office-add.component.html',
  styleUrls: ['./office-add.component.scss']
})
export class OfficeAddComponent implements OnInit {
  
  type: string = "add";
  param: string;
  result: any;
  refOfficeId: any
  apiUrl: any
  foundationUrl: string = environment.foundationUrl;
  isActive: any = 1;
  isVirtualOffice: any = 1;
  addEditUrl : any;
  officeObj: OfficeObj;

  constructor(private router: Router,private route: ActivatedRoute, private httpClient: HttpClient) {
    this.apiUrl = this.foundationUrl + AdInsConstant.getRefOfficeObj; 
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
        this.result = response['returnObject'];
        this.isActive = this.result.isActive;
        this.isVirtualOffice = this.result.isVirtualOffice;
        console.log(this.result);
      },
      (error) => {
        console.log("Error");
        console.log(error);
      }
    );
    }
  }

  Save(OfficeAddReqForm: NgForm): void {
    if (this.type === "edit") {
        this.addEditUrl = this.foundationUrl + AdInsConstant.EditRefBank;
        this.officeObj = new OfficeObj();
        this.officeObj = OfficeAddReqForm.value;
        this.officeObj.refOfficeId = this.param;
        this.httpClient.post(this.addEditUrl, this.officeObj).subscribe(
            (response) => {
                console.log(response);
                this.router.navigateByUrl('/bank');
            },
            (error)=>
            {
                console.log(error);
            });
    }
    else
    {
        this.addEditUrl = this.foundationUrl + AdInsConstant.AddRefBank;
        this.officeObj = new OfficeObj();
        this.officeObj = OfficeAddReqForm.value;
        this.officeObj.refOfficeId = "0";
        this.httpClient.post(this.addEditUrl, this.officeObj).subscribe(
            (response) => {
                console.log(response);
                this.router.navigateByUrl('/bank');
            },
            (error)=>
            {
                console.log(error);
            });
    }
}

}
