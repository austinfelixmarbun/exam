import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-company-management-shareholder-check',
  templateUrl: './customer-company-management-shareholder-check.component.html',
  styleUrls: ['./customer-company-management-shareholder-check.component.scss']
})
export class CustomerCompanyManagementShareholderCheckComponent implements OnInit {
  @Input () inputValue : any ;
  @Output () outputValue : EventEmitter<object>= new EventEmitter();
  constructor() { }

  ngOnInit() {
     
  }

  addPersonal(){
    this.outputValue.emit({mode : 'addPersonal'});
  }
  
  addCompany(){
    this.outputValue.emit({mode : 'addCompany'});
  }
}
