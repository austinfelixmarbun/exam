import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-info',
  templateUrl: './subject-info.component.html'
})
export class SubjectInfoComponent implements OnInit {
  
  ListSubjectInfo: Array<any> = new Array<any>();
  ListIdUpdate: Array<any> = new Array<any>();
  ListAddress: Array<any> = new Array<any>();
  ListContact: Array<any> = new Array<any>();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
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
  }
}
