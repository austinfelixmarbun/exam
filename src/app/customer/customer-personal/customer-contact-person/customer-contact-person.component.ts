import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer-contact-person',
  templateUrl: './customer-contact-person.component.html',
  styleUrls: ['./customer-contact-person.component.scss']
})
export class CustomerContactPersonComponent implements OnInit {
  @Input () inputValue : any ;
   
  constructor() { }
  isAdd : any;
   
  ngOnInit() {
      this.isAdd =false;
     
  }

  terimaValue(ev : any){
    console.log(ev);
     this.isAdd = ev;
     
  
  }
}
