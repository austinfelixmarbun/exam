import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { filter, Observable, of } from 'rxjs';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-broadcast-message-whatsapp',
  templateUrl: './broadcast-message-whatsapp.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BroadcastMessageWhatsappComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() IsUsedTemplate: boolean = false;
  readonly title: string = "Broadcast Whats App";
	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const SendToControl = this.parentForm.get("SendTo");
    if(!SendToControl){
      this.parentForm.addControl("SendTo", this.fb.control(""));
    }
    const BodyControl = this.parentForm.get("Body");
    if(!BodyControl){
      this.parentForm.addControl("Body", this.fb.control(""));
    }
    console.log(this.CountryISO);
    console.log(this.SearchCountryField);
  }

  onTagEdited(ev) {
    console.log(ev);
  }

  transform(value: string): Observable<object> {
    const item = { display: `(+62) ${value}`, value: `(+62) ${value}` };
    return of(item);
  }

  onRemoving(tag): Observable<any> {
    const confirm = window.confirm('Do you really want to remove this tag?');
    return of(tag)
      .pipe(filter(() => confirm));
  }

  // TagObj: {display: string, value: string} = new Object();
  AddSentTo(){
    const PhnNum: string = this.parentForm.get("SendTo").value;
    console.log(this.parentForm.get("ListPhone").value);
    const ListPhnNum: Array<string> = this.parentForm.get("ListPhone").value;
    ListPhnNum.push(PhnNum);
    this.parentForm.get("ListPhone").setValue(PhnNum);
    this.parentForm.get("SendTo").setValue("");
  }

  ngOnDestroy(): void {
    
  }
}
