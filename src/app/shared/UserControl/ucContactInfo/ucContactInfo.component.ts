import { Component, OnInit, Input, Inject, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import 'rxjs/add/operator/map';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { DOCUMENT } from '@angular/platform-browser';
import { NgForm, ControlContainer } from '@angular/forms';
@Component({
  selector: 'app-ucContactInfo',
  templateUrl: './ucContactInfo.component.html',
  providers: [DecimalPipe],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class UcContactInfoComponent implements OnInit {
  constructor(private http: HttpClient, private adInsService: AdInsServiceService, private decimalPipe: DecimalPipe, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
  }
  ngOnInit() { }
  @Input() resultData: any;
  @Input() parentForm: any;
  @Input() useName: any = true;
  @Input() useTitle: any = true;
  @Input() useEmail2: any = true;
  jsonData: any;
  mobilePhn1: any;
  mobilePhn2: any;
  email1: any;
  email2: any;
  cntctPersonName: any;
  cntctPersonJobTitle: any;

  setData(data) {
    if (this.useName) {
      this.cntctPersonName = data.cntctPersonName;
    }
    if (this.useTitle) {
      this.cntctPersonJobTitle = data.cntctPersonJobTitle;
    }
    this.mobilePhn1 = data.mobilePhn1;
    this.mobilePhn2 = data.mobilePhn2;
    this.email1 = data.email1;
    if (this.useEmail2) {
      this.email2 = data.email2;
    }
  }

}