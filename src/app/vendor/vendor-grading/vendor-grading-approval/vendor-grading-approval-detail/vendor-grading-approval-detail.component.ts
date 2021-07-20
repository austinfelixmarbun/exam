import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { ApprovalObj } from 'app/shared/model/Approval/ApprovalObj.Model';
import { UcInputApprovalGeneralInfoObj } from 'app/shared/model/UcInputApprovalGeneralInfoObj.model';
import { UcInputApprovalHistoryObj } from 'app/shared/model/UcInputApprovalHistoryObj.Model';
import { UcInputApprovalObj } from 'app/shared/model/UcInputApprovalObj.Model';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-vendor-grading-approval-detail',
  templateUrl: './vendor-grading-approval-detail.component.html',
  providers: [NGXToastrService]
})
export class VendorGradingApprovalDetailComponent implements OnInit {

  VendorGradingHistId: number;
  VendorGradingHistNo : string;
  taskId: number;
  instanceId: number;
  inputObj: any;
  viewVendorBranchObj: UcViewGenericObj = new UcViewGenericObj();
   
  InputApvObj : UcInputApprovalObj;
  InputApprovalHistoryObj : UcInputApprovalHistoryObj;
  UcInputApprovalGeneralInfoObj : UcInputApprovalGeneralInfoObj;
  IsReady: boolean = false;
  ApvReqId: number;
  
  constructor(private router: Router, 
    private route: ActivatedRoute,
     private toastr: NGXToastrService,
     private http: HttpClient,
     ) {

    this.route.queryParams.subscribe(params => {
 
      if(params["VendorGradingHistId"] != null) {
        this.VendorGradingHistId = params["VendorGradingHistId"];
        this.VendorGradingHistNo = params["VendorGradingHistNo"];
      }

      if(params["TaskId"] != null){
        this.taskId = params["TaskId"];
      }

      if(params["InstanceId"] != null){
        this.instanceId = params["InstanceId"];
      }

      if(params["ApvReqId"] != null){
        this.ApvReqId = params["ApvReqId"];
      }

    });
  }

  ngOnInit() {
    this.viewVendorBranchObj.viewInput = "./assets/ucviewgeneric/viewVendorGradingMainInformation.json";
    
    var ApvHoldObj = new ApprovalObj()
    ApvHoldObj.TaskId = this.taskId

    this.HoldTask(ApvHoldObj);
    this.initInputApprovalObj();
  }

  HoldTask(obj : any){
    this.http.post(URLConstant.ApvHoldTaskUrl, obj).subscribe(
      (response)=>{
      }
    )
  }

  onAvailableNextTask(event : any)
  {
    
  }

  onApprovalSubmited(event : any)
  {
    let obj = {
      Tasks: event.Tasks
    }
    this.http.post(environment.FoundationR3Url + URLConstant.SubmitApproval, obj).subscribe(
      (response)=>{
        this.toastr.successMessage(response["Message"]);
        this.router.navigate(["/Vendor/VendorGrading/Approval/Paging"]);
      }
    );
  }

  initInputApprovalObj(){

    this.UcInputApprovalGeneralInfoObj = new UcInputApprovalGeneralInfoObj();
    this.UcInputApprovalGeneralInfoObj.PathUrl = "/Approval/GetSingleTaskInfo";
    this.UcInputApprovalGeneralInfoObj.TaskId = this.taskId;
    
    this.InputApprovalHistoryObj = new UcInputApprovalHistoryObj();
    this.InputApprovalHistoryObj.PathUrl = "/Approval/GetTaskHistory";
    this.InputApprovalHistoryObj.RequestId = this.ApvReqId;

    this.InputApvObj = new UcInputApprovalObj();
    this.InputApvObj.TaskId = this.taskId;
    this.InputApvObj.RequestId = this.ApvReqId;
    this.InputApvObj.TrxNo = this.VendorGradingHistNo;
    this.IsReady = true; 
  }

  onCancelClick()
  {
    this.router.navigate(["/Vendor/VendorGrading/Approval/Paging"]);
  }

  GetCallBack(e : any){
    // AdInsHelper.OpenProdOfferingViewByCodeAndVersion(e.ViewObj.ProdOfferingCode, e.ViewObj.ProdOfferingVersion);
  }
}
