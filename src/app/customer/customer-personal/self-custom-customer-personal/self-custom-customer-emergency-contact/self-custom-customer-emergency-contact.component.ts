import { FormAddressService } from '@adins/ucform';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-self-custom-customer-emergency-contact',
  templateUrl: './self-custom-customer-emergency-contact.component.html'
})
export class SelfCustomCustomerEmergencyContactComponent implements OnInit {

  @Output()
  next: EventEmitter<any> = new EventEmitter<any>();

  pageName: string;

  Form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private formAddress:FormAddressService) {
    this.pageName = "EmergencyCntcPerson"
  }

  ngOnInit(): void {
  }

  handler = {

    callback: ($event) => this.callback($event),
    // afterSave: ($event) => this.onNext(),
  };

  callback(ev) {
    let row = ev.RowObj;
  }

  onFormCreate(fg: FormGroup)
  {
    this.Form = fg;

  }

  manageCbLookupManual(ev: any)
  {
    console.log(ev)
    console.log(this.Form)
    this.Form.get("MrGenderCode").enable();
    this.Form.get("MrIdTypeCode").enable();
    this.Form.get("BirthPlace").enable();
    this.Form.get("IdNo").enable();
    this.Form.get("BirthDt").enable();
    this.Form.get("IdExpiredDt").enable();
    this.Form.get("MobilePhnNo1").enable();
    this.Form.get("MobilePhnNo2").enable();
    this.Form.get("Email").enable();

    this.formAddress.GetInputAddressObj("UcAddress").isReadonly = false;
    let temp = this.formAddress.GetInputAddressObj("UcAddress")
    console.log(temp)
  }

  onNext(event) {
    console.log(event);
    // const actions = [
    //   {
    //     'result': {
    //       'type': 'function',
    //       'target': 'self',
    //       'alias': '',
    //       'methodName': 'NextStep',
    //       'params': []
    //     },
    //     'conditions': []
    //   }
    // ];

    this.next.emit(event);
  }

}
