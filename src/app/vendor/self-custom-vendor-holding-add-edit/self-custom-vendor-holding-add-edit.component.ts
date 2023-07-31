import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-vendor-holding-add-edit',
  templateUrl: './self-custom-vendor-holding-add-edit.component.html'
})
export class SelfCustomVendorHoldingAddEditComponent implements OnInit {
  pageName: string;

  constructor() {
    this.pageName = 'SupplierHoldingRegistration'
  }

  ngOnInit(): void {
  }

}
