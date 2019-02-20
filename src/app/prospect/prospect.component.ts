import { FormGroup, FormControl } from '@angular/forms';
import { value } from './../shared/data/dropdowns';
import { formatDate } from '@angular/common';
import { ProspectObj } from './../shared/model/ProspectObj.Model';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.scss']
})
export class ProspectComponent implements OnInit {

  birthDate: string;
  Gender = 'M';
  CustModel = 'Professional';
  Income = 'Less than 5,000,000.00';
  resultData: any;
  apiUrl: any
  foundationUrl: string = environment.foundationUrl;
  allCity: any
  allProv: any
  test: any
  MotherMaidenName: string

  prosObj: ProspectObj;

  constructor(private location: Location, private adInsService: AdInsServiceService) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetCity;
  }

  ngOnInit() {
    this.adInsService.postData(this.apiUrl, null).subscribe(
      (response) => {
        console.log("Success");
        this.resultData = response.returnObject;
        console.log(this.resultData);
      },
      (error) => {
        console.log("Error");
        console.log(error);
      }
    );
  }

  Back(): void {
    this.location.back();
  }

  onChange(cityValue) {
    console.log(cityValue);
  }

  Save(prsReqFoem: NgForm): void {
    this.prosObj = new ProspectObj();
    this.prosObj = prsReqFoem.value;
    this.test = prsReqFoem.value.Rt
    console.log(this.test)
    console.log('print: ', this.prosObj);
  }

  SavePros(prsReqFoem: NgForm) {
    console.log(this.MotherMaidenName);
    this.prosObj = new ProspectObj();
    this.prosObj = prsReqFoem.value;

    if (this.prosObj.City) {

    }

    this.test = prsReqFoem.value.Rt
    console.log(this.test)
    console.log('print: ', this.prosObj);
  }
}
