import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustPersonalContactPersonObj } from 'app/shared/model/CustPersonalContactPerson.Obj.Model';
 
@Component({
  selector: 'app-customer-contact-check',
  templateUrl: './customer-contact-check.component.html',
  styleUrls: ['./customer-contact-check.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerContactCheckComponent implements OnInit {
  isAdd:any;
  @Output () outputValue : EventEmitter<object>= new EventEmitter();
  
  @Input() inputValue: any;
  tempCustomerPersonalContactPerson;
  getCustomerPersonalContactPersonUrl : any;
  deleteCustomerPersonalContactPersonUrl
  custPersonContactPersonObj: any;
  constructor(private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) {
    this.getCustomerPersonalContactPersonUrl = AdInsConstant.GetListCustPersonalContactPersonByCustId;
    this.deleteCustomerPersonalContactPersonUrl = AdInsConstant.DeleteCustPersonalContactPerson;
  }
  ngOnInit() {
      this.custPersonContactPersonObj = new CustPersonalContactPersonObj();
      this.custPersonContactPersonObj.CustId = this.inputValue;
      this.http.post(this.getCustomerPersonalContactPersonUrl, this.custPersonContactPersonObj).subscribe(
        (response) => {
          this.tempCustomerPersonalContactPerson = response["ReturnObject"];
          console.log(  this.tempCustomerPersonalContactPerson);
        });
  }

  keluarinValue(){
  
    this.isAdd = true;
    
    this.outputValue.emit({mode : this.isAdd});
 
}
deleteItem(custId : any){
  this.custPersonContactPersonObj = new CustPersonalContactPersonObj();
  this.custPersonContactPersonObj.CustPersonalContactPersonId = custId;
    this.http.post(this.deleteCustomerPersonalContactPersonUrl, this.custPersonContactPersonObj  ).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
      },
      error => {
        console.log(error);
      }
    );
}

editItem(custId : any){
  this.isAdd = true;
  this.outputValue.emit({mode : this.isAdd, custId : custId});
}

}
