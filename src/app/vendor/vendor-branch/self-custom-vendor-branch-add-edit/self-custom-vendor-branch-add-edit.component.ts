import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-vendor-branch-add-edit',
  templateUrl: './self-custom-vendor-branch-add-edit.component.html'
})
export class SelfCustomVendorBranchAddEditComponent implements OnInit {
  pageName: string;

  constructor() {
    this.pageName = "SupplierRegistration";
  }

  ngOnInit(): void {
  }

}
