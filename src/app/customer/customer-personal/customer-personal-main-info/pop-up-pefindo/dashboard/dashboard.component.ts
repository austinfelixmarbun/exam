import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  
  ListOpenContract: Array<any> = new Array<any>();
  ListClosedContract: Array<any> = new Array<any>();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.ListOpenContract = [
      {
        Sector:"Non Banking Financial Institutions",
        Type: "Other with Loan Agreement",
        OpenedUpdated: "8/28/2018  10/31/2020",
        Total: "IDR 92,929,000",
        Balance: "0",
        PastDue: "IDR 0  0 days"
      },
      {
        Sector:"Banks",
        Type: "Credit Card",
        OpenedUpdated: "10/18/2016  2020-10-31",
        Total: "IDR 12,000,000",
        Balance: "0",
        PastDue: "IDR 0  0 days"
      },
      {
        Sector:"",
        Type: "",
        OpenedUpdated: "",
        Total: "",
        Balance: "",
        PastDue: ""
      },
      {
        Sector:"Sum - Debtor /",
        Type: "Co - Debtor",
        OpenedUpdated: "2",
        Total: "IDR 104,929,000",
        Balance: "IDR 0",
        PastDue: "IDR 34,540"
      }
    ]

    this.ListClosedContract = [
      {
        Sector:"Non Banking Financial Institutions",
        Type: "Other with Loan Agreement",
        ClosedStatus: "2016-10-10 Settled",
        Total: "IDR 0 ",
        Balance: "0",
        PastDue: "IDR 0  0 days"
      },
      {
        Sector:"Banks",
        Type: "Credit Card",
        ClosedStatus: "2016-10-18 Settled",
        Total: "IDR 12,000,000",
        Balance: "0",
        PastDue: "IDR 0  0 days"
      },
      {
        Sector:"Banks",
        Type: "Other with Loan Agreement",
        ClosedStatus: "2017-04-28 Transfer To Other Facilities",
        Total: "IDR 0",
        Balance: "0",
        PastDue: "IDR 0  0 days"
      },
      {
        Sector:"Sum - Debtor /",
        Type: "Co - Debtor",
        ClosedStatus: "3",
        Total: "IDR 12,000,000",
        Balance: "IDR 0",
        PastDue: "IDR 0"
      }
    ]
  }
}
