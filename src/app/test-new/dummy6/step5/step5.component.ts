import { Component, OnInit } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class Step5Component implements OnInit {

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
