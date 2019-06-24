import { Component, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import 'rxjs/add/operator/map';
import { ControlContainer, NgForm } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-ucAddress',
  templateUrl: './ucAddress.component.html',
  providers: [DecimalPipe],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class UcAddressComponent implements OnInit {
  constructor() {
  }
  ngOnInit() { }
  @Input() resultData: any;
  @Input() parentForm: any;
  urlJson: any = "./assets/lookup/lookupZipcode.json";
  urlQryPaging: any = AdInsConstant.GetRefZipcodePaging;
  urlEnviPaging : any = environment.settingUrl;
  jsonData: any;
  areaCode2: any;
  areaCode1: any;
  city: any;
  addr: any;
  areaCode4: any;
  areaCode3: any;
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
    this.areaCode2 = data.areaCode2;
    this.areaCode1 = data.areaCode1;
    this.city = data.city;
    this.addr = data.addr;
    this.areaCode4 = data.areaCode4;
    this.areaCode3 = data.areaCode3;
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
    this.areaCode2 = event.areaCode2;
    this.areaCode1 = event.areaCode1;
    this.city = event.city;
    this.zipcode = event.zipcode;
  }

  // public ucAddressValid(validity): boolean {
  //   this.addrValid = !validity;
  //   return true
  // }
}