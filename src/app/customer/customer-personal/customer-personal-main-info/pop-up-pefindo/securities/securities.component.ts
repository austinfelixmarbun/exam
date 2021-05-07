import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-securities',
  templateUrl: './securities.component.html'
})
export class SecuritiesComponent implements OnInit {
  

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    
  }
}
