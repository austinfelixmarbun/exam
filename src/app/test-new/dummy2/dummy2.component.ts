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
    Npwp: ['', [Validators.minLength(4), Validators.maxLength(10)]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.RefEmpForm);
  }

  SaveForm(asd) {
    console.log(this.RefEmpForm.valid);
    console.log(this.RefEmpForm.value);
  }
}


        /// <summary>
        /// Get Cust IdType Hist by Cust IdType Hist Id
        /// </summary>
        /// <param name="requestCustIdTypeHistObj"></param>
        /// <returns></returns>

        /// <summary>
        /// Get list Cust IdType Hist by Cust IdType Id
        /// </summary>
        /// <param name="requestCustIdTypeHistObj"></param>
        /// <returns></returns>

        /// <summary>
        /// Get last Cust IdType Hist by Cust IdType Id
        /// </summary>
        /// <param name="requestCustIdTypeHistObj"></param>
        /// <returns></returns>