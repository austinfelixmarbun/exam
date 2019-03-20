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
    kelurahan : any;
    kecamatan : any;
    city : any;

    onSelect(event)
    {
        console.log(event);
        this.kelurahan = event.kelurahan;
        this.kecamatan = event.kecamatan;
        this.city = event.city;
    }
}