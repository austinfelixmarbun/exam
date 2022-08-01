import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

@Component({
  selector: 'app-body-message-tosend',
  templateUrl: './body-message-tosend.component.html',
  styleUrls: ['./body-message-tosend.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BodyMessageTosendComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() Title: string = "Body Message Preview";
  @Input() NotifType: string = "";
  @Input() ParamListCount: number = 0;
  @Input() IdentifierBody: string = "Body";
  @Input() IdentifierBodyMessageParam: string = "ParamArr";
  @Input() IsBroadcast: boolean = false;
  @Input() IsResend: boolean = false;
  @Input() ParamArrays: Array<string> = new Array<string>();
  @Output() DeletedParam = new EventEmitter<string>();
  get GetListBodyMessageParam(): FormArray {
    return this.parentForm.get(this.IdentifierBodyMessageParam) as FormArray;
  }

  readonly NotifTypeEmail: string = CommonConstant.NOTIF_TYPE_EMAIL;
  readonly CurrencyMaskPrct = CommonConstant.CurrencyMaskPrct;

  readonly InputTypeText = CommonConstant.INPUT_TYPE_TEXT;
  readonly InputTypeDate = CommonConstant.INPUT_TYPE_DATE;
  readonly InputTypePercnt = CommonConstant.INPUT_TYPE_PERCNT;
  readonly InputTypeNum = CommonConstant.INPUT_TYPE_NUM;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    
  }

  TempBodyMessage: string = "";

  DeleteParam(idx: number) {
    if (!confirm(ExceptionConstant.DELETE_CONFIRMATION)) return;
    let BodyMessage: string = this.parentForm.get(this.IdentifierBody).value;

    const element = this.GetListBodyMessageParam.at(idx);
    let SearchedParam: string = element.get("ParamIdxAt").value;

    BodyMessage = BodyMessage.replaceAll(SearchedParam, "");
    this.parentForm.get(this.IdentifierBody).setValue(BodyMessage.replace(/\s+/g, ' ').trim());
    this.GetListBodyMessageParam.removeAt(idx);
    this.InputParamValue();

    this.DeletedParam.emit(SearchedParam);
  }
  
  InputParamValue() {
    let BodyMessage: string = this.parentForm.get(this.IdentifierBody).value;
    for (let idx = 0; idx < this.GetListBodyMessageParam.length; idx++){
      const element = this.GetListBodyMessageParam.at(idx);
      let ParamValue: string = element.get("Param").value;
      const ParamIdxAt: string = element.get("ParamIdxAt").value;
      const InputType: string = element.get("InputType").value;
      if(ParamValue){
        ParamValue = this.transformParamValue(InputType, ParamValue);
        BodyMessage = BodyMessage.replaceAll(ParamIdxAt, ParamValue);
      }
    }
    this.TempBodyMessage = BodyMessage;
    if(this.IsBroadcast){
      this.parentForm.get("UsedParamBody").setValue(this.TempBodyMessage);
    }
  }   

  transformParamValue(InputType: string, ParamValue: string): string {
    if(InputType == "P"){
      ParamValue = ParamValue + '%';
    }
    if(InputType == "N"){
      ParamValue = ParamValue.toLocaleString();
    }
    return ParamValue;
  }

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  GetInputTypeforHtml(value : string): string{
    switch(value){
      case this.InputTypeText: {
        value = 'text'
        break;
      }
      case this.InputTypeDate: {
        value = 'date'
        break;
      }
    }
    return value;
  }
}
