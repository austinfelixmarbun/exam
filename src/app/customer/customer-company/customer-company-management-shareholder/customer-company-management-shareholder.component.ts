import { Component, OnInit, Input } from '@angular/core'; 

@Component({
  selector: 'app-customer-company-management-shareholder',
  templateUrl: './customer-company-management-shareholder.component.html',
  styleUrls: ['./customer-company-management-shareholder.component.scss']
})
export class CustomerCompanyManagementShareholderComponent implements OnInit {
  @Input () custCompanyId: number;
  mode: string;  
  CustCompanyMgmntShrholderId: number;
  
  constructor() {  
  }

  ngOnInit() {
     this.mode = "check";
    console.log(this.custCompanyId);
  }
  terimaValue(ev){
    console.log(ev);
    this.mode = ev.mode; 
    this.CustCompanyMgmntShrholderId =  ev.CustCompanyMgmntShrholderId;
  }
}
