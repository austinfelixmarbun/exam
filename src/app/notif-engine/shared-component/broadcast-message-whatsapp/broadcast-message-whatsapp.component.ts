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
  @Input() IsWa: boolean;
  readonly titleWA: string = "Broadcast WhatsApp";
  readonly titleSMS: string = "Broadcast SMS";
	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.IsUsedTemplate)
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
    const PhnNum: Array<string> = this.parentForm.get("ListPhone").value;
    this.parentForm.get("SendTo").setValue(PhnNum["internationalNumber"]);
  }

  ngOnDestroy(): void {
    
  }
}
