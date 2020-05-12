import { Component, OnInit } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

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
