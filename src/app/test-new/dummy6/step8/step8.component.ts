import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgxStepperComponent } from 'ngx-stepper';

@Component({
  selector: 'app-step8',
  templateUrl: './step8.component.html',
  styleUrls: ['./step8.component.scss']
})
export class Step8Component implements OnInit {

  @Input() @ViewChild(NgxStepperComponent) steppers;
  
  constructor() { }

  ngOnInit() {
  }

  Next() {
    this.steppers.showFeedback('Checking, please wait ...');
    this.steppers.next();
  }
  
  Back(){
    this.steppers.back();
  }

}
