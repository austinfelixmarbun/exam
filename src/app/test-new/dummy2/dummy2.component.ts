import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dummy2',
  templateUrl: './dummy2.component.html',
  styleUrls: ['./dummy2.component.scss']
})
export class Dummy2Component implements OnInit {

  RefEmpForm = this.fb.group({
    EmpNo: ['', Validators.required],
    EmpName: ['', Validators.required],
    JoinDt: ['', Validators.required],
    IsExt: [false],
    IsActive: [true],
    IdNo: ['', Validators.required],
    Npwp: ['', Validators.required],
    Addr: ['', Validators.required],
    AreaCode4: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.maxLength(3)]],
    AreaCode3: ['', Validators.required],
    AreaCode2: ['', Validators.required],
    AreaCode1: ['', Validators.required],
    City: ['', Validators.required],
    PhnArea1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    Phn1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    PhnExt1: ['', Validators.pattern("^[0-9]+$")],
    PhnArea2: ['', Validators.pattern("^[0-9]+$")],
    Phn2: ['', Validators.pattern("^[0-9]+$")],
    PhnExt2: ['', Validators.pattern("^[0-9]+$")],
    PhnArea3: ['', Validators.pattern("^[0-9]+$")],
    Phn3: ['', Validators.pattern("^[0-9]+$")],
    PhnExt3: ['', Validators.pattern("^[0-9]+$")],
    FaxArea: ['', Validators.pattern("^[0-9]+$")],
    Fax: ['', Validators.pattern("^[0-9]+$")]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  SaveForm() {
    console.log(this.RefEmpForm.value);
  }
}
