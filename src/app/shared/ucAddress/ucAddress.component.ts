import { value } from './../data/dropdowns';
import { Component, OnInit, Input, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { formatDate, getLocaleDateTimeFormat, DecimalPipe } from '@angular/common';
import 'rxjs/add/operator/map';
import { CriteriaObj } from '../model/CriteriaObj.model';
import { RequestCriteriaObj } from '../model/RequestCriteriaObj.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AdInsConstant } from '../AdInstConstant';
import { AdInsHttpServiceService } from 'app/ad-ins-http-service.service';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { HttpRequestObj } from 'app/shared/model/HttpRequestObj.model';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
  selector: 'app-ucAddress',
  templateUrl: './ucAddress.component.html',
  providers: [DecimalPipe]
})
export class UcAddressComponent implements OnInit {
    constructor(private http: HttpClient, private adInsService: AdInsServiceService, private decimalPipe: DecimalPipe, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
    }
    ngOnInit(){}
    @Input() resultData : any;
    jsonData : any;
    kelurahan : any;
    kecamatan : any;
    city : any;
    addr : any;
    rt : any;
    rw : any;
    mobilePhn1 : any;
    mobilePhn2 : any;
    phnArea1 : any;
    phn1 : any;
    phnExt1 : any;
    phnArea2 : any;
    phn2 : any;
    phnExt2 : any;
    phnArea3 : any;
    phn3 : any;
    phnExt3 : any;
    faxArea : any;
    fax : any;
    email1 : any;
    email2 : any;
    zipcode : any;
    setData(data){
      this.kelurahan = data.kelurahan;
      this.kecamatan = data.kecamatan;
      this.city = data.city;
      this.addr = data.addr;
      this.rt = data.rt;
      this.rw = data.rw;
      this.mobilePhn1 = data.mobilePhn1;
      this.mobilePhn2 = data.mobilePhn2;
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
      this.email1 = data.email1;
      this.email2 = data.email2;
      this.zipcode = data.zipcode;
    }

    onSelect(event)
    {
        console.log(event);
        this.kelurahan = event.kelurahan;
        this.kecamatan = event.kecamatan;
        this.city = event.city;
        this.zipcode = event.zipcode;
    }
}