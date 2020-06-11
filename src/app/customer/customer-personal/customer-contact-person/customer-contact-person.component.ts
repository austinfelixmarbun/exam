import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'; 

@Component({
  selector: 'app-customer-contact-person',
  templateUrl: './customer-contact-person.component.html',
  styleUrls: []
})
export class CustomerContactPersonComponent implements OnInit {
  @Output () OutputDelete : EventEmitter<any>= new EventEmitter();
  @Output () outputTab : EventEmitter<any>= new EventEmitter();
  
  isAdd : boolean;
  isDelete : boolean;
  custPersonalContactPersonId : number;

  constructor() { this.isAdd = false }

  ngOnInit() {
  }

  terimaValue(ev : any){
    console.log(ev);
     this.isAdd = ev.isAdd;
     this.custPersonalContactPersonId =  ev.custPersonalContactPersonId;
  }

  next() {
    this.outputTab.emit({ stepMode: "next"});
  }
  back(){
    this.outputTab.emit({ stepMode: "previous"});
  }
}
