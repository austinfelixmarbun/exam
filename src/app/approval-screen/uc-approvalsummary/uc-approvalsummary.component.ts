import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-uc-approvalsummary',
  templateUrl: './uc-approvalsummary.component.html',
})
export class UcApprovalsummaryComponent implements OnInit {

  @Input() inputObj: any;
  taskId: number;
  instanceId: number;
  baseUrl : string;
  URLGetApprovalInfo: string;
  RFAInformation: any;
  RFARoot: any;
  
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.taskId = this.inputObj.taskId;
    this.instanceId = this.inputObj.instanceId;
    this.baseUrl = this.inputObj.approvalBaseUrl;
    this.URLGetApprovalInfo = this.baseUrl + "/api/ApprovalInstanceWeb/GetApprovalScreenViewInfo"
    this.LoadApprovalInfo(this.taskId, this.instanceId);
  }

  LoadApprovalInfo(taskId: number, instanceId: number) {
    var GetApvInfoReq = {
      taskId: taskId,
      instanceId: instanceId,
      isNeedRFAInfo: true,
      isNeedPossibleResults: true,
      isNeedRecommendations: true,
      isNeedSummaryView: false
    }

    this.http.post(this.URLGetApprovalInfo, GetApvInfoReq).subscribe(
      (response) => {
        this.RFARoot = response;
        this.RFAInformation = this.RFARoot["RFAInformation"]
      }
    )
  }

}
