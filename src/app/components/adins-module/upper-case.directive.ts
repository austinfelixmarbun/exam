import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[type=text], input',
})
export class UpperCaseDirective {

  @Input("IsUpperCase") IsUpperCase: boolean = true;

  @HostListener('input', ['$event']) onInputChange($event) {
    // console.log($event);
    // console.log($event.target.value);
    // if(this.IsUpperCase) {
    //   console.log($event.data);
    //   // $event.data = $event.data.toUpperCase();
    //   $event.target.value = $event.target.value.toUpperCase();
    // }
    // console.log($event.target.value);
  }
}