import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-liabilities',
  templateUrl: './other-liabilities.component.html'
})
export class OtherLiabilitiesComponent implements OnInit {
  

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    
  }
}
