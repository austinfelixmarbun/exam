import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';

@Component({
  selector: 'app-self-custom-cust-exposure-view',
  templateUrl: './self-custom-cust-exposure-view.component.html'
})
export class SelfCustomCustExposureViewComponent implements OnInit {

  pageName: string;

  constructor(private adInsHelperService: AdInsHelperService, private router: Router) {
    this.pageName = "CustomerExposureView"
  }

  ngOnInit() {
  }

  handler = {

    callback: ($event) => this.callback($event)

  };

  callback(ev) {
    let row = ev.RowObj;
  }

}
