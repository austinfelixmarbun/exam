import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html'
})
export class ContractsComponent implements OnInit {
  
  ListContractRole: Array<any> = new Array<any>();
  ListSummaryPayment: Array<any> = new Array<any>();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.ListContractRole = [
      {
        Sector:"Non Banking Financial Institutions",
        Type: "Other with Loan Agreement",
        Opened: "2018-08-26",
        Status: "Granted and Activated",
        Total: "IDR 66,975,211",
        Balance: "IDR 67,194,890",
        PastDue: "IDR 219,679",
        Arrears: "0 days"
      },
      {
        Sector:"Non Banking Financial Institutions",
        Type: "Other with Loan Agreement",
        Opened: "2019-03-26",
        Status: "Granted and Activated",
        Total: "IDR 293,501,718",
        Balance: "IDR 293,501,718",
        PastDue: "IDR 348,015",
        Arrears: "0 days"
      },
      {
        Sector:"Non Banking Financial Institutions",
        Type: "Other with Loan Agreement",
        Opened: "2020-04-26",
        Status: "Granted and Activated",
        Total: "IDR 216,029,779",
        Balance: "IDR 216,029,779",
        PastDue: "IDR 141,644",
        Arrears: "0 days"
      },
      {
        Sector:"Non Banking Financial Institutions",
        Type: "Other with Loan Agreement",
        Opened: "2020-06-26",
        Status: "Granted and Activated",
        Total: "IDR 151,501,085",
        Balance: "IDR 151,633,537",
        PastDue: "IDR 132,452",
        Arrears: "0 days"
      },
      {
        Sector:"Banks",
        Type: "OtherAgreement",
        Opened: "2020-10-27",
        Status: "Granted and Activated",
        Total: "IDR 4,750,000,000",
        Balance: "IDR 4,750,000,000",
        PastDue: "IDR 0",
        Arrears: "0 days"
      },
      {
        Sector:"Banks",
        Type: "OtherAgreement",
        Opened: "2018-08-26",
        Status: "Granted and Activated",
        Total: "IDR 42,705,481",
        Balance: "IDR 42,705,481",
        PastDue: "IDR 0",
        Arrears: "0 days"
      },
      {
        Sector:"Banks",
        Type: "OtherAgreement",
        Opened: "2010-06-24",
        Status: "Settled",
        Total: "IDR 4,000,000,000",
        Balance: "IDR 0",
        PastDue: "IDR 0",
        Arrears: "0 days"
      },
      {
        Sector:"Non Banking Financial Institutions",
        Type: "OtherAgreement",
        Opened: "2016-11-28",
        Status: "Settled",
        Total: "IDR 0",
        Balance: "IDR 0",
        PastDue: "IDR 0",
        Arrears: "0 days"
      },
      {
        Sector:"SUM",
        Type: "",
        Opened: "",
        Status: "",
        Total: "IDR 9,520,365,259",
        Balance: "IDR 5,521,207,049",
        PastDue: "IDR 841,790",
        Arrears: ""
      }
    ]

    this.ListSummaryPayment = [
      {
        MonthYear:"Delinquency Status",
      },
      {
        MonthYear:"",
      },
      {
        MonthYear:"+ Payments 1/2020-12/2020",
      },
      {
        MonthYear:"",
      },
      {
        MonthYear:"+ Payments 1/2019-12/2019",
      },
      {
        MonthYear:"",
      },
      {
        MonthYear:"+ Payments 1/2018-12/2018",
      },
    ]
  }
}
