import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html'
})
export class InquiriesComponent implements OnInit {
  
  ListMonth: Array<any> = new Array<any>();
  ListLastInquiries: Array<any> = new Array<any>();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
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
  }
}
