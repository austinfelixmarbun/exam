import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { DMSObj } from 'app/shared/model/DMS/DMSObj.model';
import { DMSLabelValueObj } from 'app/shared/model/DMS/DMSLabelValueObj.Model';

@Component({
  selector: 'app-customer-view-document',
  templateUrl: './customer-view-document.component.html'
})


export class CustomerViewDocumentComponent implements OnInit {

  CustId: number;
  isReady : boolean = false;
  dmsObj: DMSObj;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
  }

  async ngOnInit() {
    console.log("babibubebo");
    var custObj = { "CustId": this.CustId };
    await this.http.post(URLConstant.GetCustByCustId, custObj).toPromise().then(
      (response: any) => {
        let currentUserContext = JSON.parse(localStorage.getItem("UserAccess"));
        this.dmsObj = new DMSObj();
        this.dmsObj.User = currentUserContext.UserName;
        this.dmsObj.Role = currentUserContext.RoleCode;
        this.dmsObj.ViewCode = CommonConstant.DmsViewCodeCust;
        this.dmsObj.MetadataParent = null;
        this.dmsObj.MetadataObject.push(new DMSLabelValueObj(CommonConstant.DmsNoCust, response["CustNo"]));
        this.dmsObj.Option.push(new DMSLabelValueObj(CommonConstant.DmsOverideSecurity, CommonConstant.DmsOverideView));
        this.isReady = true;
      }
    );
  }
}
