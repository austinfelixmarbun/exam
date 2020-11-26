import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import Stepper from 'bs-stepper';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-update-master-detail',
  templateUrl: './customer-update-master-detail.component.html',
  styles: []
})
export class CustomerUpdateMasterDetailComponent implements OnInit {
  private CompanyWizard: Stepper;
  private PersonalWizard: Stepper;
  ViewGenericObj: UcViewGenericObj;
  CustDataTrxId: number;
  CustNo: string;
  StepIdx: number;
  MrCustTypeCode: string;
  CompanyConstant: string;
  PersonalConstant: string;
  WfTaskListId: number;

  CustPersonalStep = {
    "CUST": 1,
    "ADDR": 2,
    "FAMILY": 3,
    "EMERGENCY": 4,
    "JOB": 5,
    "FIN": 6
  };
  CustCompanyStep = {
    "CUST": 1,
    "ADDR": 2,
    "SHAREHOLDER": 3,
    "CONTACT": 4,
    "FIN": 5,
    "LEGAL": 6
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params["CustDataTrxId"] != null) {
        this.CustDataTrxId = params["CustDataTrxId"];
      }
      if (params["CustNo"] != null) {
        this.CustNo = params["CustNo"];
      }
      if (params["WfTaskListId"] != null) {
        this.WfTaskListId = params["WfTaskListId"];
      }
    });
    this.StepIdx = 1;
    this.PersonalConstant = CommonConstant.CustTypePersonal;
    this.CompanyConstant = CommonConstant.CustTypeCompany;
    this.ViewGenericObj = new UcViewGenericObj();
    this.ViewGenericObj.viewInput = "./assets/ucviewgeneric/viewUpdateMasterCust.json";
    this.ViewGenericObj.viewEnvironment = environment.FoundationR3Url;
    this.ViewGenericObj.ddlEnvironments = [
      {
        name: "AppNo",
        environment: environment.FoundationR3Web
      }
    ];
  }

  ngOnInit() {
    this.claimTask();
    this.http.post(URLConstant.GetCustByCustNo, { CustNo: this.CustNo }).toPromise().then(
      (response: CustObj) => {
        this.MrCustTypeCode = response.MrCustTypeCode;
        if(response.MrCustTypeCode == CommonConstant.CustTypePersonal){
          this.PersonalWizard = new Stepper(document.querySelector('#PersonalWizard'), {
            linear: false,
            animation: true
          });
          document.getElementById('PersonalWizard').style.display = 'block';
          document.getElementById('CompanyWizard').style.display = 'none';
        }
        else{
          this.CompanyWizard = new Stepper(document.querySelector('#CompanyWizard'), {
            linear: false,
            animation: true
          });
          document.getElementById('PersonalWizard').style.display = 'none';
          document.getElementById('CompanyWizard').style.display = 'block';
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  claimTask() {
    var currentUserContext = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    var wfClaimObj = { pWFTaskListID: this.WfTaskListId, pUserID: currentUserContext[CommonConstant.USER_NAME] };
    this.http.post(URLConstant.ClaimTask, wfClaimObj).subscribe(
      (response) => {
      });
  }

  EnterTab(step){
    if(this.MrCustTypeCode == CommonConstant.CustTypePersonal){
      switch (step) {
        case "CUST":
          this.StepIdx = this.CustPersonalStep["CUST"];
          break;
        case "ADDR":
          this.StepIdx = this.CustPersonalStep["ADDR"];
          break;
        case "FAMILY":
          this.StepIdx = this.CustPersonalStep["FAMILY"];
          break;
        case "EMERGENCY":
          this.StepIdx = this.CustPersonalStep["EMERGENCY"];
          break;
        case "JOB":
          this.StepIdx = this.CustPersonalStep["JOB"];
          break;
        case "FIN":
          this.StepIdx = this.CustPersonalStep["FIN"];
          break;
        default:
          break;
      }
    }
    else{
      switch (step) {
        case "CUST":
          this.StepIdx = this.CustCompanyStep["CUST"];
          break;
        case "ADDR":
          this.StepIdx = this.CustCompanyStep["ADDR"];
          break;
        case "SHAREHOLDER":
          this.StepIdx = this.CustCompanyStep["SHAREHOLDER"];
          break;
        case "CONTACT":
          this.StepIdx = this.CustCompanyStep["CONTACT"];
          break;
        case "FIN":
          this.StepIdx = this.CustCompanyStep["FIN"];
          break;
        case "LEGAL":
          this.StepIdx = this.CustCompanyStep["LEGAL"];
          break;
        default:
          break;
      }
    }
  }

  StepperHandler(e){
    if(e.StatusCode == 200){
      if(this.MrCustTypeCode == CommonConstant.CustTypePersonal){
        if(this.StepIdx == this.CustPersonalStep["FIN"]){
          this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
        }
        else{
          this.StepIdx++;
          this.PersonalWizard.next();
        }
      }
      else{
        if(this.StepIdx == this.CustCompanyStep["LEGAL"]){
          this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
        }
        else{
          this.StepIdx++;
          this.CompanyWizard.next();
        }
      }
    }
  }

  GetCallback(e){
    AdInsHelper.OpenProdOfferingViewByCodeAndVersion(e.ViewObj.ProdOfferingCode, e.ViewObj.ProdOfferingVersion);
  }
}
