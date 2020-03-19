import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ho-tax-info',
  templateUrl: './ho-tax-info.component.html',
  styleUrls: ['./ho-tax-info.component.scss']
})
export class HoTaxInfoComponent implements OnInit {
  viewTaxObj:any;

  constructor() { }

  ngOnInit() {
    this.viewTaxObj = "./assets/ucviewgeneric/viewHOInfoTax.json";
  }

}
