import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Compiler_compileModuleSync__POST_R3__ } from '@angular/core/src/linker/compiler';

@Component({
  selector: 'app-approval-screen',
  templateUrl: './approval-screen.component.html',
})
export class ApprovalScreenComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  
  CompGroups: any = [];
  ProdHId : any;
  ngOnInit() {
    // this.CompGroups.push("GEN");
    // this.CompGroups.push("OTHR");
    this.ProdHId = 2;
  }
}

