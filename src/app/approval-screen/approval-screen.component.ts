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
  FormApv : FormGroup;
  apvBaseUrl : string;
  instanceHistObj : any;
  taskHistObj : any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    var obj = {
      taskId : 65548,
      instanceId : 60388,
      approvalBaseUrl : environment.ApprovalURL
    }

    this.inputObj = obj;

    this.instanceHistObj = {
      approvalBaseUrl : environment.ApprovalURL,
      type : 'instance',
      refId : 60388
    }

    this.taskHistObj = {
      approvalBaseUrl : environment.ApprovalURL,
      type : 'task',
      refId : 60473
    }

    this.FormApv = this.fb.group(
      {
        approveById : [''],
        recommendations : this.fb.array([]),
      }
    )

    this.apvBaseUrl = environment.ApprovalURL;
  }

  onChange(event)
  {
    console.log(event.target.value);
  }

  Test()
  {
    console.log(this.FormApv.value);
  }

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

