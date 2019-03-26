import { Component, OnInit, Input, Inject, Renderer2, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import 'rxjs/add/operator/map';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { DOCUMENT } from '@angular/platform-browser';
import { ControlContainer, NgForm } from '@angular/forms';
@Component({
  selector: 'app-ucAddress',
  templateUrl: './ucAddress.component.html',
  providers: [DecimalPipe],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class UcAddressComponent implements OnInit {
  constructor(private http: HttpClient, private adInsService: AdInsServiceService, private decimalPipe: DecimalPipe, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
  }
  ngOnInit() { }
  @Input() resultData: any;
  @Input() parentForm: any;
  jsonData: any;
  kelurahan: any;
  kecamatan: any;
  city: any;
  addr: any;
  rt: any;
  rw: any;
  phnArea1: any;
  phn1: any;
  phnExt1: any;
  phnArea2: any;
  phn2: any;
  phnExt2: any;
  phnArea3: any;
  phn3: any;
  phnExt3: any;
  faxArea: any;
  fax: any;
  zipcode: any;
  addrValid: boolean = false;
  setData(data) {
    this.kelurahan = data.kelurahan;
    this.kecamatan = data.kecamatan;
    this.city = data.city;
    this.addr = data.addr;
    this.rt = data.rt;
    this.rw = data.rw;
    this.phnArea1 = data.phnArea1;
    this.phn1 = data.phn1;
    this.phnExt1 = data.phnExt1;
    this.phnArea2 = data.phnArea2;
    this.phn2 = data.phn2;
    this.phnExt2 = data.phnExt2;
    this.phnArea3 = data.phnArea3;
    this.phn3 = data.phn3;
    this.phnExt3 = data.phnExt3;
    this.faxArea = data.faxArea;
    this.fax = data.fax;
    this.zipcode = data.zipcode;
  }

  onSelect(event) {
    console.log(event);
    this.kelurahan = event.kelurahan;
    this.kecamatan = event.kecamatan;
    this.city = event.city;
    this.zipcode = event.zipcode;
  }

  // public ucAddressValid(validity): boolean {
  //   this.addrValid = !validity;
  //   return true
  // }
}