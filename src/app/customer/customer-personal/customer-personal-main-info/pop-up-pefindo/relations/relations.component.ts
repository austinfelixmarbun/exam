import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html'
})
export class RelationsComponent implements OnInit {
  
  ListRelated: Array<any> = new Array<any>();
  ListContract: Array<any> = new Array<any>();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.ListRelated = [
      {
        Id:"NotSpecified :",
        FullName: "Na",
        RelationType: "Employer"
      },
      {
        Id:"NotSpecified :",
        FullName: "Andalas Berlian Motor Pt",
        RelationType: "Employer"
      },
      {
        Id:"NotSpecified :",
        FullName: "Pt Andalas Berlian",
        RelationType: "Employer"
      },
      {
        Id:"NotSpecified :",
        FullName: "Cv. Auto Terang Bulan",
        RelationType: "Employer"
      }
    ]

    this.ListContract = [
      {
        Id:"KTP : 1376016306770001",
        FullName: "Roza Lina",
        RelationType: "MainDebtor"
      },
      {
        Id:"KTP : 1376016306770001",
        FullName: "Roza Lina",
        RelationType: "MainDebtor"
      },
      {
        Id:"KTP : 137601630677000",
        FullName: "Roza Lina",
        RelationType: "MainDebtor"
      },
      {
        Id:"KTP : 1376016306770001",
        FullName: "Roza Lina",
        RelationType: "MainDebtor"
      }
    ]
  }
}
