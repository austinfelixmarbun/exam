import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core'; 
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service'; 
 
 
@Component({
  selector: 'app-customer-personal-address',
  templateUrl: './customer-personal-address.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustomerPersonalAddressComponent implements OnInit {
 
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  mode: string;
  AddrId: number;
  
  constructor( ) {  
  }

  ngOnInit() { 
    this.mode = "check";
  }
  terimaValue(ev){
    console.log(ev);
    this.mode = ev.mode; 
    this.AddrId =  ev.AddrId;
    console.log("testing");
  
  }
  next() {
    this.outputTab.emit({ stepMode: "next"});
  }
  back(){
    this.outputTab.emit({ stepMode: "previous"});
  }
}
