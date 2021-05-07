import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disputes',
  templateUrl: './disputes.component.html'
})
export class DisputesComponent implements OnInit {
  
  ListDisputes: Array<any> = new Array<any>();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.ListDisputes = [
      {
        Active:"Active Disputes - Contracts",
        ActiveAmount:"0",
        Closed:"Closed Disputes in the Past - Contracts",
        ClosedAmount:"0"
      }   ,
      {
        Active:"Active Disputes - Personal",
        ActiveAmount:"0",
        Closed:"Closed Disputes in the Past - Personal",
        ClosedAmount:"0"
      } ,
      {
        Active:"Active Disputes - In Court",
        ActiveAmount:"0",
        Closed:"Sum of Flase Disputes in the Past",
        ClosedAmount:"0"
      }    
    ]

  }
}
