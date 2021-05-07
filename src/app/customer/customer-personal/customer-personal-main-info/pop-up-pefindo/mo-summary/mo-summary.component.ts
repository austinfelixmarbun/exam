import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mo-summary',
  templateUrl: './mo-summary.component.html'
})
export class MoSummaryComponent implements OnInit {
  
  ListSummary: Array<any> = new Array<any>();
  ListCredit: Array<any> = new Array<any>();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.ListSummary = [
      {
        Descr:"Past Due Amount Sum (Open Contracts)",
        Amount: "IDR 34,540"
      },
      {
        Descr:"Worst Current Arrears",
        Amount: "0"
      },
      {
        Descr:"Worst Arrears Last 12 Months",
        Amount: "0"
      },
      {
        Descr:"Number of Different Creditors",
        Amount: "7"
      },
      {
        Descr:"Worst Past Due Amount",
        Amount: "IDR 3,929,020"
      },
      {
        Descr:"Total Amount Sum",
        Amount: "IDR 228,691,816"
      },
      {
        Descr:"Past Due Amount Sum",
        Amount: "IDR 34,540"
      },
      {
        Descr:"Outstanding Amount Sum",
        Amount: "IDR 92,253,599"
      },
      {
        Descr:"No. of Open Contracts",
        Amount: "7"
      },
      {
        Descr:"No. of Closed Contracts",
        Amount: "6"
      },
      {
        Descr:"Number of Inquiries during last 12 months",
        Amount: "1"
      },
      {
        Descr:"Inquiring Subscribing during last 12 months",
        Amount: "1"
      }
    ]

    this.ListCredit = [
      {
        CreditFacility:"Credity Facility 1",
        LatestReportStat: "1 - Current",
        Condition: "Granted and Activated",
        CauseOfFault: "Not Specified"
      },
      {
        CreditFacility:"Credity Facility 2",
        LatestReportStat: "1 - Current",
        Condition: "Granted and Activated",
        CauseOfFault: "Not Specified"
      },
      {
        CreditFacility:"Credity Facility 3",
        LatestReportStat: "1 - Current",
        Condition: "Granted and Activated",
        CauseOfFault: "Not Specified"
      },
      {
        CreditFacility:"Credity Facility 4",
        LatestReportStat: "1 - Current",
        Condition: "Granted and Activated",
        CauseOfFault: "Not Specified"
      },
      {
        CreditFacility:"Credity Facility 5",
        LatestReportStat: "1 - Current",
        Condition: "Prolonged",
        CauseOfFault: "Not Specified"
      }
    ]
  }
}
