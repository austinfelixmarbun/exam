import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
 

@Component({
  selector: 'app-customer-contact-person',
  templateUrl: './customer-contact-person.component.html',
  styleUrls: ['./customer-contact-person.component.scss']
})
export class CustomerContactPersonComponent implements OnInit {
  @Input () inputValue : any ;
  @Output () OutputDelete : EventEmitter<any>= new EventEmitter();
  
  constructor() { }
  isAdd : any;
  custPersonalContactPersonId : any;
  isDelete : any;
  ngOnInit() {
      this.isAdd =false;
  }

  terimaValue(ev : any){
    console.log(ev);
     this.isAdd = ev.isAdd;
     this.custPersonalContactPersonId =  ev.custPersonalContactPersonId;
  }
}
