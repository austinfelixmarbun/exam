import { Component, OnInit, Input } from '@angular/core'; 

@Component({
  selector: 'app-customer-company-management-shareholder',
  templateUrl: './customer-company-management-shareholder.component.html',
  styleUrls: ['./customer-company-management-shareholder.component.scss']
})
export class CustomerCompanyManagementShareholderComponent implements OnInit {
  @Input () inputValue : any ;
  @Input () custCompanyId : any ;
  
  mode : any;  
  CustCompanyMgmntShrholderId : any;
  constructor() {  
  }

  ngOnInit() {
     this.mode = "check";
    console.log(this.custCompanyId);
  }
  terimaValue(ev : any){
    console.log(ev);
    this.mode = ev.mode; 
    this.CustCompanyMgmntShrholderId =  ev.CustCompanyMgmntShrholderId;
  }
}
