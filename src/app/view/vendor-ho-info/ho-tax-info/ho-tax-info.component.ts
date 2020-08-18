import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-ho-tax-info',
  templateUrl: './ho-tax-info.component.html',
  styleUrls: ['./ho-tax-info.component.scss']
})
export class HoTaxInfoComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor() { }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewHOInfoTax.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
  }

}
