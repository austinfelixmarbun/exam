import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { filter, Observable, of } from 'rxjs';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { HttpClient } from '@angular/common/http';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { TagInputObj } from 'app/shared/model/generic/tag-input-obj.model';

@Component({
  selector: 'app-broadcast-message-sms-wa',
  templateUrl: './broadcast-message-sms-wa.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BroadcastMessageSmsWaComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() IsUsedTemplate: boolean = false;
  @Input() IsResend: boolean = false;
  @Input() IsWa: boolean;
	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  Title: string;
  PhoneNumberFormat = PhoneNumberFormat;
  constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }


  ngOnInit(): void {
    this.GetMaxSpecifirUser();

  }

  MaxSpecificUser: number = 5;
  GetMaxSpecifirUser() {
    this.http.post(this.UrlConstantNew.GetMaxSpecificUser, {}).subscribe(
      (response: number) => {
        this.MaxSpecificUser = response;
      }
    );
  }
  
  get SendToLength(){
    let listSendTo: Array<TagInputObj> = this.parentForm.get("SendTo").value == "" ? new Array() : this.parentForm.get("SendTo").value;
    return listSendTo.length;
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
  
  AddSentTo(){
    const PhnNum = this.parentForm.get("PhoneNum").value;
    const item = { display: PhnNum["internationalNumber"], value: PhnNum["internationalNumber"] };
    
    let listSendTo: Array<TagInputObj> = this.parentForm.get("SendTo").value == "" ? new Array() : this.parentForm.get("SendTo").value;
    listSendTo.push(item);
    this.parentForm.get("SendTo").setValue(listSendTo);
    this.parentForm.get("PhoneNum").setValue("");
  }

  ngOnDestroy(): void {
    this.parentForm.get("SendTo").setValue("");
  }
}
