import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
 
 

@Component({
  selector: 'app-customer-contact-check',
  templateUrl: './customer-contact-check.component.html',
  styleUrls: ['./customer-contact-check.component.scss']
})
export class CustomerContactCheckComponent implements OnInit {
  isAdd:any;
  @Output () outputValue : EventEmitter<any>= new EventEmitter();
   
  constructor() { }

  ngOnInit() {
   
  }

  keluarinValue(){
  
    this.isAdd = true;
    console.log(this.isAdd);
    this.outputValue.emit(this.isAdd);
 
}
 
}
