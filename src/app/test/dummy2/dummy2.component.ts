import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy2',
  templateUrl: './dummy2.component.html',
  styleUrls: ['./dummy2.component.scss']
})
export class Dummy2Component implements OnInit {
  inputA: any;
  inputB: any;
  inputC: any;

  constructor() {
    this.inputC = this.inputA + this.inputB;
  }

  ngOnInit() {
  }

}
