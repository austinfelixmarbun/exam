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
  @Input() IdentifierBodyMessageParam: string = "ParamArr";
  @Input() IsBroadcast: boolean = false;
  @Input() ParamArrays: Array<string> = new Array<string>();
  get GetListBodyMessageParam(): FormArray {
    return this.parentForm.get(this.IdentifierBodyMessageParam) as FormArray;
  }

  readonly NotifTypeEmail: string = CommonConstant.NOTIF_TYPE_EMAIL;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.GenerateParam();
  }

  GenerateParam() {
    const ListParam: FormArray = this.parentForm.get(this.IdentifierBodyMessageParam) as FormArray;
    
    if(this.ParamListCount == 0) return;
    while (ListParam.length !== 0) {
      ListParam.removeAt(0)
    }
    for (let index = 0; index < this.ParamListCount; index++) {
      const ParamaterVar: string = "{" + index + "}";
      ListParam.push(this.fb.group({
        Param: "",
        ParamIdxAt: ParamaterVar
      }));

      if(this.ParamArrays && this.IsBroadcast){
        let ParamStr: string = this.ParamArrays.at(index).at(index); 
        ListParam.at(index).patchValue({
          Param: ParamStr,
          ParamIdxAt: ParamaterVar
        });
      }
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
    if(this.IsBroadcast){
      this.parentForm.get("UsedParamBody").setValue(this.TempBodyMessage);
    }
  }

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}
