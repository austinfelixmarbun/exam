import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-vendor-ho-add-edit',
  templateUrl: './self-custom-vendor-ho-add-edit.component.html'
})
export class SelfCustomVendorHoAddEditComponent implements OnInit {
  pageName: string;

  constructor() {
    this.pageName = 'SupplierHoRegistration'
  }

  ngOnInit(): void {
  }

}
