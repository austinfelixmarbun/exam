import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustPersonalContactPersonObj } from 'app/shared/model/cust-personal-contact-person-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-personal-emergency-contact',
  templateUrl: './customer-view-personal-emergency-contact.component.html',
})
export class CustomerViewPersonalEmergencyContactComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private http : HttpClient) { }

  ngOnInit() {   
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustEmergency.json";
  }

}
