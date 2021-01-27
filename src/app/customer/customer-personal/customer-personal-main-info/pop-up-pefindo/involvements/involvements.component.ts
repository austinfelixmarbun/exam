import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-involvements',
  templateUrl: './involvements.component.html'
})
export class InvolvementsComponent implements OnInit {
  

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    
  }
}
