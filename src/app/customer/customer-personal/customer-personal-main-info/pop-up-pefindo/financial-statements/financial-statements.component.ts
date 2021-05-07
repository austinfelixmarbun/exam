import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-statements',
  templateUrl: './financial-statements.component.html'
})
export class FinancialStatementsComponent implements OnInit {
  

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    
  }
}
