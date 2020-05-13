import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  
  constructor(private wizard: WizardComponent) { }

  ngOnInit() {
  }

  Next() {
    this.wizard.goToNextStep();
  }
}
