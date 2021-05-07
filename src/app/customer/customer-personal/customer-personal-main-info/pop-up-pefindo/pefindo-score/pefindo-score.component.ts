import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pefindo-score',
  templateUrl: './pefindo-score.component.html'
})
export class PefindoScoreComponent implements OnInit {
  
  ListReasonCode: Array<any> = new Array<any>();
  ListScoreHistory: Array<any> = new Array<any>();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.ListReasonCode = [
      {
        Code:"MSM1",
        Descr: "Several Installments were delinquent during last 3 months"
      },
      {
        Code:"MTP1",
        Descr: "No Months with timely payments after delinquency on at least one open contract"
      },
      {
        Code:"NBC1",
        Descr: "5 or more credit obligations were active recently"
      },
      {
        Code:"MDE1",
        Descr: "5 or more months with delilnquencies last 12 months"
      },
      {
        Code:"HH1",
        Descr: "High proportion of contracts with delinquencies last 12 years"
      }
    ]

    this.ListScoreHistory = [
      {
        MonthYear:"PEFINDO Score",
        Nov19: "583",
        Dec19: "626",
        Jan20: "626",
        Feb20: "629",
        Mar20: "644",
        Apr20: "644",
        May20: "647",
        Jun20: "614",
        Jul20: "615",
        Aug20: "623",
        Sep20: "637",
        Oct20: "616",
      },
      {
        MonthYear:"Probability of Default",
        Nov19: "23%",
        Dec19: "10%",
        Jan20: "10%",
        Feb20: "9%",
        Mar20: "7%",
        Apr20: "7%",
        May20: "6%",
        Jun20: "13%",
        Jul20: "12%",
        Aug20: "10%",
        Sep20: "8%",
        Oct20: "12%",
      },
      {
        MonthYear:"PEFINDO Grade",
        Nov19: "D3",
        Dec19: "D1",
        Jan20: "D1",
        Feb20: "D1",
        Mar20: "C3",
        Apr20: "C3",
        May20: "C3",
        Jun20: "D2",
        Jul20: "D2",
        Aug20: "D1",
        Sep20: "D1",
        Oct20: "D2",
      },
    ]

  }
}
