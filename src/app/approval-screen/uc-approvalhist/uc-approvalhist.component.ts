import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-uc-approvalhist',
  templateUrl: './uc-approvalhist.component.html',
})
export class UcApprovalhistComponent implements OnInit {
  @Input() inputObj : any;
  refId : number;
  apvBaseUrl : string;
  historyType : string;
  
  ListApprovalHist : any;
  
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.refId = this.inputObj.refId;
    this.apvBaseUrl = this.inputObj.approvalBaseUrl;
    this.historyType = this.inputObj.type;

    console.log(this.historyType);

    if(this.historyType == 'instance')
    {
      this.LoadApprovalInstanceHist();
    }
    else if(this.historyType == 'task')
    {
      this.LoadApprovalTaskHist();
    }
  }

  LoadApprovalInstanceHist() {
    this.http.post(this.apvBaseUrl + "/api/ApprovalInstanceWeb/GetInstanceTaskHistory", { instanceId: this.refId }).subscribe(
      (response) => {
        this.ListApprovalHist = response;
      }
    );
  }

  LoadApprovalTaskHist() {
    this.http.post(this.apvBaseUrl + "/api/ApprovalInstanceWeb/GetRFATaskHistory", { rfaId: this.refId }).subscribe(
      (response) => {
        this.ListApprovalHist = response;
      }
    );
  }

}
