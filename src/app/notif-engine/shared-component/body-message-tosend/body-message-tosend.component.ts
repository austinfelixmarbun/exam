import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-body-message-tosend',
  templateUrl: './body-message-tosend.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BodyMessageTosendComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() Title: string = "Body Message Preview";
  @Input() ParamListCount: number = 0;
  @Input() IdentifierBody: string = "Body";
  @Input() IdentifierBodyMessageParam: string = "ParamArr";
  @Input() IsBroadcast: boolean;
  @Input() ParamArrays: Array<string>;
  get GetListBodyMessageParam(): FormArray {
    return this.parentForm.get(this.IdentifierBodyMessageParam) as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.GenerateParam();
  }

  GenerateParam() {
    console.log(this.ParamListCount)
    const ListParam: FormArray = this.parentForm.get(this.IdentifierBodyMessageParam) as FormArray;

    console.log(this.ParamArrays)
    
    if(this.ParamListCount == 0) return;
    while (ListParam.length !== 0) {
      ListParam.removeAt(0)
    }
    for (let index = 0; index < this.ParamListCount; index++) {
      // const element = array[index];
      const ParamaterVar: string = "{" + index + "}";
      ListParam.push(this.fb.group({
        Param: "",
        ParamIdxAt: ParamaterVar
      }));
      console.log(ListParam);

      if(this.ParamArrays != null){
        let ParamStr: string;
        ParamStr = this.ParamArrays[index];
        ListParam.at(index).patchValue({
          Param: ParamStr,
          ParamIdxAt: ParamaterVar
        });
      }
    }
    console.log(ListParam);
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

}
