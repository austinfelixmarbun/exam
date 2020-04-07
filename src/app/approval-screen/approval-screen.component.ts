import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Compiler_compileModuleSync__POST_R3__ } from '@angular/core/src/linker/compiler';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './test/test.component';

@Component({
  selector: 'app-approval-screen',
  templateUrl: './approval-screen.component.html',
})
export class ApprovalScreenComponent implements OnInit {

  inputObj : any;
  constructor() { }

  ngOnInit() {
    var obj = {
      taskId : 65529,
      instanceId : 60369,
      approvalBaseUrl : environment.ApprovalURL

  onApprovalSubmited(event)
  {
    console.log("AAAAA");
    console.log(event)
  }

  onAvailableNextTask(event)
  {
    console.log("BBBBB");
    console.log(event)
  }
}

