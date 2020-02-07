import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dummy2',
  templateUrl: './dummy2.component.html',
  styleUrls: ['./dummy2.component.scss']
})
export class Dummy2Component implements OnInit {

  // @ViewChild(UcAddressGroupComponent) VcUcAddrGrp;
  // @ViewChild('UcAddrGrp') VcUcAddrGrp : UcAddressGroupComponent;

  defVal : any;

  RefEmpForm = this.fb.group({
    EmpNo: ['', Validators.required],
    EmpName: ['', Validators.required],
    JoinDt: ['', Validators.required],
    IsExt: [false],
    IsActive: [true],
    IdNo: [''],
    Npwp: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.RefEmpForm);
    this.defVal = {
      Addr : "asdasdasd",
      AreaCode4 : "1",
      AreaCode3 : "2",
      AreaCode2 : "3",
      AreaCode1 : "4",
      City : "1",
      PhnArea1 : "23",
      Phn1 : "3",
      PhnExt1 : "4",
      PhnArea2 : "2",
      Phn2 : "asd",
      PhnExt2 : "2",
      PhnArea3 : "3",
      Phn3 : "d",
      PhnExt3 : "f",
      FaxArea : "r",
      Fax : "r"
    };
  }

  SaveForm(asd) {
    console.log(this.RefEmpForm.valid);
    console.log(this.RefEmpForm.value);
  }
}
