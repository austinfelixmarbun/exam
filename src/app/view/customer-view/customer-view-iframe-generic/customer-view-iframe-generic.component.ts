import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-iframe-generic',
  templateUrl: './customer-view-iframe-generic.component.html'
})
export class CustomerViewIframeGenericComponent implements OnInit {
  @Input() prm: string;
  @Input() Url: string;
  @Input() Title: string;

  urlLink: string;
  rootServer: string;
  IsReady: boolean = false;

  constructor() { }

  ngOnInit() {
    this.rootServer = environment.losR3Web;
    this.urlLink = this.rootServer + this.Url + "?CustNo=" + this.prm;
    this.IsReady = true;
  }
}
