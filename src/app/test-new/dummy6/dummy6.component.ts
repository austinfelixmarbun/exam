import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxStepperComponent } from 'ngx-stepper';
import Stepper from 'bs-stepper'

@Component({
  selector: 'app-dummy6',
  templateUrl: './dummy6.component.html',
  styleUrls: ['./dummy6.component.scss']
})
export class Dummy6Component implements OnInit {

  StepIndex: number = 3;
  @ViewChild('stepperDemo') public steppers: NgxStepperComponent;


  constructor() { }

  ngOnInit() {
    this.StepIndex = 0;
    this.StepIndex = 3;
  }

}
