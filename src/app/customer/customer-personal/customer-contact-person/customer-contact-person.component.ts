import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'; 

@Component({
  selector: 'app-customer-contact-person',
  templateUrl: './customer-contact-person.component.html',
  styleUrls: ['./customer-contact-person.component.scss']
})
export class CustomerContactPersonComponent implements OnInit {
  
  @Output () OutputDelete : EventEmitter<any>= new EventEmitter();
  
  constructor() { }
  isAdd : boolean = false;
  custPersonalContactPersonId : number;
  isDelete : boolean;
  ngOnInit() {
      this.isAdd =false;
  }

  terimaValue(ev : any){
    console.log(ev);
     this.isAdd = ev.isAdd;
     this.custPersonalContactPersonId =  ev.custPersonalContactPersonId;
  }
}
