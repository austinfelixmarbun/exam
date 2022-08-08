import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
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
  @Input() SelectedPhoneNum: string = "";
  // sementara di false karena tidak bisa save jika input sembarang.
	phoneValidation = false;
	readonly SearchCountryField = SearchCountryField;
	readonly CountryISO = CountryISO;
  readonly PhoneNumberFormat = PhoneNumberFormat;
  Title: string;
  constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }


  ngOnInit(): void {
    this.GetMaxSpecifirUser();
  }

  ngAfterViewInit() {
    if (!this.IsResend) return;

    // Update Value SendTo WA/SMS
    if (!this.SelectedPhoneNum) return;
    setTimeout(() => {
      this.parentForm.get('PhoneNum')?.setValue(this.SelectedPhoneNum);
    }, 1);
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
    let sendToVal = this.parentForm.get("SendTo").value;
    let listSendTo: Array<TagInputObj> = sendToVal == "" ? new Array() : sendToVal;
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
    const PhnNumControl: AbstractControl = this.parentForm.get("PhoneNum");
    const SendToControl: AbstractControl = this.parentForm.get("SendTo");
    const PhnNum = PhnNumControl.value;
    if(!PhnNum) return;
    console.log(PhnNum);
    let newPhnNum = this.SetPhoneNum(PhnNum);
    const item = { display: newPhnNum, value: newPhnNum };
    
    let sendToVal = SendToControl.value;
    let listSendTo: Array<TagInputObj> = sendToVal == "" ? new Array() : sendToVal;
    listSendTo.push(item);
    SendToControl.setValue(listSendTo);
    PhnNumControl.setValue("");
  }

  private SetPhoneNum(PhnNum): string {
    const dialCode = PhnNum["dialCode"];
    const phoneNum = PhnNum["e164Number"];
    const splitPhoneNum = phoneNum.replace(dialCode, "");

    return dialCode + " " + splitPhoneNum;
  }

  ngOnDestroy(): void {
    if (this.IsResend) return;
    this.parentForm.get("SendTo").setValue("");
  }
}
