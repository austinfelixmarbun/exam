import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pefindo-alert-quest',
  templateUrl: './pefindo-alert-quest.component.html'
})
export class PefindoAlertComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }
}
