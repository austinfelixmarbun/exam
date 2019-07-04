import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEmpLeaveMngmntObj } from 'app/shared/model/RefEmpLeaveMngmntObj.Model';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { formatDate } from '@angular/common';
import { environment } from 'environments/environment';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { LookupemployeeComponent } from '@adins/lookupemployee';

@Component({
  selector: 'app-leave-maintenance-add-edit',
  templateUrl: './leave-maintenance-add-edit.component.html',
  styleUrls: ['./leave-maintenance-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class LeaveMaintenanceAddEditComponent implements OnInit {
  @ViewChild(UcAddressComponent) ucAddr;
  @ViewChild(UcContactInfoComponent) ucContact;
  @ViewChildren(LookupemployeeComponent) lookupemployeeComponent;
  inputLookupObj: any;
  refEmpLeaveMngmntId: any;
  refEmpId: any;
  pageType: string = "add";
  empNo: any;
  empName: any;
  startDt: any;
  endDt: any;
  isPassed: boolean = false;
  refEmpLeaveMngmntObj: RefEmpLeaveMngmntObj;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  refBankUrl: any;
  empBankUrl: any;
  bankName: string;
  idSelect: any;
  jsonSelect: string;
  foundationUrl: any;
  getUrl: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private toastr: NGXToastrService) {

    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }else{
        this.pageType = "add";
      }
      if (params["refEmpLeaveMngmntId"] != null) {
        this.refEmpLeaveMngmntId = params["refEmpLeaveMngmntId"];
      }
      console.log(this.pageType);
      console.log(this.refEmpLeaveMngmntId);
      this.foundationUrl = environment.foundationUrl;
      this.apiUrl = this.foundationUrl + AdInsConstant.GetEmpPositionPaging;
      this.addUrl = this.foundationUrl + AdInsConstant.AddRefEmpLeaveMngmnt;
      this.editUrl = this.foundationUrl + AdInsConstant.EditRefEmpLeaveMngmnt;
      this.getUrl = this.foundationUrl + AdInsConstant.GetRefEmpLeaveMngmntById;
    });
  }

  ngOnInit() {

    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/lookup/lookupEmp.json";
    this.inputLookupObj.urlQryPaging = AdInsConstant.GetListEmployee;
    this.inputLookupObj.urlEnviPaging = environment.foundationUrl;

    if (this.pageType == "edit") {
      this.refEmpLeaveMngmntObj = new RefEmpLeaveMngmntObj();
      this.refEmpLeaveMngmntObj.refEmpLeaveMngmntId = this.refEmpLeaveMngmntId;
      this.httpClient.post(this.getUrl, this.refEmpLeaveMngmntObj).subscribe(
        response => {
          console.log(response);
          this.refEmpId = response["returnObject"].refEmpId;
          this.empNo = response["returnObject"].empNo;
          this.empName = response["returnObject"].empName;
          this.startDt = formatDate(response["returnObject"].startDt, "yyyy-MM-dd", "en-US");
          this.endDt = formatDate(response["returnObject"].endDt, "yyyy-MM-dd", "en-US");
          if (response["returnObject"].isPassed === "0") {
            this.isPassed == false;
          } else {
            this.isPassed == true;
          }
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }

  SaveForm(ReqForm: NgForm, lookupEmp: any):void {
    console.log(lookupEmp);
    console.log(this.lookupemployeeComponent);
    this.refEmpLeaveMngmntObj = new RefEmpLeaveMngmntObj();
    this.refEmpLeaveMngmntObj.startDt = ReqForm.value.startDt;
    this.refEmpLeaveMngmntObj.endDt = ReqForm.value.endDt;
    if (this.isPassed === false) {
      this.refEmpLeaveMngmntObj.isPassed = "0";
    } else {
      this.refEmpLeaveMngmntObj.isPassed = "1";
    }
    if (this.pageType == "add") {
      this.refEmpLeaveMngmntObj.refEmpId = this.lookupemployeeComponent.first.lookupInput.idSelect;
      console.log(JSON.stringify(this.refEmpLeaveMngmntObj));
      console.log(this.refEmpLeaveMngmntObj);
      this.httpClient.post(this.addUrl, this.refEmpLeaveMngmntObj).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/employee', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/employee/leaveMaintenance']));
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
    } else {
      this.refEmpLeaveMngmntObj.refEmpLeaveMngmntId = this.refEmpLeaveMngmntId;
      this.refEmpLeaveMngmntObj.refEmpId = this.refEmpId;
      console.log(JSON.stringify(this.refEmpLeaveMngmntObj));
      console.log(this.refEmpLeaveMngmntObj);
      this.httpClient.post(this.editUrl, this.refEmpLeaveMngmntObj).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/employee/leaveMaintenance"]);
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }
}
