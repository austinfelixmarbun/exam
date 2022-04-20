import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-body-message-tosend',
  templateUrl: './body-message-tosend.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BodyMessageTosendComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() Title: string = "Body Message Preview";
  @Input() NotifType: string = "";
  @Input() ParamListCount: number = 0;
  @Input() IdentifierBody: string = "Body";
  @Input() IdentifierBodyMessageParam: string = "BodyMessageParam";
  get GetListBodyMessageParam(): FormArray {
    return this.parentForm.get(this.IdentifierBodyMessageParam) as FormArray;
  }

  readonly NotifTypeEmail: string = CommonConstant.NOTIF_TYPE_EMAIL;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (!this.GetListBodyMessageParam) {
      this.parentForm.addControl(this.IdentifierBodyMessageParam, this.fb.array([]));
    }
    this.GenerateParam();
  }

  GenerateParam() {
    if(this.ParamListCount == 0) return;
    const ListParam: FormArray = this.parentForm.get(this.IdentifierBodyMessageParam) as FormArray;
    for (let index = 0; index < this.ParamListCount; index++) {
      // const element = array[index];
      const ParamaterVar: string = "{" + index + "}";
      ListParam.push(this.fb.group({
        Param: "",
        ParamIdxAt: ParamaterVar
      }));
    }
    this.InputParamValue();
  }

  TempBodyMessage: string = "";

  DeleteParam(idx: number) {
    let BodyMessage: string = this.parentForm.get(this.IdentifierBody).value;

    const element = this.GetListBodyMessageParam.at(idx);
    const SearchedParam: string = element.get("ParamIdxAt").value;

    BodyMessage = BodyMessage.replace(SearchedParam, "");
    this.parentForm.get(this.IdentifierBody).setValue(BodyMessage.replace(/\s+/g, ' ').trim());
    this.GetListBodyMessageParam.removeAt(idx);
    this.RenameParam(idx);
    this.InputParamValue();
  }

  RenameParam(StartIdx: number) {
    let BodyMessage: string = this.parentForm.get(this.IdentifierBody).value;
    for (let index = StartIdx; index < this.GetListBodyMessageParam.length; index++) {
      const element = this.GetListBodyMessageParam.at(index);
      const SearchedParam: string = element.get("ParamIdxAt").value;
      const NewIdx: string = "{" + (index) + "}";
      BodyMessage = BodyMessage.replace(SearchedParam, NewIdx);
      element.get("ParamIdxAt").setValue(NewIdx);
    }
    this.parentForm.get(this.IdentifierBody).setValue(BodyMessage);
  }

  InputParamValue() {
    let BodyMessage: string = this.parentForm.get(this.IdentifierBody).value;
    for (let index = 0; index < this.GetListBodyMessageParam.length; index++) {
      const element = this.GetListBodyMessageParam.at(index);
      const ParamValue: string = element.get("Param").value;
      if (ParamValue) {
        const SearchedParam: string = element.get("ParamIdxAt").value;
        BodyMessage = BodyMessage.replace(SearchedParam, ParamValue);
      }
    }
    this.TempBodyMessage = BodyMessage;
  }

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}
