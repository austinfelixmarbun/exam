import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { indexOf } from 'core-js/core/array';
import { filter } from 'rxjs/operators';

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
  @Input() IdentifierBodyMessageParamDummy: string = "ParamArrDummy";
  @Input() IsBroadcast: boolean = false;
  @Input() IsResend: boolean = false;
  @Input() ParamArrays: Array<string> = new Array<string>();
  @Output() DeletedParam = new EventEmitter<string>();
  get GetListBodyMessageParam(): FormArray {
    return this.parentForm.get(this.IdentifierBodyMessageParam) as FormArray;
  }

  get GetListBodyMessageParamDummy(): FormArray {
    return this.parentForm.get(this.IdentifierBodyMessageParamDummy) as FormArray;
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
      let ParamStr: string = "";
      if (this.ParamArrays.length > 0 && this.IsResend) {
        ParamStr = this.ParamArrays.at(index);
      }
      ListParam.push(this.fb.group({
        Param: ParamStr,
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

    let DummyLength = this.GetListBodyMessageParamDummy.length;
    let idxtoRemove: Array<number> = new Array<number>();
    for( let idxremove = 0; idxremove < DummyLength; idxremove++ ){
      const elementdummy = this.GetListBodyMessageParamDummy.at(idxremove);
      const SearchedParamdummy: string = elementdummy.get("ParamIdxAt").value;
      BodyMessage = BodyMessage.replace(SearchedParam, "");
      this.parentForm.get(this.IdentifierBody).setValue(BodyMessage.replace(/\s+/g, ' ').trim());
      if(SearchedParam == SearchedParamdummy){
        idxtoRemove.push(idxremove);
      }
    }
    this.removeFromDummy(idxtoRemove);
    this.GetListBodyMessageParam.removeAt(idx);
    this.InputParamValue();
    this.DeletedParam.emit(SearchedParam);
  }
  
  removeFromDummy(idxtoRemove: Array<number>) {
    let length = idxtoRemove.length
    let reversedArr = idxtoRemove.reverse()
    for ( let i = 0 ; i < length; i++ ){
      this.GetListBodyMessageParamDummy.removeAt(reversedArr[i]);
    }
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
    
    for (let idx = 0; idx < this.GetListBodyMessageParam.length; idx++){
      const element = this.GetListBodyMessageParam.at(idx);
      const ParamValue: string = element.get("Param").value;
      const ParamIdxAt: string = element.get("ParamIdxAt").value;
      if(ParamValue){
        const dummylist = this.GetListBodyMessageParamDummy.value;
        const searchedlist = this.filterDummy(dummylist, ParamIdxAt);
        for(let idxx = 0; idxx< searchedlist.length; idxx++){
          BodyMessage = BodyMessage.replace(ParamIdxAt, ParamValue);
        }
      }
    }
    this.TempBodyMessage = BodyMessage;
    if(this.IsBroadcast){
      this.parentForm.get("UsedParamBody").setValue(this.TempBodyMessage);
    }
  }

  filterDummy(array, value: string){
    let filtered = [];

    for(let i = 0; i < array.length; i++){
      let obj = array[i];
      if(obj["ParamIdxAt"] == value){
          filtered.push(obj);
      }
    }
    return filtered;
  }    

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}
