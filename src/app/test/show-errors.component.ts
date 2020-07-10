import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'show-errors',
  template: `
    <div *ngIf="shouldShowErrors()" class="invalid-feedback d-block">
      <div *ngFor="let error of listOfErrors()" translate>{{error}}</div>
    </div>
  `
})

export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'requiredWithField': (params) => params + ' is required',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;
  @Input()
  private submit: boolean;
  @Input()
  private fieldName: string;

  shouldShowErrors(): boolean {
    return this.control && (this.submit || this.control.dirty || this.control.touched) &&
      this.control.errors && !this.control.valid;
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    if (this.fieldName === undefined) {
      if (type == "pattern" && params.requiredPattern == "^[0-9]+$" || params.requiredPattern == "^[0-9]*$") {
      return "Number Only";
      }
      return ShowErrorsComponent.errorMessages[type](params);
    } else {
      return ShowErrorsComponent.errorMessages['requiredWithField'](this.fieldName);
    }
  }

}