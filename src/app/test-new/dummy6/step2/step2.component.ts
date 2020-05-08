import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  
  constructor(private wizard: WizardComponent) { }

  ngOnInit() {
  }

  Next() {
    this.wizard.goToNextStep();
  }
  
  Back(){
    this.wizard.goToPreviousStep();
  }

}
