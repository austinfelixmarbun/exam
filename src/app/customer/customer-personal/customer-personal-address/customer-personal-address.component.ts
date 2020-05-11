import { Component, OnInit, ViewChild, Input } from '@angular/core'; 
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
 
 
@Component({
  selector: 'app-customer-personal-address',
  templateUrl: './customer-personal-address.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustomerPersonalAddressComponent implements OnInit {
 
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
