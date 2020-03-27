import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view-coy-detail',
  templateUrl: './customer-view-coy-detail.component.html',
  styleUrls: ['./customer-view-coy-detail.component.scss']
})
export class CustomerViewCoyDetailComponent implements OnInit {
  viewCustCoyMainDataMainInfo: string;

  constructor() { }

  ngOnInit() {
    this.viewCustCoyMainDataMainInfo =  "./assets/ucviewgeneric/viewCustCoyMainDataMainInfo.json";
  }

}
