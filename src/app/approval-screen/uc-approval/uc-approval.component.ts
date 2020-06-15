import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-uc-approval',
  templateUrl: './uc-approval.component.html',
})
export class UcApprovalComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: NgbModal
    ) { }

  @Input() inputObj: any;
  @Input() showCancel: boolean = false;
  @Output() nextTask: EventEmitter<any> = new EventEmitter();
  @Output() result: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  taskId: number;
  instanceId: number;
  trxNo: string;
  URLGetApprovalInfo: string;
  URLGetMinFinLevel: string;
  URLGetReason: string;
  URLGetNextPerson : string;
  URLPostCompleteTask : string;
  baseUrl : string;
  RFAInformation: any;
  FormApproval: FormGroup;
  RFARoot: any;
  ListMinFinLevel: any;
  ListReason: any;
  canApproveFinal: boolean = false;
  canRejectFinal: boolean = false;
  isFinal: boolean = false;
  showFinal: boolean = false;
  showNextPerson: boolean = false;
  showReason: boolean = false;
  dictMember: { [key: string]: any; } = {};


  PossibleResults = new Array();

  ngOnInit() {
    console.log("Show Cancel",this.showCancel)
    this.taskId = this.inputObj.taskId;
    this.instanceId = this.inputObj.instanceId;
    this.baseUrl = this.inputObj.approvalBaseUrl;
     
    this.FormApproval = this.fb.group(
      {
        taskId: [this.taskId],
        instanceId: [this.instanceId],
        trxNo: [''],
        minFinalLevel: ['-1'],
        reasonType: [''],
        reason: [''],
        notes: ['', Validators.required],
        result: ['', Validators.required],
        approveFinal: [false],
        nodes: this.fb.array([])
      }
    );

    this.URLGetApprovalInfo = this.baseUrl + "/api/ApprovalInstanceWeb/GetApprovalScreenViewInfo"
    this.URLGetMinFinLevel = this.baseUrl + "/api/ApprovalInstanceWeb/GetIsCanChangeMinFinalLevel"
    this.URLGetReason = this.baseUrl + "/api/ApprovalInstanceWeb/GetRefApvReason"
    this.URLGetNextPerson = this.baseUrl + "/api/ApprovalInstanceWeb/GetPossibleNextPersons"
    this.URLPostCompleteTask = this.baseUrl + "/api/ApprovalInstanceWeb/CompleteTask"

    this.LoadCanChangeMinFinLevel();
    this.LoadApprovalInfo(this.taskId, this.instanceId)
  }

  LoadApprovalInfo(taskId: number, instanceId: number) {
    var GetApvInfoReq = {
      TaskId: taskId,
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
        this.ReconstructPosibleResult();

        this.FormApproval.patchValue({
          trxNo: this.RFAInformation.TrxNo
        })

      },
      (error) => {
        console.log(error);
      }
    )
  }

  LoadCanChangeMinFinLevel() {
    this.http.post(this.URLGetMinFinLevel, { runtimeId: this.instanceId }).subscribe(
      (response) => {
        this.ListMinFinLevel = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  LoadRejectReason() {
    this.http.post(this.URLGetReason, { instanceId: this.instanceId, reasonType: "REJECT_FINAL" }).subscribe(
      (response) => {
        this.ListReason = response;
        console.log(this.taskId)
        console.log(this.ListReason)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  LoadNextPersonNode(result : string)
  {
    var _result = this.remakeApprovalResult(result);

    this.http.post(this.URLGetNextPerson, { TaskId : this.taskId, Result: _result }).subscribe(
      (response) => {
        if(response["NodeObj"].length > 0)
        {
          var fa_node = this.FormApproval.get("nodes") as FormArray
          this.clearFormArray(fa_node);
          var members = response["NextNodePersons"];

          for (let i = 0; i < response["NodeObj"].length ; i++) {
            var node = response["NodeObj"][i];
            fa_node.push(this.addNode(node.Key,node.Value));
            var node_members = members.filter(f=>f.NodeId == node.Key);
            this.dictMember[node.Key] = node_members;
          }
          this.setDDLNextPersonVisibility(true);
        }
        else
        {
          this.setDDLNextPersonVisibility(false);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  ReconstructPosibleResult() {
    for (let i = 0; i < this.RFARoot.PossibleResults.length; i++) {
      var pos_result = this.RFARoot.PossibleResults[i];
      if (pos_result == "ApproveFinal") {
        this.canApproveFinal = true;
      }
      else if (pos_result == "RejectFinal") {
        this.canRejectFinal = true;
      }
      else {
        this.PossibleResults.push(pos_result);
      }
    }
  }

  Submit()
  {
    var context = JSON.parse(localStorage.getItem("UserAccess"));
    var nodes = this.FormApproval.get("nodes").value;
    var ListNodePersonObj = new Array();
    for (let i = 0; i < nodes.length ; i++) {
      ListNodePersonObj.push({ Key : nodes[i].nodeId, Value : nodes[i].slcMemberId})
    }

    var result = this.remakeApprovalResult(this.FormApproval.get("result").value);

    var SubmitObj = {
      taskId : this.FormApproval.get("taskId").value,
      result : result,
      instanceId : this.FormApproval.get("instanceId").value,
      reason : this.FormApproval.get("reason").value,
      reasonType : this.FormApproval.get("reasonType").value,
      minFinalLevel : this.FormApproval.get("minFinalLevel").value,
      notes : this.FormApproval.get("notes").value,
      nextPersonPerNodeObj : ListNodePersonObj,
      context : { 
        UserId : context["UserName"],
        BusinessDt : context["BusinessDt"]
      }
    }
    this.CompleteTask(SubmitObj);
  }

  onCancelClick()
  {
    this.onCancel.emit();
  }

  CompleteTask(SubmitObj)
  {
    this.http.post(this.URLPostCompleteTask, SubmitObj).subscribe(
      (response) => {
        this.result.emit(SubmitObj);
        this.nextTask.emit(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  addNode(nodeId, nodeName) {
    return this.fb.group({
      nodeId: nodeId,
      nodeName : nodeName,
      slcMemberId: ['', Validators.required],
    })
  }

  onResultChange(event) {
    var selected_result = event.target.value;

    if (selected_result != "") {
      if ((selected_result == "Approve" && this.canApproveFinal) || (selected_result == "Reject" && this.canRejectFinal)) {
        this.isFinal = true;
        this.showFinal = true;

        if (selected_result == "Reject") {
          this.setDDLReasonVisibility(true);
          this.LoadRejectReason();
        }
        else {
          this.setDDLReasonVisibility(false);
        }
      }
      else {
        this.isFinal = false;
        this.showFinal = false;
        this.setDDLReasonVisibility(false);
      }

      //load next person
      this.LoadNextPersonNode(selected_result);
    }
    else {
      this.isFinal = false;
      this.showFinal = false;
      this.showNextPerson = false;
      this.setDDLReasonVisibility(false);
    }
  }

  isFinalChange(event)
  {
    var result = this.FormApproval.get("result").value;
    this.LoadNextPersonNode(result);

    if(result == "Reject" && this.isFinal )
    {
      this.setDDLReasonVisibility(true);
    }
    else
    {
      this.setDDLReasonVisibility(false);
    }
  }
  
  clearFormArray(formArray: FormArray) {
    while (formArray.length > 0) {
      formArray.removeAt(0);
    }
  }

  setDDLReasonVisibility(isShow: boolean) {
    if (isShow) {
      this.showReason = true;
      this.FormApproval.controls['reason'].setValidators([Validators.required])
      this.FormApproval.patchValue({
        reasonType: "REJECT_FINAL"
      })
    }
    else {
      this.showReason = false;
      this.FormApproval.controls['reason'].clearValidators()
      this.FormApproval.patchValue({
        reason: ""
      })
    }
  }

  setDDLNextPersonVisibility(isShow: boolean) {
    if (isShow) {
      this.showNextPerson = true;
    }
    else {
      this.showNextPerson = false;
      var fa_node = this.FormApproval.get("nodes") as FormArray;
      this.clearFormArray(fa_node);
    }
  }

  remakeApprovalResult(result: string) {
    var apvResult = "";

    if ((result == "Approve" && this.canApproveFinal) || (result == "Reject" && this.canRejectFinal)) {
      if (this.isFinal) {
        if (result == "Approve") {
          apvResult = "ApproveFinal";
        }
        else {
          apvResult = "RejectFinal";
        }
      }
      else {
        apvResult = result;
      }
    }
    else {
      apvResult = result;
    }
    return apvResult;
  }
}
