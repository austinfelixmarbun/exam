import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cust-dup-check-company',
  templateUrl: './cust-dup-check-company.component.html',
})
export class CustDupCheckCompanyComponent implements OnInit {

  @Input() CustObj;
  constructor() { }

  ngOnInit() {
  }

}
