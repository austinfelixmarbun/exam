import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core'; 
import { CustomerContactCheckComponent } from './customer-contact-check/customer-contact-check.component';

@Component({
  selector: 'app-customer-contact-person',
  templateUrl: './customer-contact-person.component.html',
  styleUrls: []
})
export class CustomerContactPersonComponent implements OnInit {
  @Output () OutputDelete : EventEmitter<any>= new EventEmitter();
  @Output () outputTab : EventEmitter<any>= new EventEmitter();
  @ViewChild("ContactPersonPaging") CPPaging: CustomerContactCheckComponent;
  
  isAdd : boolean;
  isDelete : boolean;
  custPersonalContactPersonId : number;
  listCustIdToExclude: Array<string>;

  constructor() { 
    this.isAdd = false;
    this.listCustIdToExclude = new Array<string>();
  }

  ngOnInit() {
  }

  terimaValue(ev : any){
    this.isAdd = ev.isAdd;
    this.custPersonalContactPersonId =  ev.custPersonalContactPersonId;
    this.listCustIdToExclude = this.CPPaging.listCustIdToExclude;
  }

  next() {
    this.outputTab.emit({ stepMode: "next"});
  }
  // back(){
  //   this.outputTab.emit({ stepMode: "previous"});
  // }
}
