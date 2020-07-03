import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view-coy-detail',
  templateUrl: './customer-view-coy-detail.component.html'
})
export class CustomerViewCoyDetailComponent implements OnInit {
  viewCustCoyMainDataMainInfo: string;

  constructor() { }

  ngOnInit() {
    this.viewCustCoyMainDataMainInfo =  "./assets/ucviewgeneric/viewCustCoyMainDataMainInfo.json";
  }

}
