import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {
  viewCustMainInfoHeaderObj : any;
  

  CustId: any;
  viewCustJobData: string;
  getCustByCustIdUrl = AdInsConstant.GetCustByCustId;
  custResultData: any;
  custModel: any;
  viewCustJobDataAddress: string;
  isMainData: boolean;
  isAddress: boolean;
  isJobData: boolean;
  isCustModel: boolean;
  isFinData: boolean;
  isContactPerson: boolean;
  isCustGroup: any;
  isOtherAttr: boolean;
  isAppListing: boolean;
  custType: any;
  viewCustCoyMainInfoHeader: any;
  isManagement: boolean;
  isContact: boolean;
  isLegal: boolean;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('sini');
    this.viewCustMainInfoHeaderObj =  "./assets/ucviewgeneric/viewCustMainInfoHeader.json";
    this.viewCustCoyMainInfoHeader =  "./assets/ucviewgeneric/viewCustCoyMainInfoHeader.json";
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
    });

    var custObj = {
      CustId: this.CustId
    }
    this.http.post(this.getCustByCustIdUrl, custObj).subscribe(
      (response) => {
        this.custResultData = response;
        this.custModel = this.custResultData['MrCustModelCode'];
        this.custType  = this.custResultData['MrCustTypeCode'];
        console.log('cust model = ', this.custModel);
      },
      (error) =>{
        this.custModel = "";
        this.custType = "";
        console.log('error');
        console.log(error);
      }
    );
    
  }
  EnterTab(type){
    if(type == "mainData"){
      this.isMainData = true;
      this.isAddress = false;
      this.isContactPerson = false;
      this.isCustGroup = false;
      this.isJobData = false;
      this.isFinData = false;
      this.isOtherAttr = false;
      this.isAppListing = false;
    }
    else if(type == "address"){
      this.isMainData = false;
      this.isAddress = true;
      this.isContactPerson = false;
      this.isCustGroup = false;
      this.isJobData = false;
      this.isFinData = false;
      this.isOtherAttr = false;
      this.isAppListing = false;
    }
    else if(type == "contactPerson"){
      this.isMainData = false;
      this.isAddress = false;
      this.isContactPerson = true;
      this.isCustGroup = false;
      this.isJobData = false;
      this.isFinData = false;
      this.isOtherAttr = false;
      this.isAppListing = false;
    }
    else if(type == "custGroup"){
      this.isMainData = false;
      this.isAddress = false;
      this.isContactPerson = false;
      this.isCustGroup = true;
      this.isJobData = false;
      this.isFinData = false;
      this.isOtherAttr = false;
      this.isAppListing = false;
    }
    else if(type == "jobData"){
      this.isMainData = false;
      this.isAddress = false;
      this.isContactPerson = false;
      this.isCustGroup = false;
      this.isJobData = true;
      this.isFinData = false;
      this.isOtherAttr = false;
      this.isAppListing = false;
    }
    else if(type == "finData"){
      this.isMainData = false;
      this.isAddress = false;
      this.isContactPerson = false;
      this.isCustGroup = false;
      this.isJobData = false;
      this.isFinData = true;
      this.isOtherAttr = false;
      this.isAppListing = false;
    }
    else if(type == "otherAttr"){
      this.isMainData = false;
      this.isAddress = false;
      this.isContactPerson = false;
      this.isCustGroup = false;
      this.isJobData = false;
      this.isFinData = false;
      this.isOtherAttr = true;
      this.isAppListing = false;
    }
    else if(type == "appListing"){
      this.isMainData = false;
      this.isAddress = false;
      this.isContactPerson = false;
      this.isCustGroup = false;
      this.isJobData = false;
      this.isFinData = false;
      this.isOtherAttr = false;
      this.isAppListing = true;
    }
  }

  EnterTabCoy(type){
    if(type == "mainData"){
      this.isMainData = true;
      this.isAddress = false;
      this.isManagement = false;
      this.isContact = false;
      this.isFinData = false;
      this.isLegal = false;
    }
    else if(type == "address"){
      this.isMainData = false;
      this.isAddress = true;
      this.isManagement = false;
      this.isContact = false;
      this.isFinData = false;
      this.isLegal = false;
    }
    else if(type == "management"){
      this.isMainData = false;
      this.isAddress = false;
      this.isManagement = true;
      this.isContact = false;
      this.isFinData = false;
      this.isLegal = false;
    }
    else if(type == "contact"){
      this.isMainData = false;
      this.isAddress = false;
      this.isManagement = false;
      this.isContact = true;
      this.isFinData = false;
      this.isLegal = false;
    }
    else if(type == "finData"){
      this.isMainData = false;
      this.isAddress = false;
      this.isManagement = false;
      this.isContact = false;
      this.isFinData = true;
      this.isLegal = false;
    }
    else if(type == "legal"){
      this.isMainData = false;
      this.isAddress = false;
      this.isManagement = false;
      this.isContact = false;
      this.isFinData = false;
      this.isLegal = bypassSanitizationTrustResourceUrl;
    }
  }

}
