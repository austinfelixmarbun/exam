import { Component, OnInit} from '@angular/core';   
 
@Component({
  selector: 'app-customer-company-address',
  templateUrl: './customer-company-address.component.html',
  styleUrls: ['./customer-company-address.component.scss'],
 
})

export class CustomerCompanyAddressComponent implements OnInit {
  
  mode: any;
  AddrId:any;
  constructor( ) {    
    
  }

  ngOnInit() {
    this.mode = "check";
  } 
  terimaValue(ev : any){
    console.log(ev);
    this.mode = ev.mode; 
    this.AddrId =  ev.AddrId;
  }  
}
