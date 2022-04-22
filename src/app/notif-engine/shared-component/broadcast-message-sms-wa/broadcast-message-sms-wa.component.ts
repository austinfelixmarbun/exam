import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { filter, Observable, of } from 'rxjs';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { UcSubsectionComponent, UcSubsectionModule } from '@adins/uc-subsection';

@Component({
  selector: 'app-broadcast-message-sms-wa',
  templateUrl: './broadcast-message-sms-wa.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BroadcastMessageSmsWaComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() IsUsedTemplate: boolean = false;
  @Input() IsWa: boolean;
  readonly TitleWa: string = "Broadcast WhatsApp";
  readonly TitleSms: string = "Broadcast SMS";
	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  Title: string;
  PhoneNumberFormat = PhoneNumberFormat;
  NotifBroadcastSmsWaId: UcSubsectionModule = new UcSubsectionModule();
  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    
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
