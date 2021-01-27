import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html'
})
export class AllComponent implements OnInit {
  
  ListOpenContract: Array<any> = new Array<any>();
  ListClosedContract: Array<any> = new Array<any>();
  ListSummary: Array<any> = new Array<any>();
  ListCredit: Array<any> = new Array<any>();
  ListSubjectInfo: Array<any> = new Array<any>();
  ListIdUpdate: Array<any> = new Array<any>();
  ListAddress: Array<any> = new Array<any>();
  ListContact: Array<any> = new Array<any>();
  ListReasonCode: Array<any> = new Array<any>();
  ListScoreHistory: Array<any> = new Array<any>();
  ListContractRole: Array<any> = new Array<any>();
  ListSummaryPayment: Array<any> = new Array<any>();
  ListRelated: Array<any> = new Array<any>();
  ListContract: Array<any> = new Array<any>();
  ListMonth: Array<any> = new Array<any>();
  ListLastInquiries: Array<any> = new Array<any>();
  ListDisputes: Array<any> = new Array<any>();

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
        Sector:"BPKB",
        Type: "B839283KLI",
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
        Sector:"",
        Type: "",
        ClosedStatus: "3",
        Total: "IDR 12,000,000",
        Balance: "IDR 0",
        PastDue: "IDR 0"
      }
    ]

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

    this.ListSubjectInfo = [
      {
        Item:"Full Name",
        Change: "Roza Lina",
        ValidFrom: "5/31/2015",
        ValidUntil: "1/31/2018"
      },
      {
        Item:"Full Name",
        Change: "Roza Lina",
        ValidFrom: "1/31/2018",
        ValidUntil: "3/31/2018"
      },
      {
        Item:"Full Name",
        Change: "Roza Lina",
        ValidFrom: "12/31/2017",
        ValidUntil: "3/31/2018"
      },
      {
        Item:"Banking Residency",
        Change: "Yes",
        ValidFrom: "7/31/2018",
        ValidUntil: "8/31/2018"
      },
      {
        Item:"Banking Employment",
        Change: "Yes",
        ValidFrom: "4/30/2017",
        ValidUntil: "1/31/2018"
      },
      {
        Item:"Employer Name",
        Change: "ANDALAS BERLIAN MOTORS,PT",
        ValidFrom: "11/30/2014",
        ValidUntil: "1/31/2018"
      },
      {
        Item:"Banking Education",
        Change: "No Education",
        ValidFrom: "3/31/2019",
        ValidUntil: "6/30/2020"
      },
      {
        Item:"Employer Sector",
        Change: "ID_9990",
        ValidFrom: "5/31/2015",
        ValidUntil: "1/31/2018"
      }
    ]

    this.ListIdUpdate = [
      {
        Item:"National ID",
        Change: "1376016306770001",
        ValidFrom: "7/31/2018",
        ValidUntil: "1/31/2018"
      },
      {
        Item:"National ID",
        Change: "1375016306770001",
        ValidFrom: "8/31/2018",
        ValidUntil: "2/28/2018"
      }      
    ]

    this.ListAddress = [
      {
        Item:"Main Address",
        Change: "JL. Imam Bonjol No.49, Payakumbuh, Kota. 26218, Napar, Payakumbuh Utara, ID",
        ValidFrom: "5/31/2015",
        ValidUntil: "1/31/2018"
      },
      {
        Item:"Main Address",
        Change: "JL. PERUM GRIYA ASRI NO 134A RT 000 RW 000 PAKAN SINAYAN PAYAKUMBUH BARAT, Kota Payakumbuh 26226, PAYAKUMBUH BARAT, BALAL PANJANG, ID",
        ValidFrom: "1/31/2018",
        ValidUntil: "2/28/2018"
      }      
    ]

    this.ListContact = [
      {
        Item:"Mobile Phone",
        Change: "075221515",
        ValidFrom: "7/31/2018",
        ValidUntil: "8/31/2018"
      },
      {
        Item:"Mobile Phone",
        Change: "0852632222796",
        ValidFrom: "8/31/2018",
        ValidUntil: "9/30/2018"
      }      
    ]

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

    this.ListMonth = [
      {
        Month1:"0",
        Month3:"0",
        Month6:"0",
        Month12:"0",
        Month24:"0"
      }      
    ]

    this.ListLastInquiries = [
      {
        InquiryDate:"6/22/2020",
        Purpose: "Providing Facilities",
        Sector: "Non Banking Financial Institutions"
      }
    ]

    this.ListDisputes = [
      {
        Active:"Active Disputes - Contracts",
        ActiveAmount:"0",
        Closed:"Closed Disputes in the Past - Contracts",
        ClosedAmount:"0"
      }   ,
      {
        Active:"Active Disputes - Personal",
        ActiveAmount:"0",
        Closed:"Closed Disputes in the Past - Personal",
        ClosedAmount:"0"
      } ,
      {
        Active:"Active Disputes - In Court",
        ActiveAmount:"0",
        Closed:"Sum of Flase Disputes in the Past",
        ClosedAmount:"0"
      }    
    ]

    

  }
}
