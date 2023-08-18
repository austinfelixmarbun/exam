import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-vendor-atpm-add-edit',
  templateUrl: './self-custom-vendor-atpm-add-edit.component.html'
})
export class SelfCustomVendorATPMAddEditComponent implements OnInit {
  pageName: string;

  constructor() {
    this.pageName = 'AtpmRegistration'
  }

  ngOnInit(): void {
  }

}
