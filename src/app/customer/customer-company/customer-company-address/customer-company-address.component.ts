import { Component, OnInit, Output, EventEmitter} from '@angular/core';   
 
@Component({
  selector: 'app-customer-company-address',
  templateUrl: './customer-company-address.component.html',
  styleUrls: [],
})

export class CustomerCompanyAddressComponent implements OnInit {
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  
  mode: string;
  AddrId: number;

  constructor( ) {}

  ngOnInit() {
    this.mode = "check";
  } 
  terimaValue(ev: any){
    console.log(ev);
    this.mode = ev.mode; 
    this.AddrId =  ev.AddrId;

    if (ev.stepMode != undefined)
      this.outputTab.emit({ stepMode: ev.stepMode })
  }  
}
