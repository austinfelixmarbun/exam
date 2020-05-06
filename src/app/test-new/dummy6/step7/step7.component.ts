import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgxStepperComponent } from 'ngx-stepper';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.scss']
})
export class Step7Component implements OnInit {

  @Input() @ViewChild(NgxStepperComponent) steppers;
  
  constructor() { }

  ngOnInit() {
  }

  Next() {
    this.steppers.showFeedback('Checking, please wait ...');
    this.steppers.next();
  }

}
