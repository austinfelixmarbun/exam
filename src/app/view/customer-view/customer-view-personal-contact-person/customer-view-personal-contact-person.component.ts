import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj, WhereValueObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-customer-view-personal-contact-person',
  templateUrl: './customer-view-personal-contact-person.component.html'
})
export class CustomerViewPersonalContactPersonComponent implements OnInit {
  viewCustPersonalEmergencyContactPersonObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(){
  }

  ngOnInit() {
    this.viewCustPersonalEmergencyContactPersonObj.viewInput  =  "./assets/ucviewgeneric/viewCustPersonalEmergencyContactPerson.json";
    this.viewCustPersonalEmergencyContactPersonObj.viewEnvironment = environment.FoundationR3Url;
  }
}
