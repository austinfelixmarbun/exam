import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';
 
 

@Component({
  selector: 'app-customer-contact-check',
  templateUrl: './customer-contact-check.component.html',
  styleUrls: ['./customer-contact-check.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerContactCheckComponent implements OnInit {
  isAdd:any;
  @Output () outputValue : EventEmitter<any>= new EventEmitter();
  @Input() inputValue: any;
  tempCustomerPersonalContactPerson;
  getCustomerPersonalContactPersonUrl : any;

  constructor(private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) { }

  ngOnInit() {
    // var CustId = {
    //   RefMasterTypeCode: "CUST_RELATIONSHIP"
    // }
    // this.http.post(this.getCustomerPersonalContactPersonUrl, refMasterObj6).subscribe(
    //   (response) => {
    //     this.tempCustomerPersonalContactPerson = response;
     
    //   });
  }

  keluarinValue(){
  
    this.isAdd = true;
    console.log(this.isAdd);  
    this.outputValue.emit(this.isAdd);
 
}
 
}
